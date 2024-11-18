import { Hono } from "hono";

import { db } from "~/server/db";

const app = new Hono().get("/", async (c) => {
  const prods = await db.product.findMany({
    include: {
      prices: true,
    },
  });
  const normalizedData = prods.map((prod) => ({
    ...prod,
    products: {
      name: prod.name,
      active: prod.active,
      id: prod.id,
      image: prod.image,
      description: prod.description,
      metadata: prod.metadata,
    },
    prices: prod.prices[0] || null,
  }));

  return c.json(normalizedData, 200);
});

export default app;
