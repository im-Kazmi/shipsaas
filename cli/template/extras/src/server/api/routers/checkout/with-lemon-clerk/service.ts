import { clerkClient } from "@clerk/nextjs/server";
import {
  Checkout,
  createCheckout,
  listCustomers,
} from "@lemonsqueezy/lemonsqueezy.js";

import { ContextType } from "~/server/api/trpc";
import { createOrRetrieveCustomer } from "~/utils/lemon";
import { CreateCheckoutInput } from "./inputs";


type CheckoutResponse = {
  checkoutUrl?: string | undefined;
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
  ctx: ContextType,
  input: CreateCheckoutInput
): Promise<CheckoutResponse> {
  try {
    let customer: string;

    const user = await clerkClient.users.getUser(ctx.session.userId);
    try {
      customer = await createOrRetrieveCustomer({
        uuid: ctx?.session.userId || "",
        email: user.emailAddresses[0].emailAddress || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }
    // Create a checkout session in Stripe
    let session: FetchResponse<Checkout>;
    try {
      const { variantId, embed } = input;
      session = await createCheckout(
        process.env.LEMON_SQUEEZY_STORE_ID!,
        variantId,
        {
          checkoutOptions: {
            embed,
            media: false,
            logo: !embed,
          },
          checkoutData: {
            email: ctx?.session.user.email ?? undefined,
            custom: {
              user_id: ctx?.session.user.id,
            },
          },
          productOptions: {
            enabledVariants: [variantId],
            redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing/`,
            receiptButtonText: "Go to Dashboard",
            receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
          },
        }
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
  }
}

export async function createLemonPortal(ctx: ContextType) {
  try {
    const user = await clerkClient.users.getUser(ctx.session.userId);
    // idk why getCustomer throws a f*cking error. but this is not
    // a bad way either
    const customers = await listCustomers({
      filter: { email: user.emailAddresses[0].emailAddress },
    });

    if (customers.error) {
      throw new Error(customers.error.message);
    }

    return customers.data?.data[0].attributes.urls.customer_portal;
  } catch (err) {
    console.error(err);
    throw new Error("Could not create billing portal");
  }
}
