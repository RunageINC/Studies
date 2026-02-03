const Notificador = require("./Notificador");

class NotificadorEmail extends Notificador {
  enviar(message) {
    console.log(`Enviando email: ${message}`);
  }
}

module.exports = NotificadorEmail;
