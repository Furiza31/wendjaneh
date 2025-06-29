import * as z from "zod/v4";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email("Invalid email address").min(1, { error: "Email is required" }),
  password: z.string().min(8, { error: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { error: "Confirm Password is required" }),
}).refine(data => data.password === data.confirmPassword, {
  error: "Passwords do not match",
  path: ["confirmPassword"],
});

export type FormSchema = typeof formSchema;
