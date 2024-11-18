import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getProducts } from "./service";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx }) => {
    return getProducts(ctx);
  }),
});
