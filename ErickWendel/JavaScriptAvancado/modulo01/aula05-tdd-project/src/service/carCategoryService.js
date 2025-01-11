const { carCategories: CAR_CATEGORIES_DB } = require("../utils/dbConstants");

const BaseRepository = require("../repository/baseRepository");

class CarCategoryService {
  constructor({ carCategories }) {
    this.carCategories = new BaseRepository({
      file: carCategories ?? CAR_CATEGORIES_DB,
    });
  }

  async getById(categoryId) {
    return await this.carCategories.find(categoryId);
  }
}
