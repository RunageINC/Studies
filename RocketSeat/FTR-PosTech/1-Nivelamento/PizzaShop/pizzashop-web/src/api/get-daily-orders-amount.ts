import { api } from "@/lib/axios";

export interface GetDailyOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDailyOrdersAmount() {
  const response = await api.get<GetDailyOrdersAmountResponse>(
    "/metrics/day-orders-amount",
  );

  return response.data;
}
