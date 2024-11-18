import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { signupSchema } from "./input";
import { signup } from "./service";

export const authRouter = createTRPCRouter({
  signup: protectedProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      return signup(ctx, input);
    }),
});
