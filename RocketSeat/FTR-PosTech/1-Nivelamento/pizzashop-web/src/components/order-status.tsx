type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};

const orderStatusColor: Record<OrderStatus, string> = {
  pending: "bg-slate-400",
  canceled: "bg-rose-500",
  delivered: "bg-emerald-500",
  delivering: "bg-amber-500",
  processing: "bg-amber-500",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${orderStatusColor[status]}`} />
      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
