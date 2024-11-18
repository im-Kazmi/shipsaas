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
    select: {
      id: true,
      status: true,
      endedAt: true,
      trialEnd: true,
      canceledAt: true,
      created: true,
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
