import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../errors/apiError";
import ProductService from "../../services/v1/ProductService";

class ProductController {
  async findAll(_req: Request, res: Response) {
    const products = await ProductService.findAll();

    return res.status(StatusCodes.OK).json(products);
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const productDetails = await ProductService.getProductById(id);

    return res.status(StatusCodes.OK).json(productDetails);
  }

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
    return res.status(StatusCodes.CREATED).json(product);
  }
}

export default ProductController;
