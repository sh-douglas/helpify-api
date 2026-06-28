import DashboardRepository from "../repositories/dashboard.repository.js";

import AppError from "../utils/app-error.js";

class DashboardService {
  async summary(currentUser) {
    let filter;
    if (currentUser.role.name === "ADMIN") {
      filter = {};
    } else if (currentUser.role.name === "TECHNICIAN") {
      filter = { assignedToId: currentUser.id };
    } else if (currentUser.role.name === "USER") {
      filter = { userId: currentUser.id };
    } else {
      throw new AppError("Forbidden.", 403);
    }

    const totalTickets = await DashboardRepository.countTickets(filter);

    const openTickets = await DashboardRepository.countTicketsByStatus(
      filter,
      "OPEN",
    );
    const inProgressTickets = await DashboardRepository.countTicketsByStatus(
      filter,
      "IN_PROGRESS",
    );
    const waitingUserTickets = await DashboardRepository.countTicketsByStatus(
      filter,
      "WAITING_USER",
    );
    const resolvedTickets = await DashboardRepository.countTicketsByStatus(
      filter,
      "RESOLVED",
    );
    const closedTickets = await DashboardRepository.countTicketsByStatus(
      filter,
      "CLOSED",
    );

    const lowPriorityTickets = await DashboardRepository.countTicketsByPriority(
      filter,
      "LOW",
    );
    const mediumPriorityTickets =
      await DashboardRepository.countTicketsByPriority(filter, "MEDIUM");
    const highPriorityTickets =
      await DashboardRepository.countTicketsByPriority(filter, "HIGH");
    const criticalPriorityTickets =
      await DashboardRepository.countTicketsByPriority(filter, "CRITICAL");

    return {
      totalTickets,
      ticketsByStatus: {
        open: openTickets,
        inProgress: inProgressTickets,
        waitingUser: waitingUserTickets,
        resolved: resolvedTickets,
        closed: closedTickets,
      },
      ticketsByPriority: {
        low: lowPriorityTickets,
        medium: mediumPriorityTickets,
        high: highPriorityTickets,
        critical: criticalPriorityTickets,
      },
    };
  }
}

export default new DashboardService();
