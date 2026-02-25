const StrategyRoute = require("./StrategyRoute");

class PublicTransportRoute extends StrategyRoute {
  calculate(from, to) {
    console.log(`Calculando rota de ônibus de ${from} para ${to}`);
  }
}

module.exports = PublicTransportRoute;
