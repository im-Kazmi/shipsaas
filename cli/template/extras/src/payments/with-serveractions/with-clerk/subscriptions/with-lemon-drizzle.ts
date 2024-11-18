'use server'

import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'

import { db } from '~/server/db'
import { plans, subscriptions } from '~/server/db/schema'

export async function getUserSubscriptions() {
  const { userId } = auth()
  if (!userId) {
    throw new Error('You are not logged in.')
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
    .where(eq(subscriptions.userId, userId))

  return userSubs
}
