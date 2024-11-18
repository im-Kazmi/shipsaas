"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "~/lib/auth";
import { db } from "~/server/db";

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

  const newPost = await db.post.create({
    data: {
      name,
      content,
      createdById: user.id,
    },
  });
  revalidatePath("/posts");
  return newPost;
}

export async function getPost(postId: string) {
  const parsed = postIdSchema.parse({ postId });

  const post = await db.post.findUnique({
    where: { id: parsed.postId },
  });

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

  const updatedPost = await db.post.updateMany({
    where: {
      id: postId,
      createdById: session.user.id,
    },
    data: {
      name,
      content,
    },
  });

  if (!updatedPost.count) {
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

  const deletedPost = await db.post.deleteMany({
    where: {
      id: postId,
      createdById: session.user.id,
    },
  });

  if (!deletedPost.count) {
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

  const userPosts = await db.post.findMany({
    where: {
      createdById: session.user.id,
    },
  });

  return userPosts;
}
