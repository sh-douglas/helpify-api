import CommentRepository from "../repositories/comment.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";

import { createCommentSchema } from "../validators/comment.validator.js";

import AppError from "../utils/app-error.js";

class CommentService {
  async create(ticketId, data, currentUser) {
    const cleanData = createCommentSchema.parse(data);
    const ticket = await TicketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError("Ticket not found.", 404);
    }

    this.validateTicketAccess(ticket, currentUser);

    const commentData = {
      content: cleanData.content,
      ticketId,
      userId: currentUser.id,
    };

    const newComment = await CommentRepository.create(commentData);

    const comment = await CommentRepository.findById(newComment.id);

    return { comment };
  }

  async findAllByTicketId(ticketId, currentUser) {
    const ticket = await TicketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError("Ticket not found.", 404);
    }

    this.validateTicketAccess(ticket, currentUser);

    const comments = await CommentRepository.findAllByTicketId(ticketId);

    return {
      comments,
    };
  }

  validateTicketAccess(ticket, currentUser) {
    if (currentUser.role.name === "ADMIN") {
      return;
    } else if (currentUser.role.name === "TECHNICIAN") {
      if (ticket.assignedToId !== currentUser.id) {
        throw new AppError("Forbidden.", 403);
      }

      return;
    } else if (currentUser.role.name === "USER") {
      if (ticket.userId !== currentUser.id) {
        throw new AppError("Forbidden.", 403);
      }
      return;
    } else {
      throw new AppError("Forbidden.", 403);
    }
  }
}

export default new CommentService();
