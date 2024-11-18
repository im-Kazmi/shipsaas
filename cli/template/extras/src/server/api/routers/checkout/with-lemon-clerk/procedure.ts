import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCheckoutSchema } from "./inputs";
import { checkoutWithLemon, createLemonPortal } from "./service";

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure
    .input(createCheckoutSchema)
    .mutation(({ ctx, input }) => checkoutWithLemon(ctx, input)),
  getCustomerPortal: protectedProcedure.mutation(({ ctx }) =>
    createLemonPortal(ctx)
  ),
});
