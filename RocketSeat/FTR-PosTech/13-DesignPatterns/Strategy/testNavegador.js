const Navigator = require("./navigation-project/models/Navigator");
const CarRoute = require("./navigation-project/models/CarRoute");
const WalkRoute = require("./navigation-project/models/WalkRoute");
const PublicTransportRoute = require("./navigation-project/models/PublicTransportRoute");

const navigator = new Navigator();

try {
  navigator.calculateRoute("São Paulo", "Rio de Janeiro");
} catch (error) {
  console.error(error.message);
}

navigator.setStrategy(new CarRoute());
navigator.calculateRoute("São Paulo", "Rio de Janeiro");

navigator.setStrategy(new WalkRoute());
navigator.calculateRoute("São Paulo", "Rio de Janeiro");

navigator.setStrategy(new PublicTransportRoute());
navigator.calculateRoute("São Paulo", "Rio de Janeiro");

navigator.setStrategy(new BoatRoute());
navigator.calculateRoute("São Paulo", "Rio de Janeiro");
