import { Helmet } from "react-helmet-async";
import { MonthlyRevenueCard } from "./monthly-revenue-card";
import { MonthlyOrdersAmountCard } from "./monthly-orders-amount-card";
import { DailyOrdersAmountCard } from "./daily-orders-amount-card";
import { MonthlyCancelOrdersAmountCard } from "./monthly-cancel-orders-amount";
import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-chart";

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <Helmet title="Dashboard" />
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <MonthlyRevenueCard />
        <MonthlyOrdersAmountCard />
        <DailyOrdersAmountCard />
        <MonthlyCancelOrdersAmountCard />
      </div>

      <div className="grid grid-cols-9 gap-4">
        <RevenueChart />
        <PopularProductsChart />
      </div>
    </div>
  );
}
