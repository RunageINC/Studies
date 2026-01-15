import { api } from "@/lib/axios";

export interface GetMonthlyOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthlyOrdersAmount() {
  const response = await api.get<GetMonthlyOrdersAmountResponse>(
    "/metrics/month-orders-amount",
  );

  return response.data;
}
