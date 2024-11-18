import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Space_Mono } from "next/font/google";

import { QueryProvider } from "~/providers/query-provider";

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
      <QueryProvider>
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider>{children}</ClerkProvider>
          </ThemeProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
