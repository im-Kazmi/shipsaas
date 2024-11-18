import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

import { db } from "~/server/db";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  const userSubs = await db.subscription.findMany({
    where: {
      userId: auth.userId,
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
