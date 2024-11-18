import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "~/server/db";
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
          200
        );
      }

      const { name, content } = c.req.valid("json");

      const newPost = await db.post.create({
        data: {
          name,
          content,
          createdById: user.id,
        },
      });

      return c.json(newPost, 200);
    }
  )
  .get(
    "/:postId",
    authMiddleware(),
    zValidator("param", postIdSchema),
    async (c) => {
      const { postId } = c.req.valid("param");

      const post = await db.post.findUnique({
        where: { id: postId },
      });

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
          200
        );
      }

      const { postId } = c.req.valid("param");
      const { name, content } = c.req.valid("json");

      const updatedPost = await db.post.updateMany({
        where: {
          id: postId,
          createdById: user.id,
        },
        data: {
          name,
          content,
        },
      });

      if (updatedPost.count === 0) {
        return c.json({ error: "Post not found or unauthorized" }, 404);
      }

      return c.json({ message: "Post updated successfully" }, 200);
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
          200
        );
      }

      const { postId } = c.req.valid("param");

      const deletedPost = await db.post.deleteMany({
        where: {
          id: postId,
          createdById: user.id,
        },
      });

      if (!deletedPost) {
        return c.json({ error: "Post not found or unauthorized" }, 404);
      }

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
        200
      );
    }

    const userPosts = await db.post.findMany({
      where: { createdById: user.id },
      orderBy: { createdAt: "desc" },
    });

    return c.json(userPosts, 200);
  });

export default app;
