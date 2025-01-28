import { CategoryRequest } from "../../types/CategoryTypes";
import validateCategory from "../../validators/categoryValidator";
import { ApiError } from "../../errors/apiError";
import CategoryRepository from "../../repositories/CategoryRepository";

class CategoryService {
  async findAll() {
    return CategoryRepository.findAll();
  }

  async getCategoryById(id: string) {
    const categoryDetails = await CategoryRepository.findById(id);
    if (!categoryDetails) throw ApiError.badRequest("Category not found");

    return categoryDetails;
  }

  async create(categoryData: CategoryRequest) {
    const error = validateCategory(categoryData);
    if (error) throw ApiError.badRequest(error);

    return CategoryRepository.create(categoryData);
  }
}

export default new CategoryService();
