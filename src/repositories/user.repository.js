import { Role, User } from "../models/index.js";

class UserRepository {
  async create(data) {
    return User.create(data);
  }

  async findById(id) {
    return User.findOne({
      where: { id },
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    });
  }

  async findAll() {
    return User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      order: [["id", "ASC"]],
    });
  }

  async update(user, data) {
    return user.update(data);
  }

  async findByEmail(email) {
    return User.findOne({
      where: {
        email,
      },
    });
  }

  async findByEmailWithRole(email) {
    return User.findOne({
      where: {
        email,
      },
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    });
  }

  async findByIdWithRole(id) {
    return User.findOne({
      where: {
        id,
      },
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    });
  }

  async findAllTechnicians() {
    return User.findAll({
      attributes: ["id", "name", "email"],
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
        where: { name: "TECHNICIAN" },
      },
    });
  }
}

export default new UserRepository();
