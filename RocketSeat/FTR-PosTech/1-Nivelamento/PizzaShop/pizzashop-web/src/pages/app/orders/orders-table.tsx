import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderTableRow } from "./order-table-row";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders, type GetOrdersResponse } from "@/api/get-orders";
import { useSearchParams } from "react-router";
import { z } from "zod";
import { OrderTableSkeleton } from "./order-table-skeleton";

export function OrdersTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingOrders } =
    useQuery<GetOrdersResponse>({
      queryKey: ["orders", pageIndex, orderId, customerName, status],
      queryFn: () =>
        getOrders({
          pageIndex,
          orderId,
          customerName,
          status: status === "all" ? null : status,
        }),
    });

  const handlePaginate = (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", (page + 1).toString());

      return prev;
    });
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]"></TableHead>
              <TableHead className="w-[140px]">Identificador</TableHead>
              <TableHead className="w-[180px]">Realizado há</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[140px]">Total do pedido</TableHead>
              <TableHead className="w-[164px]"></TableHead>
              <TableHead className="w-[132px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result &&
              result.orders.map((order) => (
                <OrderTableRow key={order.orderId} order={order} />
              ))}
            {isLoadingOrders && <OrderTableSkeleton />}
          </TableBody>
        </Table>
      </div>
      {result && (
        <Pagination
          pageIndex={result.meta.pageIndex}
          totalCount={result.meta.totalCount}
          perPage={result.meta.perPage}
          onPageChange={handlePaginate}
        />
      )}
    </>
  );
}
