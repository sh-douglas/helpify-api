import { Category } from "../models/index.js";

class CategoryRepository {
  async create(data) {
    return Category.create(data);
  }

  async findAll() {
    return Category.findAll();
  }

  async findById(id) {
    return Category.findByPk(id);
  }

  async findByName(name) {
    return Category.findOne({
      where: { name },
    });
  }

  async update(category, data) {
    return category.update(data);
  }

  async delete(category) {
    return category.destroy();
  }
}

export default new CategoryRepository();
