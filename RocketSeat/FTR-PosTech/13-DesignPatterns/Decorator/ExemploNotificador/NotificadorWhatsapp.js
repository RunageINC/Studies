const NotificadorDecorator = require("./NotificadorDecorator");

class NotificadorWhatsapp extends NotificadorDecorator {
  enviar(message) {
    super.enviar(message);
    console.log(`Enviando WhatsApp: ${message}`);
  }
}

module.exports = NotificadorWhatsapp;
