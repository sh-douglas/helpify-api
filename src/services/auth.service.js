import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import UserRepository from "../repositories/user.repository.js";
import RoleRepository from "../repositories/role.repository.js";
import AppError from "../utils/AppError.js";

import { registerSchema, loginSchema } from "../validators/auth.validators.js";

class AuthService {
  async signUp(data) {
    const cleanData = registerSchema.parse(data);
    const registeredUser = await UserRepository.findByEmail(cleanData.email);

    if (registeredUser) {
      throw new AppError("This user is already registered.", 409);
    }

    const role = await RoleRepository.findByName("USER");

    if (!role) {
      throw new AppError("User role not found.", 500);
    }

    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(cleanData.password, salt);

    const newUser = {
      name: cleanData.name,
      email: cleanData.email,
      passwordHash: hashPassword,
      roleId: role.id,
    };

    const createdUser = await UserRepository.create(newUser);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: {
        id: role.id,
        name: role.name,
      },
    };
  }

  async signIn(data) {
    const cleanData = loginSchema.parse(data);

    const registeredUser = await UserRepository.findByEmailWithRole(
      cleanData.email,
    );

    if (!registeredUser) {
      throw new AppError("Invalid email address or password.", 401);
    }

    const isPasswordValid = await bcryptjs.compare(
      cleanData.password,
      registeredUser.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid email address or password.", 401);
    }

    const token = jwt.sign({ sub: registeredUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const user = {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
      role: {
        id: registeredUser.role.id,
        name: registeredUser.role.name,
      },
    };

    return {
      user,
      token,
    };
  }
}

export default new AuthService();
