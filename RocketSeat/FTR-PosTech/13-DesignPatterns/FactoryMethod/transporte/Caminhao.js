const Transporte = require("./Transporte");

class Caminhao extends Transporte {
  entregar() {
    console.log("Entregando por caminhão");
  }
}

module.exports = Caminhao;
