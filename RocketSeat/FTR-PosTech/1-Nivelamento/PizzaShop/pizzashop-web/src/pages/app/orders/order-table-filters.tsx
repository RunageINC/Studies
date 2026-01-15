import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldGroup } from "@/components/ui/field";
import { useSearchParams } from "react-router";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { control, handleSubmit, reset } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
  });

  function handleFilterData(data: OrderFiltersSchema) {
    setSearchParams((prev) => {
      if (data.orderId) {
        prev.set("orderId", data.orderId);
      } else {
        prev.delete("orderId");
      }
      if (data.customerName) {
        prev.set("customerName", data.customerName);
      } else {
        prev.delete("customerName");
      }
      if (data.status) {
        prev.set("status", data.status);
      } else {
        prev.delete("status");
      }

      prev.set("page", "1");

      return prev;
    });
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete("orderId");
      prev.delete("customerName");
      prev.delete("status");
      prev.set("page", "1");

      return prev;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilterData)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <FieldGroup>
        <Controller
          name="orderId"
          control={control}
          render={({ field }) => (
            <Field>
              <Input
                type="text"
                placeholder="ID do pedido"
                className="h-8 w-auto"
                {...field}
              />
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="customerName"
          control={control}
          render={({ field }) => (
            <Field>
              <Input
                type="text"
                placeholder="Nome do cliente"
                className="h-8 w-[320px]"
                {...field}
              />
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue="all"
              onValueChange={field.onChange}
              name={field.name}
              value={field.value}
              disabled={field.disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </FieldGroup>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
