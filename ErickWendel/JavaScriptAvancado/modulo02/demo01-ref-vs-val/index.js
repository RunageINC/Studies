const { deepStrictEqual } = require("assert");

let counter = 0;
let counter2 = counter;

counter2++;
// counter continua com o valor 0
// counter2 agora tem o valor 1

const item = { counter: 0 };
const item2 = item;

// item.counter agora tem o valor 1

// tipos primitivos geram cópias em memória
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

//tipo de referência copia o endereço em memória e aponta para o mesmo lugar
item2.counter++;
deepStrictEqual(item, { counter: 1 });
item.counter++;
deepStrictEqual(item2, { counter: 2 });
