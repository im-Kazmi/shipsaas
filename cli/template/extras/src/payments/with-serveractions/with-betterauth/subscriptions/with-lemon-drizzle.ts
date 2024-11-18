"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { plans, subscriptions } from "~/server/db/schema";

export async function getUserSubscriptions() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const user = session.user;

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

  return userSubs;
}
