import { hash } from "bcryptjs";
import UserRepository from "../../repositories/UserRepository";
import { UserRequest } from "../../types/UserTypes";
import validateUser from "../../validators/userValidator";
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
}

export default new UserService();
