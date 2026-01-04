const assert = require("assert");

const uniqueKey = Symbol("userName"); //torna-se um método privado
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for Symbol";

console.log("getting normal objects", user.userName);

// Sempre único em nível de endereço de memória,
// se torna uma propriedade privada onde não é possível
// acessar o conteúdo diretamente.
console.log("getting Symbol", user[Symbol("userName")]);

// Maneira correta de acessar uma property com Symbol
console.log("getting Symbol", user[uniqueKey]);

assert.deepStrictEqual(user.userName, "value for normal Objects");
assert.deepStrictEqual(user[uniqueKey], "value for Symbol");

console.log("symbols", Object.getOwnPropertySymbols(user)[0]);

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

//bypass - má pratica (nem tem no repositório do node)
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);

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

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");
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
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
}

const myDate = new MyDate([2020, 03, 01], [2018, 02, 02]);

const expectedDates = [new Date(2020, 03, 01), new Date(2018, 02, 02)];

console.log("my date", myDate);

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object WHAT?]"
);

assert.throws(() => myDate + 1, TypeError);

// Conversão explícita para string para acessar o .toPrimitive
assert.deepStrictEqual(
  String(myDate),
  "01 de abril de 2020 e 02 de março de 2018"
);

assert.deepStrictEqual([...myDate], expectedDates);

(async () => {
  for await (const item of myDate) {
    console.log("async iterator", item);
  }
})();

(async () => {
  const dates = await Promise.all([...myDate]);

  assert.deepStrictEqual(dates, expectedDates);
})();
