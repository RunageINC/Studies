import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import Order from "../src/entities/order";
import OrderBusiness from "../src/business/orderBusiness";

describe("Test suite for Template Method design", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("#OrderBusiness", () => {
    test("execution Order Business without Template Method", () => {
      const order = new Order({
        customerId: 1,
        amount: 100.0,
        products: [{ description: "Ferrari" }],
      });

      const orderBusiness = new OrderBusiness();

      // Seguir à risca esse fluxo de execução

      const isValid = orderBusiness._validateRequiredFields(order);

      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);

      expect(result).toBeTruthy();
    });
    test("execution Order Business with Template Method", () => {
      const order = new Order({
        customerId: 1,
        amount: 100.0,
        products: [{ description: "Ferrari" }],
      });

      const orderBusiness = new OrderBusiness();

      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );

      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      // Com o Template Method, a sequencia é sempre executada e evita replicação de lógica

      const result = orderBusiness.create(order);

      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});
