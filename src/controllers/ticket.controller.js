import TicketService from "../services/ticket.service.js";

class TicketController {
  async create(req, res, next) {
    try {
      const newTicket = await TicketService.create(req.body, req.user.id);

      return res.status(201).json(newTicket);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const allTickets = await TicketService.findAll(req.user);
      return res.status(200).json(allTickets);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const ticket = await TicketService.findById(req.params.id, req.user);

      return res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updatedTicket = await TicketService.update(
        req.params.id,
        req.body,
        req.user,
      );

      return res.status(200).json(updatedTicket);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedTicket = await TicketService.delete(req.params.id, req.user);

      return res.status(200).json(deletedTicket);
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController();
