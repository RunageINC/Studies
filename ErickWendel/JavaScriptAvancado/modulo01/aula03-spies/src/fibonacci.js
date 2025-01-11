class Fibonacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) return;

    //considerado um return para funções do tipo generator
    yield current;

    //delega a função mas não retorna o valor, por conta do asterísco
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
