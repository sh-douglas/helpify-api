import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "The category must be at least 3 characters long."),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "The category must be at least 3 characters long.")
    .optional(),
});

export { createCategorySchema, updateCategorySchema };
