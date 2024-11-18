"use client";

import { useRouter } from "next/navigation";

import { Navbar } from "~/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { Price } from "~/server/db/schema";
import { api } from "~/trpc/react";

export default function Home() {
  const router = useRouter();

  const { data: products, isLoading } = api.products.getProducts.useQuery();

  const checkoutMutation = api.checkout.createCheckout.useMutation({
    onSuccess: (data) => {
      router.push(data.checkoutUrl!);
    },
  });

  const onCheckout = (price: Price) => {
    checkoutMutation.mutate({
      price,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-black dark:bg-black dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-w-screen flex min-h-screen flex-col items-center leading-6">
      <div className="m-auto flex flex-col items-center">
        <h1 className="max-w-[1120px] scroll-m-20 bg-gradient-to-r from-black via-neutral-600 to-neutral-800 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-neutral-400 dark:to-neutral-600">
          Choose Your Plan
        </h1>
        <p className="mx-auto mt-4 max-w-[400px] text-center text-gray-600 dark:text-gray-400">
          Select the perfect plan for your needs
        </p>

        <div className="mt-5 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          {products &&
            products.map((product) => (
              <Card
                key={product.id}
                className="border-neutral-200 bg-neutral-50 text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-neutral-600 dark:text-neutral-400">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="my-4 text-4xl font-bold">
                    ${product.price.unitAmount! / 100}
                    <span className="text-lg font-normal text-neutral-600 dark:text-neutral-400">
                      /month
                    </span>
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Core functionality
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Premium support
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Advanced features
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <RainbowButton
                    onClick={() => onCheckout(product.price!)}
                    className="w-full"
                  >
                    Select {product.name}
                  </RainbowButton>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
