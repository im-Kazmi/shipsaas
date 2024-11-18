import { NewSubscription, NewWebhookEvent, plans, subscriptions, webhookEvents } from "~/server/db/schema";
import { webhookHasData, webhookHasMeta } from "./typeguards";

import { configureLemonSqueezy } from "./lemon-squeezy";
import crypto from 'crypto'
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { getPrice } from "@lemonsqueezy/lemonsqueezy.js";

export async function storeWebhookEvent(eventName: string,
    body: NewWebhookEvent["body"],) {

    const [returnedValue] = await db
        .insert(webhookEvents)
        .values({
            eventName,
            processed: false,
            body,
        })
        .onConflictDoNothing({ target: plans.id })
        .returning();

    return returnedValue;
}


export async function processWebhookEvent(webhookEvent: NewWebhookEvent) {

    configureLemonSqueezy()

    const dbwebhookEvent = await db
        .select()
        .from(webhookEvents)
        .where(eq(webhookEvents.id, webhookEvent.id!));

    if (dbwebhookEvent.length < 1) {
        throw new Error(
            `Webhook event #${webhookEvent.id} not found in the database.`,
        );
    }


    let processingError = "";
    const eventBody = webhookEvent.body;


    if (!webhookHasMeta(eventBody)) {
        processingError = "Event body is missing the 'meta' property.";
    } else if (webhookHasData(eventBody)) {
        if (webhookEvent.eventName.startsWith("subscription_payment_")) {
        } else if (webhookEvent.eventName.startsWith("subscription_")) {
            const attributes = eventBody.data.attributes;
            const variantId = attributes.variant_id as string;

            const [plan] = await db
                .select()
                .from(plans)
                .where(eq(plans.variantId, parseInt(variantId, 10)));

            if (!plan) {
                processingError = `Plan with variantId ${variantId} not found.`;
            } else {

                const priceId = attributes.first_subscription_item.price_id;

                // Get the price data from Lemon Squeezy.
                const priceData = await getPrice(priceId);
                if (priceData.error) {
                    processingError = `Failed to get the price data for the subscription ${eventBody.data.id}.`;
                }

                const isUsageBased = attributes.first_subscription_item.is_usage_based;
                const price = isUsageBased
                    ? priceData.data?.data.attributes.unit_price_decimal
                    : priceData.data?.data.attributes.unit_price;

                const updateData: NewSubscription = {
                    lemonSqueezyId: eventBody.data.id,
                    orderId: attributes.order_id as number,
                    name: attributes.user_name as string,
                    email: attributes.user_email as string,
                    status: attributes.status as string,
                    statusFormatted: attributes.status_formatted as string,
                    renewsAt: attributes.renews_at as string,
                    endsAt: attributes.ends_at as string,
                    trialEndsAt: attributes.trial_ends_at as string,
                    price: price?.toString() ?? "",
                    isPaused: false,
                    subscriptionItemId: attributes.first_subscription_item.id,
                    isUsageBased: attributes.first_subscription_item.is_usage_based,
                    userId: eventBody.meta.custom_data.user_id,
                    planId: plan.id,
                };


                try {
                    await db.insert(subscriptions).values(updateData).onConflictDoUpdate({
                        target: subscriptions.lemonSqueezyId,
                        set: updateData,
                    });
                } catch (error) {
                    processingError = `Failed to upsert Subscription #${updateData.lemonSqueezyId} to the database.`;
                    console.error(error);
                }
            }

        } else if (webhookEvent.eventName.startsWith("order_")) {
            // Save orders; eventBody is a "Order"
            /* Not implemented */
            // Not required though
        } else if (webhookEvent.eventName.startsWith("license_")) {
            // Save license keys; eventBody is a "License key"
            /* Not implemented */
            // Not required though
        }

        await db
            .update(webhookEvents)
            .set({
                processed: true,
                processingError,
            })
            .where(eq(webhookEvents.id, webhookEvent.id!));
    }
}