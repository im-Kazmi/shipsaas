import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tables } from '@/types_db';

type PostType = Tables<'posts'>;

interface PostProps {
  post: PostType;
  onUpdate: (post: PostType) => void;
  onDelete: (id: string) => void;
}

export function Post({ post, onUpdate, onDelete }: PostProps) {
  return (
    <Card
      key={post.id}
      className="bg-neutral-800 border-neutral-700 text-white"
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className=" font-light">{post.title}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className=" font-light">{post.content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-400">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
