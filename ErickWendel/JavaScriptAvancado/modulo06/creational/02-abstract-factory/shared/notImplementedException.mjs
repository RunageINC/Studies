export default class NotImplementedException extends Error {
  constructor(message) {
    super(`The ${message} function has not been implemented.`);

    this.name = "NotImplementedException";
  }
}
