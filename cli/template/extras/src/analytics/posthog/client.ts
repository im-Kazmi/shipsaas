// use this just for server side capturings
// for client side views capturing please consider using
// posthogPageView provider placed in providers/posthog-pageview.tsx

import { PostHog } from "posthog-node";

export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
  return posthogClient;
}
