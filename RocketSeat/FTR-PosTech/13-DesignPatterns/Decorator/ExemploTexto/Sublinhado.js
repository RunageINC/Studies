const TextoDecorator = require("./TextoDecorator");

class Sublinhado extends TextoDecorator {
  renderizar() {
    return `<u>${super.renderizar()}</u>`;
  }
}

module.exports = Sublinhado;
