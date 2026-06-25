import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import TicketController from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", authMiddleware, TicketController.create);
router.get("/", authMiddleware, TicketController.findAll);
router.get("/:id", authMiddleware, TicketController.findById);
router.patch("/:id", authMiddleware, TicketController.update);
router.delete("/:id", authMiddleware, TicketController.delete);

export default router;
