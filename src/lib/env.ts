import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
});

export type EnvSchema = z.infer<typeof envSchema>;

tryParseEnv(envSchema);

// eslint-disable-next-line node/no-process-env
export default envSchema.parse(process.env);
