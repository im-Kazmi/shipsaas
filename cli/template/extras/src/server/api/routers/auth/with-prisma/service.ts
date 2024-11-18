import bcrypt from "bcryptjs";

import { ContextType } from "~/server/api/trpc";
import { SignupInput } from "./input";

export async function signup(ctx: ContextType, input: SignupInput) {
  const { name, email, password } = input;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await ctx.db.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return "Email already in use";
  }

  await ctx.db.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
}
