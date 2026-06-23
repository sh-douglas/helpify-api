import { Role } from "../models/index.js";

class RoleRepository {
  async findByName(name) {
    return Role.findOne({
      where: {
        name,
      },
    });
  }
}

export default new RoleRepository();
