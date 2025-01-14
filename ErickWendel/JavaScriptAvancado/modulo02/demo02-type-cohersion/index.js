console.log(true + 2); // 3
console.log(true - 2); // -1
console.log("21" + true); // '21true'
console.log("21" - true); // 20
console.log(9999999999999999); // 10000000000000000
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(3 > 2 > 1); // false
console.log(3 > 2 >= 1); // true
console.log(21 - -1); // 22

console.log("B" + "a" + +"a" + "a"); // BaNaNa

// Loose equally operator converte o valor se necessário
console.log("3" == 3); // true

// Strict operator não faz coerção implícita dos tipos
console.log("3" === 3); // false
console.log(3 === 3); // true

// -----------------------------
String(123); // Conversão explícita
123 + ""; // Conversão implícita
// Apesar do resultado ser o mesmo, acontecem em momentos diferentes.

console.assert(String(123) === "123", "Conversão explícita para uma string");
console.assert(123 + "" === "123", "Conversão implícita para uma string");

if (null || 1) {
  console.log("OK"); //entra nesse console
}

if ("hello" || 1) {
  console.log("OK 2"); //também entrou nesse console
}

// Porém essas comparações não estão retornando true ou false mas sim o valor da expressão:
const r = "hello" || 1; //sempre retorna o primeiro argumento se ambos forem true

console.log("r", r);

console.assert(
  ("hello" || 123) === "hello",
  "Retorna o primeiro valor se ambos forem true"
);

console.assert(
  ("hello" && 123) === 123,
  "Retorna o último valor se ambos forem true"
);
// -----------------------------
const item = {
  name: "Arthur Gomes",
  age: 28,
};

console.log("item", item + 0); // [object Object]0 -- Coerção implicita

const item2 = {
  name: "Arthur Gomes",
  age: 28,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

console.log("item2", item2 + 0); // Name: Arthur Gomes, Age: 280

const item3 = {
  name: "Arthur Gomes",
  age: 28,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return this.age;
  },
};

console.log("item3", item3 + 0); // 28

console.log("concat item 3", "".concat(item3)); // Name: Arthur Gomes, Age: 28. Com o concat ele vai chamar o string primeiro

console.log(String(item3)); // Name: Arthur Gomes, Age: 28
console.log(Number(item3)); // 28

const item4 = {
  name: "Arthur Gomes",
  age: 28,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return { hey: "dude" };
  },
};

console.log("valueOf", Number(item4)); // NaN visto que o value of não é um número

const item5 = {
  name: "Arthur Gomes",
  age: 28,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return { hey: "dude" };
  },
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: "007",
    };

    return types[coercionType] || types.string;
  },
};

console.log("string", String(item5)); // {"name":"Arthur Gomes","age":28}
console.log("number", Number(item5)); // 7
console.log("Date", new Date(item5)); // trying to convert to default -> Date invalid Date. Chama a conversão default sendo o default boolean

console.assert(item + 0 === '{"name":"Arthur Gomes","age":28}0');
console.log("!!!item is true?", !!item); // true
console.assert(!!item);

console.log("String concat", "hey".concat(item));
console.assert("hey".concat(item) === 'hey{"name":"Arthur Gomes","age":28}');

console.log("coerção implícita e explícita (usando ==)", item == String(item));
console.assert(item == String(item));

const itemCopy = { ...item5, name: "Zézin", age: 20 };
console.log("New Object", item2);

console.assert(itemCopy.name === "Zézin", "Name is Zézin");
console.assert(itemCopy.age === 20, "Age is 20");
