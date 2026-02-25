const Subject = require("./Subject");

class Loja extends Subject {
  constructor() {
    super();
  }

  addObservers(observer) {
    this.observers.push(observer);
  }

  removeObservers(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObservers() {
    console.log("Notifying observers...");
    this.observers.forEach((observer) => {
      observer.update();
    });
  }

  receiveNewProduct() {
    console.log("Receiving new product...");
    this.notifyObservers();
  }
}

module.exports = Loja;
