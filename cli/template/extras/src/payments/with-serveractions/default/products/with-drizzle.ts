"use server";

import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { prices, products } from "~/server/db/schema";

export async function getAllPlans() {
  const data = await db
    .select()
    .from(products)
    .leftJoin(prices, eq(products.id, prices.productId));

  return data;
}
