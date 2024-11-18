import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

import { db } from "~/server/db";

const app = new Hono().get("/", verifyAuth(), async (c) => {
  const auth = c.get("authUser");

  if (!auth.token?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const userSubs = await db.subscription.findMany({
    where: {
      userId: auth.token.id!,
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
