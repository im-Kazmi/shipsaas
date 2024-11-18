"use client";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "~/lib/client";
import { InferResponseType } from "hono";

type GetCustomerPortalResType = InferResponseType<
  (typeof api.checkout)["get-customer-portal"]["$post"],
  200
>;

type GetSubscriptionsResType = InferResponseType<
  (typeof api.subscriptions)["$get"],
  200
>;

export default function page() {
  const router = useRouter();

  const { data: subscriptions, isLoading } = useQuery<GetSubscriptionsResType>({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const res = await api.subscriptions.$get();

      if (!res.ok) {
        throw new Error("error getting subscriptions!");
      }

      return res.json();
    },
  });

  const mutation = useMutation<GetCustomerPortalResType>({
    mutationFn: async () => {
      const res = await api.checkout["get-customer-portal"].$post();

      if (!res.ok) {
        throw new Error("cannot create checkout session.!");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (url) => {
      router.push(url!);
    },
    onError: (err: any) => {},
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
                <h2 className="mb-2 text-2xl font-semibold">
                  ${sub?.price / 100}
                </h2>
              </div>
              <p className="mb-4 text-gray-600">{sub.interval}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
