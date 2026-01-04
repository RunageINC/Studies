
#JavaScript 

O tipo Symbol é um tipo primitivo. É basicamente um dado privado para acesso direto, onde uma chave única é criada para aquela propriedade (evitando também a colisão de nomes de variáveis). Também são muito utilizados para esconder dados e implementações privadas, já que não são enumerados por padrão nos loopings.

Observe o caso abaixo:

```javascript
const uniqueKey = Symbol("userName"); //torna-se um método privado
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for Symbol";

console.log("getting normal objects", user.userName);
console.log("getting Symbol", user[Symbol("userName")]);
```

A primeira vista, parece que temos 2 propriedades iguais. Porém, é ai que entra o grande fator do Symbol.

Esse tipo cria na verdade um endereço único de memória para essa propriedade, sendo na prática completamente diferente do objeto criado de maneira usual.

Para acessar o valor da propriedade devemos utilizar o mesmo valor criado, ou seja, a constante `uniqueKey`:

```javascript
console.log("getting Symbol", user[uniqueKey]);
```

Embora seja uma variável privada, podemos conferir seus valores através de um debugger, e também através de um bypass (que é uma má pratica):

```javascript
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);
```

Também é possível criar iteradores específicos:

```javascript
const obj = {
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(), //retorna o ultimo item do array e remove ele
      };
    },
  }),
};

for (const item of obj) {
  console.log("item", item);
}
```

É uma boa prática na hora de criar Symbols para constantes iniciar o nome com a letra k. Ex: kItem, kValue, kTerm. Basicamente todas as classes do node nativas fazem uso de Symbols dado que muitos métodos sã privados.

### toStringTag

A título de curiosidade, quando acessamos um objeto, acabamos nos deparando com a resposta `[object Object]`. Esse segundo é chamado de String Tag, e podemos acessar através dos Symbols também.

```javascript
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  get [Symbol.toStringTag]() {
    return "WHAT?";
  }
}

console.log(Object.prototype.toString.call(myDate))
// [object WHAT?]
```

### Iterators

Os objetos JavaScript e as classes por extensão não possuem comportamento padrão de iteração. Se tentarmos acessar o objeto dessa forma:

```javascript
console.log([...myDate])
```

Iremos tomar um erro dizendo que essa classe não é iterável. Para que consigamos ter esse comportamento iterável, é necessário escrever o código e podemos fazer isso utilizando os Symbols:

```javascript
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  get [Symbol.toStringTag]() {
    return "WHAT?";
  }

  [Symbol.toPrimitive](cohercionType) {
    if (cohercionType !== "string") throw new TypeError();

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-br", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );

    return new Intl.ListFormat("pt-br", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
	// Simulando uma request com uma certa demora
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
}
```

Todas as funções de iteração, síncronas e assíncronas, são generators.