import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3).max(20),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({ error: "Email already in use" }, 400);
    }

    // Insert a new user into the database
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return c.json(null, 200);
  }
);

export default app;
