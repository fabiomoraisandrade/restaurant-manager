import prismaClient from "../prisma";
import { CategoryRequest } from "../types/CategoryTypes";

class UserRepository {
  async findAll() {
    return prismaClient.user.findMany();
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

  async create({ name }: CategoryRequest) {
    return prismaClient.category.create({
      data: {
        name,
      },
    });
  }
}

export default new UserRepository();
