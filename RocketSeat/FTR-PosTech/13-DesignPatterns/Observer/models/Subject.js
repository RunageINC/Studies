class Subject {
  constructor() {
    this.observers = [];
  }

  addObservers(observer) {
    throw new Error("Method not implemented");
  }

  removeObservers(observer) {
    throw new Error("Method not implemented");
  }

  notifyObservers() {
    throw new Error("Method not implemented");
  }
}

module.exports = Subject;
