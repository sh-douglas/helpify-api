import { TicketStatusHistory, User } from "../models/index.js";

class TicketStatusHistoryRepository {
  async create(data) {
    return TicketStatusHistory.create(data);
  }

  async findAllByTicketId(ticketId) {
    return TicketStatusHistory.findAll({
      where: { ticketId },
      include: {
        model: User,
        as: "changedBy",
        attributes: ["id", "name", "email"],
      },
      order: [["createdAt", "ASC"]],
    });
  }
}

export default new TicketStatusHistoryRepository();
