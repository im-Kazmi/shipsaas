"use client";

import { Edit } from "lucide-react";
import { useState } from "react";

import { updatePost } from "~/actions/posts";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

type Post = {
  id: string;
  name: string | null;
  content: string | null;
  createdAt: Date;
};

export function EditPostDialog({
  post,
  onUpdate,
}: {
  post: Post;
  onUpdate: (post: Post) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(post);

  const handleUpdatePost = async () => {
    const formData = new FormData();
    formData.append("postId", editingPost.id);
    formData.append("name", editingPost.name || "");
    formData.append("content", editingPost.content || "");
    const updatedPost = await updatePost(formData);
    setIsOpen(false);
    onUpdate(updatedPost);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Post title"
            value={editingPost.name || ""}
            onChange={(e) =>
              setEditingPost({ ...editingPost, name: e.target.value })
            }
          />
          <Textarea
            placeholder="Post content"
            value={editingPost.content || ""}
            onChange={(e) =>
              setEditingPost({ ...editingPost, content: e.target.value })
            }
          />
          <Button onClick={handleUpdatePost}>Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
