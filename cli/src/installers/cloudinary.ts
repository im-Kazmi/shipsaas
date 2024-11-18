import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { PkgInstallerMap, type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyMultipleFilesAndFolders } from "~/utils/copy.js";
import { ensureDirectoriesExist } from "~/utils/ensure-dir-exist.js";

const copyFiles = (
  extrasDir: string,
  destinations: string[],
  appRouter: boolean,
  packages: PkgInstallerMap | undefined
) => {
  const files = [
    path.join(extrasDir, "src/app/api/sign-cloudinary-params/route.ts"),

    path.join(extrasDir, "src/fileuploads/with-cloudinary.tsx"),
  ];

  copyMultipleFilesAndFolders(files, destinations);
};

export const cloudinaryInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["uploadthing", "@uploadthing/react"];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const appRouterPath = path.join(projectDir, "src/app");
  const pageRouterPath = path.join(projectDir, "src/pages");

  const appRouterDestinations = [
    path.join(appRouterPath, "api", "sign-cloudinary-params", "route.ts"),
    path.join(appRouterPath, "upload", "page.tsx"),
  ];

  const pageRouterDestinations = [
    path.join(pageRouterPath, "api", "sign-cloudinary-params", "index.ts"),
    path.join(pageRouterPath, "upload", "index.tsx"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyFiles(extrasDir, destinationPaths, appRouter!, packages);
};
