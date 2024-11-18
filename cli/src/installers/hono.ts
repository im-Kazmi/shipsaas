import path from "path";

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
  const usingPrisma = packages?.prisma.inUse;
  const usingStripe = packages?.stripe.inUse;
  const usingLemon = packages?.lemon.inUse;

  const usingnextAuth = packages?.nextAuth.inUse;
  const usingClerk = packages?.clerk.inUse;
  const usingKinde = packages?.kinde.inUse;
  const usingCustomauth = packages?.customauth.inUse;
  const usingBetterauth = packages?.betterauth.inUse;

  const kindeOrBetter = usingKinde
    ? "kinde"
    : usingBetterauth
      ? "betterauth"
      : "";

  const db = usingPrisma ? "prisma" : "drizzle";

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

  const baseRouterFile =
    usingnextAuth && usingStripe
      ? path.join(extrasDir, `src/hono/route/with-auth-stripe.ts`)
      : usingnextAuth && usingLemon
        ? path.join(extrasDir, `src/hono/route/with-auth-lemon.ts`)
        : usingnextAuth
          ? path.join(extrasDir, `src/hono/route/with-auth.ts`)
          : usingLemon
            ? path.join(extrasDir, `src/hono/route/with-lemon.ts`)
            : usingStripe
              ? path.join(extrasDir, `src/hono/route/with-stripe.ts`)
              : path.join(extrasDir, `src/hono/route/base.ts`);

  // Define `sources` and `destinations` together, ensuring matching length
  const sources = [
    path.join(extrasDir, `src/hono/queryprovider.tsx`),
    path.join(extrasDir, `src/lib/hono/client.ts`),
    kindeOrBetter &&
      path.join(extrasDir, `src/hono/middleware-with-${kindeOrBetter}.ts`),
    baseRouterFile,
    path.join(
      extrasDir,
      `src/payments/with-hono/with-${auth}/post/with-${db}.ts`
    ),
    usingStripe &&
      path.join(
        extrasDir,
        `src/payments/with-hono/with-${auth}/subscriptions/with-stripe-${db}.ts`
      ),
    usingStripe &&
      path.join(
        extrasDir,
        `src/payments/with-hono/with-${auth}/checkout/with-stripe.ts`
      ),
    usingStripe &&
      path.join(
        extrasDir,
        `src/payments/with-hono/default/products/with-${db}.ts`
      ),
    usingLemon &&
      path.join(
        extrasDir,
        `src/payments/with-hono/with-${auth}/subscriptions/with-lemon-${db}.ts`
      ),
    usingLemon &&
      path.join(
        extrasDir,
        `src/payments/with-hono/with-${auth}/checkout/with-lemon.ts`
      ),
    usingLemon &&
      path.join(
        extrasDir,
        `src/payments/with-hono/default/plans/with-${db}.ts`
      ),
    usingnextAuth &&
      usingLemon &&
      path.join(
        extrasDir,
        `src/payments/with-hono/with-auth/auth/with-${db}.ts`
      ),
  ].filter(Boolean) as string[]; // Remove any `false` entries

  copyMultipleFilesAndFolders(sources, destinations);
};

export const honoInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = [
    "hono",
    "@tanstack/react-query",
    "@tanstack/react-query-next-experimental",
    "@hono/zod-validator",
  ];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const usingKinde = packages?.kinde.inUse;
  const usingCustomauth = packages?.customauth.inUse;
  const usingBetterauth = packages?.betterauth.inUse;

  const usingStripe = packages?.stripe.inUse;
  const usingLemon = packages?.lemon.inUse;
  const usingnextAuth = packages?.nextAuth.inUse;
  const usingClerk = packages?.clerk.inUse;

  if (usingnextAuth) deps.push("@hono/auth-js");
  if (usingClerk) deps.push("@hono/clerk-auth");

  const appRouterPath = path.join(projectDir, "src/app");

  const routesPath = path.join(appRouterPath, "api", "[[...route]]");

  const kindeOrBetter = usingKinde
    ? "kinde"
    : usingBetterauth
      ? "betterauth"
      : "";

  const appRouterDestinations = [
    path.join(projectDir, `src/providers/query-provider.tsx`),
    path.join(projectDir, `src/lib/client.ts`),
    kindeOrBetter && path.join(appRouterPath, "api/middleware.ts"),
    path.join(routesPath, "route.ts"),
    path.join(routesPath, "posts.ts"),
    usingStripe && path.join(routesPath, "subscriptions.ts"),
    usingStripe && path.join(routesPath, "checkout.ts"),
    usingStripe && path.join(routesPath, "products.ts"),
    usingLemon && path.join(routesPath, "subscriptions.ts"),
    usingLemon && path.join(routesPath, "checkout.ts"),
    usingLemon && path.join(routesPath, "plans.ts"),
    usingnextAuth && path.join(routesPath, "auth.ts"),
  ].filter(Boolean) as string[];

  ensureDirectoriesExist(appRouterDestinations);
  copyFiles(extrasDir, appRouterDestinations, appRouter!, packages);
};
