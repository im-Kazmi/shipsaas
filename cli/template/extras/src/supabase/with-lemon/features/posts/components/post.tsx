import { Pencil, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { PostType } from "~/lib/types";

interface PostProps {
  post: PostType;
  onUpdate: (post: PostType) => void;
  onDelete: (id: string) => void;
}

export function Post({ post, onUpdate, onDelete }: PostProps) {
  return (
    <Card
      key={post.id}
      className="border-neutral-700 bg-neutral-800 text-white"
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-light">{post.title}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-light">{post.content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-400">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
    // <div className="flex items-start space-x-4 py-4">
    //   <div className="flex-1 min-w-0">
    //     <h3 className="text-lg font-semibold text-gray-900 truncate">
    //       {post.title}
    //     </h3>
    //     <p className="mt-1 text-sm text-gray-500 line-clamp-2">
    //       {post.content}
    //     </p>
    //     <p className="mt-1 text-xs text-gray-400">
    //       {new Date(post.created_at).toLocaleDateString()}
    //     </p>
    //   </div>
    //   <div className="flex items-center space-x-2">
    //     <Button
    //       variant="secondary"
    //       onClick={() => onUpdate(post)}
    //       className="text-gray-400 hover:text-gray-600"
    //     >
    //       <Pencil className="h-4 w-4" />
    //       <span className="sr-only">Edit</span>
    //     </Button>
    //     <Button
    //       variant="secondary"
    //       onClick={() => onDelete(post.id)}
    //       className="text-gray-400 hover:text-red-600"
    //     >
    //       <Trash2 className="h-4 w-4" />
    //       <span className="sr-only">Delete</span>
    //     </Button>
    //   </div>
    // </div>
  );
}
