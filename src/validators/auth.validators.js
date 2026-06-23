import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(6, "The name must be at least 6 characters long."),
    email: z.string().trim().lowercase().email("Invalid email address."),
    password: z
      .string()
      .min(6, "The password must be at least 6 characters long."),
    confirmPassword: z
      .string()
      .min(6, "The password must be at least 6 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().trim().lowercase().email("Invalid email address."),
  password: z.string().min(1),
});

export { registerSchema, loginSchema };
