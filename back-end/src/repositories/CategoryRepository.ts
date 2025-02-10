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

  async delete(id: string) {
    return prismaClient.category.delete({
      where: { id },
    });
  }

  async update(id: string, data: CategoryRequest) {
    return prismaClient.category.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async partialUpdate(id: string, data: CategoryRequest) {
    return prismaClient.category.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }
}

export default new UserRepository();
