import { CreatePost } from "~/features/posts/components/create-post";
import { Posts } from "~/features/posts/components/posts";
import { getPosts } from "~/features/posts/queries";
import { createClient } from "~/lib/supabase/client";

type PostType = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};
export default async function Page() {
  const supabase = createClient(); // make sure you import all createClients() from
  // @/lib/supabase/client if you are using it on the client side.
  const data = await getPosts(supabase);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="my-5 flex w-full justify-between">
        <h1 className="text-2xl font-light text-white">Posts</h1>
        <CreatePost />
      </div>
      <Posts posts={data} />
    </div>
  );
}
