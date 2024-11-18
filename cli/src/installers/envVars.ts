import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type DatabaseProvider, type Installer } from "~/installers/index.js";

export const envVariablesInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
  scopedAppName,
}) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const usingDb = usingPrisma || usingDrizzle;
  const usingPlanetScale = databaseProvider === "planetscale";

  let envFile = "base.js";

  const envSchemaSrc = path.join(PKG_ROOT, "template/extras/src/env", envFile);
  const envSchemaDest = path.join(projectDir, "src/env.js");
  fs.copyFileSync(envSchemaSrc, envSchemaDest);

  const envDest = path.join(projectDir, ".env");

  fs.createFileSync(envDest);
};
