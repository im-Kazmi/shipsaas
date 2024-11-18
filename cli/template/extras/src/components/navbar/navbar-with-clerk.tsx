"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import * as React from "react";

import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <div className="container mx-auto">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/">
          <p className="text-md flex items-center tracking-tighter lg:text-xl">
            project1
          </p>
        </Link>
        <div className="ml-12 flex gap-x-3">
          <Link href="/posts" className="">
            Posts
          </Link>
          <Link href="/pricing" className="">
            Pricing
          </Link>
          <Link href="/dashboard" className="">
            Dashboard
          </Link>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link
            href="sign-in"
            className="flex items-center space-x-1 text-sm focus:outline-none"
          >
            <span>Sign in</span>
          </Link>
        </SignedOut>
        <ThemeToggle />
      </div>
    </div>
  );
}
