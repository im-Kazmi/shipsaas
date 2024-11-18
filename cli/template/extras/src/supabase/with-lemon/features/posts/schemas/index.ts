import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(5)
});

export const UpdatePostSchema = z.object({
  postId: z.string(),
  title: z.string().min(3),
  content: z.string().min(5)
});

export const DeletePostSchema = z.object({
  postId: z.string()
});
