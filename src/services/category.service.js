import CategoryRepository from "../repositories/category.repository.js";

import AppError from "../utils/app-error.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator.js";

class CategoryService {
  async create(data) {
    const cleanData = createCategorySchema.parse(data);
    const registeredCategory = await CategoryRepository.findByName(
      cleanData.name,
    );

    if (registeredCategory) {
      throw new AppError("The category has already been registered", 409);
    }

    const newCategory = await CategoryRepository.create(cleanData);

    return {
      newCategory,
    };
  }

  async findAll() {
    const allCategories = await CategoryRepository.findAll();

    return {
      allCategories,
    };
  }

  async findById(id) {
    const category = await CategoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found.", 404);
    }

    return {
      category,
    };
  }

  async update(id, data) {
    const cleanData = updateCategorySchema.parse(data);
    let categoryWithSameName;

    const registeredCategory = await CategoryRepository.findById(id);

    if (!registeredCategory) {
      throw new AppError("Category not found.", 404);
    }

    if (cleanData.name) {
      categoryWithSameName = await CategoryRepository.findByName(
        cleanData.name,
      );
    }

    if (
      categoryWithSameName &&
      categoryWithSameName.id !== registeredCategory.id
    ) {
      throw new AppError("The category has already been registered", 409);
    }

    const updatedCategory = await CategoryRepository.update(
      registeredCategory,
      cleanData,
    );

    return {
      updatedCategory,
    };
  }

  async delete(id) {
    const registeredCategory = await CategoryRepository.findById(id);

    if (!registeredCategory) {
      throw new AppError("Category not found.", 404);
    }

    await CategoryRepository.delete(registeredCategory);

    return {
      message: "Category has been deleted.",
    };
  }
}

export default new CategoryService();
