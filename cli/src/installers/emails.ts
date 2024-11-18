import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { writeToEnvFile } from "~/helpers/writeToEnvFile.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { AvailablePackages, type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const emailInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const deps: AvailableDependencies[] = ["@react-email/components"];

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const emailProviders = [
    {
      name: "resend",
      pkg: "resend",
      file: "send-resend.ts",
      requiredEnvs: ["RESEND_API_KEY"],
    },
    {
      name: "mailersend",
      pkg: "mailersend",
      file: "send-mailersend.ts",
      requiredEnvs: ["MAILERSEND_API_KEY"],
    },
    {
      name: "plunk",
      pkg: "@plunk/node",
      file: "send-plunk.ts",
      requiredEnvs: ["PLUNK_API_KEY"],
    },
    {
      name: "nodemailer",
      pkg: "nodemailer",
      file: "send-nodemailer.ts",
      requiredEnvs: [
        "NODEMAILER_HOST",
        "NODEMAILER_AUTH_USER",
        "NODEMAILER_AUTH_PASSWORD",
      ],
    },
    {
      name: "sendgrid",
      pkg: "@sendgrid/mail",
      file: "send-sendgrid.ts",
      requiredEnvs: ["SENDGRID_API_KEY"],
    },
    {
      name: "ses",
      pkg: "@aws-sdk/client-ses",
      file: "send-ses.ts",
      requiredEnvs: ["AWS_SES_REGION"],
    },
    {
      name: "postmark",
      pkg: "postmark",
      file: "send-postmark.ts",
      requiredEnvs: ["POSTMARK_API_KEY"],
    },
  ];

  const selectedProvider = emailProviders.find(
    (provider) => packages?.[provider.name as AvailablePackages]?.inUse
  );

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  let fileToCopy;
  let filename = "";
  const emailsDir = path.join(extrasDir, "src", "emails");

  if (selectedProvider) {
    deps.push(selectedProvider.pkg as AvailableDependencies);
    fileToCopy = path.join(emailsDir, selectedProvider.file);
    filename = `${selectedProvider.name}.ts`;
  }

  if (fs.existsSync(fileToCopy!)) {
    fs.copySync(
      path.join(emailsDir, "email.tsx")!,
      path.join(projectDir, "src", "components", "emails", "basic.tsx")
    );
    fs.copySync(fileToCopy!, path.join(projectDir, "src", "lib", filename));
  } else {
    console.error("File to copy does not exist.");
  }

  selectedProvider?.requiredEnvs.forEach((env) => {
    writeToEnvFile(projectDir, "server", env, "z.string()");
    writeToEnvFile(projectDir, "runtimeEnv", env, `process.env.${env}`);
  });
};
