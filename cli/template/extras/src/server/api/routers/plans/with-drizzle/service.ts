import { asc, eq } from "drizzle-orm";

import { ContextType } from "~/server/api/trpc";
import { plans } from "~/server/db/schema";

export async function getPlans(ctx: ContextType) {
  const allPlans = await ctx.db.select().from(plans).orderBy(asc(plans.sort));

  return allPlans ?? null;
}
