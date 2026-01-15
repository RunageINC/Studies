import { api } from "@/lib/axios";

export interface GetMonthlyCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthlyCanceledOrdersAmount() {
  const response = await api.get<GetMonthlyCanceledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return response.data;
}
