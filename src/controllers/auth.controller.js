import AuthService from "../services/auth.service.js";

class AuthController {
  async signUp(req, res, next) {
    try {
      const createdUser = await AuthService.signUp(req.body);
      return res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const authData = await AuthService.signIn(req.body);
      return res.status(200).json(authData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
