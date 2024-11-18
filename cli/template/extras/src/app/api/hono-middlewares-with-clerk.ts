import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
import { User } from "next-auth";

import { db } from "~/server/db";
import { plans, subscriptions } from "~/server/db/schema";

type Env = {
  Variables: {
    user: User;
  };
};

export const authMiddleware = () => {
  return createMiddleware<Env>(async (c, next) => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return c.json("UNAUTHORIZED", 400);
    }

    c.set("user", session.user!);

    await next();
  });
};

export const requireActivePlan = async (
  userId: string,
  requiredPlans: string[]
) => {
  const userSubscriptions = await db
    .select({
      planName: plans.name,
      status: subscriptions.status,
      endsAt: subscriptions.endsAt,
    })
    .from(subscriptions)
    .leftJoin(plans, eq(subscriptions.planId, plans.id))
    .where(eq(subscriptions.userId, userId));

  const activePlans = userSubscriptions
    .filter(
      (sub) => sub.status === "active" && new Date(sub.endsAt!) > new Date()
    )
    .map((sub) => sub.planName);

  return requiredPlans.every((plan) => activePlans.includes(plan));
};

export const requireBasicPlan = () => {
  return createMiddleware(async (c, next) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json("UNAUTHORIZED", 401);
    }

    const hasAccess = await requireActivePlan(user.id, ["Basic"]);
    if (!hasAccess) {
      return c.json("FORBIDDEN", 403);
    }

    await next();
  });
};

export const requireProPlan = () => {
  return createMiddleware(async (c, next) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json("UNAUTHORIZED", 401);
    }

    const hasAccess = await requireActivePlan(user.id, ["Pro"]);
    if (!hasAccess) {
      return c.json("FORBIDDEN", 403);
    }

    await next();
  });
};

export const requirePremiumPlan = () => {
  return createMiddleware(async (c, next) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json("UNAUTHORIZED", 401);
    }

    const hasAccess = await requireActivePlan(user.id, ["Premium"]);
    if (!hasAccess) {
      return c.json("FORBIDDEN", 403);
    }

    await next();
  });
};
