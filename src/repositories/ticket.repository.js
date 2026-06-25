import { Ticket } from "../models/index.js";

class TicketRepository {
  async create(data) {
    return Ticket.create(data);
  }

  async findAll() {
    return Ticket.findAll();
  }

  async findById(id) {
    return Ticket.findByPk(id);
  }

  async findAllByUserId(userId) {
    return Ticket.findAll({ where: { userId } });
  }

  async update(ticket, data) {
    return ticket.update(data);
  }

  async delete(ticket) {
    return ticket.destroy();
  }
}

export default new TicketRepository();
