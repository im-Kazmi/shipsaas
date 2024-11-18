import { ContextType } from "~/server/api/trpc";

export async function getUserSubscriptions(ctx: ContextType) {
  const userSubs = await ctx.db.subscription.findMany({
    where: {
      userId: ctx.session.user.id!,
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
