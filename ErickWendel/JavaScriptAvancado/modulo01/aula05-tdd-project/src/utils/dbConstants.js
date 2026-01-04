const { join } = require("path");

const DEFAULT_DBS = {
  cars: join(__dirname, "../../database", "cars.json"),
  carCategories: join(__dirname, "../../database", "carCategories.json"),
  customers: join(__dirname, "../../database", "customers.json"),
  rents: join(__dirname, "../../database", "rents.json"),
};

module.exports = DEFAULT_DBS;
