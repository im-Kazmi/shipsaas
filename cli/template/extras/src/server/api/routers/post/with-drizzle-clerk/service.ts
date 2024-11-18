import { and, desc, eq } from "drizzle-orm";

import { ContextType } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  UpdatePostInput,
} from "./input";

export async function createPost(ctx: ContextType, input: CreatePostInput) {
  const [newPost] = await ctx.db
    .insert(posts)
    .values({
      name: input.name,
      content: input.content,
      createdById: ctx.session.userId!,
    })
    .returning();
  return newPost;
}

export async function getPost(ctx: ContextType, input: GetPostInput) {
  const [post] = await ctx.db
    .select()
    .from(posts)
    .where(eq(posts.id, input.id))
    .limit(1);
  return post ?? null;
}

export async function getPosts(ctx: ContextType) {
  return ctx.db
    .select()
    .from(posts)
    .where(eq(posts.createdById, ctx.session.userId!))
    .orderBy(desc(posts.createdAt));
}

export async function deletePost(ctx: ContextType, input: DeletePostInput) {
  const [deletedPost] = await ctx.db
    .delete(posts)
    .where(eq(posts.id, input.id))
    .returning();
  return deletedPost ?? null;
}
export async function updatePost(ctx: ContextType, input: UpdatePostInput) {
  const [updatedPost] = await ctx.db
    .update(posts)
    .set({
      name: input.name,
      content: input.content,
    })
    .where(
      and(eq(posts.id, input.id), eq(posts.createdById, ctx.session.userId!))
    )
    .returning();
  return updatedPost ?? null;
}
