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

  const usingPayment = usingStripe ? "stripe" : usingLemon ? "lemon" : "";
  const sources = [
    path.join(
      extrasDir,
      `src/payments/with-serveractions/with-${auth}/post/with-${db}.ts`
    ),
    usingStripe &&
      path.join(
        extrasDir,
        `src/payments/with-serveractions/with-${auth}/subscriptions/with-stripe-${db}.ts`
      ),
    usingStripe &&
      path.join(
        extrasDir,
        `src/payments/with-serveractions/with-${auth}/checkout/with-stripe.ts`
      ),
    usingStripe &&
      path.join(
        extrasDir,
        `src/payments/with-serveractions/default/products/with-${db}.ts`
      ),
    usingLemon &&
      path.join(
        extrasDir,
        `src/payments/with-serveractions/with-${auth}/subscriptions/with-lemon-${db}.ts`
      ),
    usingLemon &&
      path.join(
        extrasDir,
        `src/payments/with-serveractions/with-${auth}/checkout/with-lemon.ts`
      ),
    usingLemon &&
      path.join(
        extrasDir,
        `src/payments/with-serveractions/default/plans/with-${db}.ts`
      ),
    usingnextAuth &&
      path.join(
        extrasDir,
        `src/payments/with-serveractions/with-auth/auth/with-${db}.ts`
      ),

    path.join(extrasDir, `src/components/with-serveractions/posts`),
    usingPayment &&
      path.join(
        extrasDir,
        `src/components/with-serveractions/checkout/checkout-button-with-${usingPayment}.tsx`
      ),
  ].filter(Boolean) as string[];

  copyMultipleFilesAndFolders(sources, destinations);
};

export const serverActionsInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["server-only"];

  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const usingStripe = packages?.stripe.inUse;
  const usingLemon = packages?.lemon.inUse;
  const usingnextAuth = packages?.nextAuth.inUse;
  const usingPayment = usingStripe ? "stripe" : usingLemon ? "lemon" : "";

  const appRouterDestinations = [
    path.join(projectDir, "src", "actions", "posts.ts"),
    usingStripe && path.join(projectDir, "src", "actions", "subscriptions.ts"),
    usingStripe && path.join(projectDir, "src", "actions", "checkout.ts"),
    usingStripe && path.join(projectDir, "src", "actions", "products.ts"),

    usingLemon && path.join(projectDir, "src", "actions", "subscriptions.ts"),
    usingLemon && path.join(projectDir, "src", "actions", "checkout.ts"),
    usingLemon && path.join(projectDir, "src", "actions", "plans.ts"),
    usingnextAuth && path.join(projectDir, "src", "actions", "auth.ts"),

    path.join(projectDir, `src/components/posts`),
    usingPayment &&
      path.join(projectDir, `src/components/checkout/checkout-button.tsx`),
  ].filter(Boolean) as string[];

  ensureDirectoriesExist(appRouterDestinations);
  copyFiles(extrasDir, appRouterDestinations, appRouter!, packages);
};
