import { getMonthlyOrdersAmount } from "@/api/get-monthly-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthlyOrdersAmountCard() {
  const { data: monthlyOrdersAmount } = useQuery({
    queryKey: ["metrics", "monthly-orders-amount"],
    queryFn: getMonthlyOrdersAmount,
  });
  return monthlyOrdersAmount ? (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Pedidos (mês)</CardTitle>
        <Utensils className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {monthlyOrdersAmount.amount.toLocaleString("pt-BR")}
        </span>
        <p className="text-muted-foreground text-xs">
          {monthlyOrdersAmount.diffFromLastMonth &&
          monthlyOrdersAmount.diffFromLastMonth >= 0 ? (
            <>
              <span className="text-emerald-500 dark:text-emerald-400">
                +{monthlyOrdersAmount.diffFromLastMonth}%
              </span>{" "}
              em relação ao mês passado
            </>
          ) : (
            <>
              <span className="text-rose-500 dark:text-rose-400">
                {monthlyOrdersAmount.diffFromLastMonth}%
              </span>{" "}
              em relação ao mês passado
            </>
          )}
        </p>
      </CardContent>
    </Card>
  ) : (
    <MetricCardSkeleton />
  );
}
