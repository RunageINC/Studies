import { z } from "zod";

export const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_ENABLE_API_DELAY: z
    .string()
    .default("false")
    .transform((value) => value === "true"),
  VITE_API_DELAY_TIME: z
    .string()
    .default("1000")
    .transform((value) => Number(value)),
});

export const env = envSchema.parse(import.meta.env);
