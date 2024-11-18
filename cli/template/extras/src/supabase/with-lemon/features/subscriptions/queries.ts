import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

import { Database } from "~/types_db";

export const getSubscriptions = cache(
  async (supabase: SupabaseClient<Database>) => {
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select(
        `
       *,
       plans (
         id,
         product_name,
         name,
         price,
         interval,
         description
       )
     `
      )
      .in("status", ["active"]);

    return subscriptions;
  }
);

export const getPlans = cache(async (supabase: SupabaseClient) => {
  const { data: plans, error } = await supabase
    .from("plans")
    .select("*")
    .order("sort");

  return plans;
});
