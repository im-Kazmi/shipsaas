import { eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "~/server/db";
import { plans, subscriptions } from "~/server/db/schema";
import { authMiddleware } from "../middleware";

const app = new Hono().get("/", authMiddleware(), async (c) => {
  const user = c.get("user");

  if (!user || !user?.id) {
    return c.json(
      {
        message: "You are not logged in.",
      },
      200
    );
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
    .where(eq(subscriptions.userId, user.id));

  return c.json(userSubs, 200);
});

export default app;
