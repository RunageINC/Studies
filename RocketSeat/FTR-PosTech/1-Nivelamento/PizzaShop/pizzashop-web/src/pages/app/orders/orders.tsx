import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { OrdersTable } from "./orders-table";
import { OrderTableFilters } from "./order-table-filters";

export function Orders() {
  return (
    <div className="flex flex-col gap-4">
      <Helmet title="Pedidos" />
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      <div className="space-y-2.5">
        <OrderTableFilters />

        <OrdersTable />
      </div>
    </div>
  );
}
