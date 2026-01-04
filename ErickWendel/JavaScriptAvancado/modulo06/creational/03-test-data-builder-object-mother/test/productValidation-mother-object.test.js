const { expect } = require("chai");
const { it, describe } = require("mocha");
const { productValidator } = require("../src");
const ProductObjectMother = require("./model/productObjectMother");

describe("Product Validator Test Data Builder", () => {
  it("Should return valid for a correct product", () => {
    const product = ProductObjectMother.valid();
    const result = productValidator(product);
    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe("Product validation rules", () => {
    it("Should return an object error when creating a Product with invalid ID", () => {
      const product = ProductObjectMother.withInvalidId();
      const result = productValidator(product);
      const expected = {
        errors: [
          "Id: invalid length. Current [1] expected to be between 2 and 20 characters.",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("Should return an object error when creating a Product with invalid name", () => {
      const product = ProductObjectMother.withInvalidName();
      const result = productValidator(product);
      const expected = {
        errors: [
          "Name: invalid name. Current [abc123] expected to be only words.",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("Should return an object error when creating a Product with invalid price", () => {
      const product = ProductObjectMother.withInvalidPrice();
      const result = productValidator(product);
      const expected = {
        errors: [
          "Price: invalid price. Current [2000] expected to be between 0 and 1000.",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
    it("Should return an object error when creating a Product with invalid category", () => {
      const product = ProductObjectMother.withInvalidCategory();
      const result = productValidator(product);
      const expected = {
        errors: [
          "Category: invalid category. Current [invalid] expected to be electronic or organic.",
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
