import CategoryService from "../services/category.service.js";

class CategoryController {
  async create(req, res, next) {
    try {
      const newCategory = await CategoryService.create(req.body);

      return res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const allCategories = await CategoryService.findAll();
      return res.status(200).json(allCategories);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const category = await CategoryService.findById(req.params.id);
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updatedCategory = await CategoryService.update(
        req.params.id,
        req.body,
      );

      return res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedCategory = await CategoryService.delete(req.params.id);

      return res.status(200).json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
