import crypto from "node:crypto";

import { webhookHasMeta } from "~/lib/lemon/typeguards";
import {
  processWebhookEvent,
  storeWebhookEvent,
} from "~/lib/lemon/webhooks-utils";

export async function POST(request: Request) {
  if (!process.env.LEMON_SQUEEZY_WEBHOOK_SIGNING_SECRET) {
    return new Response("Lemon Squeezy Webhook Secret not set in .env", {
      status: 500,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*             First, make sure the request is from Lemon Squeezy.            */
  /* -------------------------------------------------------------------------- */

  // Get the raw body content.
  const rawBody = await request.text();

  // Get the webhook secret from the environment variables.
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNING_SECRET;

  // Get the signature from the request headers.
  const signature = Buffer.from(
    request.headers.get("X-Signature") ?? "",
    "hex"
  );

  // Create a HMAC-SHA256 hash of the raw body content using the secret and
  // compare it to the signature.
  const hmac = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex"
  );

  if (!crypto.timingSafeEqual(hmac, signature)) {
    return new Response("Invalid signature", { status: 400 });
  }

  const data = JSON.parse(rawBody) as unknown;

  // Type guard to check if the object has a 'meta' property.
  if (webhookHasMeta(data)) {
    const webhookEvent = await storeWebhookEvent(data.meta.event_name, data);

    // Non-blocking call to process the webhook event.
    if (webhookEvent) {
      void processWebhookEvent(webhookEvent);

      return new Response("OK", { status: 200 });
    } else {
      return new Response("webhook event not found", { status: 400 });
    }
  }

  return new Response("Data invalid", { status: 400 });
}
