'use client';
import { Button } from '~/components/ui/button';
import type { Tables } from '~/types_db';
import { getErrorRedirect } from '~/utils/helpers';
import { User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  checkoutWithLemon,
  getCustomerPortal
} from '~/features/subscriptions/actions';
import { isValidSubscription } from '~/lib/lemon/lemon-squeezy';

type Plans = Tables<'plans'>[];

type Subscriptions = Tables<'subscriptions'>[];

interface Props {
  user: User | null | undefined;
  plans: Plans;
  subscriptions: Subscriptions | null;
}

type BillingInterval = 'year' | 'month';

export function Pricing({ user, plans, subscriptions }: Props) {
  const intervals = Array.from(
    new Set(plans.flatMap((plan) => plan?.interval))
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [loading, setLoading] = useState<string>('');
  const currentPath = usePathname();

  const monthlyPlans =
    plans && plans.filter((plan) => plan.interval === 'month');
  const yearlyPlans = plans && plans.filter((plan) => plan.interval === 'year');

  const plansToShow = billingInterval === 'month' ? monthlyPlans : yearlyPlans;

  const onCheckout = async (variantId: number) => {
    setLoading('checkout' + variantId);
    if (!user) {
      setLoading('');
      return router.push('/signin/signup');
    }

    const { checkoutUrl } = await checkoutWithLemon(variantId, true);

    if (checkoutUrl) {
      router.push(checkoutUrl);
    }
    setLoading('');
  };

  const isSubscribed = (planId: number) => {
    return subscriptions?.some(
      (sub) => sub.plan_id === planId && isValidSubscription(sub.status)
    );
  };

  if (!plans.length) {
    return (
      <section className="">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://app.lemonsqueezy.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Lemonsqeezy Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extralight text-white sm:text-center sm:text-6xl text-transparent bg-clip-text bg-gradient from-neutral-50 to-neutral-300">
              Pricing Plans
            </h1>
            <p className="max-w-2xl font-light m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative self-center mt-6  rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
              {intervals.includes('month') && (
                <button
                  onClick={() => setBillingInterval('month')}
                  className={`${
                    billingInterval === 'month'
                      ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Monthly billing
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  className={`${
                    billingInterval === 'year'
                      ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Yearly billing
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {plansToShow.map((plan) => {
              const priceString = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'usd',
                minimumFractionDigits: 0
              }).format((plan.price || 0) / 100);

              return (
                <div
                  key={plan.id}
                  className={cn(
                    'flex flex-col bg-neutral-900 border  border-neutral-700 rounded-xl text-white',
                    'flex-1',
                    'basis-1/3',
                    'max-w-xs'
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-light ">
                      {plan.product_name}
                    </h2>
                    <p className="mt-4 ">{plan.description}</p>
                    <p className="mt-8">
                      <span className="text-5xl font-light">{priceString}</span>
                      <span className="text-base font-light">
                        /{billingInterval}
                      </span>
                    </p>
                    {isSubscribed(plan.id) ? (
                      <Button
                        variant="default"
                        loading={loading === 'customer_portal' + plan.id}
                        onClick={async () => {
                          setLoading('customer_portal' + plan.id);
                          const customerPortal = await getCustomerPortal();
                          router.push(customerPortal || '/');
                          setLoading('');
                        }}
                        className=" w-full py-2 mt-8 text-sm rounded-xl "
                      >
                        Manage
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        loading={loading === 'checkout' + plan.variant_id}
                        onClick={() => onCheckout(plan.variant_id)}
                        className=" w-full py-2 mt-8 text-sm f text-center  rounded-xl"
                      >
                        Subscribe
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
