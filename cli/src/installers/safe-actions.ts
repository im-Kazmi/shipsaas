import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const nextSafeActionsInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;
  const usingLemon = packages?.lemon.inUse;
  const usingServerActions = packages?.serverActions.inUse;
  const usingSafeActions = packages?.safeActions.inUse;
  const usingnextAuth = packages?.nextAuth.inUse;

  const deps: AvailableDependencies[] = ["next-safe-action"];

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  let fileToCopy;

  if (
    appRouter &&
    usingnextAuth &&
    usingLemon &&
    usingServerActions &&
    usingDrizzle
  ) {
    fileToCopy = path.join(
      extrasDir,
      "src/server/api/actions/with-app-auth-drizzle-lemon-serveractions.ts"
    );
  } else if (
    appRouter &&
    usingnextAuth &&
    usingLemon &&
    usingServerActions &&
    usingPrisma
  ) {
    fileToCopy = path.join(
      extrasDir,
      "src/server/api/actions/with-app-auth-prisma-lemon-serveractions.ts"
    );
  }

  const distDir = path.join(projectDir, "src");
  const libDir = path.join(extrasDir, "src/lib/lemon");

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  if (fs.existsSync(fileToCopy!)) {
    fs.copySync(fileToCopy!, path.join(distDir, "/actions/payment.ts"));
    fs.copySync(libDir, path.join(distDir, "lib"));
  } else {
    console.error("File to copy does not exist.");
  }
};
