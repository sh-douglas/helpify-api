import { z } from "zod";

const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "The title must be at least 3 characters long."),
  description: z
    .string()
    .trim()
    .min(10, "The description must be at least 10 characters long."),
  categoryId: z.number().int().positive(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
});

const updateTicketSchema = z.object({
  status: z
    .enum(["OPEN", "IN_PROGRESS", "WAITING_USER", "RESOLVED", "CLOSED"])
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  categoryId: z.number().int().positive().optional(),
});

export { createTicketSchema, updateTicketSchema };
