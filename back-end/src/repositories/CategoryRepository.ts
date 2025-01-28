import prismaClient from "../prisma";
import { CategoryRequest } from "../types/CategoryTypes";

class UserRepository {
  async findAll() {
    return prismaClient.category.findMany();
  }

  async findById(id: string) {
    return prismaClient.category.findUnique({
      where: { id },
    });
  }

  async create({ name }: CategoryRequest) {
    return prismaClient.category.create({
      data: {
        name,
      },
    });
  }
}

export default new UserRepository();
