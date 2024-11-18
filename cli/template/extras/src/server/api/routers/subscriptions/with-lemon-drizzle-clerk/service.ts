import { eq } from "drizzle-orm";

import { ContextType } from "~/server/api/trpc";
import { plans, subscriptions } from "~/server/db/schema";

export async function getUserSubscriptions(ctx: ContextType) {
  const userSubs = await ctx.db
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
      created: subscriptions.created,
    })
    .from(subscriptions)
    .leftJoin(plans, eq(plans.id, subscriptions.planId))
    .where(eq(subscriptions.userId, ctx?.session.userId!));

  return userSubs;
}
