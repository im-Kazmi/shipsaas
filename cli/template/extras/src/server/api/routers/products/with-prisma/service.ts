import { ContextType } from "~/server/api/trpc";

export async function getProducts(ctx: ContextType) {
  const prods = await ctx.db.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      metadata: true,
      prices: {
        select: {
          id: true,
          unitAmount: true,
          currency: true,
          interval: true,
        },
      },
    },
  });

  return prods ?? null;
}
