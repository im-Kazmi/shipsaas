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

  const usingStripe = packages?.stripe.inUse;

  const usingServerActions = packages?.serverActions.inUse;
  const usingtRPC = packages?.trpc.inUse;

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

  const srcFiles = [
    path.join(extrasDir, "src/lib/stripe/index.ts"),
    path.join(extrasDir, "src/others/fixtures/stripe-fixtures.json"),
    path.join(extrasDir, "src/webhooks/with-app-stripe.ts"),
    path.join(
      extrasDir,
      "src/utils/stripe",
      usingPrisma ? "with-prisma.ts" : "with-drizzle.ts"
    ),
  ];

  copyMultipleFilesAndFolders(srcFiles, destinations);
};

export const stripeInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const usingServerActions = packages?.serverActions.inUse;
  const usingtRPC = packages?.trpc.inUse;
  const usingHono = packages?.trpc.inUse;

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["stripe"];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const appRouterPath = path.join(projectDir, "src/app");
  const pageRouterPath = path.join(projectDir, "src/pages");

  const appRouterDestinations = [
    path.join(projectDir, "src/lib/stripe.ts"),
    path.join(projectDir, "fixtures/stripe-fixtures.json"),
    path.join(appRouterPath, "api/webhooks/stripe/route.ts"),
    path.join(projectDir, "src", "utils", "stripe", "index.ts"),
  ];

  const pageRouterDestinations = [
    path.join(pageRouterPath, "api/webhooks/stripe.ts"),
    path.join(projectDir, "src", "utils", "stripe", "index.ts"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyFiles(extrasDir, destinationPaths, appRouter!, packages);

  const packageJsonPath = path.join(projectDir, "package.json");

  writeToPkgJson(packageJsonPath, {
    "stripe:login": "stripe login",
    "stripe:fixtures": "stripe fixtures fixtures/stripe-fixtures.json",
    "stripe:listen":
      "stripe listen --forward-to=localhost:3000/api/webhooks/stripe",
  });

  writeToEnvFile(projectDir, "server", "STRIPE_SECRET_KEY", "z.string()");
  writeToEnvFile(projectDir, "server", "STRIPE_WEBHOOK_SECRET", "z.string()");
  writeToEnvFile(
    projectDir,
    "client",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "z.string()"
  );

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "STRIPE_SECRET_KEY",
    "process.env.STRIPE_SECRET_KEY"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "STRIPE_WEBHOOK_SECRET",
    "process.env.STRIPE_WEBHOOK_SECRET"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  );
};
