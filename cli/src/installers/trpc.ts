import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { replaceTextInFiles } from "~/helpers/setProjectName.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { copyMultipleFilesAndFolders } from "~/utils/copy.js";
import { ensureDirectoriesExist } from "~/utils/ensure-dir-exist.js";

export const trpcInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@tanstack/react-query",
      "superjson",
      "@trpc/server",
      "@trpc/client",
      "@trpc/react-query",
    ],
    devMode: false,
  });

  const usingnextAuth = packages?.nextAuth.inUse;
  const usingClerk = packages?.clerk.inUse;
  const usingKinde = packages?.kinde.inUse;
  const usingCustomauth = packages?.customauth.inUse;
  const usingBetterauth = packages?.betterauth.inUse;

  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;
  const usingDb = usingPrisma || usingDrizzle;

  const usingStripe = packages?.stripe.inUse;
  const usingLemon = packages?.lemon.inUse;

  const usingPayment = usingStripe || usingLemon;
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

  const db = usingPrisma ? "prisma" : usingDrizzle ? "drizzle" : "";

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerFile = "src/pages/api/trpc/[trpc].ts";
  const routeHandlerFile = `src/app/api/trpc/[trpc]/${usingClerk ? "route-with-clerk.ts" : "route.ts"}`;
  const srcToUse = appRouter ? routeHandlerFile : apiHandlerFile;

  const apiHandlerSrc = path.join(extrasDir, srcToUse);
  const apiHandlerDest = path.join(
    projectDir,
    `src/app/api/trpc/[trpc]/route.ts`
  );

  const trpcFile =
    auth || db ? `with${auth && "-" + auth}${db && "-db"}.ts` : "base.ts";

  const trpcSrc = path.join(
    extrasDir,
    "src/server/api",
    appRouter ? "trpc-app" : "trpc-pages",
    trpcFile
  );

  const trpcDest = path.join(projectDir, "src/server/api/trpc.ts");

  const rootFile =
    usingnextAuth && usingStripe
      ? `root-with-nextauth-stripe.ts`
      : usingnextAuth && usingLemon
        ? `root-with-nextauth-lemon.ts`
        : usingStripe
          ? "root-with-stripe.ts"
          : usingLemon
            ? "root-with-lemon.ts"
            : "root.ts";

  const rootSrc = path.join(extrasDir, "src/server/api", rootFile);

  const rootRouterDest = path.join(projectDir, "src/server/api/root.ts");

  const postRouterSrc = path.join(
    extrasDir,
    "src/server/api/routers/post",
    usingDrizzle
      ? `with-drizzle${usingClerk ? "-clerk" : ""}`
      : usingPrisma
        ? `with-prisma${usingClerk ? "-clerk" : ""}`
        : "base.ts"
  );

  const postRouterDest = path.join(
    projectDir,
    usingDrizzle || usingPrisma
      ? "src/server/api/routers/post"
      : "src/server/api/routers/post.ts"
  );

  const copySrcDest: [string, string][] = [
    [apiHandlerSrc, apiHandlerDest],
    [trpcSrc, trpcDest],
    [rootSrc, rootRouterDest],
    [postRouterSrc, postRouterDest],
  ];

  if (usingPayment) {
    const checkoutRouterSrc = usingLemon
      ? `with-lemon${usingClerk ? "-clerk" : ""}`
      : usingStripe
        ? `with-stripe${usingClerk ? "-clerk" : ""}`
        : "";

    const subscriptionRouterSrc =
      usingDrizzle && usingLemon
        ? `with-lemon-drizzle${usingClerk ? "-clerk" : ""}`
        : usingPrisma && usingLemon
          ? `with-lemon-prisma${usingClerk ? "-clerk" : ""}"`
          : usingPrisma && usingStripe
            ? `with-stripe-prisma${usingClerk ? "-clerk" : ""}`
            : usingDrizzle && usingStripe
              ? `with-stripe-drizzle${usingClerk ? "-clerk" : ""}`
              : "";

    copySrcDest.push(
      [
        path.join(
          extrasDir,
          `src/server/api/routers/subscriptions`,
          subscriptionRouterSrc
        ),
        path.join(projectDir, "src/server/api/routers/subscriptions"),
      ],
      [
        path.join(
          extrasDir,
          `src/server/api/routers/checkout`,
          checkoutRouterSrc
        ),
        path.join(projectDir, "src/server/api/routers/checkout"),
      ]
    );

    if (usingStripe) {
      const productRouterSrc = usingPrisma
        ? "with-prisma"
        : usingDrizzle
          ? "with-drizzle"
          : "";
      copySrcDest.push([
        path.join(
          extrasDir,
          `src/server/api/routers/products`,
          productRouterSrc
        ),
        path.join(projectDir, "src/server/api/routers/products"),
      ]);
    }
    if (usingnextAuth) {
      const authRouterSrc = usingPrisma
        ? "with-prisma"
        : usingDrizzle
          ? "with-drizzle"
          : "";
      copySrcDest.push([
        path.join(extrasDir, `src/server/api/routers/auth`, authRouterSrc),
        path.join(projectDir, "src/server/api/routers/auth"),
      ]);
    }

    if (usingLemon) {
      const productRouterSrc = usingPrisma
        ? "with-prisma"
        : usingDrizzle
          ? "with-drizzle"
          : "";
      copySrcDest.push([
        path.join(extrasDir, `src/server/api/routers/plans`, productRouterSrc),
        path.join(projectDir, "src/server/api/routers/plans"),
      ]);
    }
  }

  if (appRouter) {
    addPackageDependency({
      dependencies: ["server-only"],
      devMode: false,
      projectDir,
    });

    const trpcDir = path.join(extrasDir, "src/trpc");
    copySrcDest.push(
      [
        path.join(trpcDir, "server.ts"),
        path.join(projectDir, "src/trpc/server.ts"),
      ],
      [
        path.join(trpcDir, "react.tsx"),
        path.join(projectDir, "src/trpc/react.tsx"),
      ],
      [
        path.join(
          extrasDir,
          "src/app/_components",
          packages?.tailwind.inUse ? "post-tw.tsx" : "post.tsx"
        ),
        path.join(projectDir, "src/app/_components/post.tsx"),
      ],
      [
        path.join(trpcDir, "query-client.ts"),
        path.join(projectDir, "src/trpc/query-client.ts"),
      ]
    );
  } else {
    addPackageDependency({
      dependencies: ["@trpc/next"],
      devMode: false,
      projectDir,
    });

    const utilsSrc = path.join(extrasDir, "src/utils/api.ts");
    const utilsDest = path.join(projectDir, "src/utils/api.ts");
    copySrcDest.push([utilsSrc, utilsDest]);
  }
  ensureDirectoriesExist(copySrcDest.map(([_, dest]) => dest));

  copySrcDest.forEach(([src, dest]) => {
    copyMultipleFilesAndFolders([src], [dest]);
  });

  replaceTextInFiles(
    path.join(projectDir, "src", "server", "api"),
    "ctx?.session.user.id",
    "kazmiId"
  );
};
