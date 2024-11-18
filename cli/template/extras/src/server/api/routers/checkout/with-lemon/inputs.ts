import { z } from "zod";

export const createCheckoutSchema = z.object({
  variantId: z.number(),
  embed: z.boolean().default(false),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
