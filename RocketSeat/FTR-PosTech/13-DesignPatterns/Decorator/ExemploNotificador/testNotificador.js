const NotificadorSMS = require("./NotificadorSMS");
const NotificadorEmail = require("./NotificadorEmail");
const NotificadorSlack = require("./NotificadorSlack");
const NotificadorWhatsapp = require("./NotificadorWhatsapp");

const notificador = new NotificadorEmail();
notificador.enviar("Hello, world!");

const notificadorSMS = new NotificadorSMS(notificador);
const notificadorSlkack = new NotificadorSlack(notificadorSMS);
const notificadorWhatsapp = new NotificadorWhatsapp(notificadorSlkack);

notificadorWhatsapp.enviar("Hello, world!");
