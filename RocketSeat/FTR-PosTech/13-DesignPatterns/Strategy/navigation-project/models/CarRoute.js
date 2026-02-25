const StrategyRoute = require("./StrategyRoute");

class CarRoute extends StrategyRoute {
  calculate(from, to) {
    console.log(`Calculando rota de carro de ${from} para ${to}`);
  }
}

module.exports = CarRoute;
