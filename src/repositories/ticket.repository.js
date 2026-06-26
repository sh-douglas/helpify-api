import { Op } from "sequelize";
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
        {
          model: User,
          as: "assignedTechnician",
          attributes: ["id", "name", "email"],
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
        {
          model: User,
          as: "assignedTechnician",
          attributes: ["id", "name", "email"],
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
        {
          model: User,
          as: "assignedTechnician",
          attributes: ["id", "name", "email"],
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

  async countActiveByTechnicianId(technicianId) {
    return Ticket.count({
      where: {
        assignedToId: technicianId,
        status: {
          [Op.in]: ["OPEN", "IN_PROGRESS", "WAITING_USER"],
        },
      },
    });
  }
}

export default new TicketRepository();
