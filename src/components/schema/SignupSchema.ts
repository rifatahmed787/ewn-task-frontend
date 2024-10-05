import { z } from "zod";

// Zod schema for validation
export const signUpSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters long"),
  language: z.string().min(2, "Language must be at least 2 characters long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot be longer than 100 characters"),
  confirmpassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long")
    .max(100, "Confirm Password cannot be longer than 100 characters"),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords do not match",
  path: ["confirmpassword"], 
});