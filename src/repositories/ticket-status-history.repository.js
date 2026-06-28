import { TicketStatusHistory, User } from "../models/index.js";

class TicketStatusHistoryRepository {
  async create(data, options) {
    return TicketStatusHistory.create(data, options);
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
