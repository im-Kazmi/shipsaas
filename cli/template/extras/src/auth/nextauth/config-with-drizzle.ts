import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import type { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { z } from "zod";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const query = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        const user = query[0];

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
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

    GitHub,
    Google,
    /**
     * ...add more providers here.
     * @see https://authjs.dev/getting-started/providers/github
     */
  ],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(
          new URL("/dashboard", nextUrl! as unknown as string)
        );
      }
      return true;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;
