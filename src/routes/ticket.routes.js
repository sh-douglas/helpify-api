import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import TicketController from "../controllers/ticket.controller.js";
import CommentController from "../controllers/comment.controller.js";
import ticketStatusHistoryController from "../controllers/ticket-status-history.controller.js";

const router = Router();

router.post("/", authMiddleware, TicketController.create);
router.get("/", authMiddleware, TicketController.findAll);
router.get("/:id", authMiddleware, TicketController.findById);
router.patch("/:id", authMiddleware, TicketController.update);
router.delete("/:id", authMiddleware, TicketController.delete);

router.post("/:ticketId/comments", authMiddleware, CommentController.create);
router.get(
  "/:ticketId/comments",
  authMiddleware,
  CommentController.findAllByTicketId,
);

router.get(
  "/:ticketId/status-histories",
  authMiddleware,
  ticketStatusHistoryController.findAllByTicketId,
);

export default router;
