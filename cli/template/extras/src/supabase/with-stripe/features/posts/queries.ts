import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getPosts = cache(async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
});
