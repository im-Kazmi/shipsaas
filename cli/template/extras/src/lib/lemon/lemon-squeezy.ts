import { Subscription, getSubscription, lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export function configureLemonSqueezy() {
    const requiredVars = [
        "LEMON_SQUEEZY_API_KEY",
        "LEMON_SQUEEZY_STORE_ID",
        "LEMON_SQUEEZY_WEBHOOK_SIGNING_SECRET",
    ];

    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required LEMONSQUEEZY env variables: ${missingVars.join(", ")}. Please, set them in your .env file.`,
        );
    }

    lemonSqueezySetup({
        apiKey: process.env.LEMON_SQUEEZY_API_KEY,
        onError: (error) => {
            console.error(error);
            throw new Error(`Lemon Squeezy API error: ${error.message}`);
        },
    });
}

export async function getSubscriptionURLs({ id }: { id: string }) {
    configureLemonSqueezy();
    const subscription = await getSubscription(id);

    if (subscription.error) {
        throw new Error(subscription.error.message);
    }

    return subscription.data?.data.attributes.urls;
}

export function isValidSubscription(
    status: Subscription["data"]["attributes"]["status"],
) {
    return status !== "cancelled" && status !== "expired" && status !== "unpaid";
}