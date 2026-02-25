class Iterator {
  constructor(colecao) {
    this.colecao = colecao;
    this.index = 0;
  }

  next() {
    const item = this.colecao[this.index];
    this.index++;
    return item;
  }

  hasNext() {
    return this.index < this.colecao.length;
  }

  hasPrevious() {
    return this.index > 0;
  }

  previous() {
    this.index--;

    if (!this.hasPrevious()) {
      return null;
    }

    return this.colecao[this.index];
  }
}

module.exports = Iterator;
