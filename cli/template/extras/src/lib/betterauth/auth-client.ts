import {
  adminClient,
  multiSessionClient,
  oneTapClient,
  organizationClient,
  passkeyClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", // the base url of your auth server
  plugins: [
    organizationClient(),
    twoFactorClient({
      redirect: true,
      twoFactorPage: "/two-factor",
    }),
    passkeyClient(),
    adminClient(),
    multiSessionClient(),
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    }),
  ],
  fetchOptions: {
    onError(e) {
      console.log(e);
    },
  },
});

export type Session = authClient.$Infer.Session;

export const { signIn, signUp, useSession, signOut } = createAuthClient();
