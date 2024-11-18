"use client";

import Link from "next/link";
import * as React from "react";

export function Navbar() {
  return (
    <div className="container mx-auto">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/">
          <p className="text-md flex items-center tracking-tighter lg:text-xl">
            project1
          </p>
        </Link>
        <div className="ml-auto flex gap-x-3">
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
      </div>
    </div>
  );
}
