import Stripe from "stripe";

import { stripe } from "~/lib/stripe";
import { ContextType } from "~/server/api/trpc";
import {
  calculateTrialEndUnixTimestamp,
  getErrorRedirect,
  getURL,
} from "~/utils/helpers";
import { createOrRetrieveCustomer } from "~/utils/stripe";
import { CreateCheckoutInput } from "./inputs";

type CheckoutResponse = {
  errorRedirect?: string;
  checkoutUrl?: string;
};

export async function checkoutWithStripe(
  ctx: ContextType,
  input: CreateCheckoutInput
): Promise<CheckoutResponse> {
  try {
    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: ctx?.session.user.id || "",
        email: ctx?.session.user.email || "",
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
          price: input.price.id,
          quantity: 1,
        },
      ],
      cancel_url: getURL(),
      success_url: getURL("/dashboard"),
    };

    console.log(
      "Trial end:",
      calculateTrialEndUnixTimestamp(input.price.trialPeriodDays)
    );
    if (input.price.type === "recurring") {
      params = {
        ...params,
        mode: "subscription",
        subscription_data: {
          trial_end: calculateTrialEndUnixTimestamp(
            input.price.trialPeriodDays
          ),
        },
      };
    } else if (input.price.type === "one_time") {
      params = {
        ...params,
        mode: "payment",
      };
    }

    // Create a checkout session in Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create checkout session.");
    }

    if (session) {
      return { checkoutUrl: session.url! };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(
          "/dashboard",
          error.message,
          "Please try again later or contact a system administrator."
        ),
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          "/dashboard",
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        ),
      };
    }
  }
}

export async function createStripePortal(ctx: ContextType) {
  try {
    let customer;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: ctx?.session.user.id || "",
        email: ctx?.session.user.email || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
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
        throw new Error("Could not create billing portal");
      }
      return url;
    } catch (err) {
      console.error(err);
      throw new Error("Could not create billing portal");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return getErrorRedirect(
        "/pricing",
        error.message,
        "Please try again later or contact a system administrator."
      );
    } else {
      return getErrorRedirect(
        "/pricing",
        "An unknown error occurred.",
        "Please try again later or contact a system administrator."
      );
    }
  }
}
