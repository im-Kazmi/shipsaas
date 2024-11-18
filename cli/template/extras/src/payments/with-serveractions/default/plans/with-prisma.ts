"use server";

import { asc } from "drizzle-orm";

import { db } from "~/server/db";
import { plans } from "~/server/db/schema";

export async function getAllPlans() {
  const allPlans = await db.plans.findMany({
    orderBy: { sort: "asc" },
  });
  return allPlans;
}
