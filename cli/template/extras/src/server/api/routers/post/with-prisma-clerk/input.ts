import { z } from "zod";

export const createPostSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(3),
});

export const getPostSchema = z.object({
  id: z.string(),
});

export const deletePostSchema = z.object({
  id: z.string(),
});

export const updatePostSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  content: z.string().min(3),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type GetPostInput = z.infer<typeof getPostSchema>;
export type DeletePostInput = z.infer<typeof deletePostSchema>;
