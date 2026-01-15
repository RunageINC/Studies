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
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const signUpForm = z.object({
  restaurantName: z
    .string()
    .min(3, { message: "Nome do restaurante é obrigatório" }),
  managerName: z.string().min(3, { message: "Nome do gerente é obrigatório" }),
  phone: z.string().min(8, { message: "Telefone inválido" }),
  email: z.email({ message: "E-mail inválido" }),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: "",
      managerName: "",
      phone: "",
      restaurantName: "",
    },
  });

  const { mutateAsync: handleRegisterRestaurant } = useMutation({
    mutationFn: registerRestaurant,
  });

  const handleSignUp = async (data: SignUpForm) => {
    try {
      await handleRegisterRestaurant(data);

      toast.success("Restaurante cadastrado com sucesso.", {
        action: {
          label: "Login",
          onClick: () => {
            navigate(`/auth/sign-in?email=${data.email}`);
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
        <Link to="/auth/sign-in">Fazer login</Link>
      </Button>
      <Helmet title="Cadastro" />
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-muted-foreground text-sm">
            Seja um parceiro do Pizza Shop e comece a vender pizzas
          </p>
        </div>
        {/* Formulário com o pattern high order function, onde passamos outra função como parâmetro para 
        executar a ação do formulário */}
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-2">
          <FieldGroup>
            <Controller
              name="restaurantName"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="restaurantName">
                    Nome do estabelecimento
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    id="restaurantName"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="managerName"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="managerName">Seu nome</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    id="managerName"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="email">Seu e-mail</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="email"
                    id="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="phone">Seu celular</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="tel"
                    id="phone"
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

          <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="underline underline-offset-4">
              Termos de serviço
            </a>{" "}
            e{" "}
            <a href="#" className="underline underline-offset-4">
              Política de Privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
