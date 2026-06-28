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

    return { totalTickets };
  }
}

export default new DashboardService();
