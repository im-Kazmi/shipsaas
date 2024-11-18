#!/usr/bin/env node
import path from "path";
import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import { type PackageJson } from "type-fest";

import { runCli } from "~/cli/index.js";
import { createProject } from "~/helpers/createProject.js";
import { initializeGit } from "~/helpers/git.js";
import { setImportAlias } from "~/helpers/setImportAlias.js";
import { buildPkgInstallerMap } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";
import { parseNameAndPath } from "~/utils/parseNameAndPath.js";
import { renderTitle } from "~/utils/renderTitle.js";
import { generateComponent } from "./helpers/generateComponent.js";
import { initShadcn } from "./helpers/initShadcn.js";
import { installDependencies } from "./helpers/installDependencies.js";
import { logNextSteps } from "./helpers/logNextSteps.js";
import {
  replaceTextInFiles,
  setProjectname,
} from "./helpers/setProjectName.js";
import { getVersion } from "./utils/getRocketStackVersion.js";
import {
  getNpmVersion,
  renderVersionWarning,
} from "./utils/renderVersionWarning.js";

type PackageJSON = PackageJson & {
  Metadata?: {
    initVersion: string;
  };
};

const main = async () => {
  const npmVersion = await getNpmVersion();
  const pkgManager = getUserPkgManager();
  renderTitle();
  if (npmVersion) {
    renderVersionWarning(npmVersion);
  }

  // await generateComponent({
  //   messages: [
  //     {
  //       role: "user",
  //       content: `Build a modern landing page for a SaaS testimonial collection platform with the following sections:
  //      1. **Hero Section**: Full-width black background, a catchy headline with bg-clip-text and a bg-gradient-to-r from-white to-neutral-300, a subheadline, and a call-to-action button styled with Tailwind.
  //      2. **Features Section**: Grid layout displaying features with icons and short descriptions, using a clean and modern card style.
  //      3. **Reviews Section**: Carousel of testimonials with user photos and quotes, styled for readability and engagement.
  //      4. **Pricing Section**: Create a responsive pricing section with three cards arranged in a grid layout.
  //          - **Center Card**: The center card should stand out with a distinct background color and shadow effect. Each card should include:
  //            - A plan name (e.g., Basic, Pro, Enterprise).
  //            - A monthly price (e.g., $9/month).
  //            - A list of key features with icons.
  //            - A prominent call-to-action button (e.g., 'Choose Plan').
  //      5. **How to Use Section**: Step-by-step guide with visual elements, maintaining a clean and approachable design.
  //      6. **Footer**: Include links, social media icons, and a subscription form, ensuring it’s visually integrated with the rest of the page.`,
  //     },
  //   ],
  //   projectDir: "/projectDir",
  // });
  const {
    appName,
    packages,
    flags: { noGit, noInstall, importAlias, appRouter, aiPrompt },
    databaseProvider,
  } = await runCli();
  console.log(aiPrompt);

  const usePackages = buildPkgInstallerMap(packages, databaseProvider);

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    scopedAppName,
    packages: usePackages,
    databaseProvider,
    importAlias,
    noInstall,
    appRouter,
  });

  // Write name to package.json
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJSON;
  pkgJson.name = scopedAppName;
  pkgJson.Metadata = { initVersion: getVersion() };

  // ? Bun doesn't support this field (yet)
  if (pkgManager !== "bun") {
    const { stdout } = await execa(pkgManager, ["-v"], {
      cwd: projectDir,
    });
    pkgJson.packageManager = `${pkgManager}@${stdout.trim()}`;
  }

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  setProjectname(path.join(projectDir, "src"), appName);

  // update import alias in any generated files if not using the default
  if (importAlias !== "~/") {
    setImportAlias(projectDir, importAlias);
  }

  if (!noInstall) {
    await installDependencies({ projectDir });
  }

  if (!noInstall) {
    if (usePackages.shadcn) {
      await initShadcn(projectDir, pkgManager);
    }
  }

  if (!noGit) {
    await initializeGit(projectDir);
  }

  await logNextSteps({
    projectName: appDir,
    packages: usePackages,
    appRouter,
    noInstall,
    projectDir,
    databaseProvider,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
