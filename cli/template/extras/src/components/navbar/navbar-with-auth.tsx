"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
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
        <div className="ml-auto flex">
          {isAuthenticated && session ? (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-1 text-sm focus:outline-none"
              >
                <img
                  className="size-8 rounded-full ring-2"
                  src={session.user?.image ?? ""}
                />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 flex flex-col rounded-md border border-neutral-800 py-1 shadow-lg *:px-5 *:py-2">
                  <p className="px-4 py-2 text-sm text-gray-700">
                    {session.user?.email}
                  </p>
                  <button onClick={() => signOut()}>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Signout
                    </a>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-1 text-sm focus:outline-none"
              >
                <span>Get Started</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 flex w-48 flex-col rounded-md border border-neutral-800 py-1 shadow-lg *:px-5 *:py-2">
                  <Link href="/sign-in" className="">
                    Signin
                  </Link>
                  <Link href="/sign-up">Signup</Link>
                </div>
              )}
            </div>
          )}
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
};
