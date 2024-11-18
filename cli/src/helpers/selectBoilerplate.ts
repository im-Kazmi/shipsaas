import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "packages" | "projectDir">
>;
// This generates the _app.tsx file that is used to render the app
export const selectAppFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const appFileDir = path.join(PKG_ROOT, "template/extras/src/page");

  let appFile = "page.tsx";

  const appSrc = path.join(appFileDir, appFile);
  const appDest = path.join(projectDir, "src/app/page.tsx");
  fs.copySync(appSrc, appDest);
};

// Similar to _app, but for app router
export const selectLayoutFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const layoutFileDir = path.join(PKG_ROOT, "template/extras/src/app/layout");

  const usingTw = packages.tailwind.inUse;
  const usingTRPC = packages.trpc.inUse;
  const usingClerk = packages.clerk.inUse;
  const usingNextauth = packages.nextAuth.inUse;
  const usingPosthog = packages.posthog.inUse;
  const usingHono = packages.hono.inUse;

  let layoutFile =
    usingTRPC && usingClerk && usingPosthog
      ? "with-trpc-clerk-posthog.tsx"
      : usingTRPC && usingNextauth && usingPosthog
        ? "with-trpc-nextauth-posthog.tsx"
        : usingClerk && usingHono && usingPosthog
          ? "with-clerk-posthog-reactquery.tsx"
          : usingNextauth && usingHono && usingPosthog
            ? "with-nextauth-posthog-reactquery.tsx"
            : usingTRPC && usingClerk
              ? "with-trpc-clerk.tsx"
              : usingTRPC && usingNextauth
                ? "with-trpc-nextauth.tsx"
                : usingTRPC && usingPosthog
                  ? "with-trpc-posthog.tsx"
                  : usingHono && usingPosthog
                    ? "with-posthog-reactquery.tsx"
                    : usingClerk && usingHono
                      ? "with-clerk-reactquery.tsx"
                      : usingNextauth && usingHono
                        ? "with-nextauth-reactquery.tsx"
                        : usingClerk
                          ? "with-clerk.tsx"
                          : usingHono
                            ? "with-reactquery.tsx"
                            : usingNextauth
                              ? "with-nextauth.tsx"
                              : usingTRPC
                                ? "with-trpc.tsx"
                                : usingPosthog
                                  ? "with-posthog.tsx"
                                  : "base.tsx";

  const appSrc = path.join(layoutFileDir, layoutFile);
  const appDest = path.join(projectDir, "src/app/layout.tsx");
  fs.copyFileSync(appSrc, appDest);
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/pages/index");

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingAuth = packages.nextAuth.inUse;

  let indexFile = "base.tsx";
  if (usingTRPC && usingTw && usingAuth) {
    indexFile = "with-auth-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw && usingAuth) {
    indexFile = "with-auth-trpc.tsx";
  } else if (usingTRPC && usingTw) {
    indexFile = "with-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw) {
    indexFile = "with-trpc.tsx";
  } else if (!usingTRPC && usingTw) {
    indexFile = "with-tw.tsx";
  }

  const indexSrc = path.join(indexFileDir, indexFile);
  const indexDest = path.join(projectDir, "src/pages/index.tsx");
  fs.copyFileSync(indexSrc, indexDest);
};

// Similar to index, but for app router
export const selectPageFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/app/page");

  let indexFile = "page.tsx";

  const indexSrc = path.join(indexFileDir, indexFile);
  const indexDest = path.join(projectDir, "src/app/page.tsx");
  fs.copyFileSync(indexSrc, indexDest);
};

export const importComponents = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const usingnextAuth = packages?.nextAuth.inUse;
  const usingClerk = packages?.clerk.inUse;
  const usingKinde = packages?.kinde.inUse;
  const usingCustomauth = packages?.customauth.inUse;
  const usingBetterauth = packages?.betterauth.inUse;

  const auth = usingnextAuth
    ? "auth"
    : usingClerk
      ? "clerk"
      : usingCustomauth
        ? "customauth"
        : usingKinde
          ? "kinde"
          : usingBetterauth
            ? "betterauth"
            : "";

  const uiComponents = path.join(PKG_ROOT, "template/extras/src/components/ui");

  const navbar = path.join(
    PKG_ROOT,
    auth
      ? `template/extras/src/components/navbar/navbar-with-${auth}.tsx`
      : "base.tsx"
  );

  fs.copySync(uiComponents, path.join(projectDir, "src/components/ui"));
  fs.copySync(navbar, path.join(projectDir, "src/components/navbar.tsx"));
  fs.copySync(
    path.join(PKG_ROOT, "template/extras/src/components/theme-toggle.tsx"),
    path.join(projectDir, "src/components/theme-toggle.tsx")
  );
  fs.copySync(
    path.join(PKG_ROOT, "template/extras/src/utils/helpers.ts"),
    path.join(projectDir, "src/utils/helpers.ts")
  );
};
