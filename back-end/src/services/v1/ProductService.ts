import { ProductRequest } from "./../../types/ProductTypes";
import validateProduct from "../../validators/productValidator";
import { ApiError } from "../../errors/apiError";
import ProductRepository from "../../repositories/ProductRepository";

class ProductService {
  async create(productData: ProductRequest) {
    const error = validateProduct(productData);
    if (error) throw ApiError.badRequest(error);

    const cleanedData: ProductRequest = {
      name: productData.name.trim(),
      price: parseFloat(
        productData.price.replace(/[^\d,.-]/g, "").replace(",", "."),
      ).toString(),
      description: productData.description.trim(),
      banner: productData.banner.trim(),
      category_id: productData.category_id.trim(),
    };

    const product = await ProductRepository.create(cleanedData);
    return product;
  }
}

export default new ProductService();
