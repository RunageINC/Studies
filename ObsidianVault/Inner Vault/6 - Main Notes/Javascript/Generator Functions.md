
#JavaScript 

São utilizadas no Javascript com a sintaxe de * e possuem a keyword *yield* para retornar valores.

O padrão generator permite com que armazenemos os resultados em um array. Sua principal responsabilidade é de transformar as funções em listas e fazer com que os dados sejam entregues sob demanda.

Por padrão ele possui as funções next e return:

```javascript
function* main() {
  yield "Hello";
}

const generator = main();

console.log(generator.next());
```

No caso acima, temos um retorno do "Hello" através do console. Mas se utilizarmos outra chamada do next, vamos ter um undefined. Por que?

```javascript
console.log(generator.next()); // { value: 'Hello', done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

Existem 2 comportamentos interessantes de serem observados: o **value** e o **done**. O valor do value está sendo diretamente atribuído ao que estamos retornando no *yield*. Se não houver outro yield para se trabalhar dentro da função generator, teremos um value undefined. 

E por que do done = true? Porque não existe mais nada a ser trabalhado naquela função ou seja todos os comandos yield foram executados com sucesso e toda a lista foi retornada.

Quando estamos utilizando um `for await (const data of req)` por exemplo, o que está acontecendo é basicamente a utilização da função next do generator até que done = true fazendo com que todos os valores tenham sido retornados.

### Execução de funções:

Também podemos utilizar o *yield* para executar funções recursivamente. Dado o seguinte código:

```javascript
function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "Hello";
  yield "-";
  yield "World";
  yield calculation(20, 10);
}

const generator = main();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

Nesse caso, pode-se deduzir que a função **calculation** vai ser utilizada durante a quarta chamada do next, correto? Mas não é isso que vai acontecer, de fato.

O que acontece, se não utilizamos o *yield* com asterísco é que essa função não será executada mas sim retornada para ser executada posteriormente em algum momento do código:

`{ value: Object [Generator] {}, done: false}`

Para que consigamos executar a função, é necessário adicionar o caractér a mais depois da keyword:

```javascript
function* main() {
  yield "Hello";
  yield "-";
  yield "World";
  yield* calculation(20, 10);
}
```

`{ value: 200, done: false }`
