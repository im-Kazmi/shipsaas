import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Space_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <ClerkProvider>{children}</ClerkProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
