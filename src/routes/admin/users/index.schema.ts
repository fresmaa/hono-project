import { z } from "zod";

export const apimSchema = z.object({
  access_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

export const defaultResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any(),
});

export const errorSchema = z.object({
  message: z.string(),
  error: z.string(),
  data: z.string(),
  success: z.boolean().default(false),
});
