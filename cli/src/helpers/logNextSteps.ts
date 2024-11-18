import chalk from "chalk";

import { DEFAULT_APP_NAME } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";
import { isInsideGitRepo, isRootGitRepo } from "./git.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async ({
  projectName = DEFAULT_APP_NAME,
  packages,
  noInstall,
  projectDir,
  databaseProvider,
}: Pick<
  InstallerOptions,
  | "projectName"
  | "packages"
  | "noInstall"
  | "projectDir"
  | "appRouter"
  | "databaseProvider"
>) => {
  const pkgManager = getUserPkgManager();

  const usingStripe = packages?.stripe.inUse;
  const usinglemon = packages?.lemon.inUse;

  console.log(
    chalk.cyan(
      "If our project saves you time and helps your workflow, please consider supporting us on Patreon!"
    )
  );
  console.log(
    chalk.bgCyan(
      chalk.gray("🌟 Support us: https://www.patreon.com/c/kazmi949/membership")
    )
  );

  logger.info("Next steps:");
  if (projectName !== ".") {
    logger.info(`  cd ${projectName}`);
  }
  if (noInstall) {
    // To reflect yarn's default behavior of installing packages when no additional args provided
    if (pkgManager === "yarn") {
      logger.info(`  ${pkgManager}`);
    } else {
      logger.info(`  ${pkgManager} install`);
    }
  }

  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  if (usingPrisma || usingDrizzle) {
    if (["npm", "bun"].includes(pkgManager)) {
      if (usingPrisma) {
        logger.info(`  ${pkgManager} run db:push`);
      }
      if (usingDrizzle) {
        logger.info(`  ${pkgManager} run db:generate`);
        logger.info(`  ${pkgManager} run db:migrate`);
      }
    } else {
      if (usingPrisma) {
        logger.info(`  ${pkgManager} db:push`);
      }
      if (usingDrizzle) {
        logger.info(`  ${pkgManager} db:generate`);
        logger.info(`  ${pkgManager} db:migrate`);
      }
    }
  }

  if (usingStripe) {
    logger.info(`  ${pkgManager} run stripe:listen`);
    logger.info(`   copy the webhook secret and paste in your .env file.`);
    logger.info(`  ${pkgManager} run stripe:fixtures`);
  }

  if (usinglemon) {
    logger.info(`  ${pkgManager} run lemon:sync-plans`);
  }

  if (["npm", "bun"].includes(pkgManager)) {
    logger.info(`  ${pkgManager} run dev`);
  } else {
    logger.info(`  ${pkgManager} dev`);
  }

  if (!(await isInsideGitRepo(projectDir)) && !isRootGitRepo(projectDir)) {
    logger.info(`  git init`);
  }
  logger.info(`  git commit -m "initial commit"`);
};
