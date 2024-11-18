import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import Stripe from "stripe";
import { z } from "zod";

import { stripe } from "~/lib/stripe";
import {
  calculateTrialEndUnixTimestamp,
  getErrorRedirect,
  getURL,
} from "~/utils/helpers";
import { createOrRetrieveCustomer } from "~/utils/stripe";
import { authMiddleware } from "../middleware";

const app = new Hono()
  .post(
    "/create-checkout",
    authMiddleware(),
    zValidator(
      "json",
      z.object({
        price: z.any(),
        redirectPath: z.string().default("/"),
      })
    ),
    async (c) => {
      const user = c.get("user");

      if (!user || !user?.id) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400
        );
      }

      const { price, redirectPath } = c.req.valid("json");

      try {
        let customer: string;
        try {
          customer = await createOrRetrieveCustomer({
            uuid: user.id || "",
            email: user.email || "",
          });
        } catch (err) {
          console.error(err);
          throw new Error("Unable to access customer record.");
        }

        let params: Stripe.Checkout.SessionCreateParams = {
          allow_promotion_codes: true,
          billing_address_collection: "required",
          customer,
          customer_update: {
            address: "auto",
          },
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          cancel_url: getURL(),
          success_url: getURL("/dashboard"),
        };

        if (price.type === "recurring") {
          params = {
            ...params,
            mode: "subscription",
            subscription_data: {
              trial_end: calculateTrialEndUnixTimestamp(price.trialPeriodDays),
            },
          };
        } else if (price.type === "one_time") {
          params = {
            ...params,
            mode: "payment",
          };
        }

        let session;
        try {
          session = await stripe.checkout.sessions.create(params);
        } catch (err) {
          console.error(err);
          return c.json("Unable to create checkout session.", 400);
        }

        return c.json(session.url, 200);
      } catch {
        return c.json("Unable to create checkout session.", 400);
      }
    }
  )
  .post("/get-customer-portal", authMiddleware(), async (c) => {
    const user = c.get("user");

    if (!user || !user?.id) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400
      );
    }

    let customer;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });
    } catch (err) {
      console.error(err);
      return c.json("Unable to access customer record.", 400);
    }

    if (!customer) {
      throw new Error("Could not get customer.");
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL("/dashboard/billing"),
      });
      if (!url) {
        return c.json("Could not create billing portal", 400);
      }
      return c.json(url, 200);
    } catch (err) {
      console.error(err);
      return c.json("Could not create billing portal", 400);
    }
  });

export default app;
