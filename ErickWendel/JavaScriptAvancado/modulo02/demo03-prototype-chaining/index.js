const assert = require("assert");

const obj = {};
const arr = [];
const fn = () => {};

// Internamente os objetos literais viram funções explícitas.

console.log("new Object is {}", new Object().__proto__ === {}.__proto__);

//deepStrictEqual compara os valores e os tipos dos valores de maneira interna
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// O __proto__ é a referência do objeto que possui as propriedades nele

console.log(obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log(
  "arr.__proto__ === Array.prototype",
  arr.__proto__ === Array.prototype
);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log(
  "fn.__proto__ === Function.prototype",
  fn.__proto__ === Function.prototype
);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// o __proto__ de object é na verdade um null
// tudo herda de object e no fim, tudo herda de null

console.log(
  "obj.__proto__.__proto__ === null",
  obj.__proto__.__proto__ === null
);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

// ----------------------------------------------
console.log("----------------------------------------------");

function Employee() {}

Employee.prototype.salary = () => "salary**";

console.log("Employee.salary", Employee.prototype.salary());

function Supervisor() {}

Supervisor.prototype = Object.create(Employee.prototype);

console.log("Supervisor.salary", Supervisor.prototype.salary());

Supervisor.prototype.profitShare = () => "profitShare**";

console.log("Supervisor.profitShare", Supervisor.prototype.profitShare());

function Manager() {}

Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// Se chamarmos o manager via prototype da certo. Mas uma chamada direta provocará erro
console.log("Manager.salary", Manager.prototype.salary());
console.log("Manager.salary without prototype", Manager.salary()); // vai dar erro.

// Se não chamarmos o 'new', o primeiro __proto__ será sempre Function, sem herança das classes.
// Pra acessar sem new, podemos acessar via prototype
console.log(
  "Manager.prototype.__proto__ === Supervisor.prototype",
  Manager.prototype.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// ----------------------------------------------
console.log("----------------------------------------------");

//Quando chamamos o new, o __proto__ recebe o prototype atual

console.log(
  "manager.__proto__: %s, managery.salary(): %s",
  new Manager().__proto__,
  new Manager().salary()
);
console.log(Supervisor.prototype === new Manager().__proto__.__proto__);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

// ----------------------------------------------
console.log("----------------------------------------------");

const manager = new Manager();
console.log("manager.salary", manager.salary());
console.log("manager.profitShare", manager.profitShare());
console.log("manager.monthlyBonuses", manager.monthlyBonuses());

console.log(manager.__proto__); // Traz o manager
console.log(manager.__proto__.__proto__); // Traz o supervisor
console.log(manager.__proto__.__proto__.__proto__); // Traz o employee
console.log(manager.__proto__.__proto__.__proto__.__proto__); // Traz o object
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__); // Traz o null

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

// ----------------------------------------------
console.log("----------------------------------------------");

class T1 {
  ping() {
    return "ping";
  }
}

class T2 extends T1 {
  pong() {
    return "pong";
  }
}

class T3 extends T2 {
  shoot() {
    return "shoot";
  }
}

const t3 = new T3();

console.log(`${t3.ping()} ${t3.pong()} ${t3.shoot()}`);

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);
