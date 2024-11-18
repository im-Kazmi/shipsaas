"use client";

import { Folder, HomeIcon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden h-full border-r lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[55px] w-full items-center justify-between border-b px-3">
            <Link
              className="ml-1 flex items-center gap-2 font-semibold"
              href="/"
            >
              <span className="">Project</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/dashboard",
                  }
                )}
                href="/dashboard"
              >
                <div className="rounded-lg border border-gray-400 bg-white p-1 dark:border-gray-800 dark:bg-black">
                  <HomeIcon className="h-3 w-3" />
                </div>
                Home
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/dashboard/billing",
                  }
                )}
                href="/dashboard/billing"
              >
                <div className="rounded-lg border border-gray-400 bg-white p-1 dark:border-gray-800 dark:bg-black">
                  <Folder className="h-3 w-3" />
                </div>
                Billing
              </Link>
              <Separator className="my-3" />
              <Link
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === "/dashboard/settings",
                  }
                )}
                href="/dashboard/settings"
                id="onboarding"
              >
                <div className="mt-auto rounded-lg border border-gray-400 bg-white p-1 dark:border-gray-800 dark:bg-black">
                  <Settings className="h-3 w-3" />
                </div>
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <main className="flex flex-col gap-4 p-4 lg:gap-6">{children}</main>
    </div>
  );
}
