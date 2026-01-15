import { api } from "@/lib/axios";

export interface SignInRequest {
  email: string;
}

// Rota command. Rotas command são rotas sem retorno.
export async function signIn({ email }: SignInRequest) {
  await api.post("/authenticate", {
    email,
  });
}
