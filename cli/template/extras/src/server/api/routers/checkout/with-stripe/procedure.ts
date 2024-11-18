import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCheckoutSchema } from "./inputs";
import { checkoutWithStripe, createStripePortal } from "./service";

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure
    .input(createCheckoutSchema)
    .mutation(({ ctx, input }) => checkoutWithStripe(ctx, input)),
  getCustomerPortal: protectedProcedure.mutation(({ ctx }) =>
    createStripePortal(ctx)
  ),
});
