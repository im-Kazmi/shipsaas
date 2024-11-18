"use server";

import {
  Checkout,
  createCheckout,
  listCustomers,
  NewCheckout,
  type Variant,
} from "@lemonsqueezy/lemonsqueezy.js";

import { getUser } from "~/features/auth/queries";
import { createOrRetrieveCustomer } from "~/features/subscriptions/admin";
import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";
import { createClient } from "~/lib/supabase/server";

type CheckoutResponse = {
  checkoutUrl?: string;
};

type FetchResponse<T> =
  | {
      statusCode: number;
      data: T;
      error: null;
    }
  | {
      statusCode: number | null;
      data: T | null;
      error: Error;
    };

export async function checkoutWithLemon(
  variantId: number,
  embed: boolean = true
): Promise<CheckoutResponse> {
  try {
    // Get the user from Supabase auth
    const supabase = createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error(error);
      throw new Error("Could not get user session.");
    }

    // Retrieve or create the customer in Stripe
    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user?.id || "",
        email: user?.email || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    let params: NewCheckout = {
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
    };

    // Create a checkout session in Lemonsqueezy
    let session: FetchResponse<Checkout>;
    try {
      session = await createCheckout(
        process.env.LEMON_SQUEEZY_STORE_ID!,
        variantId,
        params
      );
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create checkout session.");
    }

    if (session) {
      return { checkoutUrl: session.data?.data.attributes.url };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    console.log(error);
    return { checkoutUrl: "" };
  }
}

export async function getCustomerPortal() {
  configureLemonSqueezy();
  const supabase = createClient();

  const user = await getUser(supabase);

  if (!user) {
    throw new Error("Could not get user session.");
  }
  console.log("user = ", user);

  const customers = await listCustomers({ filter: { email: user.email } });

  if (customers.error) {
    throw new Error(customers.error.message);
  }

  return customers.data?.data[0].attributes.urls.customer_portal;
}
