import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export interface GetDailyRevenueInPeriodResponse {
  date: string;
  receipt: number;
}

export async function getDailyRevenueInPeriod(
  query: GetDailyRevenueInPeriodQuery,
) {
  const response = await api.get<GetDailyRevenueInPeriodResponse[]>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from: query.from,
        to: query.to,
      },
    },
  );
  return response.data;
}
