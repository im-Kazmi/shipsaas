"use server";

import { headers } from "next/headers";

import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export async function getUserSubscriptions() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const user = session.user;

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

  return userSubs.map((subscription) => ({
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
  }));
}
