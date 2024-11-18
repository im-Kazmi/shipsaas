import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const uiPagesInstaller: Installer = ({ projectDir, packages }) => {
  const usingHono = packages?.hono.inUse;
  const usingserverActions = packages?.serverActions.inUse;
  const usingtrpc = packages?.trpc.inUse;

  const usingStripe = packages?.stripe.inUse;
  const usingLemon = packages?.lemon.inUse;

  const client = usingHono
    ? "hono"
    : usingserverActions
      ? "serveractions"
      : usingtrpc
        ? "trpc"
        : "";

  const payment = usingStripe ? "stripe" : usingLemon ? "lemon" : "";

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const postsPageDir = path.join(
    extrasDir,
    "src",
    "app",
    "posts-page",
    `with-${client}.tsx`
  );
  const postsPageDest = path.join(
    projectDir,
    "src",
    "app",
    "posts",
    "page.tsx"
  );

  const pricingPageDir = path.join(
    extrasDir,
    "src",
    "app",
    "pricing-page",
    `with-${client}-${payment}.tsx`
  );
  const pricingPageDest = path.join(
    projectDir,
    "src",
    "app",
    "pricing",
    "page.tsx"
  );

  const billingPageDir = path.join(
    extrasDir,
    "src",
    "app",
    "billing-page",
    `with-${client}.tsx`
  );
  const billingPageDest = path.join(
    projectDir,
    "src",
    "app",
    "dashboard",
    "billing",
    "page.tsx"
  );

  if (client) fs.copySync(postsPageDir, postsPageDest);
  if (payment) fs.copySync(pricingPageDir, pricingPageDest);
  if (payment) fs.copySync(billingPageDir, billingPageDest);
};
