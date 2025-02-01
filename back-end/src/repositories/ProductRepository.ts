import prismaClient from "../prisma";
import { ProductRequest } from "../types/ProductTypes";

class ProductRepository {
  async findAll() {
    return prismaClient.product.findMany();
  }

  async findById(id: string) {
    return prismaClient.product.findUnique({
      where: { id },
    });
  }

  async create({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {
    return prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id,
      },
    });
  }
}

export default new ProductRepository();
