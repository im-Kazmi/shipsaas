import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "~/server/db";
import { plans, subscriptions } from "~/server/db/schema";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  const userSubs = await db
    .select({
      id: subscriptions.id,
      status: subscriptions.status,
      productName: plans.productName,
      price: plans.price,
      interval: plans.interval,
      intervalCount: plans.intervalCount,
      trialInterval: plans.trialInterval,
      trialIntervalCount: plans.trialIntervalCount,
      renewsAt: subscriptions.renewsAt,
      endsAt: subscriptions.endsAt,
      trialEndsAt: subscriptions.trialEndsAt,
      isUsageBased: subscriptions.isUsageBased,
      isPaused: subscriptions.isPaused,
    })
    .from(subscriptions)
    .leftJoin(plans, eq(plans.id, subscriptions.planId))
    .where(eq(subscriptions.userId, auth.userId));

  return c.json(userSubs, 200);
});

export default app;
