const Iterator = require("./Iterator");

class ColecaoUsuarios {
  constructor() {
    this.usuarios = [];
  }

  adicionarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  obterTodos() {
    for (const usuario of lista) {
      console.log(usuario);
    }

    return this.usuarios;
  }

  criarIterator() {
    return new Iterator(this.usuarios);
  }
}

module.exports = ColecaoUsuarios;
