import { checkoutRouter } from "~/server/api/routers/checkout/procedure";
import { postRouter } from "~/server/api/routers/post/procedure";
import { productRouter } from "~/server/api/routers/products/procedure";
import { subscriptionRouter } from "~/server/api/routers/subscriptions/procedure";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  subscription: subscriptionRouter,
  products: productRouter,
  checkout: checkoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
