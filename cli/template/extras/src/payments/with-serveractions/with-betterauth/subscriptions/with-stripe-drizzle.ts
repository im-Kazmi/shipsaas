"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { prices, products, subscriptions } from "~/server/db/schema";

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
      productName: products.name,
      price: prices.unitAmount,
      interval: prices.interval,
      endedAt: subscriptions.endedAt,
      trialEnd: subscriptions.trialEnd,
      canceledAt: subscriptions.canceledAt,
      created: subscriptions.created,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      currentPeriodStart: subscriptions.currentPeriodStart,
      cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
    })
    .from(subscriptions)
    .leftJoin(prices, eq(prices.id, subscriptions.priceId))
    .leftJoin(products, eq(products.id, prices.productId))
    .where(eq(subscriptions.userId, user.id));

  return userSubs;
}
