import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { writeToEnvFile } from "~/helpers/writeToEnvFile.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { AvailablePackages, type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const posthogInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const deps: AvailableDependencies[] = ["posthog-js", "posthog-node"];

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const providersrc = path.join(
    extrasDir,
    "src/analytics/posthog/provider.tsx"
  );
  const providerDest = path.join(
    projectDir,
    "src/providers/posthog-provider.tsx"
  );
  const pageViewComponentsrc = path.join(
    extrasDir,
    "src/analytics/posthog/posthog-pageview.tsx"
  );
  const pageViewComponentDest = path.join(
    projectDir,
    "src/providers/posthog-pageview.tsx"
  );
  const posthogServerclientsrc = path.join(
    extrasDir,
    "src/analytics/posthog/client.ts"
  );
  const posthogServerclientdest = path.join(
    projectDir,
    "src/lib/posthog-server-client.ts"
  );

  fs.copySync(providersrc, providerDest);
  fs.copySync(posthogServerclientsrc, posthogServerclientdest);

  writeToEnvFile(projectDir, "client", "NEXT_PUBLIC_POSTHOG_KEY", "z.string()");
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "NEXT_PUBLIC_POSTHOG_KEY",
    `process.env.NEXT_PUBLIC_POSTHOG_KEY`
  );

  writeToEnvFile(projectDir, "client", "NEXT_PUBLIC_POSTHOG_KEY", "z.string()");
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "NEXT_PUBLIC_POSTHOG_KEY",
    `process.env.NEXT_PUBLIC_POSTHOG_KEY`
  );
};
