const assert = require("assert");

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);

console.log("arr3", arr3);
console.log("arr3 sorted", arr3.sort());

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

const set = new Set(); // Não é um array, mas sim um objeto iterável

arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

console.log("set with adds from 2 arrays", set);

console.log("set with Array.from", Array.from(set));

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);

// Com spread operator
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
]);

// Bem parecido com o map
console.log("keys", set.keys());
console.log("values", set.values()); //só existe por conta do map

// No array comum, para saber se um item existe: [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has("3"));

// Mesma teoria do map mas sempre trabalha com a lista toda

// Intersection - existe nos dois arrays:

const users01 = new Set(["Erick", "ErickWendel", "Xuxa da Silva"]);
const users02 = new Set(["Erick", "Xuxa da Silva", "Joãozinho"]);

const intersection = new Set([...users01].filter((user) => users02.has(user)));

console.log("intersection value", intersection);
assert.deepStrictEqual(Array.from(intersection), ["Erick", "Xuxa da Silva"]);

// Difference

const diff = new Set([...users01].filter((user) => !users02.has(user)));
console.log("diff", diff);
assert.deepStrictEqual(Array.from(diff), ["ErickWendel"]);

// WeakSet segue o mesmo conceito do WeakMap. Não é iterável, não tem .size, clear, etc
// só tem add, has e delete

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);

// Em geral, as estruturas Weak's mantém somente em memória e só fazem sentido para tal.
