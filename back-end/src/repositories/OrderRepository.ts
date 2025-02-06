import prismaClient from "../prisma";
import { OrderRequest } from "../types/OrderTypes";

class OrderRepository {
  async findAll() {
    return prismaClient.order.findMany();
  }

  async findAllByStatusAndDraft() {
    return prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async findById(id: string) {
    return prismaClient.order.findUnique({
      where: { id },
    });
  }

  async create({ table, name }: OrderRequest) {
    return prismaClient.order.create({
      data: {
        table,
        name,
      },
    });
  }

  async delete(id: string) {
    return prismaClient.order.delete({
      where: { id },
    });
  }

  async updateDraft(id: string) {
    return prismaClient.order.update({
      where: { id },
      data: {
        draft: false,
      },
    });
  }
}

export default new OrderRepository();
