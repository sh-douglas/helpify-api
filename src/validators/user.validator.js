import { z } from "zod";

const updateUserRoleSchema = z.object({
  role: z.enum(["ADMIN", "TECHNICIAN", "USER"]),
});

export { updateUserRoleSchema };
