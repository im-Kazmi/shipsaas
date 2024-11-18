import { getUser } from '../auth/queries';
import { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getPosts = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
});
