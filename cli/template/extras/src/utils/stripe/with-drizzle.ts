import { eq } from "drizzle-orm";
import Stripe from "stripe";

import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";
import {
  customers,
  prices,
  products,
  subscriptions,
} from "~/server/db/schema";
import { toDateTime } from "~/utils/helpers";

const TRIAL_PERIOD_DAYS = 0;

export const upsertProductRecord = async (product: Stripe.Product) => {
  try {
    await db
      .insert(products)
      .values({
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata,
      })
      .onConflictDoUpdate({
        target: products.id,
        set: {
          active: product.active,
          name: product.name,
          description: product.description ?? null,
          image: product.images?.[0] ?? null,
          metadata: product.metadata,
        },
      });
    console.log(`Product inserted/updated: ${product.id}`);
  } catch (error) {
    console.error(`Product insert/update failed: ${error}`);
    throw error;
  }
};

export const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
) => {
  try {
    await db
      .insert(prices)
      .values({
        id: price.id,
        productId: typeof price.product === "string" ? price.product : "",
        active: price.active,
        currency: price.currency,
        type: price.type,
        unitAmount: price.unit_amount ?? null,
        interval: price.recurring?.interval ?? null,
        intervalCount: price.recurring?.interval_count ?? null,
        trialPeriodDays:
          price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
      })
      .onConflictDoUpdate({
        target: prices.id,
        set: {
          active: price.active,
          currency: price.currency,
          type: price.type,
          unitAmount: price.unit_amount ?? null,
          interval: price.recurring?.interval ?? null,
          intervalCount: price.recurring?.interval_count ?? null,
          trialPeriodDays:
            price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
        },
      });
    console.log(`Price inserted/updated: ${price.id}`);
  } catch (error) {
    if (
      error &&
      error.message.includes("foreign key constraint") &&
      retryCount < maxRetries
    ) {
      console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await upsertPriceRecord(price, retryCount + 1, maxRetries);
    } else {
      console.error(`Price insert/update failed: ${error}`);
      throw error;
    }
  }
};

export const deleteProductRecord = async (product: Stripe.Product) => {
  try {
    await db.delete(products).where(eq(products.id, product.id));
    console.log(`Product deleted: ${product.id}`);
  } catch (error) {
    console.error(`Product deletion failed: ${error}`);
    throw error;
  }
};

export const deletePriceRecord = async (price: Stripe.Price) => {
  try {
    await db.delete(prices).where(eq(prices.id, price.id));
    console.log(`Price deleted: ${price.id}`);
  } catch (error) {
    console.error(`Price deletion failed: ${error}`);
    throw error;
  }
};

export const upsertCustomerRecord = async (
  uuid: string,
  customerId: string
) => {
  try {
    await db
      .insert(customers)
      .values({
        id: uuid,
        stripeCustomerId: customerId,
      })
      .onConflictDoUpdate({
        target: customers.id,
        set: { stripeCustomerId: customerId },
      });
    return customerId;
  } catch (error) {
    console.error(`Customer record creation failed: ${error}`);
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
  const existingCustomer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, uuid))
    .limit(1);

  let stripeCustomerId: string | undefined;
  if (existingCustomer.length > 0 && existingCustomer[0].stripeCustomerId) {
    const existingStripeCustomer = await stripe.customers.retrieve(
      existingCustomer[0].stripeCustomerId
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

  if (existingCustomer.length > 0 && stripeCustomerId) {
    if (existingCustomer[0].stripeCustomerId !== stripeCustomerId) {
      await db
        .update(customers)
        .set({ stripeCustomerId: stripeCustomerId })
        .where(eq(customers.id, uuid));
      console.warn(`Customer record mismatched Stripe ID. Record updated.`);
    }
    return stripeCustomerId;
  } else {
    console.warn(`Customer record was missing. A new record was created.`);
    const upsertedStripeCustomer = await upsertCustomerRecord(
      uuid,
      stripeIdToInsert
    );
    if (!upsertedStripeCustomer)
      throw new Error("Customer record creation failed.");
    return upsertedStripeCustomer;
  }
};

export const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  await stripe.customers.update(customer, { name, phone, address });
};

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  const customerData = await db
    .select()
    .from(customers)
    .where(eq(customers.stripeCustomerId, customerId))
    .limit(1);
  if (customerData.length === 0) throw new Error(`Customer lookup failed.`);

  const { id: uuid } = customerData[0];

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });

  const subscriptionData = {
    id: subscription.id,
    userId: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    cancelAt: subscription.cancel_at
      ? toDateTime(subscription.cancel_at)
      : null,
    canceledAt: subscription.canceled_at
      ? toDateTime(subscription.canceled_at)
      : null,
    currentPeriodStart: toDateTime(subscription.current_period_start),
    currentPeriodEnd: toDateTime(subscription.current_period_end),
    created: toDateTime(subscription.created),
    endedAt: subscription.ended_at ? toDateTime(subscription.ended_at) : null,
    trialStart: subscription.trial_start
      ? toDateTime(subscription.trial_start)
      : null,
    trialEnd: subscription.trial_end
      ? toDateTime(subscription.trial_end)
      : null,
  };

  await db.insert(subscriptions).values(subscriptionData).onConflictDoUpdate({
    target: subscriptions.id,
    set: subscriptionData,
  });

  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  if (createAction && subscription.default_payment_method && uuid) {
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
  }
};
