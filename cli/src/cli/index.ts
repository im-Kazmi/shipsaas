import * as p from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";

import { CREATE_SMART_STACK, DEFAULT_APP_NAME } from "~/consts.js";
import {
  databaseProviders,
  type AvailablePackages,
  type DatabaseProvider,
} from "~/installers/index.js";
import { getVersion } from "~/utils/getRocketStackVersion.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { IsTTYError } from "~/utils/isTTYError.js";
import { logger } from "~/utils/logger.js";
import { validateAppName } from "~/utils/validateAppName.js";
import { validateImportAlias } from "~/utils/validateImportAlias.js";

interface CliFlags {
  noGit: boolean;
  noPayment: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;
  aiPrompt: string;

  /** @internal Used in CI. */
  CI: boolean;
  /** @internal Used in CI. */
  tailwind: boolean;
  /** @internal Used in CI. */
  trpc: boolean;
  /** @internal Used in CI. */
  prisma: boolean;
  /** @internal Used in CI. */
  drizzle: boolean;
  /** @internal Used in CI. */
  nextAuth: boolean;
  /** @internal Used in CI. */
  appRouter: boolean;
  /** @internal Used in CI. */
  dbProvider: DatabaseProvider;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
  databaseProvider: DatabaseProvider;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: [
    "nextAuth",
    "drizzle",
    "tailwind",
    "trpc",
    "stripe",
    "uploadthing",
    "nodemailer",
    "posthog",
    "shadcn",
  ],
  flags: {
    noGit: false,
    noPayment: false,
    noInstall: false,
    default: false,
    CI: false,
    tailwind: false,
    trpc: false,
    prisma: false,
    drizzle: false,
    nextAuth: false,
    importAlias: "~/",
    appRouter: true,
    dbProvider: "sqlite",
    aiPrompt: "",
  },
  databaseProvider: "sqlite",
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;
  p.note(
    `Heads up! Support for followings coming soon. Stay tuned
    ${chalk.green("Turbo Repo. 💀")}
    ${chalk.green("Monitoring tools. 🚀")}
    ${chalk.green("Supabase. 😛")}
    ${chalk.green("customauth. 🤡")}
    ${chalk.green("paddle for payments. 💰")}
    ${chalk.green("setup for testing frameworks. 🦀")}`,
    "Coming Soon"
  );
  p.intro("🎉 Let's kickstart your Next.js app with  shipsaas!");

