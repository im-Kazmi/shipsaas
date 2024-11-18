"use client";

import { useRouter } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { api } from "~/trpc/react";
import { toDateTime } from "~/utils/helpers";

export default function page() {
  const router = useRouter();

  const { data: subscriptions, isLoading } =
    api.subscription.getUserSubscriptions.useQuery();

  const mutation = api.checkout.getCustomerPortal.useMutation({
    onSuccess: (url) => {
      router.push(url!);
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-10">
      <div className="flex justify-between">
        <h1 className="text-3xl">Subscriptions</h1>
        <RainbowButton onClick={() => mutation.mutate()}>
          Customer portal
        </RainbowButton>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions &&
          subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-lg border border-neutral-800 p-6 shadow-md"
            >
              <div className="flex justify-between">
                <h2 className="mb-2 text-xl font-semibold">
                  {sub.productName}
                </h2>
                <h2 className="mb-2 text-xl font-semibold">
                  ${Number(sub.price) / 100}/{" "}
                  <p className="text-xs">{sub.interval}</p>
                </h2>
              </div>
              <div className="flex justify-between">
                <Badge>{sub.status}</Badge>
                {sub.cancelAt && (
                  <Badge variant="destructive">
                    cancels on{" "}
                    {new Date(sub.cancelAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "numeric",
                    })}
                  </Badge>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
