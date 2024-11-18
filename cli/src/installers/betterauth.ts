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
  const usingPrisma = packages?.prisma.inUse;

  const authFiles = [
    // components folder
    path.join(extrasDir, "src/app/api/auth/[...all]/route.ts"),
    path.join(extrasDir, "src/auth/betterauth/components"),

    // lib files paths
    path.join(extrasDir, "src/lib/betterauth/auth-client.ts"),
    //
    usingDrizzle
      ? path.join(extrasDir, "src/lib/betterauth/auth-with-drizzle.ts")
      : path.join(extrasDir, "src/lib/betterauth/auth-with-prisma.ts"),

    path.join(extrasDir, "src/auth/betterauth/signin.tsx"),
    path.join(extrasDir, "src/auth/betterauth/signup.tsx"),
    path.join(extrasDir, "src/auth/betterauth/forgot.tsx"),
    path.join(extrasDir, "src/auth/betterauth/reset.tsx"),
    path.join(extrasDir, "src/auth/betterauth/middleware.ts"),
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

export const betterAuthInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["better-auth"];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const appRouterPath = path.join(projectDir, "src/app");
  const pageRouterPath = path.join(projectDir, "src/pages");

  const appRouterDestinations = [
    path.join(projectDir, "src", "app", "api", "auth", "[...all]", "route.ts"),
    path.join(projectDir, "src", "components"),

    path.join(projectDir, "src", "lib", "auth-client.ts"),
    path.join(projectDir, "src", "lib", "auth.ts"),

    path.join(appRouterPath, "(auth)", "sign-in", "page.tsx"),
    path.join(appRouterPath, "(auth)", "sign-up", "page.tsx"),
    path.join(appRouterPath, "(auth)", "forgot", "page.tsx"),
    path.join(appRouterPath, "(auth)", "reset", "page.tsx"),
    path.join(projectDir, "middleware.ts"),
  ];

  const pageRouterDestinations = [
    path.join(projectDir, "src", "components"),

    path.join(projectDir, "src", "lib", "auth-client.ts"),
    path.join(projectDir, "src", "lib", "auth.ts"),

    path.join(pageRouterPath, "sign-in", "index.tsx"),
    path.join(pageRouterPath, "sign-up", "index.tsx"),
    path.join(pageRouterPath, "forgot", "index.tsx"),
    path.join(pageRouterPath, "reset", "index.tsx"),
    path.join(projectDir, "src", "middleware.ts"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyAuthFiles(extrasDir, destinationPaths, appRouter!, packages);

  if (appRouter) {
    writeAppRouterLayout(appRouterPath);
  }

  writeToEnvFile(projectDir, "server", "BETTER_AUTH_SECRET", "z.string()");
  writeToEnvFile(projectDir, "server", "BETTER_AUTH_URL", "z.string()");
  writeToEnvFile(projectDir, "server", "GITHUB_CLIENT_ID", "z.string()");
  writeToEnvFile(projectDir, "server", "GITHUB_CLIENT_SECRET", "z.string()");
  writeToEnvFile(projectDir, "server", "GOOGLE_CLIENT_SECRET", "z.string()");
  writeToEnvFile(
    projectDir,
    "client",
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    "z.string()"
  );

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "BETTER_AUTH_SECRET",
    "process.env.BETTER_AUTH_SECRET"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "BETTER_AUTH_URL",
    "process.env.BETTER_AUTH_URL"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "GITHUB_CLIENT_ID",
    "process.env.GITHUB_CLIENT_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "GOOGLE_CLIENT_SECRET",
    "process.env.GOOGLE_CLIENT_SECRET"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    "process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID"
  );
};
