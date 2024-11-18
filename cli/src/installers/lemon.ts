import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { writeToEnvFile } from "~/helpers/writeToEnvFile.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { PkgInstallerMap, type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyMultipleFilesAndFolders } from "~/utils/copy.js";
import { ensureDirectoriesExist } from "~/utils/ensure-dir-exist.js";
import { writeToPkgJson } from "~/utils/write-to-pkgjson.js";

const copyFiles = (
  extrasDir: string,
  destinations: string[],
  appRouter: boolean,
  packages: PkgInstallerMap | undefined
) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const usingLemon = packages?.lemon.inUse;
  const usingStripe = packages?.stripe.inUse;

  const usingServerActions = packages?.serverActions.inUse;
  const usingtRPC = packages?.trpc.inUse;
  const usingHono = packages?.hono.inUse;

  const usingnextAuth = packages?.nextAuth.inUse;
  const usingClerk = packages?.clerk.inUse;
  const usingKinde = packages?.kinde.inUse;
  const usingCustomauth = packages?.customauth.inUse;
  const usingBetterauth = packages?.betterauth.inUse;

  const auth = usingnextAuth
    ? "auth"
    : usingClerk
      ? "clerk"
      : usingCustomauth
        ? "customauth"
        : usingKinde
          ? "kinde"
          : usingBetterauth
            ? "betterauth"
            : "";

  const db = usingPrisma ? "prisma" : usingDrizzle ? "drizzle" : "";
  const apiClient = usingServerActions
    ? "serveractions"
    : usingHono
      ? "hono"
      : "";

  const srcFiles = [
    path.join(extrasDir, "src/lib/lemon"),
    db && path.join(extrasDir, `src/scripts/lemon/sync-plans-with-${db}.ts`),
    path.join(extrasDir, "src/webhooks/with-app-lemon.ts"),
    path.join(
      extrasDir,
      "src/utils/lemon",
      usingPrisma ? "with-prisma.ts" : "with-drizzle.ts"
    ),

    // // change this as soon as you implemented hono.js
    // apiClient &&
    //   path.join(
    //     extrasDir,
    //     "src/payments/lemon",
    //     `with-${auth}/with-${db}-${apiClient}.ts`
    //   ),
  ];

  copyMultipleFilesAndFolders(srcFiles, destinations);
};
export const lemonInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const deps: AvailableDependencies[] = ["@lemonsqueezy/lemonsqueezy.js"];

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const usingServerActions = packages?.serverActions.inUse;
  const usingtRPC = packages?.trpc.inUse;
  const usingHono = packages?.hono.inUse;

  const apiClient = usingServerActions
    ? "serveractions"
    : usingHono
      ? "hono"
      : "";

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const appRouterPath = path.join(projectDir, "src/app");
  const pageRouterPath = path.join(projectDir, "src/pages");

  const appRouterDestinations = [
    path.join(projectDir, "src/lib/lemon"),
    path.join(projectDir, "scripts/sync-plans.ts"),
    path.join(appRouterPath, "api/webhooks/lemon/route.ts"),
    path.join(projectDir, "src", "utils", "lemon", "index.ts"),
  ];

  // const pageRouterDestinations = [
  //   path.join(pageRouterPath, "api/webhooks/stripe.ts"),
  //   path.join(projectDir, "src", "utils", "stripe", "index.ts"),
  // ];

  // const destinationPaths = appRouter
  //   ? appRouterDestinations
  //   : pageRouterDestinations;

  ensureDirectoriesExist(appRouterDestinations);

  copyFiles(extrasDir, appRouterDestinations, appRouter!, packages);

  const packageJsonPath = path.join(projectDir, "package.json");

  writeToPkgJson(packageJsonPath, {
    "lemon:sync-plans": "ts-node scripts/sync-plans.ts",
  });

  writeToEnvFile(projectDir, "server", "LEMON_SQUEEZY_API_KEY", "z.string()");
  writeToEnvFile(projectDir, "server", "LEMON_SQUEEZY_STORE_ID", "z.any()");
  writeToEnvFile(
    projectDir,
    "server",
    "LEMON_SQUEEZY_WEBHOOK_SIGNING_SECRET",
    "z.string()"
  );

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "LEMON_SQUEEZY_API_KEY",
    "process.env.LEMON_SQUEEZY_API_KEY"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "LEMON_SQUEEZY_STORE_ID",
    "process.env.LEMON_SQUEEZY_STORE_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "LEMON_SQUEEZY_WEBHOOK_SIGNING_SECRET",
    "process.env.LEMON_SQUEEZY_WEBHOOK_SIGNING_SECRET"
  );
};
