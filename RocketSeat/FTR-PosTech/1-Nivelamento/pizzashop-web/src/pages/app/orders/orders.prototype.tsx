import { getOrders } from "@/api/get-orders";
import { useQuery } from "@tanstack/react-query";
import { OrderTableRow } from "./order-table-row.prototype";

export function Orders() {
  const { data: result } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <div>
      {result &&
        result.orders.map((order) => (
          <OrderTableRow key={order.orderId} order={order} />
        ))}
    </div>
  );
}
