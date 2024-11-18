"use client";

import { useRouter } from "next/navigation";
import { createCheckoutSession } from "~/actions/checkout";

import { RainbowButton } from "~/components/ui/rainbow-button";

type Price = {
  type: string | null;
  active: boolean | null;
  id: string;
  description: string | null;
  metadata: unknown;
  productId: string | null;
  unitAmount: number | null;
  currency: string | null;
  interval: string | null;
  intervalCount: number | null;
  trialPeriodDays: number | null;
};

interface CheckoutButtonProps {
  planName: string | null;
  price: Price;
}

export function CheckoutButton({ planName, price }: CheckoutButtonProps) {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const url = await createCheckoutSession({
        price,
        redirectPath:
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      });
      router.push(url!);
    } catch (err) {
      console.error(err);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <RainbowButton onClick={handleCheckout} className="w-full">
      Select {planName}
    </RainbowButton>
  );
}
