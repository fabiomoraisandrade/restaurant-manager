import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CategoryService from "../../services/v1/CategoryService";

class CategoryController {
  async findAll(_req: Request, res: Response) {
    const categories = await CategoryService.findAll();

    return res.status(StatusCodes.OK).json(categories);
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    const categoryDetails = await CategoryService.getCategoryById(id);

    return res.status(StatusCodes.OK).json(categoryDetails);
  }

  async create(req: Request, res: Response) {
    const category = await CategoryService.create(req.body);

    return res.status(StatusCodes.CREATED).json(category);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await CategoryService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedCategory = await CategoryService.update(id, req.body);

    return res.status(StatusCodes.OK).json(updatedCategory);
  }

  async partialUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const updatedCategory = await CategoryService.partialUpdate(id, req.body);

    return res.status(StatusCodes.OK).json(updatedCategory);
  }
}

export default CategoryController;
