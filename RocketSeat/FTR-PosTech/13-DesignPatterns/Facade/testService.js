class EmailService {
  sendEmail(to, message) {
    console.log(`Enviando email para ${to}: ${message}`);
  }
}

class SMSService {
  sendSMS(to, message) {
    console.log(`Enviando SMS para ${to}: ${message}`);
  }
}

class PushNotificationService {
  sendPushNotification(to, message) {
    console.log(`Enviando push notification para ${to}: ${message}`);
  }
}

class NotificationFacade {
  constructor() {
    this.emailService = new EmailService();
    this.smsService = new SMSService();
    this.pushNotificationService = new PushNotificationService();
  }

  sendNotification(type, to, message) {
    switch (type) {
      case "email":
        this.emailService.sendEmail(to, message);
        break;
      case "sms":
        this.smsService.sendSMS(to, message);
        break;
      case "push":
        this.pushNotificationService.sendPushNotification(to, message);
        break;
      default:
        console.log("Tipo de notificação desconhecido.");
    }
  }
}

const notificationFacade = new NotificationFacade();
notificationFacade.sendNotification(
  "email",
  "teste@teste.com",
  "Hello, world!"
);
notificationFacade.sendNotification("sms", "+1234567890", "Hello, world!");
notificationFacade.sendNotification("push", "+1234567890", "Hello, world!");
