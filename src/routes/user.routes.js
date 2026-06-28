import { Router } from "express";

import UserController from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import checkAllowedRoles from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/:id",
  authMiddleware,
  checkAllowedRoles(["ADMIN"]),
  UserController.findById,
);

router.get(
  "/",
  authMiddleware,
  checkAllowedRoles(["ADMIN"]),
  UserController.findAll,
);

router.patch(
  "/:id/role",
  authMiddleware,
  checkAllowedRoles(["ADMIN"]),
  UserController.updateRole,
);

export default router;
