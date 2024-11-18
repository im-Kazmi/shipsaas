import { checkoutRouter } from "~/server/api/routers/checkout/procedure";
import { plansRouter } from "~/server/api/routers/plans/procedure";
import { postRouter } from "~/server/api/routers/post/procedure";
import { subscriptionRouter } from "~/server/api/routers/subscriptions/procedure";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  subscription: subscriptionRouter,
  plans: plansRouter,
  checkout: checkoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);