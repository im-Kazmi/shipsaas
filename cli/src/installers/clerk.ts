import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { writeToEnvFile } from "~/helpers/writeToEnvFile.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { PkgInstallerMap, type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyMultipleFilesAndFolders } from "~/utils/copy.js";
import { ensureDirectoriesExist } from "~/utils/ensure-dir-exist.js";

const copyAuthFiles = (
  extrasDir: string,
  destinations: string[],
  appRouter: boolean,
  packages: PkgInstallerMap | undefined
) => {
  const usingDrizzle = packages?.drizzle.inUse;

  const db = usingDrizzle ? "drizzle" : "prisma";
  const authFiles = [
    path.join(extrasDir, "src/auth/clerk/sign-in/page.tsx"),
    path.join(extrasDir, "src/auth/clerk/sign-up/page.tsx"),
    path.join(extrasDir, "src/auth/clerk/forgot/page.tsx"),
    path.join(extrasDir, "src/auth/clerk/middleware.ts"),
    appRouter
      ? path.join(extrasDir, `src/webhooks/with-${db}-clerk.ts`)
      : path.join(extrasDir, `src/webhooks/with-${db}-clerk.ts`),
  ];

  copyMultipleFilesAndFolders(authFiles, destinations);
};

// Helper function to write the Auth layout file
const writeAppRouterLayout = (appRouterPath: string) => {
  const appRouterAuthLayout = `
import React from 'react'

const AuthLayout = ({ children }:{ children:React.ReactNode }) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {children}
    </div>
  )
}

export default AuthLayout`;

  fs.writeFileSync(
    path.join(appRouterPath, "(auth)", "layout.tsx"),
    appRouterAuthLayout
  );
};

export const clerkInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const usingHono = packages?.hono.inUse;

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["@clerk/nextjs", "svix"];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const appRouterPath = path.join(projectDir, "src/app");
  const pageRouterPath = path.join(projectDir, "src/pages");

  const appRouterDestinations = [
    path.join(appRouterPath, "(auth)", "sign-in", "[[...sign-in]]", "page.tsx"),
    path.join(appRouterPath, "(auth)", "sign-up", "[[...sign-up]]", "page.tsx"),
    path.join(appRouterPath, "(auth)", "forgot", "page.tsx"),
    path.join(projectDir, "src", "middleware.ts"),
    path.join(appRouterPath, "api/webhooks/clerk/route.ts"),
  ];

  const pageRouterDestinations = [
    path.join(pageRouterPath, "sign-in", "[[...index]].tsx"),
    path.join(pageRouterPath, "sign-up", "[[...index]].tsx"),
    path.join(pageRouterPath, "forgot", "index.tsx"),
    path.join(projectDir, "src", "middleware.ts"),
    path.join(pageRouterPath, "api/webhooks/clerk.ts"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyAuthFiles(extrasDir, destinationPaths, appRouter!, packages);

  if (appRouter) {
    writeAppRouterLayout(appRouterPath);
  }

  writeToEnvFile(projectDir, "server", "CLERK_SECRET_KEY", "z.string()");
  if (usingHono) {
    writeToEnvFile(projectDir, "server", "CLERK_PUBLISHABLE_KEY", "z.string()");
  }

  writeToEnvFile(
    projectDir,
    "client",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "z.string()"
  );
  writeToEnvFile(
    projectDir,
    "client",
    "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
    "z.string().optional()"
  );
  writeToEnvFile(
    projectDir,
    "client",
    "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
    "z.string().optional()"
  );
  writeToEnvFile(
    projectDir,
    "client",
    "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
    "z.string().optional()"
  );
  writeToEnvFile(
    projectDir,
    "client",
    "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
    "z.string().optional()"
  );

  if (usingHono) {
    writeToEnvFile(
      projectDir,
      "runtimeEnv",
      "CLERK_PUBLISHABLE_KEY",
      "process.env.CLERK_PUBLISHABLE_KEY"
    );
  }

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "CLERK_SECRET_KEY",
    "process.env.CLERK_SECRET_KEY"
  );
};
