import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from '@clerk/nextjs'
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
