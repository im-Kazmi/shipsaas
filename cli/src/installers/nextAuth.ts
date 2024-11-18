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
  packages: PkgInstallerMap | undefined,
  appRouter: boolean
) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;
  const usingShadcn = packages?.shadcn.inUse;
  const usingNextUI = packages?.nextui.inUse;
  const usingtrpc = packages?.trpc.inUse;
  const usinghono = packages?.hono.inUse;
  const usingserverActions = packages?.serverActions.inUse;

  const client = usinghono
    ? "hono"
    : usingtrpc
      ? "trpc"
      : usingserverActions
        ? "serveractions"
        : "";
  const authFiles = [
    path.join(extrasDir, "src/app/api/auth/[...nextauth]/route.ts"),
    path.join(extrasDir, "src/auth/nextauth/(auth)/signin.tsx"),
    path.join(extrasDir, `src/auth/nextauth/(auth)/signup-with-${client}.tsx`),

    usingPrisma
      ? path.join(extrasDir, "src/auth/nextauth/config-with-prisma.ts")
      : usingDrizzle
        ? path.join(extrasDir, "src/auth/nextauth/config-with-drizzle.ts")
        : path.join(extrasDir, "src/auth/nextauth/base-config.ts"),

    usingPrisma
      ? path.join(extrasDir, "src/auth/nextauth/auth-with-prisma.ts")
      : usingDrizzle
        ? path.join(extrasDir, "src/auth/nextauth/auth-with-drizzle.ts")
        : "",
  ];

  copyMultipleFilesAndFolders(authFiles, destinations);
};

const writeAppRouterLayout = (appRouterPath: string) => {
  const appRouterAuthLayout = `
import React from 'react'

const AuthLayout = ({ children }:{ children:React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
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

export const nextAuthInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const deps: AvailableDependencies[] = ["@auth/core", "next-auth"];
  if (usingPrisma || usingDrizzle) deps.push("bcryptjs", "@types/bcryptjs");

  if (usingPrisma) deps.push("@auth/prisma-adapter");
  if (usingDrizzle) deps.push("@auth/drizzle-adapter");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const appRouterPath = path.join(projectDir, "src/app");
  const pageRouterPath = path.join(projectDir, "src/pages");

  const appRouterDestinations = [
    path.join(appRouterPath, "api", "auth", "[[...nextauth]]", "route.ts"),
    path.join(appRouterPath, "(auth)", "sign-in", "page.tsx"),
    path.join(appRouterPath, "(auth)", "sign-up", "page.tsx"),
    // path.join(projectDir, "middleware.ts"),
    path.join(projectDir, "src/auth-config.ts"),
    path.join(projectDir, "src/auth.ts"),
  ];

  const pageRouterDestinations = [
    path.join(pageRouterPath, "api", "auth", "[[...nextauth]]", "index.ts"),
    path.join(pageRouterPath, "sign-in", "[[...index]].tsx"),
    path.join(pageRouterPath, "sign-up", "[[...index]].tsx"),
    path.join(pageRouterPath, "forgot", "index.tsx"),
    path.join(projectDir, "src", "middleware.ts"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyAuthFiles(extrasDir, destinationPaths, packages, appRouter!);

  if (appRouter) {
    writeAppRouterLayout(appRouterPath);
  }

  writeToEnvFile(
    projectDir,
    "server",
    "AUTH_SECRET",
    `process.env.NODE_ENV === "production"
  ? z.string()
  : z.string().optional(),`
  );
  writeToEnvFile(projectDir, "server", "AUTH_URL", `z.string().optional()`);
  writeToEnvFile(projectDir, "server", "AUTH_GOOGLE_ID", "z.string()");
  writeToEnvFile(projectDir, "server", "AUTH_GOOGLE_SECRET", "z.string()");
  writeToEnvFile(projectDir, "server", "AUTH_GITHUB_ID", "z.string()");
  writeToEnvFile(projectDir, "server", "AUTH_GITHUB_SECRET", "z.string()");

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AUTH_SECRET",
    "process.env.AUTH_SECRET"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AUTH_GOOGLE_ID",
    "process.env.AUTH_GOOGLE_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AUTH_GOOGLE_SECRET",
    "process.env.AUTH_GOOGLE_SECRET"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AUTH_GITHUB_ID",
    "process.env.AUTH_GITHUB_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AUTH_GITHUB_SECRET",
    "process.env.AUTH_GITHUB_SECRET"
  );
};
