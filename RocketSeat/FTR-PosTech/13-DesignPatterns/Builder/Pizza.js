class Pizza {
  constructor(size, crust, cheese, toppings) {
    this.size = size;
    this.crust = crust;
    this.cheese = cheese;
    this.toppings = toppings || [];
  }
}

module.exports = Pizza;
