import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { Toaster } from "~/components/ui/Toasts/toaster";
import { getURL } from "~/utils/helpers";

import "styles/main.css";

import { Space_Grotesk } from "next/font/google";

const title = "Next.js Subscription Starter";
const description = "Brought to you by Vercel, Stripe, and Supabase.";

const font = Space_Grotesk({ weight: "variable", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`bg-neutral-900 ${font.className}`}>
        <Navbar />
        <main
          id="skip"
          className="md:min-h[calc(100dvh-5rem)] min-h-[calc(100dvh-4rem)]"
        >
          {children}
        </main>
        <Footer />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
