import { ContextType } from "~/server/api/trpc";

export async function getPlans(ctx: ContextType) {
  const plans = await ctx.db.plans.findMany({
    orderBy: {
      sort: "asc",
    },
  });

  return plans ?? null;
}
