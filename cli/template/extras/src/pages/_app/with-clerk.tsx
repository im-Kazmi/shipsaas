import "~/styles/globals.css";

import { AppProps } from "next/app";
import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from "geist/font/sans";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};
export default MyApp;
