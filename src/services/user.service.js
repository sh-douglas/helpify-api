import UserRepository from "../repositories/user.repository.js";
import RoleRepository from "../repositories/role.repository.js";
import AppError from "../utils/app-error.js";

import { updateUserRoleSchema } from "../validators/user.validator.js";

class UserService {
  async findAll() {
    const users = await UserRepository.findAll();

    return {
      users,
    };
  }

  async findById(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return {
      user,
    };
  }

  async updateRole(id, data, currentUser) {
    const cleanData = updateUserRoleSchema.parse(data);

    const user = await UserRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (currentUser.id === user.id) {
      throw new AppError("You cannot change your own role.", 403);
    }

    const role = await RoleRepository.findByName(cleanData.role);

    if (!role) {
      throw new AppError("Role not found.", 404);
    }

    const updatedUserData = await UserRepository.update(user, {
      roleId: role.id,
    });
    const updatedUser = await UserRepository.findById(updatedUserData.id);

    return {
      user: updatedUser,
    };
  }
}

export default new UserService();
