import { env } from "$env/dynamic/private";
import * as z from "zod/v4";

import tryParseEnv from "./try-parse-env";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

tryParseEnv(envSchema, env);

export default envSchema.parse(env);
