const NotificadorDecorator = require("./NotificadorDecorator");

class NotificadorSMS extends NotificadorDecorator {
  enviar(message) {
    super.enviar(message);
    console.log(`Enviando SMS: ${message}`);
  }
}

module.exports = NotificadorSMS;
