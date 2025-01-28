import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CategoryService from "../../services/v1/CategoryService";

class CategoryController {
  async findAll(_req: Request, res: Response) {
    const categories = await CategoryService.findAll();

    return res.status(StatusCodes.OK).json(categories);
  }

  async create(req: Request, res: Response) {
    const category = await CategoryService.create(req.body);

    return res.status(StatusCodes.CREATED).json(category);
  }
}

export default CategoryController;
