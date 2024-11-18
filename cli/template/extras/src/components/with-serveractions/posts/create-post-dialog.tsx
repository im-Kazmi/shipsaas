"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createPost } from "~/actions/posts";
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

export function CreatePostDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState({ name: "", content: "" });
  const router = useRouter();

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("name", newPost.name);
    formData.append("content", newPost.content);
    await createPost(formData);
    setIsOpen(false);
    setNewPost({ name: "", content: "" });
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <RainbowButton>
          <Plus className="mr-2 h-4 w-4" /> Create Post
        </RainbowButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Post title"
            className="border-neutral-800"
            value={newPost.name}
            onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
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
  );
}
