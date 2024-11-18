import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { type Adapter } from "next-auth/adapters";

import { db } from "~/server/db";
import { authConfig } from "./auth-config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET, // you can remove this if you have added env variable
  // with the name 'AUTH_SECRET'. Auth.js will automatically detect it.
  ...authConfig,
});
