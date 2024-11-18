"use server";

import {
  createCheckout,
  getSubscription,
  listCustomers,
  type Variant,
} from "@lemonsqueezy/lemonsqueezy.js";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "~/lib/auth";
import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";

const createCheckoutSchema = z.object({
  variantId: z.number(),
  embed: z.boolean(),
});

export async function createCheckoutAction(
  data: z.infer<typeof createCheckoutSchema>
) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const user = session.user;

  configureLemonSqueezy();

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
        email: user.email,
        custom: {
          user_id: user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard/billing/`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for signing up to project1!",
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
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("you are not logged in.");
  }
  const user = session.user;

  configureLemonSqueezy();

  const { id } = data;

  const subscription = await getSubscription(id);

  if (subscription.error) {
    throw new Error(subscription.error.message);
  }

  return subscription.data?.data.attributes.urls;
}

export async function getCustomerPortalAction() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("you are not logged in.");
  }

  const user = session.user;

  configureLemonSqueezy();

  const customers = await listCustomers({
    filter: { email: user.email },
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
