import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import UserRepository from "../../repositories/UserRepository";
import { UserRequest, LoginRequest } from "../../types/UserTypes";
import validateUser from "../../validators/userValidator";
import validateLogin from "../../validators/loginValidator";
import { ApiError } from "../../errors/apiError";

class UserService {
  async findAll() {
    return UserRepository.findAll();
  }

  async create(userData: UserRequest) {
    const error = validateUser(userData);
    if (error) throw ApiError.badRequest(error);

    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw ApiError.conflict("Email is already registered.");
    }

    const passwordHash = await hash(userData.password, 8);
    userData.password = passwordHash;

    return UserRepository.create(userData);
  }

  async login(loginData: LoginRequest) {
    const error = validateLogin(loginData);
    if (error) throw ApiError.badRequest(error);

    const user = await UserRepository.findByEmail(loginData.email);
    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const passwordMatch = await compare(loginData.password, user.password);
    if (!passwordMatch) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export default new UserService();
