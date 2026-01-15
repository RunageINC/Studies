import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  type GetManagedRestaurantResponse,
  getManagedRestaurant,
} from "@/api/get-managed-restaurant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const storeProfileFormSchema = z.object({
  name: z.string().min(3, { message: "Nome é obrigatório" }),
  description: z.string().nullable(),
});

type StoreProfileForm = z.infer<typeof storeProfileFormSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery<GetManagedRestaurantResponse>({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<StoreProfileForm>({
    resolver: zodResolver(storeProfileFormSchema),
    defaultValues: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileForm) => {
    // Cache mutation. Estamos atualizando somente os novos dados do cache e não todos.
    const cached = queryClient.getQueryData(["managed-restaurant"]);

    if (cached) {
      queryClient.setQueryData(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }

    return { cached }; // Retornamos o cache atualizado para que possamos usá-lo na função onError.
  };

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    // Antes de fazer a mutação, atualizamos o cache com os novos dados. Interface otimista.
    onMutate: ({ name, description }) => {
      const { cached } = updateManagedRestaurantCache({
        name,
        description,
      });
      return { previousProfile: cached };
    },
    // Se der erro, revertemos o cache para o estado anterior. O contexto são informações compartilháveis entre as funções.
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(
          context.previousProfile as StoreProfileForm,
        );
      }
    },
  });

  const handleStoreProfile = async (data: StoreProfileForm) => {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description ?? null,
      });

      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar perfil!", {
        description: "Tente novamente mais tarde.",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleStoreProfile)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="grid grid-cols-4 items-center gap-4">
                <FieldLabel className="text-right" htmlFor="name">
                  Nome
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="name"
                  className="col-span-3"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="grid grid-cols-4 items-center gap-4">
                <FieldLabel className="text-right" htmlFor="description">
                  Descrição
                </FieldLabel>
                <Textarea
                  className="col-span-3"
                  id="description"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
