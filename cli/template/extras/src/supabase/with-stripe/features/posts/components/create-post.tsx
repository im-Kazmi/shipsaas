'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreatePostSchema } from '@/features/posts/schemas';
import { createPost } from '@/features/posts/actions';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
export function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema)
  });

  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    setIsLoading(true);
    try {
      const d = await createPost(values);
    } catch (error) {
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="p-2 bg-blue-500 text-white rounded-md">
        <Button variant="secondary">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-neutral-950 border text-white border-neutral-800">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Create a new post</DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <Input
                id="title"
                type="text"
                {...register('title')}
                className=" bg-transparent border-neutral-700"
                placeholder="Enter your post title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <Textarea
                id="content"
                {...register('content')}
                className=" bg-transparent border-neutral-700"
                placeholder="Write your post content here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.content.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="w-full mt-5">
              {isLoading ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
