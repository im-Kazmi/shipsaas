import { eq } from "drizzle-orm";

import { ContextType } from "~/server/api/trpc";
import { prices, products } from "~/server/db/schema";

export async function getProducts(ctx: ContextType) {
  const prods = await ctx.db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      image: products.image,
      metadata: products.metadata,
      price: prices,
    })
    .from(products)
    .leftJoin(prices, eq(products.id, prices.productId));

  return prods ?? null;
}
