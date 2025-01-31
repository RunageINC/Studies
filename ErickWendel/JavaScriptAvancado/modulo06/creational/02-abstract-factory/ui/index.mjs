import { database } from "../shared/data.mjs";

class App {
  constructor(factory) {
    this.table = factory.createTableComponent();
  }

  initialize(database) {
    this.table.render(database);
  }
}

(async function main() {
  const path = globalThis.window ? "browser" : "desktop";

  const { default: ViewFactory } = await import(
    `../platform/${path}/index.mjs`
  );

  const app = new App(new ViewFactory());

  app.initialize(database);
})();
