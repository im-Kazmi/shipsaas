import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
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
    // lib files paths
    path.join(extrasDir, "src/lib/customauth"),

    // pages path
    path.join(extrasDir, "src/auth/customauth"),
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

export const customAuthInstaller: Installer = ({
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
    path.join(projectDir, "src", "lib"),

    path.join(appRouterPath, "(auth)"),
  ];

  const pageRouterDestinations = [
    path.join(projectDir, "src", "lib"),

    path.join(pageRouterPath, "(auth)"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyAuthFiles(extrasDir, destinationPaths, appRouter!, packages);

  if (appRouter) {
    // writeAppRouterLayout(appRouterPath);
  }
};
