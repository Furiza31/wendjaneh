/* eslint-disable node/no-process-env */
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL is not set");

export default defineConfig({
  schema: "./src/lib/server/db/schemas/index.ts",
  out: "./src/lib/server/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  casing: "snake_case",
  verbose: true,
  strict: true,
});
