import path from "path";
import fs from "fs-extra";

import {
  availablePackages,
  PkgInstallerMap,
  type Installer,
} from "~/installers/index.js";
import { ensureDirectoriesExist } from "~/utils/ensure-dir-exist.js";

export const packagesUsageInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const nonPackages = [
    "envVariables",
    "eslint",
    "dbContainer",
    "packagesUsage",
  ];
  const usedPackages = Object.values(availablePackages)
    .filter((v: keyof PkgInstallerMap) => packages?.[v].inUse)
    .filter((v) => !nonPackages.includes(v));

  fs.ensureFileSync(path.join(projectDir, "src", "lib", "constants.ts"));

  fs.writeFileSync(
    path.join(projectDir, "src", "lib", "constants.ts"),
    `export const usedPackages = [${usedPackages.map((p) => `"${p}"`)}]`
  );
};
