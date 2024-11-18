import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { writeToEnvFile } from "~/helpers/writeToEnvFile.js";
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
    path.join(extrasDir, "src/app/api/uploadthing/core.ts"),
    path.join(extrasDir, "src/app/api/uploadthing/route.ts"),

    path.join(extrasDir, "src/lib/uploadthing/index.ts"),

    // upload page
    path.join(extrasDir, "src/fileuploads/with-uploadthing.tsx"),
  ];

  copyMultipleFilesAndFolders(files, destinations);
};

export const uploadthingInstaller: Installer = ({
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
    path.join(appRouterPath, "api", "uploadthing", "core.ts"),
    path.join(appRouterPath, "api", "uploadthing", "route.ts"),

    path.join(projectDir, "src", "lib", "uploadthing.ts"),

    path.join(projectDir, "src", "app", "upload", "page.tsx"),
  ];

  const pageRouterDestinations = [
    path.join(pageRouterPath, "api", "uploadthing", "core.ts"),
    path.join(pageRouterPath, "api", "uploadthing", "index.ts"),
    path.join(projectDir, "src", "lib", "uploadthing.ts"),

    path.join(projectDir, "src", "pages", "upload", "index.tsx"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyFiles(extrasDir, destinationPaths, appRouter!, packages);

  writeToEnvFile(projectDir, "server", "UPLOADTHING_SECRET", "z.string()");
  writeToEnvFile(projectDir, "server", "UPLOADTHING_APP_ID", "z.string()");

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "UPLOADTHING_APP_ID",
    "process.env.UPLOADTHING_APP_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "UPLOADTHING_SECRET",
    "process.env.UPLOADTHING_SECRET"
  );
};
