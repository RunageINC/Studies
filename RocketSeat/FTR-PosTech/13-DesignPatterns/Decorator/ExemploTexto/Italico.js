const TextoDecorator = require("./TextoDecorator");

class Italico extends TextoDecorator {
  renderizar() {
    return `<i>${super.renderizar()}</i>`;
  }
}

module.exports = Italico;
