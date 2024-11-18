"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

const postSchema = z.object({
  name: z.string().min(1, "Post name is required"),
  content: z.string().min(1, "Content is required"),
});

const postIdSchema = z.object({
  postId: z.string().uuid(),
});

export async function createPost(formData: FormData) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const user = session.user;

  const parsed = postSchema.parse({
    name: formData.get("name"),
    content: formData.get("content"),
  });

  const { name, content } = parsed;

  const [newPost] = await db
    .insert(posts)
    .values({
      name,
      content,
      createdById: session.user.id,
    })
    .returning();
  revalidatePath("/posts");
  return newPost;
}

export async function getPost(postId: string) {
  const parsed = postIdSchema.parse({ postId });

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parsed.postId));

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
}

export async function updatePost(formData: FormData) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const parsed = postSchema.merge(postIdSchema).parse({
    postId: formData.get("postId"),
    name: formData.get("name"),
    content: formData.get("content"),
  });

  const { postId, name, content } = parsed;

  const [updatedPost] = await db
    .update(posts)
    .set({ name, content })
    .where(and(eq(posts.id, postId), eq(posts.createdById, session.user.id)))
    .returning();

  if (!updatedPost) {
    throw new Error(
      "Post not found or you do not have permission to update it"
    );
  }
  revalidatePath("/posts");
  return updatedPost;
}

export async function deletePost(formData: FormData) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const parsed = postIdSchema.parse({
    postId: formData.get("postId"),
  });

  const { postId } = parsed;

  const [deletedPost] = await db
    .delete(posts)
    .where(and(eq(posts.id, postId), eq(posts.createdById, session.user.id)))
    .returning();

  if (!deletedPost) {
    throw new Error(
      "Post not found or you do not have permission to delete it"
    );
  }
  revalidatePath("/posts");
  return { message: "Post deleted successfully" };
}

export async function getUserPosts() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.createdById, session.user.id));

  return userPosts;
}