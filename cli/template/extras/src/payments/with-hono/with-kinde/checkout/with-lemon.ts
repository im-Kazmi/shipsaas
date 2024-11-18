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
import { authMiddleware } from "../middleware";

const app = new Hono()
  .post(
    "/create-checkout",
    authMiddleware(),
    zValidator(
      "json",
      z.object({
        variantId: z.number(),
        embed: z.boolean(),
      })
    ),
    async (c) => {
      configureLemonSqueezy();
      const user = c.get("user");

      if (!user || !user?.id) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          200
        );
      }

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
            email: user.email ?? undefined,
            custom: {
              user_id: user.id,
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

      console.log(checkout?.data?.data);
      return c.json(checkout.data?.data.attributes.url, 200);
    }
  )
  .post(
    "/get-subscription_urls",
    authMiddleware(),
    zValidator(
      "json",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      configureLemonSqueezy();

      const user = c.get("user");

      if (!user || !user?.id) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          200
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
  .post("/get-customer-portal", authMiddleware(), async (c) => {
    configureLemonSqueezy();

    const user = c.get("user");

    if (!user || !user?.id) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        200
      );
    }

    const customers = await listCustomers({
      filter: { email: user.email! },
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
