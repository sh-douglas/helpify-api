import { z } from "zod";

const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(5, "The comment must be at least 5 characters long.")
    .max(1000, "The comment cannot be longer than 1,000 characters."),
});

export { createCommentSchema };
