"use server";

import { eq } from "drizzle-orm";

import { auth } from "~/auth";
import { db } from "~/server/db";
import { plans, subscriptions } from "~/server/db/schema";

export async function getUserSubscriptions() {
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not logged in.");
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
    .where(eq(subscriptions.userId, session.user.id));

  return userSubs;
}
