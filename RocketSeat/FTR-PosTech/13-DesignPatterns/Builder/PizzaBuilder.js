class PizzaBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.size = "media";
    this.crust = "tradicional";
    this.cheese = false;
    this.toppings = [];
  }

  setSize(size) {
    this.size = size;
    return this;
  }

  setCrust(crust) {
    this.crust = crust;
    return this;
  }

  setCheese() {
    this.cheese = true;
    return this;
  }

  setTopping(topping) {
    this.toppings.push(topping);
    return this;
  }

  setToppings(toppings) {
    this.toppings = toppings;
    return this;
  }

  build() {
    const pizza = Pizza(this.size, this.crust, this.cheese, this.toppings);
    this.reset();

    return pizza;
  }
}

module.exports = PizzaBuilder;
