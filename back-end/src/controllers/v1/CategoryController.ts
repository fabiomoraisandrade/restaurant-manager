import { Request, Response } from "express";
import CategoryService from "../../services/v1/CategoryService";

class CategoryController {
  async create(req: Request, res: Response) {
    const category = await CategoryService.create(req.body);
    return res.json(category);
  }
}

export default CategoryController;
