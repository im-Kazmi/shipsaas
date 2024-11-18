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
    // Lib files
    path.join(extrasDir, "src/lib/R2/index.ts"),

    // TODO: Pages goes here
  ];

  copyMultipleFilesAndFolders(files, destinations);
};

export const cloudflareR2Installer: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["uploadthing", "@uploadthing/react"];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const appRouterDestinations = [path.join(projectDir, "src", "lib", "R2.ts")];

  const pageRouterDestinations = [path.join(projectDir, "src", "lib", "R2.ts")];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyFiles(extrasDir, destinationPaths, appRouter!, packages);

  writeToEnvFile(
    projectDir,
    "server",
    "CLOUDFLARE_ACCESS_KEY_ID",
    "z.string()"
  );
  writeToEnvFile(projectDir, "server", "CLOUDFLARE_ACCOUNT_ID", "z.string()");
  writeToEnvFile(
    projectDir,
    "server",
    "CLOUDFLARE_SECRET_ACCESS_KEY",
    "z.string()"
  );
  writeToEnvFile(projectDir, "server", "CLOUDFLARE_BUCKET_NAME", "z.string()");

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "CLOUDFLARE_ACCOUNT_ID",
    "process.env.CLOUDFLARE_ACCOUNT_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "CLOUDFLARE_ACCESS_KEY_ID",
    "process.env.CLOUDFLARE_ACCESS_KEY_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "CLOUDFLARE_SECRET_ACCESS_KEY",
    "process.env.CLOUDFLARE_SECRET_ACCESS_KEY"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "CLOUDFLARE_BUCKET_NAME",
    "process.env.CLOUDFLARE_BUCKET_NAME"
  );
};
