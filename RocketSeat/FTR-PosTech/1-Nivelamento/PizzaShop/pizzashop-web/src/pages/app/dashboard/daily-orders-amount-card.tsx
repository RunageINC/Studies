import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDailyOrdersAmount } from "@/api/get-daily-orders-amount";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DailyOrdersAmountCard() {
  const { data: dailyOrdersAmount } = useQuery({
    queryKey: ["metrics", "daily-orders-amount"],
    queryFn: getDailyOrdersAmount,
  });

  return dailyOrdersAmount ? (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {dailyOrdersAmount?.amount.toLocaleString("pt-BR")}
        </span>
        <p className="text-muted-foreground text-xs">
          {dailyOrdersAmount.diffFromYesterday >= 0 ? (
            <>
              <span className="text-emerald-500 dark:text-emerald-400">
                +{dailyOrdersAmount.diffFromYesterday}%
              </span>{" "}
              em relação a ontem
            </>
          ) : (
            <>
              <span className="text-rose-500 dark:text-rose-400">
                {dailyOrdersAmount.diffFromYesterday}%
              </span>{" "}
              em relação a ontem
            </>
          )}
        </p>
      </CardContent>
    </Card>
  ) : (
    <MetricCardSkeleton />
  );
}
