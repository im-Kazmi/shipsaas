import { eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "~/server/db";
import { prices, products } from "~/server/db/schema";

const app = new Hono().get("/", async (c) => {
  const data = await db
    .select()
    .from(products)
    .leftJoin(prices, eq(products.id, prices.productId));

  if (!data) {
    return c.json({ error: "products not found" }, 404);
  }

  return c.json(data, 200);
});

export default app;
