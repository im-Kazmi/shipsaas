import { Suspense } from "react";

import { getUserPosts } from "~/actions/posts";
import { CreatePostDialog } from "~/components/posts/create-post-dialog";
import { PostList } from "~/components/posts/post-list";

export default async function PostsPage() {
  const posts = await getUserPosts();

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">Posts</h1>
          <CreatePostDialog />
        </div>

        <Suspense fallback={<div>Loading posts...</div>}>
          <PostList initialPosts={posts} />
        </Suspense>

        {!posts.length && (
          <div className="m-auto text-center">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No posts
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new post.
            </p>
            <div className="mt-6">
              <CreatePostDialog />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
