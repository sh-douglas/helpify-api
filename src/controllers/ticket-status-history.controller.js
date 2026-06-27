import TicketStatusHistoryService from "../services/ticket-status-history.service.js";

class TicketStatusHistoryController {
  async findAllByTicketId(req, res, next) {
    try {
      const statusHistories =
        await TicketStatusHistoryService.findAllByTicketId(
          req.params.ticketId,
          req.user,
        );

      res.status(200).json(statusHistories);
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketStatusHistoryController();
