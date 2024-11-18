"use client";

import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

import { deletePost } from "~/actions/posts";
import { EditPostDialog } from "~/components/posts/update-post-dialog";
import { Button } from "~/components/ui/button";
import { RainbowButton } from "~/components/ui/rainbow-button";

type Post = {
  id: string;
  name: string | null;
  content: string | null;
  createdAt: Date;
};

export function PostList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);

  const handleDeletePost = async (postId: string) => {
    const formData = new FormData();
    formData.append("postId", postId);
    await deletePost(formData);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg border border-neutral-300 p-6 dark:border-neutral-800"
        >
          <h2 className="mb-2 text-xl font-semibold">{post.name}</h2>
          <p className="mb-4 text-gray-600">{post.content}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <div className="space-x-2">
              <EditPostDialog
                post={post}
                onUpdate={(updatedPost) => {
                  setPosts(
                    posts.map((p) =>
                      p.id === updatedPost.id ? updatedPost : p
                    )
                  );
                }}
              />
              <RainbowButton
                className="w-fit"
                onClick={() => handleDeletePost(post.id)}
              >
                <Trash2 className="h-4 w-4" />
              </RainbowButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
