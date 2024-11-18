import "~/styles/globals.css";

import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";
import { Space_Mono } from "next/font/google";
import Head from "next/head";

const font = Space_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "project1",
  description: "project1. boilerplated by shipsaas.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN!} />
      </Head>
      <body className={font.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
