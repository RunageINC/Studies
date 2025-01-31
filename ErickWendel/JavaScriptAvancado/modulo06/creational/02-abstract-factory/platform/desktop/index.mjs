import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableConsoleComponent from "./table.mjs";

export default class ConsoleFactory extends ViewFactory {
  createTableComponent() {
    return new TableConsoleComponent();
  }
}
