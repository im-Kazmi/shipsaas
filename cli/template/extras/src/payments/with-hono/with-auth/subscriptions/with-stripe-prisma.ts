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
    select: {
      id: true,
      status: true,
      endedAt: true,
      trialEnd: true,
      canceledAt: true,
      currentPeriodEnd: true,
      currentPeriodStart: true,
      cancelAtPeriodEnd: true,
      price: {
        select: {
          unitAmount: true,
          interval: true,
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return c.json(
    userSubs.map((sub) => ({
      id: sub.id,
      status: sub.status,
      productName: sub.price?.product?.name,
      price: sub.price?.unitAmount,
      interval: sub.price?.interval,
      endedAt: sub.endedAt,
      trialEnd: sub.trialEnd,
      canceledAt: sub.canceledAt,
      created: sub.created,
      currentPeriodEnd: sub.currentPeriodEnd,
      currentPeriodStart: sub.currentPeriodStart,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    })),
    200
  );
});

export default app;
