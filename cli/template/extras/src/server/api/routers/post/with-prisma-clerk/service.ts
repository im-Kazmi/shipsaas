import { ContextType } from "~/server/api/trpc";
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  UpdatePostInput,
} from "./input";

export async function createPost(ctx: ContextType, input: CreatePostInput) {
  const newPost = await ctx.db.post.create({
    data: {
      name: input.name,
      content: input.content,
      createdById: ctx.session.userId,
    },
  });
  return newPost;
}

export async function getPost(ctx: ContextType, input: GetPostInput) {
  const post = await ctx.db.post.findUnique({
    where: { id: input.id, createdById: ctx.session.userId },
  });
  return post ?? null;
}

export async function getPosts(ctx: ContextType) {
  return await ctx.db.post.findMany({
    where: { createdById: ctx.session.userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deletePost(ctx: ContextType, input: DeletePostInput) {
  const deletedPost = await ctx.db.post.delete({
    where: { id: input.id },
  });
  return deletedPost ?? null;
}

export async function updatePost(ctx: ContextType, input: UpdatePostInput) {
  const updatedPost = await ctx.db.post.update({
    where: { id: input.id },
    data: {
      name: input.name,
      content: input.content,
    },
  });
  return updatedPost ?? null;
}
