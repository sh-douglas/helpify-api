import UserService from "../services/user.service.js";

class UserController {
  async findAll(req, res, next) {
    try {
      const users = await UserService.findAll();

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const user = await UserService.findById(req.params.id);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req, res, next) {
    try {
      const user = await UserService.updateRole(
        req.params.id,
        req.body,
        req.user,
      );

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
