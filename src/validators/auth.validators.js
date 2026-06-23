import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().trim().min(6, "Nome deve conter no mínimo 6 caracteres."),
    email: z.string().trim().lowercase().email("E-mail inválido."),
    password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "Senha deve conter no mínimo 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().trim().lowercase().email("E-mail inválido."),
  password: z.string().min(1),
});

export { registerSchema, loginSchema };
