import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyMultipleFilesAndFolders } from "~/utils/copy.js";

export const nextUiInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  // const usingShadcn = packages?.shadcn.inUse;
  // const deps: AvailableDependencies[] = ["@clerk/nextjs", "svix"];
  // addPackageDependency({
  //   projectDir,
  //   dependencies: deps,
  //   devMode: false,
  // });
  // const extrasDir = path.join(PKG_ROOT, "template/extras");
  // const middlewarefile = path.join(extrasDir, "src/auth/clerk/middleware.ts");
  // const authSigninPage = path.join(
  //   extrasDir,
  //   "src/auth/clerk/sign-in/page.tsx"
  // );
  // const authSignupPage = path.join(
  //   extrasDir,
  //   "src/auth/clerk/sign-up/page.tsx"
  // );
  // const forgotPasswordPage = path.join(
  //   extrasDir,
  //   "src/auth/clerk/forgot/page.tsx"
  // );
  // const appRouterwebhookPath = path.join(
  //   extrasDir,
  //   "src/webhooks/with-app-clerk.ts"
  // );
  // const pageRouterwebhookPath = path.join(
  //   extrasDir,
  //   "src/webhooks/with-pages-clerk.ts"
  // );
  // const webhookPath = appRouter ? appRouterwebhookPath : pageRouterwebhookPath;
  // const appRouterPath = path.join(projectDir, "src/app");
  // const pageRouterPath = path.join(projectDir, "src/pages");
  // // Paths for the App Router
  // const appRouterDestinations = [
  //   path.join(appRouterPath, "(auth)", "sign-in", "[[...sign-in]]", "page.tsx"),
  //   path.join(appRouterPath, "(auth)", "sign-up", "[[...sign-up]]", "page.tsx"),
  //   path.join(appRouterPath, "(auth)", "forgot", "page.tsx"),
  //   path.join(projectDir, "middleware.ts"),
  //   path.join(appRouterPath, "api/webhooks/clerk/route.ts"),
  // ];
  // // Paths for the Page Router
  // const pageRouterDestinations = [
  //   path.join(pageRouterPath, "sign-in", "[[...index]].tsx"),
  //   path.join(pageRouterPath, "sign-up", "[[...index]].tsx"),
  //   path.join(pageRouterPath, "forgot", "index.tsx"),
  //   path.join(projectDir, "src", "middleware.ts"),
  //   path.join(pageRouterPath, "api/webhooks/clerk.ts"),
  // ];
  // const appRouterAuthLayout = `
  //   import React from 'react'
  //   const AuthLayout = ({children}:React.ReactNode) => {
  //     return (
  //       <div className='w-full h-full flex items-center justify-center'>
  //         {children}
  //       </div>
  //     )
  //   }
  //   export default AuthLayout
  //   `;
  // // Select the destination paths based on whether appRouter is true or false
  // const destinationPaths = appRouter
  //   ? appRouterDestinations
  //   : pageRouterDestinations;
  // destinationPaths.forEach((destinationPath) => {
  //   const dir = path.dirname(destinationPath);
  //   fs.ensureDirSync(dir);
  // });
  // copyMultipleFilesAndFolders(
  //   [
  //     authSigninPage,
  //     authSignupPage,
  //     forgotPasswordPage,
  //     middlewarefile,
  //     webhookPath,
  //   ],
  //   [...destinationPaths]
  // );
  // if (appRouter) {
  //   fs.writeFileSync(
  //     path.join(appRouterPath, "(auth)", "layout.tsx"),
  //     appRouterAuthLayout
  //   );
  // }
};
