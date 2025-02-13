import prismaClient from "../prisma";
import { UserRequest } from "../types/UserTypes";

class UserRepository {
  async findAll() {
    return prismaClient.user.findMany();
  }

  async findByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async create({ name, email, password }: UserRequest) {
    return prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async delete(id: string) {
    return prismaClient.user.delete({
      where: { id },
    });
  }

  async update(id: string, data: UserRequest) {
    return prismaClient.user.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }
}

export default new UserRepository();
