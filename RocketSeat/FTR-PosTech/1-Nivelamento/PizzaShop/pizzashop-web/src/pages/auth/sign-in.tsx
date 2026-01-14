import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link } from "react-router";

const signInForm = z.object({
  email: z.email({ message: "E-mail inválido" }),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
    },
  });

  const handleSignIn = (data: SignInForm) => {
    try {
      console.log(data);
      toast.success("Enviamos um link de autenticação para o seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => {
            handleSignIn(data);
          },
        },
      });
    } catch (err) {
      toast.error(
        "Erro ao enviar link de autenticação. Credenciais inválidas.",
      );
    }
  };

  return (
    <div className="p-8">
      <Button asChild className="absolute top-8 right-8" variant="ghost">
        <Link to="/auth/sign-up">Novo estabelecimento</Link>
      </Button>
      <Helmet title="Login" />
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Accessar painel
          </h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe suas vendas pelo painel do parceiro
          </p>
        </div>
        {/* Formulário com o pattern high order function, onde passamos outra função como parâmetro para 
        executar a ação do formulário */}
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">Seu e-mail</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Accessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
