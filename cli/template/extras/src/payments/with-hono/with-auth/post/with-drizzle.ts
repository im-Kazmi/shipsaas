import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

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
    verifyAuth(),
    zValidator(
      "json",
      postSchema.extend({
        name: z.string().min(1, "Post name is required"),
        content: z.string().min(1, "Content is required"),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { name, content } = c.req.valid("json");

      const newPost = await db
        .insert(posts)
        .values({
          name,
          content,
          createdById: auth.token.id,
        })
        .returning();

      return c.json(newPost[0], 200);
    }
  )
  .get(
    "/:postId",
    verifyAuth(),
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
    verifyAuth(),
    zValidator("param", postIdSchema),
    zValidator("json", postSchema),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { postId } = c.req.valid("param");
      const { name, content } = c.req.valid("json");

      const [updatedPost] = await db
        .update(posts)
        .set({ name, content })
        .where(and(eq(posts.id, postId), eq(posts.createdById, auth.token.id)))
        .returning();

      return c.json(updatedPost, 200);
    }
  )

  .delete(
    "/:postId",
    verifyAuth(),
    zValidator("param", postIdSchema),
    async (c) => {
      const auth = c.get("authUser");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { postId } = c.req.valid("param");

      await db
        .delete(posts)
        .where(and(eq(posts.id, postId), eq(posts.createdById, auth.token.id)));

      return c.json({ message: "Post deleted successfully" });
    }
  )

  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.createdById, auth.token.id))
      .orderBy(posts.createdAt, "desc");

    return c.json(userPosts, 200);
  });

export default app;
