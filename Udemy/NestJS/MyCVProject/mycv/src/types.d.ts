type CreateOrReadUserBody = {
  name?: string;
  email: string;
  password: string;
};

type MyCVSession = {
  userId: number | null;
};

type CreateOrReadReportBody = {
  id?: number;
  price: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  longitude: number;
  latitude: number;
};

type GetEstimateQuery = {
  price: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  longitude: number;
  latitude: number;
};

type ApproveReportBody = {
  approved: boolean;
};
