import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Username must be within 20 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
