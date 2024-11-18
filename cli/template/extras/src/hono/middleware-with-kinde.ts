import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUserBase } from "@kinde-oss/kinde-auth-nextjs/types";
import { createMiddleware } from "hono/factory";

type Env = {
  Variables: {
    user: KindeUserBase;
  };
};

export const authMiddleware = () => {
  return createMiddleware<Env>(async (c, next) => {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    if (!isAuthenticated) {
      return c.json("UNAUTHORIZED", 400);
    }

    c.set("user", user!);

    await next();
  });
};
