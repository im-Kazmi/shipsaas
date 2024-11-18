import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getPlans } from "./service";

export const plansRouter = createTRPCRouter({
  getPlans: publicProcedure.query(async ({ ctx }) => {
    return getPlans(ctx);
  }),
});
