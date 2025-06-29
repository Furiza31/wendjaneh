import * as z from "zod/v4";

export default function tryParseEnv<T extends z.ZodType>(
  EnvSchema: T,
  // eslint-disable-next-line node/no-process-env
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    EnvSchema.parse(buildEnv);
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      let message = "Missing or invalid environment variables:\n";
      error.issues.forEach((issue) => {
        message += `\t- ${issue.path[0].toString()}\n`;
      });
      const e = new Error(message);
      e.stack = "";
      throw e;
    }
    else {
      console.error(error);
    }
  }
}
