import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { authMiddleware } from "../middleware";

const postSchema = z.object({
  name: z.string().optional(),
  content: z.string().optional(),
});

const postIdSchema = z.object({
  postId: z.string().uuid(),
});

const app = new Hono()
  .post(
    "/",
    authMiddleware(),
    zValidator(
      "json",
      postSchema.extend({
        name: z.string().min(1, "Post name is required"),
        content: z.string().min(1, "Content is required"),
      })
    ),
    async (c) => {
      const user = c.get("user");

      if (!user || !user?.id) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400
        );
      }
      const { name, content } = c.req.valid("json");

      const newPost = await db
        .insert(posts)
        .values({
          name,
          content,
          createdById: user.id,
        })
        .returning();

      return c.json(newPost[0], 200);
    }
  )
  .get(
    "/:postId",
    authMiddleware(),
    zValidator("param", postIdSchema),
    async (c) => {
      const { postId } = c.req.valid("param");

      const [post] = await db.select().from(posts).where(eq(posts.id, postId));

      if (!post) {
        return c.json({ error: "Post not found" }, 404);
      }

      return c.json(post, 200);
    }
  )
  .put(
    "/:postId",
    authMiddleware(),
    zValidator("param", postIdSchema),
    zValidator("json", postSchema),
    async (c) => {
      const user = c.get("user");

      if (!user || !user?.id) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400
        );
      }
      const { postId } = c.req.valid("param");
      const { name, content } = c.req.valid("json");

      const [updatedPost] = await db
        .update(posts)
        .set({ name, content })
        .where(and(eq(posts.id, postId), eq(posts.createdById, user.id)))
        .returning();

      return c.json(updatedPost, 200);
    }
  )

  .delete(
    "/:postId",
    authMiddleware(),
    zValidator("param", postIdSchema),
    async (c) => {
      const user = c.get("user");

      if (!user || !user?.id) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400
        );
      }
      const { postId } = c.req.valid("param");

      await db
        .delete(posts)
        .where(and(eq(posts.id, postId), eq(posts.createdById, user.id)));

      return c.json({ message: "Post deleted successfully" });
    }
  )

  .get("/", authMiddleware(), async (c) => {
    const user = c.get("user");

    if (!user || !user?.id) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400
      );
    }
    const userPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.createdById, user.id))
      .orderBy(posts.createdAt, "desc");

    return c.json(userPosts, 200);
  });

export default app;
