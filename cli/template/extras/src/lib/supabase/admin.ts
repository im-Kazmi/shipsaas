import { createClient } from "@supabase/supabase-js";

import type { Database } from "~/lib/supabase/types";
import { getEnvVar } from "~/utils/get-env-var";

export const supabaseAdminClient = createClient<Database>(
  getEnvVar(process.env.NEXT_PUBLIC_SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_URL"),
  getEnvVar(process.env.SUPABASE_SERVICE_ROLE_KEY, "SUPABASE_SERVICE_ROLE_KEY")
);
