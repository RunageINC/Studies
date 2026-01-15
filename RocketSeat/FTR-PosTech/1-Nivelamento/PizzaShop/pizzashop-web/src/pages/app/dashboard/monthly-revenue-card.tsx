import { getMonthlyRevenue } from "@/api/get-monthly-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function MonthlyRevenueCard() {
  const { data: monthlyRevenue } = useQuery({
    queryKey: ["metrics", "monthly-revenue"],
    queryFn: getMonthlyRevenue,
  });

  return (
    monthlyRevenue && (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Receita total (mês)</CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight">
            {(monthlyRevenue.receipt / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <p className="text-muted-foreground text-xs">
            {monthlyRevenue.diffFromLastMonth >= 0 ? (
              <>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{monthlyRevenue.diffFromLastMonth}%
                </span>{" "}
                em relação ao mês passado
              </>
            ) : (
              <>
                <span className="text-rose-500 dark:text-rose-400">
                  {monthlyRevenue.diffFromLastMonth}%
                </span>{" "}
                em relação ao mês passado
              </>
            )}
          </p>
        </CardContent>
      </Card>
    )
  );
}
