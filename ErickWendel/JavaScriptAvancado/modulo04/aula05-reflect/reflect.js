"use strict";

const assert = require("assert");

// Garante a semântica e segurança dos objetos

const myObj = {
  add(value) {
    return this.arg1 + this.arg2 + value;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// Um cenário que poderia ocorrer:
const myObjRemodelled = {
  add(value) {
    return this.arg1 + this.arg2 + value;
  },
};

// Function.prototype.apply = () => {
//   throw new TypeErr9r("Vixxx");
// };

// ou

myObjRemodelled.add.apply = function () {
  throw new TypeError("Vixxx");
};

assert.throws(() => myObjRemodelled.add.apply({}, []), {
  name: "TypeError",
  message: "Vixxx",
});

// Usando o reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]); // Não modificamos o prototype

assert.deepStrictEqual(result, 260);

// defineProperty (mais uma questão semântica, famosa perfumaria)
function MyDate() {}

// feio
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });

// Só semantica...
Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey dude" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there");
assert.deepStrictEqual(MyDate.withReflection(), "Hey dude");

// deleteProperty
const withDelete = { user: "ErickWendel" };
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

const withReflection = { user: "Xuxa" };
Reflect.deleteProperty(withReflection, "user");

assert.deepStrictEqual(withReflection.hasOwnProperty("user"), false);

// get - Deveria ter get somente em instâncias de ref.
console.log((1)["userName"]); // devolve undefined
assert.deepStrictEqual((1)["userName"], undefined);

// Com o Reflect, não é possível acessar propriedades de tipos primitivos
// console.log(Reflect.get(1, "userName")); // devolve TypeError
assert.throws(() => Reflect.get(1, "userName"), TypeError);

// has
assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));

// ownKeys
// Se quiséssemos pegar symbols e objetos ao mesmo tempo, teriamos de ter 2 chamadas

const user = Symbol("user");
const dbUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "erickwendel",
};

const objKeys = [
  ...Object.getOwnPropertyNames(dbUser),
  ...Object.getOwnPropertySymbols(dbUser),
];

console.log(
  "keys",

  objKeys
);

assert.deepStrictEqual(objKeys, ["id", Symbol.for("password"), user]);

// Com o Reflect, é mais simples
assert.deepStrictEqual(Reflect.ownKeys(dbUser), [
  "id",

  Symbol.for("password"),
  user,
]);
