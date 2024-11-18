"use server";

import {
  createCheckout,
  getSubscription,
  listCustomers,
  type Variant,
} from "@lemonsqueezy/lemonsqueezy.js";
import { z } from "zod";

import { auth } from "~/auth";
import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";

configureLemonSqueezy();

const createCheckoutSchema = z.object({
  variantId: z.number(),
  embed: z.boolean(),
});

export async function createCheckoutAction(
  data: z.infer<typeof createCheckoutSchema>
) {
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not logged in.");
  }

  const { variantId, embed } = data;

  const checkout = await createCheckout(
    process.env.LEMON_SQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: session.user.email || "",
        custom: {
          user_id: session.user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard/billing/`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
      },
    }
  );

  return checkout.data?.data.attributes.url;
}

const getSubscriptionUrlsSchema = z.object({
  id: z.string(),
});

export async function getSubscriptionUrlsAction(
  data: z.infer<typeof getSubscriptionUrlsSchema>
) {
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not logged in.");
  }

  configureLemonSqueezy();

  const { id } = data;

  const subscription = await getSubscription(id);

  if (subscription.error) {
    throw new Error(subscription.error.message);
  }

  return subscription.data?.data.attributes.urls;
}

export async function getCustomerPortalAction() {
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not logged in.");
  }

  configureLemonSqueezy();

  const customers = await listCustomers({
    filter: { email: session.user.email! },
  });

  if (customers.error) {
    throw new Error("Customer portal URL not found for this customer");
  }

  const customerPortalUrl =
    customers.data?.data[0]?.attributes.urls.customer_portal;

  if (!customerPortalUrl) {
    throw new Error("Customer portal URL not found for this customer");
  }

  return customerPortalUrl;
}
