"use strict";

const Event = require("events");

const event = new Event();

const eventName = "counter";

event.on(eventName, (msg) => console.log("counter updated", msg)); // executa cada vez que o evento nomeado for alterado

// altera os eventos, produzindo 3 resultados
// event.emit(eventName, "hey");
// event.emit(eventName, "ho");
// event.emit(eventName, "let's go");

const myCounter = {
  counter: 0,
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;

    return true;
  },
  get: (object, prop) => {
    // console.log("chamou!", { object, prop });
    return object[prop];
  },
});

// executa a cada X tempo em ms
setInterval(function () {
  console.log("3 - setInterval");
  proxy.counter += 1;
  if (proxy.counter === 10) clearInterval(this);
}, 200);

// não pode setar como 0. É má prática
// sempre executa uma função no futuroMé
setTimeout(() => {
  proxy.counter = 4;
  console.log("2 - setTimeout");
}, 100);

// executa imediatamente
setImmediate(() => {
  console.log("1 - setImmediate", proxy.counter);
});

// executa agora mas acaba com o ciclo de vida do node. Não é boa prática.
process.nextTick(() => {
  proxy.counter = 2;
  console.log("0 - nextTick");
});
