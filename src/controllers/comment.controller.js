import CommentService from "../services/comment.service.js";

class CommentController {
  async create(req, res, next) {
    try {
      const newComment = await CommentService.create(
        req.params.ticketId,
        req.body,
        req.user,
      );
      return res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
  async findAllByTicketId(req, res, next) {
    try {
      const comments = await CommentService.findAllByTicketId(
        req.params.ticketId,
        req.user,
      );

      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();
