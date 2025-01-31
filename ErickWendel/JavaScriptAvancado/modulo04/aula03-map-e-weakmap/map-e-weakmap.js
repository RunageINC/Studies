const assert = require("assert");

const myMap = new Map();

// padrão default de definição
myMap
  .set(1, "one")
  .set("Erick", { text: " two" })
  .set(true, () => "hello");

// com construtor
const myMapWithConstructor = new Map([
  ["1", "one"],
  [1, "num1"],
  [true, "bool1"],
]);

console.log("myMap", myMap);
console.log("myMap.get(1)", myMap.get(1));

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Erick"), { text: " two" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em objects, chave só pode ser string ou symbol (numbers são convertidos para string)
const onlyReferenceWorks = { id: 1 };

myMap.set(onlyReferenceWorks, { name: "ErickWendel" });

console.log("get", myMap.get({ id: 1 })); // undefined, pois é outro objeto
console.log("get", myMap.get(onlyReferenceWorks)); // { name: 'ErickWendel' }

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "ErickWendel" });

// Utilitários

// Para iterar em objects, teriamos o Object.keys, e para saber o tamanho, usariamos o length
assert.deepStrictEqual(myMap.size, 4); //aqui podemos usar o size

// Para verificar se um objeto tem algo, teriamos que fazer um if(obj[key])
// O jeito mais certo em object é ({ name: 'Erick' }).hasOwnProperty('name')
console.log("has Erick? with object", { name: "Erick" }.hasOwnProperty("name"));
console.log("has 1? with map.has", myMap.has(1));

assert.ok(myMap.has(onlyReferenceWorks));

// Para remover, delete item.id. Mas não é performático
assert.ok(myMap.delete(onlyReferenceWorks));

// não da pra iterar em objects diretamente, teriamos que usar Object.entries
// no map, o padrão generator é usado.
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  '[[1,"one"],[true,"bool1"]]'
);

for (const [key, value] of myMap) {
  console.log({ key, value });
}

// Object é inseguro porque dependendo do nome da propriedade, pode sobrescrever
// uma propriedades do objeto ou até mesmo uma implementação como por exemplo o toString.
// Qualquer chave pode colidir em object: constructor, toString, valueOf, etc

const actor = {
  name: "Xuxa da Silva",
  toString: "Queen: Xuxa da Silva",
};

// não tem restrição de nome de chave
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actoor).toString, TypeError);

// Diferente de um object, ele pode ser limpo sem reassiná-lo
myMap.clear();

assert.deepStrictEqual([...myMap.keys()], []);

// adição de chave com frequencia
/**
 * 1 - Precise adicionar chaves com frequência
 * 2 - Precise validar se uma chave existe de forma semântica
 * 3 - Precise que um objeto funcione como um banco de dados, onde a chave é
 *      um objeto e tem um conjunto de dados
 * 4 -  Em casos que você precise limpar a referência após o uso. Como no HTML,
 *      quando um usuário clica no botão reset e você deve limpar todos os objetos,
 *      que geralmente você teria que colocar o valor default para cada um deles. */

// -- WeakMap

// Pode ser coletado após perder as referencias.
// Usado em casos bem específicos
// Um bom caso de uso algorítimico seria o do uso em caches ou algoritmos como fibonacci
// onde ter apenas por um curto período de tempo satisfaz o problema

// Tem maioria dos benefícios do Map mas não é iterável
// Só chaves de referência que já são conhecidas.
// É mais leve e prevê o leak de memória dado que as instâncias saem de memória, tudo é limpo.

const weakMap = new WeakMap();
const hero = { name: "Flash" };

weakMap.set(hero);
weakMap.get(hero);
weakMap.delete(hero);
weakMap.has(hero);
