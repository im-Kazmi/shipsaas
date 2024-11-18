import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getUserSubscriptions } from "./service";

export const subscriptionRouter = createTRPCRouter({
  getUserSubscriptions: protectedProcedure.query(({ ctx }) =>
    getUserSubscriptions(ctx)
  ),
});
