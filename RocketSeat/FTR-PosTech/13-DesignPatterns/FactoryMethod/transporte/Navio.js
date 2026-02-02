const Transporte = require("./Transporte");

class Navio extends Transporte {
  entregar() {
    console.log("Entregando por navio");
  }
}

module.exports = Navio;
