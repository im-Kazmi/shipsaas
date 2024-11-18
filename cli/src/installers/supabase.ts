import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { AvailablePackages, type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const supabaseInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const deps: AvailableDependencies[] = [
    "@supabase/supabase-js",
    "@supabase/ssr",
  ];

  const usingLemon = packages?.lemon.inUse;
  const usingStripe = packages?.stripe.inUse;

  if (usingLemon) {
    deps.push("@lemonsqueezy/lemonsqueezy.js");
  }
  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  let folderToCopy = "";

  if (usingLemon) {
    folderToCopy = path.join(extrasDir, "src/supabase/with-lemon");
  }else if(usingStripe){
    folderToCopy = path.join(extrasDir, "src/supabase/with-stripe");
  }

  fs.copySync(folderToCopy!, path.join(projectDir, "src"));
};
