"use server";

import Stripe from "stripe";
import { z } from "zod";

import { auth } from "~/auth";
import { stripe } from "~/lib/stripe";
import { calculateTrialEndUnixTimestamp, getURL } from "~/utils/helpers";
import { createOrRetrieveCustomer } from "~/utils/stripe";

const createCheckoutSchema = z.object({
  price: z.any(),
  redirectPath: z.string().default("/"),
});

export async function createCheckoutSession(
  data: z.infer<typeof createCheckoutSchema>
) {
  const authSession = await auth();
  if (!authSession || !authSession?.user) {
    throw new Error("You are not logged in.");
  }

  const { price, redirectPath } = data;

  try {
    const customer = await createOrRetrieveCustomer({
      uuid: authSession.user.id,
      email: authSession.user.email || "",
    });

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

    const session = await stripe.checkout.sessions.create(params);
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Unable to create checkout session.");
  }
}

export async function getCustomerPortalUrl() {
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not logged in.");
  }
  try {
    const customer = await createOrRetrieveCustomer({
      uuid: session.user.id,
      email: session.user.email || "",
    });

    if (!customer) {
      throw new Error("Could not get customer.");
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: getURL("/dashboard/billing"),
    });

    if (!url) {
      throw new Error("Could not create billing portal");
    }

    return url;
  } catch (error) {
    console.error("Error getting customer portal URL:", error);
    throw new Error("Could not create billing portal");
  }
}
