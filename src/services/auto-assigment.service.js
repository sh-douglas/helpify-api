import TicketRepository from "../repositories/ticket.repository.js";
import UserRepository from "../repositories/user.repository.js";

class AutoAssignmentService {
  async findTechnicianWithLessActiveTickets() {
    const allTechnicians = await UserRepository.findAllTechnicians();

    if (allTechnicians.length === 0) {
      return null;
    }

    let bestTechnician = null;
    let lowestActiveTickets = Infinity;
    let activeTickets;

    for (const technician of allTechnicians) {
      activeTickets = await TicketRepository.countActiveByTechnicianId(
        technician.id,
      );

      if (activeTickets < lowestActiveTickets) {
        lowestActiveTickets = activeTickets;
        bestTechnician = technician;
      }
    }

    return bestTechnician;
  }
}

export default new AutoAssignmentService();
