import { verifyAuth } from "@hono/auth-js";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "~/server/db";
import { prices, products, subscriptions } from "~/server/db/schema";

const app = new Hono().get("/", verifyAuth(), async (c) => {
  const auth = c.get("authUser");

  if (!auth.token?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const userSubs = await db
    .select({
      id: subscriptions.id,
      status: subscriptions.status,
      productName: products.name,
      price: prices.unitAmount,
      interval: prices.interval,
      endedAt: subscriptions.endedAt,
      trialEnd: subscriptions.trialEnd,
      canceledAt: subscriptions.canceledAt,
      created: subscriptions.created,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      currentPeriodStart: subscriptions.currentPeriodStart,
      cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
    })
    .from(subscriptions)
    .leftJoin(prices, eq(prices.id, subscriptions.priceId))
    .leftJoin(products, eq(products.id, prices.productId))
    .where(eq(subscriptions.userId, auth.token.id!));

  return c.json(userSubs, 200);
});

export default app;
