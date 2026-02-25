const ColecaoUsuarios = require("./ColecaoUsuarios");

const usuarios = new ColecaoUsuarios();

usuarios.adicionarUsuario("João");
usuarios.adicionarUsuario("Maria");
usuarios.adicionarUsuario("Pedro");

const produtos = new ColecaoDeProdutos();
produtos.adicionarProduto("Produto 1");
produtos.adicionarProduto("Produto 2");
produtos.adicionarProduto("Produto 3");

const iteratorUsuarios = usuarios.criarIterator();
const iteratorProdutos = produtos.criarIterator();

while (iteratorUsuarios.hasNext()) {
  console.log(iteratorUsuarios.next());
}

while (iteratorUsuarios.hasPrevious()) {
  console.log(iteratorUsuarios.previous());
}

while (iteratorProdutos.hasNext()) {
  console.log(iteratorProdutos.next());
}

while (iteratorProdutos.hasPrevious()) {
  console.log(iteratorProdutos.previous());
}
