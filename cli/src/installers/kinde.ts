import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { writeToEnvFile } from "~/helpers/writeToEnvFile.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyMultipleFilesAndFolders } from "~/utils/copy.js";
import { ensureDirectoriesExist } from "~/utils/ensure-dir-exist.js";

const copyAuthFiles = (
  extrasDir: string,
  destinations: string[],
  appRouter: boolean
) => {
  const authFiles = [
    path.join(extrasDir, "src/auth/kinde/middleware.ts"),
    path.join(extrasDir, "src/app/api/auth/[kindeAuth]/route.ts"),
    path.join(extrasDir, "src/components/navbar/navbar-with-kinde.tsx"),
  ];

  copyMultipleFilesAndFolders(authFiles, destinations);
};

export const kindeInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["@kinde-oss/kinde-auth-nextjs"];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const appRouterPath = path.join(projectDir, "src/app");
  const pageRouterPath = path.join(projectDir, "src/pages");

  const appRouterDestinations = [
    path.join(projectDir, "src", "middleware.ts"),
    path.join(
      projectDir,
      "src",
      "app",
      "api",
      "auth",
      "[kindeAuth]",
      "route.ts"
    ),
    path.join(projectDir, "src", "components", "navbar.tsx"),
  ];

  const pageRouterDestinations = [
    path.join(projectDir, "src", "middleware.ts"),
    path.join(projectDir, "src", "app", "api", "auth", "[kindeAuth].ts"),
    path.join(projectDir, "src", "components", "navbar.tsx"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyAuthFiles(extrasDir, destinationPaths, appRouter!);

  writeToEnvFile(projectDir, "server", "KINDE_CLIENT_ID", "z.string()");
  writeToEnvFile(projectDir, "server", "KINDE_CLIENT_SECRET", "z.string()");
  writeToEnvFile(projectDir, "server", "KINDE_ISSUER_URL", "z.string()");

  writeToEnvFile(projectDir, "server", "KINDE_SITE_URL", "z.string()");
  writeToEnvFile(
    projectDir,
    "server",
    "KINDE_POST_LOGOUT_REDIRECT_URL",
    "z.string().optional()"
  );
  writeToEnvFile(
    projectDir,
    "server",
    "KINDE_POST_LOGIN_REDIRECT_URL",
    "z.string().optional()"
  );

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "KINDE_CLIENT_ID",
    "process.env.KINDE_CLIENT_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "KINDE_CLIENT_SECRET",
    "process.env.KINDE_CLIENT_SECRET"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "KINDE_ISSUER_URL",
    "process.env.KINDE_ISSUER_URL"
  );

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "KINDE_SITE_URL",
    "process.env.KINDE_SITE_URL"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "KINDE_POST_LOGOUT_REDIRECT_URL",
    "process.env.KINDE_POST_LOGOUT_REDIRECT_URL"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "KINDE_POST_LOGIN_REDIRECT_URL",
    "process.env.KINDE_POST_LOGIN_REDIRECT_URL"
  );
};
