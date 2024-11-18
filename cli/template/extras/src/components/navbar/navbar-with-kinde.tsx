"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import * as React from "react";

import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { user, getUser, isAuthenticated } = useKindeBrowserClient();
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
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={toggleMenu}
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
            {isMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg dark:bg-gray-800">
                <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {user.email}
                </p>
                <hr className="my-1 border-gray-200 dark:border-gray-600" />
                <LogoutLink>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                    Signout
                  </a>
                </LogoutLink>
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
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                <LoginLink>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Signin
                  </a>
                </LoginLink>
                <RegisterLink>
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Signup
                  </a>
                </RegisterLink>
              </div>
            )}
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
