import prismaClient from "../prisma";
import { OrderRequest } from "../types/OrderTypes";

class OrderRepository {
  async findAll() {
    return prismaClient.order.findMany();
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
}

export default new OrderRepository();
