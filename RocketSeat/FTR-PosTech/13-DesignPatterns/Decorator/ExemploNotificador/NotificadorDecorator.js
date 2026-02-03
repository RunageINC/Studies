const Notificador = require("./Notificador");

class NotificadorDecorator extends Notificador {
  constructor(notificador) {
    super();
    this.notificador = notificador;
  }

  enviar(message) {
    this.notificador.enviar(message);
  }
}

module.exports = NotificadorDecorator;
