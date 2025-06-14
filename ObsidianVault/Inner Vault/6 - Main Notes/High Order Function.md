
High Order Function, ou HoC, é um pattern de desenvolvimento muito comum em javascript. Usado principalmente nas libs de hook form, é uma função que recebe uma segunda função como parâmetro, para que possa ser executada:

```typescript
export function SignIn() {
  const { register, handleSubmit } = useForm<SignInForm>();

  function handleSignIn(data: SignInForm) {}

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>
            <Button type="submit" className="w-full">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
```

Nesse exemplo, temos o handleSubmit como uma função de hierarquia maior, recebendo o handleSignIn como hierarquia menor, para que possa ser executada.