"use server";

import { auth,clerkClient } from "@clerk/nextjs/server";

import { db } from "~/server/db";

export async function getUserSubscriptions() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You are not logged in.");
  }

  const userSubs = await db.subscription.findMany({
    where: {
      userId: userId,
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

  return userSubs.map((sub) => ({
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
  }));
}
