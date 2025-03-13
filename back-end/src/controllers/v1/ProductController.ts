import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../errors/apiError";
import ProductService from "../../services/v1/ProductService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class ProductController {
  async findAll(_req: Request, res: Response) {
    const products = await ProductService.findAll();

    return res.status(StatusCodes.OK).json(products);
  }

  async getProductsByCategoryId(req: Request, res: Response) {
    const categoryId = req.query.category_id as string;
    const products = await ProductService.getProductsByCategoryId(categoryId);

    return res.status(StatusCodes.OK).json(products);
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const productDetails = await ProductService.getProductById(id);

    return res.status(StatusCodes.OK).json(productDetails);
  }

  async create(req: Request, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw ApiError.badRequest("file is required");
    }

    if (!req.body.price) {
      throw ApiError.badRequest("price is required");
    }

    const { name, price, description, category_id } = req.body;
    const priceNumber = parseFloat(price.replace(",", "."));
    const validatedPrice = Number(priceNumber.toFixed(2));

    const file: UploadedFile = req.files["file"];
    const resultFile: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, function (error, result) {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          })
          .end(file.data);
      },
    );

    const product = await ProductService.create({
      name,
      price: validatedPrice,
      description,
      banner: resultFile.url,
      category_id,
    });

    return res.status(StatusCodes.CREATED).json(product);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await ProductService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  async update(req: Request, res: Response) {
    if (!req.file) {
      throw ApiError.badRequest("file is required");
    }

    if (!req.body.price) {
      throw ApiError.badRequest("price is required");
    }

    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    const priceNumber = parseFloat(price.replace(",", "."));
    const validatedPrice = Number(priceNumber.toFixed(2));
    const { filename: banner } = req.file;
    const updatedProduct = await ProductService.update(id, {
      name,
      price: validatedPrice,
      description,
      banner,
      category_id,
    });

    return res.status(StatusCodes.OK).json(updatedProduct);
  }

  async partialUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    let validatedPrice;
    let banner;
    if (price) {
      const priceNumber = parseFloat(price.replace(",", "."));
      validatedPrice = Number(priceNumber.toFixed(2));
    }

    if (req.file) {
      banner = req.file.filename;
    }

    const updatedProduct = await ProductService.partialUpdate(id, {
      name,
      price: validatedPrice,
      description,
      banner,
      category_id,
    });

    return res.status(StatusCodes.OK).json(updatedProduct);
  }
}

export default ProductController;
