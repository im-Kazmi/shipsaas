"use server";

import { auth } from "~/auth";
import { db } from "~/server/db";

export async function getUserSubscriptions() {
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not logged in.");
  }

  const userSubs = await db.subscription.findMany({
    where: {
      userId: session.user.id,
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
