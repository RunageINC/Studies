import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import BaseBusiness from "../src/business/base/baseBusiness";
import { NotImplementedException } from "../src/util/exceptions";

describe("#BaseBusiness", () => {
  class ConcreteClassWithoutImplementation extends BaseBusiness {}
  class ConcreteClassWithoutCreateImplementation extends BaseBusiness {
    #validationDoesNotSucceeded = true;

    _validateRequiredFields = jest
      .fn()
      .mockReturnValue(this.#validationDoesNotSucceeded);
  }
  class ConcreteClassWithValidationImplementation extends BaseBusiness {
    #validationDoesNotSucceeded = false;

    _validateRequiredFields = jest
      .fn()
      .mockReturnValue(this.#validationDoesNotSucceeded);
  }
  class ConcreteClassWithValidation extends BaseBusiness {
    #validationDoesNotSucceeded = false;

    _validateRequiredFields = jest
      .fn()
      .mockReturnValue(this.#validationDoesNotSucceeded);

    _create = jest.fn().mockReturnValue({});
  }
  class ConcreteClass extends BaseBusiness {
    #validationSucceded = true;
    #createSucceeded = true;

    _validateRequiredFields = jest
      .fn()
      .mockReturnValue(this.#validationSucceded);

    _create = jest.fn().mockReturnValue(this.#createSucceeded);
  }

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should throw an error if _validateRequiredFields is not implemented", () => {
    const concreteClassWithoutImplementation =
      new ConcreteClassWithoutImplementation();

    const validationError = new NotImplementedException(
      concreteClassWithoutImplementation._validateRequiredFields.name
    );

    expect(() => concreteClassWithoutImplementation.create({})).toThrow(
      validationError
    );
  });

  test("should throw an error if _create is not implemented", () => {
    const concreteClassWithoutCreateImplementation =
      new ConcreteClassWithoutCreateImplementation();

    const validationError = new NotImplementedException(
      concreteClassWithoutCreateImplementation._create.name
    );

    expect(() => concreteClassWithoutCreateImplementation.create({})).toThrow(
      validationError
    );
  });

  test("should throw an error if _validateRequiredFields returns false", () => {
    const concreteClassWithValidationImplementation =
      new ConcreteClassWithValidationImplementation();

    const validationError = new Error("Invalid data");

    expect(() => concreteClassWithValidationImplementation.create({})).toThrow(
      validationError
    );
  });

  test("should call _create and _validateRequiredFields on create", () => {
    const concreteClass = new ConcreteClass();

    const createFromBaseClass = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    );

    const result = concreteClass.create({});

    expect(result).toBeTruthy();
    expect(createFromBaseClass).toHaveBeenCalled();
    expect(concreteClass._create).toHaveBeenCalled();
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
  });
});
