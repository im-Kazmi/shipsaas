import { z } from "zod";

export const getSubscriptionUrlsSchema = z.string();

export type GetSubscriptionUrlsInput = z.infer<
  typeof getSubscriptionUrlsSchema
>;
