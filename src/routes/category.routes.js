import { Router } from "express";

import checkAllowedRoles from "../middlewares/role.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import CategoryController from "../controllers/category.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  checkAllowedRoles(["ADMIN"]),
  CategoryController.create,
);

router.get("/", authMiddleware, CategoryController.findAll);

router.get("/:id", authMiddleware, CategoryController.findById);

router.patch(
  "/:id",
  authMiddleware,
  checkAllowedRoles(["ADMIN"]),
  CategoryController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  checkAllowedRoles(["ADMIN"]),
  CategoryController.delete,
);

export default router;
