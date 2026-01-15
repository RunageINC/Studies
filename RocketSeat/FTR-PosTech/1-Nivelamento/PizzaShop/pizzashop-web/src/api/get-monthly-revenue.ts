import { api } from "@/lib/axios";

export interface GetMonthlyRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthlyRevenue() {
  const response = await api.get<GetMonthlyRevenueResponse>(
    "/metrics/month-receipt",
  );

  return response.data;
}
