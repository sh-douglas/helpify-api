import TicketRepository from "../repositories/ticket.repository.js";
import CategoryRepository from "../repositories/category.repository.js";
import TicketStatusHistoryRepository from "../repositories/ticket-status-history.repository.js";
import autoAssigmentService from "./auto-assigment.service.js";

import AppError from "../utils/app-error.js";

import {
  createTicketSchema,
  updateTicketSchema,
} from "../validators/ticket.validator.js";

class TicketService {
  async create(data, userId) {
    const cleanData = createTicketSchema.parse(data);

    const existingCategory = await CategoryRepository.findById(
      cleanData.categoryId,
    );

    if (!existingCategory) {
      throw new AppError("Category not found.", 404);
    }

    const assignedTechnician =
      await autoAssigmentService.findTechnicianWithLessActiveTickets();

    const ticketData = {
      title: cleanData.title,
      description: cleanData.description,
      categoryId: cleanData.categoryId,
      priority: cleanData.priority,
      userId,
      assignedToId: assignedTechnician?.id || null,
    };

    const newTicket = await TicketRepository.create(ticketData);
    const ticket = await TicketRepository.findById(newTicket.id);

    return {
      ticket,
    };
  }

  async findAll(currentUser) {
    let tickets;

    if (
      currentUser.role.name === "ADMIN" ||
      currentUser.role.name === "TECHNICIAN"
    ) {
      tickets = await TicketRepository.findAll();
    } else if (currentUser.role.name === "USER") {
      tickets = await TicketRepository.findAllByUserId(currentUser.id);
    } else {
      throw new AppError("Forbidden.", 403);
    }

    return {
      tickets,
    };
  }

  async findById(id, currentUser) {
    const ticket = await TicketRepository.findById(id);

    if (!ticket) {
      throw new AppError("Ticket not found.", 404);
    }

    if (
      currentUser.role.name === "ADMIN" ||
      currentUser.role.name === "TECHNICIAN"
    ) {
      return { ticket };
    } else if (currentUser.role.name === "USER") {
      if (ticket.userId !== currentUser.id) {
        throw new AppError("Forbidden.", 403);
      }

      return { ticket };
    } else {
      throw new AppError("Forbidden.", 403);
    }
  }

  async update(id, data, currentUser) {
    const cleanData = updateTicketSchema.parse(data);

    const ticket = await TicketRepository.findById(id);

    if (!ticket) {
      throw new AppError("Ticket not found.", 404);
    }

    if (
      currentUser.role.name !== "ADMIN" &&
      currentUser.role.name !== "TECHNICIAN"
    ) {
      throw new AppError("Forbidden.", 403);
    }

    if (cleanData.categoryId) {
      const category = await CategoryRepository.findById(cleanData.categoryId);

      if (!category) {
        throw new AppError("Category not found.", 404);
      }
    }

    const oldStatus = ticket.status;
    const statusChanged = cleanData.status && cleanData.status !== oldStatus;
    const updatedTicket = await TicketRepository.update(ticket, cleanData);

    if (statusChanged) {
      const statusHistoryData = {
        ticketId: ticket.id,
        changedById: currentUser.id,
        oldStatus: oldStatus,
        newStatus: cleanData.status,
      };

      const teste =
        await TicketStatusHistoryRepository.create(statusHistoryData);
      console.log(teste);
    }

    const refreshedTicket = await TicketRepository.findById(updatedTicket.id);

    return {
      ticket: refreshedTicket,
    };
  }

  async delete(id, currentUser) {
    const ticket = await TicketRepository.findById(id);

    if (!ticket) {
      throw new AppError("Ticket not found.", 404);
    }

    if (currentUser.role.name !== "ADMIN") {
      throw new AppError("Forbidden.", 403);
    }

    await TicketRepository.delete(ticket);

    return {
      message: "Ticket has been deleted.",
    };
  }
}

export default new TicketService();
