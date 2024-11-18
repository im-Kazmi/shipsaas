import { clerkInstaller } from "~/installers/clerk.js";
import { drizzleInstaller } from "~/installers/drizzle.js";
import { emailInstaller } from "~/installers/emails.js";
import { envVariablesInstaller } from "~/installers/envVars.js";
import { dynamicEslintInstaller } from "~/installers/eslint.js";
import { lemonInstaller } from "~/installers/lemon.js";
import { nextAuthInstaller } from "~/installers/nextAuth.js";
import { nextUiInstaller } from "~/installers/nextui.js";
import { prismaInstaller } from "~/installers/prisma.js";
import { shadcnInstaller } from "~/installers/shadcn.js";
import { tailwindInstaller } from "~/installers/tailwind.js";
import { trpcInstaller } from "~/installers/trpc.js";
import { type PackageManager } from "~/utils/getUserPkgManager.js";
import { awsS3Installer } from "./aws_s3.js";
import { betterAuthInstaller } from "./betterauth.js";
import { cloudflareR2Installer } from "./cloudflare_r2.js";
import { cloudinaryInstaller } from "./cloudinary.js";
import { customAuthInstaller } from "./customauth.js";
import { honoInstaller } from "./hono.js";
import { kindeInstaller } from "./kinde.js";
import { packagesUsageInstaller } from "./packagesUsage.js";
import { posthogInstaller } from "./posthog.js";
import { serverActionsInstaller } from "./serveractions.js";
import { stripeInstaller } from "./stripe.js";
import { supabaseInstaller } from "./supabase.js";
import { uiPagesInstaller } from "./ui-pages.js";
import { uploadthingInstaller } from "./uploadthing.js";

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = [
  "nextAuth",
  "clerk",
  "betterauth",
  "customauth",
  "kinde",

  "prisma",
  "drizzle",

  "tailwind",

  "trpc",
  "reactQuery",
  "hono",
  "serverActions",
  "safeActions",

  "lemon",
  "stripe",

  "envVariables",
  "eslint",
  // "dbContainer",
  "packagesUsage",

  "resend",
  "nodemailer",
  "ses",
  "mailersend",
  "plunk",
  "sendgrid",
  "postmark",

  "shadcn",
  "nextui",

  "uploadthing",
  "aws_s3",
  "cloudflare_r2",
  "cloudinary",

  "supabase",
  "firebase",

  "posthog",
  "umami",
  "plausible",

  "uiPages",
  "testing",
] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export const databaseProviders = [
  "mysql",
  "postgres",
  "sqlite",
  "planetscale",
] as const;
export type DatabaseProvider = (typeof databaseProviders)[number];

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages?: PkgInstallerMap;
  appRouter?: boolean;
  projectName: string;
  scopedAppName: string;
  databaseProvider: DatabaseProvider;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[],
  databaseProvider: DatabaseProvider
): PkgInstallerMap => ({
  tailwind: {
    inUse: packages.includes("tailwind"),
    installer: tailwindInstaller,
  },

  supabase: {
    inUse: packages.includes("supabase"),
    installer: supabaseInstaller,
  },
  firebase: {
    inUse: packages.includes("firebase"),
    installer: supabaseInstaller,
  },

  shadcn: {
    inUse: packages.includes("shadcn"),
    installer: shadcnInstaller,
  },

  nextui: {
    inUse: packages.includes("nextui"),
    installer: nextUiInstaller,
  },

  nextAuth: {
    inUse: packages.includes("nextAuth"),
    installer: nextAuthInstaller,
  },
  clerk: {
    inUse: packages.includes("clerk"),
    installer: clerkInstaller,
  },
  betterauth: {
    inUse: packages.includes("betterauth"),
    installer: betterAuthInstaller,
  },
  kinde: {
    inUse: packages.includes("kinde"),
    installer: kindeInstaller,
  },
  customauth: {
    inUse: packages.includes("customauth"),
    installer: customAuthInstaller,
  },

  prisma: {
    inUse: packages.includes("prisma"),
    installer: prismaInstaller,
  },
  drizzle: {
    inUse: packages.includes("drizzle"),
    installer: drizzleInstaller,
  },
  serverActions: {
    inUse: packages.includes("serverActions"),
    installer: serverActionsInstaller,
  },
  safeActions: {
    inUse: packages.includes("safeActions"),
    installer: dynamicEslintInstaller,
  },
  trpc: {
    inUse: packages.includes("trpc"),
    installer: trpcInstaller,
  },
  // dbContainer: {
  //   inUse: ["mysql", "postgres"].includes(databaseProvider),
  //   installer: dbContainerInstaller,
  // },
  envVariables: {
    inUse: true,
    installer: envVariablesInstaller,
  },
  hono: {
    inUse: packages.includes("hono"),
    installer: honoInstaller,
  },
  reactQuery: {
    inUse: packages.includes("react-query"),
    installer: dynamicEslintInstaller,
  },
  eslint: {
    inUse: true,
    installer: dynamicEslintInstaller,
  },

  resend: {
    inUse: packages.includes("resend"),
    installer: emailInstaller,
  },
  mailersend: {
    inUse: packages.includes("mailersend"),
    installer: emailInstaller,
  },
  nodemailer: {
    inUse: packages.includes("nodemailer"),
    installer: emailInstaller,
  },
  ses: {
    inUse: packages.includes("ses"),
    installer: emailInstaller,
  },
  postmark: {
    inUse: packages.includes("postmark"),
    installer: emailInstaller,
  },
  plunk: {
    inUse: packages.includes("plunk"),
    installer: emailInstaller,
  },
  sendgrid: {
    inUse: packages.includes("sendgrid"),
    installer: emailInstaller,
  },

  uploadthing: {
    inUse: packages.includes("uploadthing"),
    installer: uploadthingInstaller,
  },
  aws_s3: {
    inUse: packages.includes("aws_s3"),
    installer: awsS3Installer,
  },
  cloudflare_r2: {
    inUse: packages.includes("cloudflare_r2"),
    installer: cloudflareR2Installer,
  },
  cloudinary: {
    inUse: packages.includes("cloudinary"),
    installer: cloudinaryInstaller,
  },
  packagesUsage: {
    inUse: true,
    installer: packagesUsageInstaller,
  },
  posthog: {
    inUse: packages.includes("posthog"),
    installer: posthogInstaller,
  },
  umami: {
    inUse: packages.includes("umami"),
    installer: packagesUsageInstaller,
  },
  plausible: {
    inUse: packages.includes("plausible"),
    installer: packagesUsageInstaller,
  },

  stripe: {
    inUse: packages.includes("stripe"),
    installer: stripeInstaller,
  },
  lemon: {
    inUse: packages.includes("lemon"),
    installer: lemonInstaller,
  },

  uiPages: {
    inUse: true,
    installer: uiPagesInstaller,
  },

  testing: {
    inUse: packages.includes("testing"),
    installer: uiPagesInstaller,
  },
});
