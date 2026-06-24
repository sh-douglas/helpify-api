import jwt from "jsonwebtoken";

import AppError from "../utils/app-error.js";
import userRepository from "../repositories/user.repository.js";

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    next(new AppError("Unauthorized.", 401));
    return;
  }

  const token = header.split(" ")[1];

  if (!token) {
    next(new AppError("Unauthorized.", 401));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.findByIdWithRole(decoded.sub);

    if (!user) {
      next(new AppError("User not found.", 401));
      return;
    }

    req.user = {
      id: decoded.sub,
      name: user.name,
      email: user.email,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
    };
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token.", 401));
  }
}

export default authMiddleware;
