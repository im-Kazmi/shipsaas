import Link from "next/link";
import * as React from "react";

import { assertAuthenticated } from "~/lib/session";
import { ThemeToggle } from "./theme-toggle";

export async function Navbar() {
  const user = await assertAuthenticated();

  return (
    <div className="container mx-auto">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/">
          <p className="text-md flex items-center tracking-tighter lg:text-xl">
            project1
          </p>
        </Link>
        {user ? (
          <div className="relative">
            <button
              // onClick={toggleMenu}
              className="flex items-center space-x-1 text-sm focus:outline-none"
            >
              <span>You are logged in as {user.given_name}</span>
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
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
              <p className="px-4 py-2 text-sm text-gray-700">{user.email}</p>
              <hr className="my-1" />
              <button>Signout</button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <button
              // onClick={toggleMenu}
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
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
              <Link href="/signin">Signin</Link>
              <Link href="signup">Signup</Link>
            </div>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
