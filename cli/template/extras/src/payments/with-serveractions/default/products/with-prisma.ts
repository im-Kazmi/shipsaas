"use server";

import { db } from "~/server/db";

export async function getAllPlans() {
  const prods = await db.product.findMany({
    include: {
      prices: true,
    },
  });
  const normalizedData = prods.map((prod) => ({
    ...prod,
    price: prod.prices[0] || null,
  }));

  return normalizedData;
}
