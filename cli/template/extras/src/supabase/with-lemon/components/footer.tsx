import Link from "next/link";

import GitHub from "~/components/icons/GitHub";
import Logo from "~/components/icons/Logo";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6">
      <div className="grid grid-cols-1 gap-8 border-b border-neutral-700 py-12 text-white transition-colors duration-150 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="flex flex-initial items-center font-bold md:mr-24"
          >
            <span className="mr-2 rounded-full border">
              <Logo />
            </span>
            <span>ACME</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out"
              >
                About
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out"
              >
                Careers
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="font-bold text-white transition duration-150 ease-in-out">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="text-white transition duration-150 ease-in-out"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between space-y-4 py-12 text-white md:flex-row">
        <div>
          <span>
            &copy; {new Date().getFullYear()} ACME, Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
