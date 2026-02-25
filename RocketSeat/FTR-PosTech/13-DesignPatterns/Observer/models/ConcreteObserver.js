const Observer = require("./Observer");

class Cliente extends Observer {
  constructor(nome) {
    super();
    this.nome = nome;
  }

  update() {
    console.log(`${this.nome} foi notificado sobre o novo produto`);
  }
}

module.exports = Cliente;
