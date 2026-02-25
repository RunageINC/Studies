const StrategyRoute = require("./StrategyRoute");

class WalkRoute extends StrategyRoute {
  calculate(from, to) {
    console.log(`Calculando rota de caminhada de ${from} para ${to}`);
  }
}

module.exports = WalkRoute;
