const Cliente = require("./models/ConcreteObserver");
const Loja = require("./models/ConcreteSubject");

const cliente1 = new Cliente("Cliente 1");
const cliente2 = new Cliente("Cliente 2");
const cliente3 = new Cliente("Cliente 3");

const loja = new Loja();

loja.addObservers(cliente1);
loja.addObservers(cliente2);
loja.addObservers(cliente3);

loja.receiveNewProduct();

loja.removeObservers(cliente2);

loja.receiveNewProduct();
