import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "~/server/db";
import { plans } from "~/server/db/schema";

const app = new Hono().get("/", async (c) => {
  const allPlans = await db.select().from(plans).orderBy(asc(plans.sort));

  return c.json(allPlans, 200);
});

export default app;
