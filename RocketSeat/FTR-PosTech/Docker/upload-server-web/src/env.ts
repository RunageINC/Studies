import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.url().startsWith('postgresql://'),

  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_TOKEN_VALUE: z.string(),
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string(),

  AWS_ACCESS_KEY_ID: z.string(),
  AWS_ACCESS_KEY_SECRET: z.string(),

  SPECIFIC_ENDPOINT: z.string(),
});

export const env = envSchema.parse(process.env);
