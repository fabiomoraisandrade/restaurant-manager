import { ProductRequest } from "./../../types/ProductTypes";
import {
  validateProduct,
  validatePartialProduct,
} from "../../validators/productValidator";
import { ApiError } from "../../errors/apiError";
import ProductRepository from "../../repositories/ProductRepository";
import CategoryRepository from "../../repositories/CategoryRepository";

class ProductService {
  async findAll() {
    return ProductRepository.findAll();
  }

  async getProductById(id: string) {
    const productDetails = await ProductRepository.findById(id);
    if (!productDetails) throw ApiError.notFound("Product not found");

    return productDetails;
  }

  async getProductsByCategoryId(categoryId: string) {
    const products = await ProductRepository.findByCategoryId(categoryId);
    if (!products) throw ApiError.notFound("Products not found");

    return products;
  }

  async create(productData: ProductRequest) {
    const error = validateProduct(productData);
    if (error) throw ApiError.badRequest(error);

    const category = await CategoryRepository.findById(productData.category_id);
    if (!category) throw ApiError.notFound("Category not found");

    const cleanedData: ProductRequest = {
      name: productData.name.trim(),
      price: productData.price,
      description: productData.description.trim(),
      banner: productData.banner.trim(),
      category_id: productData.category_id,
    };

    const product = await ProductRepository.create(cleanedData);
    return product;
  }

  async delete(id: string) {
    const product = await ProductRepository.findById(id);
    if (!product) throw ApiError.notFound("Product not found");
    await ProductRepository.delete(id);
    return product;
  }

  async update(id: string, productData: ProductRequest) {
    const product = await ProductRepository.findById(id);
    if (!product) throw ApiError.notFound("Product not found");

    const error = validateProduct(productData);
    if (error) throw ApiError.badRequest(error);

    const category = await CategoryRepository.findById(
      productData.category_id.trim(),
    );
    if (!category) throw ApiError.notFound("Category not found");

    return ProductRepository.update(id, productData);
  }

  async partialUpdate(id: string, productData: ProductRequest) {
    const product = await ProductRepository.findById(id);
    if (!product) throw ApiError.notFound("Product not found");

    const error = validatePartialProduct(productData);
    if (error) throw ApiError.badRequest(error);

    if (productData.category_id) {
      const category = await CategoryRepository.findById(
        productData.category_id,
      );
      if (!category) throw ApiError.notFound("Category not found");
    }

    return ProductRepository.update(id, productData);
  }
}

export default new ProductService();
