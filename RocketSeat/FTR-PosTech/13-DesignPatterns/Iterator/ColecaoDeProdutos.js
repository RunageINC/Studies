const Iterator = require("./Iterator");

class ColecaoDeProdutos {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }

  criarIterator() {
    return new Iterator(this.produtos);
  }
}

module.exports = ColecaoDeProdutos;
