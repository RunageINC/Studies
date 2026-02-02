class PizzaDirector {
  constructor(builder) {
    this.builder = builder;
  }

  buildMargherita() {
    return this.builder
      .setSize("grande")
      .setCrust("tradicional")
      .setCheese()
      .setTopping("tomate")
      .setTopping("cebola")
      .setTopping("azeitona");
  }

  buildPepperoni() {
    return this.builder
      .setSize("grande")
      .setCrust("tradicional")
      .setCheese()
      .setTopping("tomate")
      .setTopping("cebola")
      .setTopping("azeitona")
      .setTopping("pepperoni");
  }
}

module.exports = PizzaDirector;
