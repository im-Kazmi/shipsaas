import { Hono } from "hono";

import { db } from "~/server/db";

const app = new Hono().get("/", async (c) => {
  const plans = await db.plans.findMany({
    orderBy: {
      sort: "asc",
    },
  });

  return c.json(plans, 200);
});

export default app;
