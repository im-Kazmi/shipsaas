import "~/styles/globals.css";

import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Space_Mono } from "next/font/google";

import { PostHogProvider } from "~/providers/posthog-provider";

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
      <body className={font.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PostHogProvider>{children}</PostHogProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
