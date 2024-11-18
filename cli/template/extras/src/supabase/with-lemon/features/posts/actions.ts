"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getUser } from "~/features/auth/queries";
import {
  CreatePostSchema,
  DeletePostSchema,
  UpdatePostSchema,
} from "~/features/posts/schemas";
import { createClient } from "~/lib/supabase/server";

export async function createPost(values: z.infer<typeof CreatePostSchema>) {
  const supabase = createClient();

  const user = await getUser(supabase);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([
      { user_id: user?.id, title: values.title, content: values.content },
    ]);
  if (error) throw new Error(error.message);
  revalidatePath("/posts");
  return data;
}

export async function updatePost(values: z.infer<typeof UpdatePostSchema>) {
  const supabase = createClient();

  const user = await getUser(supabase);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  const { title, content, postId } = values;

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", postId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/posts");
  return data;
}

export async function deletePost({ postId }: z.infer<typeof DeletePostSchema>) {
  const supabase = createClient();

  const user = await getUser(supabase);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/posts");
  return data;
}
