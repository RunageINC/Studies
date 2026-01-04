import NotImplementedException from "../notImplementedException.mjs";

export default class ViewFactory {
  createTableComponent() {
    throw new NotImplementedException(this.createTableComponent.name);
  }
  createButtonComponent() {
    throw new NotImplementedException(this.createButtonComponent.name);
  }
}
