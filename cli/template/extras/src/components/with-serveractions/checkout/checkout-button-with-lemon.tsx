"use client";

import { useRouter } from "next/navigation";

import { RainbowButton } from "~/components/ui/rainbow-button";

interface CheckoutButtonProps {
  planName: string;
  variantId: number;
  createCheckoutAction: (data: {
    variantId: number;
    embed: boolean;
  }) => Promise<string | undefined>;
}

export function CheckoutButton({
  planName,
  variantId,
  createCheckoutAction,
}: CheckoutButtonProps) {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const url = await createCheckoutAction({
        variantId,
        embed: false,
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
