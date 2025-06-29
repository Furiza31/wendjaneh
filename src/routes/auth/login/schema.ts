import * as z from "zod/v4";

export const formSchema = z.object({
  email: z.email("Invalid email address").min(1, { error: "Email is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});

export type FormSchema = typeof formSchema;
