const { evaluateRegex } = require("./util");
class TextProcessorFluentAPI {
  // propriedade privada
  #content;

  // ?<= pega todo o texto à frente do padrão
  // [contratante|contratada]:\s{1} pega a palavra contratante ou contratada seguida de um dois pontos e espaço
  // /gim: significa case insensitive. g = global, m = multiline, i = case insensitive

  // ?!\s negative look around, ignora tudo que só possui espaços à frente, sem texto.
  // .*\n tudo até a primeir quebra de linha
  // .*? non-greedy, faz com que ele pare na primeira recorrência evitando loop

  #REGEX_MATCH_PERSON =
    /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;

  #REGEX_COMMA = /,/;

  #REGEX_LINE_SPACE = /^\s+|\s+$|\n/g;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    evaluateRegex(this.#REGEX_MATCH_PERSON);
    const onlyPerson = this.#content.match(this.#REGEX_MATCH_PERSON);

    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    evaluateRegex(this.#REGEX_COMMA);

    this.#content = this.#content.map((line) => {
      const [contractor, nationality, civilState, cpf, ...items] = line.split(
        this.#REGEX_COMMA
      );

      return {
        contratante: contractor,
        nacionalidade: nationality,
        estadoCivil: civilState,
        cpf: cpf,
        endereco: items.join(","),
      };
    });

    return this;
  }

  removeEmptyCharacters() {
    evaluateRegex(this.#REGEX_LINE_SPACE);

    this.#content = this.#content.map((line) =>
      line.replace(this.#REGEX_LINE_SPACE, "")
    );

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
