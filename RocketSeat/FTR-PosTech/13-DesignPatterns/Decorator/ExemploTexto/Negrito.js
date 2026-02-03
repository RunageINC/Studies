const TextoDecorator = require("./TextoDecorator");

class Negrito extends TextoDecorator {
  renderizar() {
    return `<b>${super.renderizar()}</b>`;
  }
}

module.exports = Negrito;
