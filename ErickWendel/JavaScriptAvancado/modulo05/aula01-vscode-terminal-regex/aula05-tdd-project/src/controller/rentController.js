'use strict';
    const CarCategory = require("../entities/carCategory");
const CarService = require("../service/carService");

const carService = new CarService();

const ERROR_MESSAGE = {
  status: "error",
  message: "Invalid data provided",
};

const endParsedResult = (res, result) => {
  return res.end(JSON.stringify(result));
};

const routes = {
  "/rent:get": async (req, res) => {
    for await (const data of req) {
      const parsedData = JSON.parse(data);
      const carCategory = new CarCategory(parsedData);
      const validatedCarCategory = carCategory.validateCarIds();

      if (!validatedCarCategory.valid) {
        res.writeHead(422);
        return res.end(ERROR_MESSAGE);
      }

      const result = await carService.getAvailableCar(parsedData);

      if (!result) {
        res.writeHead(404);
        return res.end("No result found for given car category");
      }

      res.writeHead(200);
      endParsedResult(res, result);
    }
  },

  "/rent:post": (req, res) => {
    const { customer, carCategory, numberOfDays } = req.body;

    if (!customer || !carCategory || !numberOfDays) {
      res.writeHead(400);
      return res.end(ERROR_MESSAGE);
    }

    const result = carService.rent(customer, carCategory, numberOfDays);

    res.writeHead(201);
    endParsedResult(res, result);
  },
};

module.exports = { routes };
