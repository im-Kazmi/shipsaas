"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getCustomerPortal } from "~/features/subscriptions/actions";
import { Tables } from "~/types_db";

type Subscriptions = Tables<"subscriptions">[];

interface Props {
  subscriptions: Subscriptions;
}

export function CustomerPortalForm({ subscriptions }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLemonPortalRequest = async () => {
    setIsSubmitting(true);
    const customerPortal = await getCustomerPortal();
    setIsSubmitting(false);
    return router.push(customerPortal!);
  };

  return (
    <Card className="w-full border-neutral-700 bg-transparent text-white">
      <CardHeader>
        <CardTitle>Your Plan</CardTitle>
        <CardDescription>
          {subscriptions && subscriptions.length > 0
            ? `You are currently on the ${subscriptions[0]?.plans.interval}ly ${subscriptions[0]?.plans.product_name}`
            : "You are not currently subscribed to any plan."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-semibold">
          {subscriptions && subscriptions.length > 0 ? (
            `$${subscriptions[0]?.plans.price / 100}/${subscriptions[0]?.plans.interval}`
          ) : (
            <Link href="/" className="text-primary hover:underline">
              Choose your plan
            </Link>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <p className="pb-4 sm:pb-0">
          Manage your subscription on LemonSqueezy.
        </p>
        <Button
          variant="secondary"
          onClick={handleLemonPortalRequest}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Open customer portal"}
        </Button>
      </CardFooter>
    </Card>
  );
}
