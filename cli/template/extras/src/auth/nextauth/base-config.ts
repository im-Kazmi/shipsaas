import type { DefaultSession } from "@auth/core/types";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends NextAuthConfig {
    user: {
      id: string;
      // role: UserRole;
    } & DefaultSession;
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  /* ------------------------------------------------------------------------------- */
  /*  please add env variables as
        AUTH_GITHUB_ID=abc
        AUTH_GITHUB_SECRET=abc
            or
        AUTH_GOOGLE_ID=abc
        AUTH_GOOGLE_SECRET=abc

        so that nextauth can detect it automatically otherwise you
        have to pass it manually.
    */
  /* ------------------------------------------------------------------------------- */

  providers: [GitHub, Google],
} satisfies NextAuthConfig;
