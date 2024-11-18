import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { writeToPkgJson } from "~/utils/write-to-pkgjson.js";

export const prismaInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
}) => {
  addPackageDependency({
    projectDir,
    dependencies: ["prisma"],
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: ["@prisma/client"],
    devMode: false,
  });
  if (databaseProvider === "planetscale")
    addPackageDependency({
      projectDir,
      dependencies: ["@prisma/adapter-planetscale", "@planetscale/database"],
      devMode: false,
    });

  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const usingLemon = packages?.lemon.inUse;
  const usingStripe = packages?.stripe.inUse;

  const usingServerActions = packages?.serverActions.inUse;
  const usingtRPC = packages?.trpc.inUse;

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

  const payment = usingStripe ? "stripe" : usingLemon ? "lemon" : "";

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const schemaSrc = path.join(
    extrasDir,
    "prisma/schema",
    auth
      ? `with${auth ? "-" + auth : ""}${payment ? "-" + payment : ""}${databaseProvider === "planetscale" ? "-planetscale" : ""}.prisma`
      : `base${databaseProvider === "planetscale" ? "-planetscale" : ""}.prisma`
  );
  let schemaText = fs.readFileSync(schemaSrc, "utf-8");
  if (databaseProvider !== "sqlite") {
    schemaText = schemaText.replace(
      'provider = "sqlite"',
      `provider = "${
        {
          mysql: "mysql",
          postgres: "postgresql",
          planetscale: "mysql",
        }[databaseProvider]
      }"`
    );
    if (["mysql", "planetscale"].includes(databaseProvider)) {
      schemaText = schemaText.replace("// @db.Text", "@db.Text");
    }
  }
  const schemaDest = path.join(projectDir, "prisma/schema.prisma");
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
  fs.writeFileSync(schemaDest, schemaText);

  const clientSrc = path.join(
    extrasDir,
    databaseProvider === "planetscale"
      ? "src/lib/prisma/db-prisma-planetscale.ts"
      : "src/lib/prisma/db-prisma.ts"
  );
  const clientDest = path.join(projectDir, "src/server/db.ts");

  const packageJsonPath = path.join(projectDir, "package.json");

  writeToPkgJson(packageJsonPath, {
    postinstall: "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma migrate dev",
    "db:migrate": "prisma migrate deploy",
  });

  fs.copySync(clientSrc, clientDest);
};
