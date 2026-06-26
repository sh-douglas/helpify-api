import { Comment, User } from "../models/index.js";

class CommentRepository {
  async create(data) {
    return Comment.create(data);
  }

  async findById(id) {
    return Comment.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });
  }

  async findAllByTicketId(ticketId) {
    return Comment.findAll({
      where: { ticketId },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
      order: [["createdAt", "ASC"]],
    });
  }
}

export default new CommentRepository();
