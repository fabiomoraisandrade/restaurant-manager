import { CategoryRequest } from "../../types/CategoryTypes";
import {
  validateCategory,
  validatePartialCategory,
} from "../../validators/categoryValidator";
import { ApiError } from "../../errors/apiError";
import CategoryRepository from "../../repositories/CategoryRepository";

class CategoryService {
  async findAll() {
    return CategoryRepository.findAll();
  }

  async getCategoryById(id: string) {
    const categoryDetails = await CategoryRepository.findById(id);
    if (!categoryDetails) throw ApiError.notFound("Category not found");

    return categoryDetails;
  }

  async create(categoryData: CategoryRequest) {
    const error = validateCategory(categoryData);
    if (error) throw ApiError.badRequest(error);

    return CategoryRepository.create(categoryData);
  }

  async delete(id: string) {
    const category = await CategoryRepository.findById(id);
    if (!category) throw ApiError.notFound("Category not found");
    await CategoryRepository.delete(id);
    return category;
  }

  async update(id: string, categoryData: CategoryRequest) {
    const error = validateCategory(categoryData);
    if (error) throw ApiError.badRequest(error);

    const category = await CategoryRepository.findById(id);
    if (!category) throw ApiError.notFound("Category not found");

    return CategoryRepository.update(id, categoryData);
  }

  async partialUpdate(id: string, categoryData: CategoryRequest) {
    const error = validatePartialCategory(categoryData);
    if (error) throw ApiError.badRequest(error);

    const category = await CategoryRepository.findById(id);
    if (!category) throw ApiError.notFound("Category not found");

    return CategoryRepository.partialUpdate(id, categoryData);
  }
}

export default new CategoryService();
