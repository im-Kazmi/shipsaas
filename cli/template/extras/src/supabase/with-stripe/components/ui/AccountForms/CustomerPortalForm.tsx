'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Tables } from '@/types_db';
import { createStripePortal } from '@/features/subscriptions/actions';
type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}
export function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Card className="w-full bg-transparent text-white border-neutral-700">
      <CardHeader>
        <CardTitle>Your Plan</CardTitle>
        <CardDescription>
          {subscription
            ? `You are currently on the
          ${subscription?.prices?.products?.name} plan.`
            : 'You are not currently subscribed to any plan'}
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-8 mb-4 text-xl font-semibold">
          {subscription ? (
            `${subscriptionPrice}/${subscription?.prices?.interval}`
          ) : (
            <Link href="/">Choose your plan</Link>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <p className="pb-4 sm:pb-0">
          Manage your subscription on LemonSqueezy.
        </p>
        <Button
          variant="secondary"
          loading={isSubmitting}
          onClick={handleStripePortalRequest}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Open customer portal'}
        </Button>
      </CardFooter>
    </Card>
  );
}
