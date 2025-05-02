
#JavaScript 

Funções em JavaScript tem muitos conceitos.

// Todo: finalizar

## Contextos

Dentro da linguagem, as funções trabalham com contextos. Esses contextos podem ser locais ou de escopo global. 

Dentro das funções, todos os métodos passados serão atribuidos ao contexto da própria função. Por ex: 

```javascript
const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    this.formatDocument();
    this.showContent(filename);
    this.formatDocument();
  }

  async showContent() {
    console.log((await readFile(filename)).toString());
  }

  async formatDocument() {
	console.log('-------------');
  }
}

const file = new File();

watch(__filename, file.watch);
```

Nesse caso, a nossa função de callback vai estar dentro do contexto do watch. Supondo que nossa classe File tenha essa função watch e faça uma série de operações como por exemplo `showContent()`, `formatDocument()`, entre outras, essas operações todas irão falhar. Isso porque geralmente estamos definindo dentro do File como `this.showContent()` e para o JavaScript o this vai acabar colocando para dentro do contexto do watch.

O watch possui um méodo chamado showContent? E um método chamado formatDocument? Com certeza não, então quando tentarmos aplicar o this.formatDocument por baixo dos panos o JavaScript está tentando pegar essa função do método principal `watch`. Como resolvemos isso? 

### bind()

A função bind faz a atribuição do contexto, para que possamos contornar o problema descrito acima. Basicamente ele retorna uma função com o this de contexto correto:

```javascript
watch(__filename, file.watch.bind(file));
```

### call() e apply()

Outro método de atribuição de contexto é o call. Esse método faz uma substituição de função onde o primeiro parâmetro é um objeto com os nomes de funções e a sobrescrita do comportamento, seguido dos argumentos que essa função recebe:

```javascript
file.watch.call(
  { showContent: () => console.log("Call: Show content") },
  null,
  __filename
);
```

O apply é muito similar, diferenciando somente que ele resolve um array de argumentos ao invés de argumentos soltos.

```javascript
file.watch.apply({ showContent: () => console.log("Call: Show content") }, [
  null,
  __filename,
]);

```

Esses métodos podem ser melhor encontrados em bibliotecas de teste onde o comportamento de alguma função tem de ser mockado.
### keyword arguments

Podemos utilizar também o arguments dentro de um arquivo, que retorna todos os argumentos passados para um método:

```javascript
class File {
  watch(event, filename) {
    this.showContent(filename);

	console.log('arguments', arguments);
  }

  async showContent() {
    console.log((await readFile(filename)).toString());
  }
}
```

Mas não é uma boa prática manter o arguments, pois é facil de sair de controle.