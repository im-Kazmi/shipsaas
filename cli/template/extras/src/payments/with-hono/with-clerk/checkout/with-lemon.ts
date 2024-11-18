import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import {
  createCheckout,
  getSubscription,
  listCustomers,
  type Variant,
} from "@lemonsqueezy/lemonsqueezy.js";
import { Hono } from "hono";
import { z } from "zod";

import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";

const app = new Hono()
  .post(
    "/create-checkout",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        variantId: z.number(),
        embed: z.boolean(),
      })
    ),
    async (c) => {
      configureLemonSqueezy();
      const auth = getAuth(c);
      const clerkClient = c.get("clerk");

      if (!auth?.userId) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400
        );
      }

      const user = await clerkClient.users.getUser(auth.userId);

      const { variantId, embed } = c.req.valid("json");

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
            email: user.emailAddresses[0].emailAddress ?? undefined,
            custom: {
              user_id: auth.userId,
            },
          },
          productOptions: {
            enabledVariants: [variantId],
            redirectUrl: `http://localhost:3000/dashboard/billing/`,
            receiptButtonText: "Go to Dashboard",
            receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
          },
        }
      );

      return c.json(checkout.data?.data.attributes.url, 200);
    }
  )
  .post(
    "/get-subscription_urls",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      configureLemonSqueezy();

      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400
        );
      }

      const { id } = c.req.valid("json");

      const subscription = await getSubscription(id);

      if (subscription.error) {
        throw new Error(subscription.error.message);
      }

      console.log(subscription.data);
      return c.json(subscription.data?.data.attributes.urls, 200);
    }
  )
  .post("/get-customer-portal", clerkMiddleware(), async (c) => {
    configureLemonSqueezy();

    const auth = getAuth(c);
    const clerkClient = c.get("clerk");

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400
      );
    }
    const user = await clerkClient.users.getUser(auth.userId);

    const customers = await listCustomers({
      filter: { email: user.emailAddresses[0].emailAddress },
    });

    if (customers.error) {
      return c.json("customerportal url not found for this customer", 400);
    }

    const customerPortalUrl =
      customers.data?.data[0]?.attributes.urls.customer_portal;

    if (!customerPortalUrl) {
      return c.json("customerportal url not found for this customer", 400);
    }

    return c.json(customerPortalUrl, 200);
  });

export default app;
