import { ContextType } from "~/server/api/trpc";

export async function getUserSubscriptions(ctx: ContextType) {
  const userSubs = await ctx.db.subscription.findMany({
    where: {
      userId: ctx?.session.userId!,
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
    created: subscription.created,
  }));
}
