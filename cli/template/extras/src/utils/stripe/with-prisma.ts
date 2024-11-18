import Stripe from "stripe";

import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import { toDateTime } from "~/utils/helpers";

const TRIAL_PERIOD_DAYS = 0;

export const upsertProductRecord = async (product: Stripe.Product) => {
  try {
    await db.product.upsert({
      where: { id: product.id },
      update: {
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata,
      },
      create: {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata,
      },
    });
    console.log(`Product inserted/updated: ${product.id}`);
  } catch (error) {
    console.error(`Product insert/update failed: ${error.message}`);
    throw error;
  }
};

export const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3,
) => {
  try {
    await db.price.upsert({
      where: { id: price.id },
      update: {
        active: price.active,
        currency: price.currency,
        type: price.type as any,
        unitAmount: price.unit_amount ?? null,
        interval: (price.recurring?.interval as any) ?? null,
        intervalCount: price.recurring?.interval_count ?? null,
        trialPeriodDays:
          price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
      },
      create: {
        id: price.id,
        productId: typeof price.product === "string" ? price.product : "",
        active: price.active,
        currency: price.currency,
        type: price.type as any,
        unitAmount: price.unit_amount ?? null,
        interval: (price.recurring?.interval as any) || null,
        intervalCount: price.recurring?.interval_count ?? null,
        trialPeriodDays:
          price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
      },
    });
    console.log(`Price inserted/updated: ${price.id}`);
  } catch (error) {
    if (
      error.message.includes("foreign key constraint") &&
      retryCount < maxRetries
    ) {
      console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await upsertPriceRecord(price, retryCount + 1, maxRetries);
    } else {
      console.error(`Price insert/update failed: ${error.message}`);
      throw error;
    }
  }
};

export const deleteProductRecord = async (product: Stripe.Product) => {
  try {
    await db.product.delete({ where: { id: product.id } });
    console.log(`Product deleted: ${product.id}`);
  } catch (error) {
    console.error(`Product deletion failed: ${error.message}`);
    throw error;
  }
};

export const deletePriceRecord = async (price: Stripe.Price) => {
  try {
    await db.price.delete({ where: { id: price.id } });
    console.log(`Price deleted: ${price.id}`);
  } catch (error) {
    console.error(`Price deletion failed: ${error.message}`);
    throw error;
  }
};

export const upsertCustomerRecord = async (
  uuid: string,
  customerId: string,
) => {
  try {
    await db.customer.upsert({
      where: { id: uuid },
      update: { stripeCustomerId: customerId },
      create: { id: uuid, stripeCustomerId: customerId },
    });
    return customerId;
  } catch (error) {
    console.error(`Customer record creation failed: ${error.message}`);
    throw error;
  }
};

export const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  if (!newCustomer) throw new Error("Stripe customer creation failed.");
  return newCustomer.id;
};

export const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const existingCustomer = await db.customer.findUnique({
    where: { id: uuid },
  });

  let stripeCustomerId: string | undefined;
  if (existingCustomer?.stripeCustomerId) {
    const existingStripeCustomer = await stripe.customers.retrieve(
      existingCustomer.stripeCustomerId,
    );
    stripeCustomerId = existingStripeCustomer.id;
  } else {
    const stripeCustomers = await stripe.customers.list({ email: email });
    stripeCustomerId =
      stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
  }

  const stripeIdToInsert =
    stripeCustomerId ?? (await createCustomerInStripe(uuid, email));
  if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.");

  if (existingCustomer && stripeCustomerId) {
    if (existingCustomer.stripeCustomerId !== stripeCustomerId) {
      await db.customer.update({
        where: { id: uuid },
        data: { stripeCustomerId: stripeCustomerId },
      });
      console.warn(`Customer record mismatched Stripe ID. Record updated.`);
    }
    return stripeCustomerId;
  } else {
    console.warn(`Customer record was missing. A new record was created.`);
    const upsertedStripeCustomer = await upsertCustomerRecord(
      uuid,
      stripeIdToInsert,
    );
    if (!upsertedStripeCustomer)
      throw new Error("Customer record creation failed.");
    return upsertedStripeCustomer;
  }
};

export const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod,
) => {
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  await stripe.customers.update(customer, { name, phone, address });
};

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false,
) => {
  const customerData = await db.customer.findFirst({
    where: { stripeCustomerId: customerId },
  });
  if (!customerData) throw new Error(`Customer lookup failed.`);

  const { id: uuid } = customerData;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });

  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    priceIdd: subscription.items.data[0].price.id,
    quantity: subscription.quantity || 1,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    cancelAt: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceledAt: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    currentPeriodStart: toDateTime(
      subscription.current_period_start,
    ).toISOString(),
    currentPeriodEnd: toDateTime(subscription.current_period_end).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    endedAt: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trialStart: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trialEnd: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null,
  };

  await db.subscription.upsert({
    where: { id: subscription.id },
    update: subscriptionData,
    create: subscriptionData,
  });

  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`,
  );

  if (createAction && subscription.default_payment_method && uuid) {
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod,
    );
  }
};
