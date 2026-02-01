import { getMonthlyCanceledOrdersAmount } from "@/api/get-monthly-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthlyCancelOrdersAmountCard() {
  const { data: monthlyCanceledOrdersAmount } = useQuery({
    queryKey: ["metrics", "monthly-canceled-orders-amount"],
    queryFn: getMonthlyCanceledOrdersAmount,
  });

  return monthlyCanceledOrdersAmount ? (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Cancelamentos (mês)</CardTitle>
        <DollarSign className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {monthlyCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
        </span>
        <p className="text-muted-foreground text-xs">
          {monthlyCanceledOrdersAmount.diffFromLastMonth &&
          monthlyCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
            <>
              <span className="text-rose-500 dark:text-rose-400">
                +{monthlyCanceledOrdersAmount.diffFromLastMonth}%
              </span>{" "}
              em relação ao mês passado
            </>
          ) : (
            <>
              <span className="text-emerald-500 dark:text-emerald-400">
                {monthlyCanceledOrdersAmount.diffFromLastMonth}%
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
