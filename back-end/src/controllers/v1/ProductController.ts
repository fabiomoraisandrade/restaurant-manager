import { Request, Response } from "express";
import { ApiError } from "../../errors/apiError";
import ProductService from "../../services/v1/ProductService";

class ProductController {
  async create(req: Request, res: Response) {
    if (!req.file) {
      throw ApiError.badRequest("file is required");
    }

    const { name, price, description, category_id } = req.body;
    const { filename: banner } = req.file;
    const product = await ProductService.create({
      name,
      price,
      description,
      banner,
      category_id,
    });
    return res.json(product);
  }
}

export default ProductController;
