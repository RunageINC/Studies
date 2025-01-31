//(\w+):\s.*

const { evaluateRegex } = require("./util");

class Person {
  constructor([name, nationality, civilState, document, ...address]) {
    this.name = name;
    this.nationality = this.#firstLetterUpperCased(nationality);
    this.civilState = this.#firstLetterUpperCased(civilState);
    this.document = this.#documentFormatter(document);
    this.address = {
      street: this.#streetFormatter(address[0]),
      number: address[1],
      neighborhood: this.#neighborhoodFormatter(address[2]),
      state: this.#stateFormatter(address[3]),
    };
  }

  #firstLetterUpperCased(word) {
    // (\w{1}) -> pega a primeira letra
    // ([a-zA-Z]+$) -> pega o restante até o final da linha
    // g -> global, encontra todas as ocorrências
    const regexUpperCase = /^(\w{1})([a-zA-Z]+$)/gim;
    const validatedRegex = evaluateRegex(regexUpperCase);

    return word.replace(validatedRegex, (fullMatch, group1, group2, index) => {
      return `${group1.toUpperCase()}${group2.toLowerCase()}`;
    });
  }

  #documentFormatter(doc) {
    const regexDocument = /\D/g;
    const validRegex = evaluateRegex(regexDocument);

    return doc.replace(validRegex, "");
  }

  #streetFormatter(street) {
    const regexStreet = /(?<=\sa\s).*$/gm;
    const validatedRegex = evaluateRegex(regexStreet);

    // começa a buscar depois do espaço e pega qualquer letra ou dígito até o fim da linha
    return street.match(validatedRegex, "").join();
  }

  #neighborhoodFormatter(neighborhood) {
    const regexNeighborhood = /(?<=\s).*$/;
    const validatedRegex = evaluateRegex(regexNeighborhood);

    return neighborhood.match(validatedRegex, "").join();
  }

  #stateFormatter(state) {
    const regex = /\.$/;
    const validatedRegex = evaluateRegex(regex);

    return state.replace(validatedRegex, "");
  }
}

module.exports = Person;
