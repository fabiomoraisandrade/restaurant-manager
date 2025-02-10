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

  async findByCategoryId(categoryId: string) {
    return prismaClient.product.findMany({
      where: { category_id: categoryId },
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

  async delete(id: string) {
    return prismaClient.product.delete({
      where: { id },
    });
  }

  async update(id: string, data: ProductRequest) {
    return prismaClient.product.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async partialUpdate(id: string, data: ProductRequest) {
    return prismaClient.product.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }
}

export default new ProductRepository();
