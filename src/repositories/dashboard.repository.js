import { Ticket } from "../models/index.js";

class DashboardRepository {
  async countTickets(filter) {
    return Ticket.count({
      where: filter,
    });
  }

  async countTicketsByStatus(filter, status) {
    return Ticket.count({
      where: { ...filter, status },
    });
  }

  async countTicketsByPriority(filter, priority) {
    return Ticket.count({
      where: { ...filter, priority },
    });
  }
}

export default new DashboardRepository();
