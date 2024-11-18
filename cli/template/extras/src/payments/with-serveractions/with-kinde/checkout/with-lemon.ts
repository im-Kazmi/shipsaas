"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  createCheckout,
  getSubscription,
  listCustomers,
  type Variant,
} from "@lemonsqueezy/lemonsqueezy.js";
import { z } from "zod";

import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";

const createCheckoutSchema = z.object({
  variantId: z.number(),
  embed: z.boolean(),
});

export async function createCheckoutAction(  data: z.infer<typeof createCheckoutSchema>
) {
   const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();


  if (!isAuthenticated) {
    throw new Error("You are not logged in.");
  }


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
        email: user.email!,
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

export async function getSubscriptionUrlsAction( data: z.infer<typeof getSubscriptionUrlsSchema>) {
   const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();


  if (!isAuthenticated) {
    throw new Error("You are not logged in.");
  }
    if (!isAuthenticated) {
      return c.json("UNAUTHORIZED", 400);
    }

  configureLemonSqueezy();

  const parsed = getSubscriptionUrlsSchema.parse({
    id: formData.get("id") as string,
  });

  const { id } = parsed;

  const subscription = await getSubscription(id);

  if (subscription.error) {
    throw new Error(subscription.error.message);
  }

  return subscription.data?.data.attributes.urls;
}

export async function getCustomerPortalAction() {
   const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();


  if (!isAuthenticated) {
    throw new Error("You are not logged in.");
  }
    if (!isAuthenticated) {
      return c.json("UNAUTHORIZED", 400);
    }

  configureLemonSqueezy();

  const user = await auth().getUser(userId);

  const customers = await listCustomers({
    filter: { email: user.emailAddresses[0]?.emailAddress },
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