  const program = new Command()
    .name(CREATE_SMART_STACK)
    .description("A CLI for creating web applications with the shipsaas!")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new shipsaas!",
      false
    )
    .option(
      "--aiPrompt <prompt>",
      "AI: Generate component with the provided prompt"
    )

    .option("--CI", "Boolean value if we're running in CI", false)
    .option(
      "--tailwind [boolean]",
      "Experimental: Boolean value if we should install Tailwind CSS. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--nextAuth [boolean]",
      "Experimental: Boolean value if we should install NextAuth.js. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--prisma [boolean]",
      "Experimental: Boolean value if we should install Prisma. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--drizzle [boolean]",
      "Experimental: Boolean value if we should install Drizzle. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--trpc [boolean]",
      "Experimental: Boolean value if we should install tRPC. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    .option(
      "-i, --import-alias",
      "Explicitly tell the CLI to use a custom import alias",
      defaultOptions.flags.importAlias
    )
    .option(
      "--dbProvider [provider]",
      `Choose a database provider to use. Possible values: ${databaseProviders.join(
        ", "
      )}`,
      defaultOptions.flags.dbProvider
    )
    .option(
      "--appRouter [boolean]",
      "Explicitly tell the CLI to use the new Next.js app router",
      (value) => !!value && value !== "false"
    )
    /** END CI-FLAGS */
    .version(getVersion(), "-v, --version", "Display the version number")
    .parse(process.argv);

  // FIXME: TEMPORARY WARNING WHEN USING YARN 3. SEE ISSUE #57
  if (process.env.npm_config_user_agent?.startsWith("yarn/3")) {
    logger.warn(`  WARNING: It looks like you are using Yarn 3. This is currently not supported,
  and likely to result in a crash. Please run shipsaas with another
  package manager such as pnpm, npm, or Yarn Classic.`);
  }

  // Needs to be separated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  /** @internal Used for CI E2E tests. */
  if (cliResults.flags.CI) {
    cliResults.packages = [];
    if (cliResults.flags.trpc) cliResults.packages.push("trpc");
    if (cliResults.flags.tailwind) cliResults.packages.push("tailwind");
    if (cliResults.flags.prisma) cliResults.packages.push("prisma");
    if (cliResults.flags.drizzle) cliResults.packages.push("drizzle");
    if (cliResults.flags.nextAuth) cliResults.packages.push("nextAuth");
    if (cliResults.flags.prisma && cliResults.flags.drizzle) {
      // We test a matrix of all possible combination of packages in CI. Checking for impossible
      // combinations here and exiting gracefully is easier than changing the CI matrix to exclude
      // invalid combinations. We are using an "OK" exit code so CI continues with the next combination.
      logger.warn(
        "Oops! Prisma and Drizzle aren't friends. Exiting gracefully."
      );
      process.exit(0);
    }
    if (databaseProviders.includes(cliResults.flags.dbProvider) === false) {
      logger.warn(
        `Incompatible database provided. Use: ${databaseProviders.join(", ")}. Exiting.`
      );
      process.exit(0);
    }

    cliResults.databaseProvider =
      cliResults.packages.includes("drizzle") ||
      cliResults.packages.includes("prisma")
        ? cliResults.flags.dbProvider
        : "sqlite";

    return cliResults;
  }

  if (cliResults.flags.default) {
    return cliResults;
  }

  // Explained below why this is in a try/catch block
  try {
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
  using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you
  can provide the arguments from the CLI directly to skip the prompts.`);

      throw new IsTTYError("Non-interactive environment");
    }

    // if --CI flag is set, we are running in CI mode and should not prompt the user

    const pkgManager = getUserPkgManager();

    const project = await p.group(
      {
        ...(!cliProvidedName && {
          name: () =>
            p.text({
              message: "What do you want to call your project?",
              defaultValue: cliProvidedName,
              validate: validateAppName,
            }),
        }),
        language: () =>
          p.select({
            message: "Pick your language of choice:",
            options: [
              { value: "typescript", label: "TypeScript (best choice!)" },
              { value: "javascript", label: "JavaScript" },
            ],
            initialValue: "typescript",
          }),
        _: ({ results }) =>
          results.language === "javascript"
            ? p.note(
                chalk.redBright(
                  "Just kidding! We're going with TypeScript because it's awesome 😎"
                )
              )
            : undefined,
        componentLiabrary: ({ results }) => {
          return p.select({
            message: "Which component library do you want to use?",

            options: [
              { value: "shadcn", label: "Radix UI/Shadcn UI " },
              {
                value: "nextui",
                label: chalk.gray(`NextUI ${chalk.cyan("(Coming Soon)")}`),
              },
            ],
            initialValue: "shadcn",
          });
        },
        appRouter: () =>
          p
            .confirm({
              message: "Ready to embrace the future with Next.js App Router?",
              initialValue: true,
              active: "Heck yeah!",
              inactive: "Nah, maybe next time",
            })
            .then((value) => {
              return true;
            }),
        // store: ({ results }) => {
        //   return p.select({
        //     message: "Any external stores you'd like to use?",
        //     options: [
        //       { value: "none", label: "None" },
        //       { value: "firebase", label: "Firebase" },
        //       { value: "supabase", label: "Supabase" },
        //     ],
        //     initialValue: "none",
        //   });
        // },
        api: ({ results }) => {
          // if (results.store !== "none") return;
          // if (!results.appRouter) {
          //   return p.select({
          //     message: "How will your frontend talk to the backend?",
          //     options: [
          //       {
          //         value: "apiroutes_with_react_query",
          //         label: "API Routes with Tanstack react-query on frontend.",
          //       },
          //       {
          //         value: "hono_with_react_query",
          //         label:
          //           "Hono.js 🔥 inside API Routes with Tanstack react-query on frontend.(🚀 DX)",
          //       },
          //       { value: "trpc", label: "tRPC" },
          //     ],
          //     initialValue: "trpc",
          //   });
          // }
          return p
            .select({
              message: "what Will you be using for API Communication Stack?",
              options: [
                {
                  value: "serverActions",
                  label: "Server components and actions.",
                },
                {
                  value: "nextSafeActions",
                  label: chalk.gray(
                    `Next Safe Actions ${chalk.cyan("(Coming Soon)")}`
                  ),
                  disabled: true,
                },
                { value: "trpc", label: "tRPC" },
                {
                  value: "hono_with_react_query",
                  label:
                    "Hono.js 🔥 inside API Routes with Tanstack react-query on frontend.(🚀 DX)",
                },
              ],
              initialValue: "serverActions",
            })
            .then((selection) => {
              if (selection === "nextSafeActions") {
                console.log(
                  p.note(
                    chalk.red(
                      `Support for (${selection}) is Coming soon! Exiting...`
                    )
                  )
                );
                process.exit(1);
              } else {
                return selection;
              }
            });
        },
        authentication: ({ results }) => {
          // if (results.store !== "none") return;

          return p
            .select({
              message:
                "Which authentication provider would you like to integrate?",
              options: [
                { value: "none", label: "None (Payments cannot be provided)" },
                { value: "next-auth", label: "NextAuth.js" },
                { value: "clerk", label: "Clerk" },
                {
                  value: "betterauth",
                  label: `Better Auth ${chalk.green(`official API is in Beta. releasing on 21 this month.`)}`,
                },
                {
                  value: "customauth",
                  label: `Custom Auth ${chalk.bgRedBright("coming soon")}`,
                },
                { value: "kinde", label: "Kinde" },
              ],
              initialValue: "next-auth",
            })
            .then((selection) => {
              if (selection === "customauth") {
                console.log(
                  p.note(
                    chalk.red(
                      `Support for (${selection}) is Coming soon! Exiting...`
                    )
                  )
                );
                process.exit(1);
              } else {
                return selection;
              }
            });
        },
        database: ({ results }) => {
          // if (results.store !== "none") return;
          return p.select({
            message: "Which database ORM would you like to use?",
            options: [
              { value: "none", label: "None (Payments cannot be provided)" },
              { value: "prisma", label: "Prisma" },
              { value: "drizzle", label: "Drizzle" },
            ],
            initialValue: "drizzle",
          });
        },
        databaseProvider: ({ results }) => {
          if (results.database === "none") return;
          return p.select({
            message: "Which database provider would you like to use?",
            options: [
              { value: "mysql", label: "MySQL" },
              { value: "postgres", label: "PostgreSQL" },
              { value: "planetscale", label: "PlanetScale" },
            ],
            initialValue: "postgres",
          });
        },
        paymentProvider: ({ results }) => {
          if (
            cliResults.flags.noPayment ||
            results.database === "none" ||
            results.authentication === "none"
          )
            return;

          return p.select({
            message: "Which payment provider would you like to use?",
            options: [
              { value: "stripe", label: "Stripe" },
              { value: "lemon", label: "LemonSqueezy" },
            ],
            initialValue: "lemon",
          });
        },
        emailService: () => {
          return p.select({
            message: "Which email service would you like to use?",
            options: [
              { value: "none", label: "None ( I Don't need it )" },
              { value: "resend", label: "Resend" },
              { value: "nodemailer", label: "Nodemailer." },
              { value: "sendgrid", label: "Sendgrid." },
              { value: "Postmark", label: "Postmark." },
              { value: "ses", label: "AWS SES." },
              { value: "mailerSend", label: "MailerSend." },
              { value: "plunk", label: "Plunk." },
            ],
            initialValue: "resend",
          });
        },
        fileUploadService: () => {
          return p.select({
            message: "Which file upload service would you like to use?",
            options: [
              { value: "none", label: "None ( I Don't need it )" },
              { value: "uploadthing", label: "Uploadthing" },
              { value: "aws_s3", label: "AWS S3" },
              { value: "cloudflare_r2", label: "cloudflare R2" },
              {
                value: "cloudinary",
                label: `Cloudinary ${chalk.bgRedBright("coming soon")}`,
              },
            ],
            initialValue: "uploadthing",
          });
        },
        analyticsService: () => {
          return p
            .select({
              message: "Which file upload service would you like to use?",
              options: [
                { value: "none", label: "None ( I Don't need it )" },
                {
                  value: "umami",
                  label: `Umami ${chalk.bgRedBright("coming soon")}`,
                },
                {
                  value: "plausible",
                  label: `Plausible ${chalk.bgRedBright("coming very very soon")}`,
                },
                { value: "posthog", label: "Posthog" },
              ],
              initialValue: "posthog",
            })
            .then((selection) => {
              if (selection === "umami" || selection === "plausible") {
                console.log(
                  p.note(
                    chalk.red(
                      `Support for (${selection}) is Coming soon! Exiting...`
                    )
                  )
                );
                process.exit(1);
              } else {
                return selection;
              }
            });
        },
        ...(!cliResults.flags.noGit && {
          git: () => {
            return p.confirm({
              message:
                "Should we initialize a Git repository and stage the changes?",
              initialValue: !defaultOptions.flags.noGit,
            });
          },
        }),
        ...(!cliResults.flags.noInstall && {
          install: () => {
            return p.confirm({
              message:
                `Should we run '${pkgManager}` +
                (pkgManager === "yarn" ? `'?` : ` install' for you?`),
              initialValue: !defaultOptions.flags.noInstall,
            });
          },
        }),
        importAlias: () => {
          return p.text({
            message: "What import alias would you like to use?",
            defaultValue: defaultOptions.flags.importAlias,
            placeholder: defaultOptions.flags.importAlias,
            validate: validateImportAlias,
          });
        },
      },
      {
        onCancel() {
          process.exit(1);
        },
      }
    );

    const packages: AvailablePackages[] = [];
    packages.push("tailwind");
    packages.push("shadcn");

    // if (project.componentLiabrary === "shadcn") packages.push("shadcn");
    // if (project.emailService === "nextui") packages.push("nextui");

    if (project.authentication === "next-auth") packages.push("nextAuth");
    if (project.authentication === "clerk") packages.push("clerk");
    if (project.authentication === "betterauth") packages.push("betterauth");
    if (project.authentication === "customauth") packages.push("customauth");
    if (project.authentication === "kinde") packages.push("kinde");

    if (project.api === "serverActions") packages.push("serverActions");
    if (project.api === "safeActions") packages.push("safeActions");
    if (project.api === "hono_with_react_query") packages.push("hono");
    if (project.api === "trpc") packages.push("trpc");
    if (project.api === "react-query") packages.push("reactQuery");

    if (project.database === "prisma") packages.push("prisma");
    if (project.database === "drizzle") packages.push("drizzle");

    if (project.paymentProvider === "stripe") packages.push("stripe");
    if (project.paymentProvider === "lemon") packages.push("lemon");

    if (project.emailService === "resend") packages.push("resend");
    if (project.emailService === "nodemailer") packages.push("nodemailer");
    if (project.emailService === "plunk") packages.push("plunk");
    if (project.emailService === "ses") packages.push("ses");
    if (project.emailService === "sendgrid") packages.push("sendgrid");
    if (project.emailService === "postmark") packages.push("postmark");
    if (project.emailService === "mailersend") packages.push("mailersend");

    if (project.fileUploadService === "uploadthing")
      packages.push("uploadthing");
    if (project.fileUploadService === "cloudflare_r2")
      packages.push("cloudflare_r2");
    if (project.fileUploadService === "aws_s3") packages.push("aws_s3");
    // if (project.fileUploadService === "cloudinary") return;

    if (project.analyticsService === "posthog") packages.push("posthog");
    if (project.analyticsService === "umami") packages.push("umami");
    if (project.analyticsService === "plausible") packages.push("plausible");

    // if (project.store === "supabase") packages.push("supabase");
    // if (project.store === "firebase") packages.push("firebase");

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      databaseProvider:
        (project.databaseProvider as DatabaseProvider) || "postgres",
      flags: {
        ...cliResults.flags,
        appRouter: project.appRouter ?? cliResults.flags.appRouter,
        noGit: !project.git || cliResults.flags.noGit,
        noInstall: !project.install || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
    };
  } catch (err) {
    // If the user is not calling shipsaas from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default shipsaas! app
    if (err instanceof IsTTYError) {
      logger.warn(`
  ${CREATE_SMART_STACK} needs an interactive terminal to provide options`);

      const shouldContinue = await p.confirm({
        message: `Continue scaffolding a default shipsaas! app?`,
        initialValue: true,
      });

      if (!shouldContinue) {
        logger.info("Exiting...");
        process.exit(0);
      }

      logger.info(
        `Bootstrapping a default shipsaas! app in ./${cliResults.appName}`
      );
    } else {
      throw err;
    }
  }

  return cliResults;
};
