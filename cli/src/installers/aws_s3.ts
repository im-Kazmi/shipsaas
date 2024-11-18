import path from "path";

import { PKG_ROOT } from "~/consts.js";
import { writeToEnvFile } from "~/helpers/writeToEnvFile.js";
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
  const files = [
    path.join(extrasDir, "src/lib/s3/index.ts"),
    path.join(extrasDir, "src/app/api/fileupload/s3.ts"),
    path.join(extrasDir, "src/fileuploads/with-s3.tsx"),
  ];

  copyMultipleFilesAndFolders(files, destinations);
};

export const awsS3Installer: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const deps: AvailableDependencies[] = ["uploadthing", "@uploadthing/react"];
  addPackageDependency({ projectDir, dependencies: deps, devMode: false });

  const appRouterDestinations = [
    path.join(projectDir, "src", "lib", "s3.ts"),
    path.join(projectDir, "src/app/api/upload/route.ts"),
    path.join(projectDir, "src", "app", "upload", "page.tsx"),
  ];

  const pageRouterDestinations = [
    path.join(projectDir, "src", "lib", "s3.ts"),
    path.join(projectDir, "src/pages/api/upload/index.ts"),
    path.join(projectDir, "src", "pages", "upload", "index.tsx"),
  ];

  const destinationPaths = appRouter
    ? appRouterDestinations
    : pageRouterDestinations;

  ensureDirectoriesExist(destinationPaths);

  copyFiles(extrasDir, destinationPaths, appRouter!, packages);

  writeToEnvFile(projectDir, "server", "AWS_SECRET_ACCESS_KEY", "z.string()");
  writeToEnvFile(projectDir, "server", "AWS_ACCESS_KEY_ID", "z.string()");
  writeToEnvFile(projectDir, "server", "AWS_REGION", "z.string()");
  writeToEnvFile(projectDir, "server", "AWS_S3_BUCKET_NAME", "z.string()");

  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AWS_ACCESS_KEY_ID",
    "process.env.AWS_ACCESS_KEY_ID"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AWS_SECRET_ACCESS_KEY",
    "process.env.AWS_SECRET_ACCESS_KEY"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AWS_REGION",
    "process.env.AWS_REGION"
  );
  writeToEnvFile(
    projectDir,
    "runtimeEnv",
    "AWS_S3_BUCKET_NAME",
    "process.env.AWS_S3_BUCKET_NAME"
  );
};
