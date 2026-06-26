import { Category, Ticket, User } from "../models/index.js";

class TicketRepository {
  async create(data) {
    return Ticket.create(data);
  }

  async findAll() {
    return Ticket.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async findById(id) {
    return Ticket.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async findAllByUserId(userId) {
    return Ticket.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async update(ticket, data) {
    return ticket.update(data);
  }

  async delete(ticket) {
    return ticket.destroy();
  }
}

export default new TicketRepository();
