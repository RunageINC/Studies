
Padrão utilizado na programação funcional como em Go e Elixir, mas também pode ser usado em outras linguagens como TypeScript e Java (facilitado através da lib [[vavr]]).

Também conhecido como Algebraic Data Type (ADT), especificamente uma tagged union ou sum type, pressupõe que cada objeto seja uma possibilidade entre Left ou Right (por isso o nome _either_).

Dentro desse padrão de tratamento de respostas, o **Left** se trata sempre de um erro, enquanto que o **Right** retorna um sucesso. Quando queremos criar um erro, podemos fazer um `makeLeft` enquanto que para devolver sucessos, fazemos um `makeRight`.



### Exemplo: TypeScript

```typescript
export type Left<T> = {
  left: T;
  right?: never;
};

export type Right<U> = {
  left?: never;
  right: U;
};

export type Either<T, U> = NonNullable<Left<T> | Right<U>>;

export const isLeft = <T, U>(e: Either<T, U>): e is Left<T> => {
  return e.left !== undefined;
};

export const isRight = <T, U>(e: Either<T, U>): e is Right<U> => {
  return e.right !== undefined;
};

export type UnwrapEither = <T, U>(e: Either<T, U>) => NonNullable<T | U>;

export const unwrapEither: UnwrapEither = <T, U>({ left, right }: Either<T, U>) => {
  if (right !== undefined && left !== undefined) {
    throw new Error(
      `Received both left and right values at runtime when opening an Either\nLeft: ${JSON.stringify(
        left,
      )}\nRight: ${JSON.stringify(right)}`,
    );
  }

  if (left !== undefined) {
    return left as NonNullable<T>;
  }

  if (right !== undefined) {
    return right as NonNullable<U>;
  }

  throw new Error('Received no left or right values at runtime when opening Either');
};

export const makeLeft = <T>(value: T): Left<T> => ({ left: value });

export const makeRight = <U>(value: U): Right<U> => ({ right: value });

```