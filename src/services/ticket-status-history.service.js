import TicketRepository from "../repositories/ticket.repository.js";
import TicketStatusHistoryRepository from "../repositories/ticket-status-history.repository.js";

import AppError from "../utils/app-error.js";

class TicketStatusHistoryService {
  async findAllByTicketId(ticketId, currentUser) {
    const ticket = await TicketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError("Ticket not found.", 404);
    }

    this.validateTicketAccess(ticket, currentUser);

    const statusHistories =
      await TicketStatusHistoryRepository.findAllByTicketId(ticket.id);

    return {
      statusHistories,
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

export default new TicketStatusHistoryService();
