import { ProductRequest } from "./../../types/ProductTypes";
import validateProduct from "../../validators/productValidator";
import { ApiError } from "../../errors/apiError";
import ProductRepository from "../../repositories/ProductRepository";

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

    const cleanedData: ProductRequest = {
      name: productData.name.trim(),
      price: productData.price,
      description: productData.description.trim(),
      banner: productData.banner.trim(),
      category_id: productData.category_id.trim(),
    };

    const product = await ProductRepository.create(cleanedData);
    return product;
  }
}

export default new ProductService();
