Chama o método via uma interface. Muito útil quando temos pipeline de processamentos de um método:

```javascript
const TextProcessorFluentAPI = require("./textProcessorFluentAPI");

class TextProcessorFacade {
  #textProcessorFluentAPI;

  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}

```

Dessa forma, ao invés de fazer uma chamada imensa, o próprio facade vai retornar a pipe:

```javascript
const instance = new TextProcessorFacade(data.text);
const people = instance.getPeopleFromPDF();
```