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

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const onlyPerson = this.#content.match(this.#REGEX_MATCH_PERSON);

    this.#content = onlyPerson;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
