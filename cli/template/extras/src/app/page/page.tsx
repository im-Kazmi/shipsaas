"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Navbar } from "~/components/navbar";
import AnimatedGradientText from "~/components/ui/animated-gradient-text";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <section className="min-w-screen relative flex min-h-screen flex-col items-center from-gray-50 to-gray-100 text-gray-900 dark:bg-black dark:text-gray-100">
      <Navbar />
      <div className="m-auto flex flex-col items-center px-4 py-16">
        <h1 className="max-w-[1120px] scroll-m-20 text-center text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          <AnimatedGradientText className="my-5">
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Introducing project1
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100">
            project1
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-[500px] text-center text-lg text-gray-700 sm:text-xl dark:text-gray-300">
          The Ultimate Next.js 15 Starter Kit for quickly building your SaaS,
          giving you time to focus on what really matters
        </p>
        <div className="mt-10">
          <RainbowButton>Get Started</RainbowButton>
        </div>
      </div>

      <Link
        className="absolute bottom-5 right-5"
        href="https://www.patreon.com/c/kazmi949/membership"
        target="_blank"
      >
        <button className="animate-gradient m-4 rounded-full bg-gradient-to-r from-rose-400 via-orange-400 to-purple-600 p-0.5">
          <span className="block rounded-full px-4 py-2 font-semibold text-white transition hover:backdrop-brightness-110">
            Support shipsaas ✨
          </span>
        </button>
      </Link>
    </section>
  );
}
