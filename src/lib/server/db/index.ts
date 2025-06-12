import { createClient } from "@libsql/client";
import env from "$lib/env";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const client = createClient({
  url: env.DATABASE_URL,
});

export const db = drizzle(client, { schema });
