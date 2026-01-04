export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }

  creditCard(paymentData) {
    console.log(`Payment with credit card from ${paymentData.userName}`);

    this.paymentSubject.notify(paymentData);
  }
}
