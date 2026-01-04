const Base = require("./base/base");

const ERROR_MESSAGES = {
  CAR_CATEGORY_NAME_REQUIRED: "Car category name is required",
  CAR_CATEGORY_PRICE_REQUIRED: "Car category price is required",
  CAR_CATEGORY_CAR_IDS_REQUIRED: "Car category car IDs are required",
  CAR_CATEGORY_ID_REQUIRED: "Car category car IDs are invalid",
};

class CarCategory extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name });

    this.carIds = carIds;
    this.price = price;
  }

  #valid() {
    return {
      valid: true,
      message: "",
    };
  }

  validateCarIds() {
    if (!this.carIds || this.carIds.length === 0) {
      return {
        valid: false,
        message: ERROR_MESSAGES.CAR_CATEGORY_CAR_IDS_REQUIRED,
      };
    }

    return this.#valid();
  }

  #validateCategoryId() {
    if (!this.id) {
      return {
        valid: false,
        message: ERROR_MESSAGES.CAR_CATEGORY_ID_REQUIRED,
      };
    }

    return this.#valid();
  }

  #validateCategoryName() {
    if (!this.name) {
      return {
        valid: false,
        message: ERROR_MESSAGES.CAR_CATEGORY_NAME_REQUIRED,
      };
    }

    return this.#valid();
  }

  #validateCategoryPrice() {
    if (!this.price || typeof this.price !== "number" || this.price <= 0) {
      return {
        valid: false,
        message: ERROR_MESSAGES.CAR_CATEGORY_PRICE_REQUIRED,
      };
    }

    return this.#valid();
  }

  validate() {
    const validId = this.#validateCategoryId();
    const validName = this.#validateCategoryName();
    const validPrice = this.#validateCategoryPrice();
    const validCarIds = this.validateCarIds();

    if (
      validId.valid &&
      validName.valid &&
      validPrice.valid &&
      validCarIds.valid
    ) {
      return true;
    }

    return {
      valid: false,
      message: [
        validId.message,
        validName.message,
        validPrice.message,
        validCarIds.message,
      ].join("\r\n"),
    };
  }
}

module.exports = CarCategory;
