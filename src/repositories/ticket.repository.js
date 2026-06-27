import { Op } from "sequelize";
import {
  Category,
  Ticket,
  TicketStatusHistory,
  User,
} from "../models/index.js";

const defaultIncludes = [
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
  {
    model: TicketStatusHistory,
    as: "statusHistories",
    attributes: [
      "id",
      "ticketId",
      "changedById",
      "oldStatus",
      "newStatus",
      "createdAt",
    ],
    include: {
      model: User,
      as: "changedBy",
      attributes: ["id", "name", "email"],
    },
  },
];

const statusHistoryOrder = [
  [
    {
      model: TicketStatusHistory,
      as: "statusHistories",
    },
    "createdAt",
    "ASC",
  ],
];

class TicketRepository {
  async create(data) {
    return Ticket.create(data);
  }

  async findAll() {
    return Ticket.findAll({
      include: defaultIncludes,
      order: statusHistoryOrder,
    });
  }

  async findById(id) {
    return Ticket.findByPk(id, {
      include: defaultIncludes,
      order: statusHistoryOrder,
    });
  }

  async findAllByUserId(userId) {
    return Ticket.findAll({
      where: { userId },
      include: defaultIncludes,
      order: statusHistoryOrder,
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
