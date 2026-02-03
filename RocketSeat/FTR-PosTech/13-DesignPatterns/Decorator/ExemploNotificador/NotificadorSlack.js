const NotificadorDecorator = require("./NotificadorDecorator");

class NotificadorSlack extends NotificadorDecorator {
  enviar(message) {
    super.enviar(message);
    console.log(`Enviando Slack: ${message}`);
  }
}

module.exports = NotificadorSlack;
