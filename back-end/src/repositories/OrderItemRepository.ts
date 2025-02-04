import prismaClient from "../prisma";
import { AddItemToOrder } from "../types/OrderTypes";

class OrderItemRepository {
  async create({ order_id, product_id, amount }: AddItemToOrder) {
    return prismaClient.orderItem.create({
      data: {
        order_id,
        product_id,
        amount,
      },
    });
  }
}

export default new OrderItemRepository();
