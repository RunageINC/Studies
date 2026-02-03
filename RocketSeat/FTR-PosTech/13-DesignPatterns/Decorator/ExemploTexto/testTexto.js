const text = new Texto("Hello, world!");
const textNegrito = new TextoNegrito(text);
const textSublinhado = new TextoSublinhado(text);
const textItalico = new TextoItalico(text);

console.log(textNegrito.renderizar());
console.log(textSublinhado.renderizar());
console.log(textItalico.renderizar());
