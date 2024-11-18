import bcrypt from "bcryptjs";
import { desc, eq } from "drizzle-orm";

import { ContextType } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { SignupInput } from "./input";

export async function signup(ctx: ContextType, input: SignupInput) {
  const { name, email, password } = input;

  const hashedPassword = await bcrypt.hash(password, 12);

  const query = await ctx.db.select().from(users).where(eq(users.email, email));

  if (query[0]) {
    return "Email already in use";
  }

  await ctx.db.insert(users).values({
    email,
    name,
    password: hashedPassword,
  });
}
