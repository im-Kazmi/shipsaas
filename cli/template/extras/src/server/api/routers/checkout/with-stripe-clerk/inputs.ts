import { z } from "zod";

export const createCheckoutSchema = z.object({
  price: z.any(),
  redirectPath: z.string().default("/"),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
