"use client";

import { Separator } from "@/components/ui/separator";
import { deletePost, updatePost } from "@/features/posts/actions";
import { Post } from "@/features/posts/components/post";
import { Tables } from "@/types_db";

type PostType = Tables<"posts">;

type PostsProps = {
  posts: PostType[];
};

export function Posts({ posts }: PostsProps) {
  async function onDelete(id: string) {
    await deletePost({ postId: id });
  }
  async function onUpdate(post: PostType) {
    // await updatePost({})
  }
  return (
    <div className="mx-auto max-w-2xl space-y-2">
      {posts.map((post, index) => (
        <div key={post.id}>
          <Post post={post} onUpdate={onUpdate} onDelete={onDelete} />
          {index < posts.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
