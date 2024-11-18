import { Hono } from "hono";

import { db } from "~/server/db";
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
  const userSubs = await db.subscription.findMany({
    where: {
      userId: user.id,
    },
    include: {
      plan: {
        select: {
          productName: true,
          price: true,
          interval: true,
          intervalCount: true,
          trialInterval: true,
          trialIntervalCount: true,
        },
      },
    },
  });

  return c.json(
    userSubs.map((subscription) => ({
      id: subscription.id,
      status: subscription.status,
      productName: subscription.plan.productName,
      price: subscription.plan.price,
      interval: subscription.plan.interval,
      intervalCount: subscription.plan.intervalCount,
      trialInterval: subscription.plan.trialInterval,
      trialIntervalCount: subscription.plan.trialIntervalCount,
      renewsAt: subscription.renewsAt,
      endsAt: subscription.endsAt,
      trialEndsAt: subscription.trialEndsAt,
      isUsageBased: subscription.isUsageBased,
      isPaused: subscription.isPaused,
      created: subscription.created,
    })),
    200
  );
});

export default app;
