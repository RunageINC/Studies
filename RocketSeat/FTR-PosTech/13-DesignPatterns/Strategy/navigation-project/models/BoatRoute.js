const StrategyRoute = require("./StrategyRoute");

class BoatRoute extends StrategyRoute {
  calculate(from, to) {
    console.log(`Calculando rota de barco de ${from} para ${to}`);
  }
}

module.exports = BoatRoute;
