import { User } from "better-auth";
import { createMiddleware } from "hono/factory";
import { headers } from "next/headers";

import { auth } from "~/lib/auth";

type Env = {
  Variables: {
    user: User;
  };
};

export const authMiddleware = () => {
  return createMiddleware<Env>(async (c, next) => {
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session || !session.user) {
      return c.json("UNAUTHORIZED", 400);
    }

    c.set("user", session.user!);

    await next();
  });
};
