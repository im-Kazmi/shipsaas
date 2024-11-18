"use client";

import Link from "next/link";
import React, { useState } from "react";

import { RainbowButton } from "~/components/ui/rainbow-button";
import { authClient } from "~/lib/auth-client";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      });
      setIsSubmitted(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="mb-2 text-2xl font-bold">Check your email</h2>
              <p className="mb-4 text-gray-600">
                We've sent a password reset link to your email.
              </p>
              <div className="mb-4 border-l-4 border-blue-500 bg-blue-50 p-4 text-blue-700 dark:bg-neutral-800 dark:text-white">
                <div className="flex">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>If you don't see the email, check your spam folder.</p>
                </div>
              </div>
              <RainbowButton
                className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => setIsSubmitted(false)}
              >
                <svg
                  className="mr-2 inline-block h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to reset password
              </RainbowButton>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="mb-2 text-2xl font-bold">Forgot password</h2>
            <p className="mb-4 text-gray-600">
              Enter your email to reset your password
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && (
                <div className="mb-4 border-l-4 border-red-500 bg-red-100 p-4 text-red-700">
                  <div className="flex">
                    <svg
                      className="mr-2 h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>{error}</p>
                  </div>
                </div>
              )}
              <RainbowButton
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
              </RainbowButton>
            </form>
          </div>
          <div className="border-t px-6 py-4">
            <Link
              href="/sign-in"
              className="text-sm text-gray-600 hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
