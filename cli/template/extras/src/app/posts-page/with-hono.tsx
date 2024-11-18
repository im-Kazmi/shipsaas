"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/lib/client";

// i would recommend move these types to a separate file
type Post = {
  id: string;
  name: string | null;
  content: string | null;
  createdAt: Date;
};

type CreatepostResType = InferResponseType<(typeof api.posts)["$post"], 200>;
type CreatePostReqType = InferRequestType<(typeof api.posts)["$post"]>["json"];

type UpdatepostResType = InferResponseType<
  (typeof api.posts)[":postId"]["$put"],
  200
>;
type UpdatePostReqType = InferRequestType<
  (typeof api.posts)[":postId"]["$put"]
>["json"];

type GetpostResType = InferResponseType<(typeof api.posts)["$get"], 200>;

// i would recommend move these types to a separate file

export default function PostsPage() {
  const [newPost, setNewPost] = useState({ name: "", content: "" });
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    refetch: refetchPosts,
  } = useQuery<GetpostResType>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.posts.$get();

      if (!res.ok) {
        throw new Error("error getting posts!");
      }

      const data = await res.json();

      return data;
    },
  });

  const createPostMutation = useMutation<
    CreatepostResType,
    Error,
    CreatePostReqType
  >({
    mutationFn: async (json) => {
      const res = await api.posts.$post({
        json,
      });

      if (!res.ok) {
        throw new Error("cannot create post!");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsCreateDialogOpen(false);
    },
    onError: (err: any) => {},
  });

  const updatePostMutation = useMutation<
    UpdatepostResType,
    Error,
    UpdatePostReqType
  >({
    mutationFn: async (json) => {
      const res = await api.posts[":postId"].$put({
        param: { postId: editingPost?.id! },
        json,
      });

      if (!res.ok) {
        throw new Error("cannot create post!");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsEditDialogOpen(false);
    },
    onError: (err: any) => {},
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const res = await api.posts[":postId"].$delete({
        param: { postId },
      });

      if (!res.ok) {
        throw new Error("cannot delete post!");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({
        queryKey: ["posts", { id: editingPost?.id! }],
      });
    },
    onError: () => {},
  });

  const handleCreatePost = () => {
    console.log(newPost);
    createPostMutation.mutate(newPost);
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      updatePostMutation.mutate({
        name: editingPost.name!,
        content: editingPost.content!,
      });
    }
  };

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">Posts</h1>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger>
              <RainbowButton>
                <Plus className="mr-2 h-4 w-4" /> Create Post
              </RainbowButton>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Post title"
                  className="border-neutral-800"
                  value={newPost.name}
                  onChange={(e) =>
                    setNewPost({ ...newPost, name: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Post content"
                  className="border-neutral-800"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                />
                <Button onClick={handleCreatePost}>Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts &&
            posts.map((post) => (
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
                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger></DialogTrigger>
                      <DialogContent className="">
                        <DialogHeader>
                          <DialogTitle>Edit Post</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Input
                            placeholder="Post title"
                            value={editingPost?.name || ""}
                            onChange={(e) =>
                              setEditingPost((prev) =>
                                prev ? { ...prev, name: e.target.value } : null
                              )
                            }
                          />
                          <Textarea
                            placeholder="Post content"
                            value={editingPost?.content || ""}
                            onChange={(e) =>
                              setEditingPost((prev) =>
                                prev
                                  ? { ...prev, content: e.target.value }
                                  : null
                              )
                            }
                          />
                          <Button onClick={handleUpdatePost}>Update</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditDialogOpen(true);
                        setEditingPost(post);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
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
        {!isLoading && !posts?.length && (
          <div className="m-auto text-center">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No posts
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new post.
            </p>
            <div className="mt-6">
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="inline-flex items-center px-4 py-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
