const PizzaBuilder = require("./PizzaBuilder");
const PizzaDirector = require("./PizzaDirector");

const builder = new PizzaBuilder();
const director = new PizzaDirector(builder);

const margherita = director.buildMargherita();
const pepperoni = director.buildPepperoni();

console.log(margherita);
console.log(pepperoni);
