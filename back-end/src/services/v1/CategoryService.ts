import { CategoryRequest } from "../../types/CategoryTypes";
import validateCategory from "../../validators/categoryValidator";
import { ApiError } from "../../errors/apiError";
import CategoryRepository from "../../repositories/CategoryRepository";

class CategoryService {
  async create(categoryData: CategoryRequest) {
    const error = validateCategory(categoryData);
    if (error) throw ApiError.badRequest(error);

    return CategoryRepository.create(categoryData);
  }
}

export default new CategoryService();
