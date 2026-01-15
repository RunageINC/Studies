import { api } from "@/lib/axios";

export interface UpdateProfileRequest {
  name: string;
  description: string | null;
}

export async function updateProfile(body: UpdateProfileRequest) {
  await api.put("/profile", body);
}
