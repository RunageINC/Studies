class Navigator {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculateRoute(from, to) {
    if (!this.strategy) {
      throw new Error("Estratégia não definida");
    }

    this.strategy.calculate(from, to);
  }
}

module.exports = Navigator;
