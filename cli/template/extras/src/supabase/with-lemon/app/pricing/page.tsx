import Pricing from "~/components/pricing";
import { getUser } from "~/features/auth/queries";
import { getPlans, getSubscriptions } from "~/features/subscriptions/queries";
import { createClient } from "~/lib/supabase/server";

export default async function PricingPage() {
  const supabase = createClient();
  const [user, plans, subscriptions] = await Promise.all([
    getUser(supabase),
    getPlans(supabase),
    getSubscriptions(supabase),
  ]);

  return (
    <Pricing
      user={user}
      plans={plans ?? []}
      subscriptions={subscriptions || []}
    />
  );
}
