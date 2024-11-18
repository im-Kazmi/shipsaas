import { getPrice } from "@lemonsqueezy/lemonsqueezy.js";

import { supabaseAdmin } from "~/lib/supabase/admin";
import { createClient } from "~/lib/supabase/client";
import { configureLemonSqueezy } from "./lemon-squeezy";
import { webhookHasData, webhookHasMeta } from "./typeguards";

export async function storeWebhookEvent(eventName: string, body: any) {
  const { data, error } = await supabaseAdmin
    .from("webhookevent")
    .insert([
      {
        eventname: eventName,
        processed: false,
        body,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting webhook event:", error);
  }

  return data?.[0];
}

export async function processWebhookEvent(webhookEvent: any) {
  configureLemonSqueezy();

  const { data: dbWebhookEvent, error: fetchError } = await supabaseAdmin
    .from("webhookevent")
    .select("*")
    .eq("id", webhookEvent.id);

  if (dbWebhookEvent?.length < 1) {
    throw new Error(
      `Webhook event #${webhookEvent.id} not found in the database.`
    );
  }

  let processingError = "";
  const eventBody = webhookEvent.body;

  if (!webhookHasMeta(eventBody)) {
    processingError = "Event body is missing the 'meta' property.";
  } else if (webhookHasData(eventBody)) {
    if (webhookEvent.eventname.startsWith("subscription_payment_")) {
      // Save subscription invoices (Not implemented). not needed unless you want to do something with invoices
    } else if (webhookEvent.eventname.startsWith("subscription_")) {
      const attributes = eventBody.data.attributes;
      const variantId = attributes.variant_id as string;

      // We assume that the Plan table is up to date.
      const { data: planData, error: planError } = await supabaseAdmin
        .from("plans")
        .select("*")
        .eq("variant_id", parseInt(variantId, 10));

      if (planError || planData?.length < 1) {
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

        const updateData = {
          lemon_squeezy_id: eventBody.data.id,
          order_id: attributes.order_id as number,
          name: attributes.user_name as string,
          email: attributes.user_email as string,
          status: attributes.status as string,
          status_formatted: attributes.status_formatted as string,
          renews_at: attributes.renews_at as string,
          ends_at: attributes.ends_at as string,
          trial_ends_at: attributes.trial_ends_at as string,
          price: price?.toString() ?? "",
          is_paused: false,
          subscription_item_id: attributes.first_subscription_item.id,
          is_usage_based: attributes.first_subscription_item.is_usage_based,
          user_id: eventBody.meta.custom_data.user_id,
          plan_id: planData[0].id,
        };

        const { error: upsertError } = await supabaseAdmin
          .from("subscriptions")
          .upsert(updateData, { onConflict: "lemon_squeezy_id" });

        if (upsertError) {
          processingError = `Failed to upsert Subscription #${updateData.lemon_squeezy_id} to the database.`;
          console.error(upsertError);
        }
      }
    } else if (webhookEvent.eventname.startsWith("order_")) {
      // Save orders (Not implemented) Not needed though
    } else if (webhookEvent.eventname.startsWith("license_")) {
      // Save license keys (Not implemented) Not needed though
    }

    const { error: updateError } = await supabaseAdmin
      .from("webhookevent")
      .update({
        processed: true,
        processingerror: processingError,
      })
      .eq("id", webhookEvent.id);

    if (updateError) {
      console.error("Error updating webhook event:", updateError);
    }
  }
}
