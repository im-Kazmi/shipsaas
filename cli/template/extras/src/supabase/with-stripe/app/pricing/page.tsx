import { Pricing } from '@/components/pricing';
import { createClient } from '@/lib/supabase/server';
import { getProducts, getSubscription } from '@/features/subscriptions/queries';
import { getUser } from '@/features/auth/queries';
export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <Pricing
      user={user}
      products={products ?? []}
      subscription={subscription}
    />
  );
}
