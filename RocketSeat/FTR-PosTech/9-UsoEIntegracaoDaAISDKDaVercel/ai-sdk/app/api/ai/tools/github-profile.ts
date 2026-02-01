import { github } from "@/app/lib/octokit";
import { setTimeout } from "timers/promises";
import { tool } from "ai";
import { z } from "zod";

export const githubProfile = tool({
    description: 'Essa ferramenta serve para buscar dados de um usuário no Github e acessar URLs da API para outras informações de um usuário como lista de orgs, repositórios, eventos, followers, following, etc',
    inputSchema: z.object({
      username: z.string().describe('O username do usuário no Github'),
    }),
    execute: async ({ username }) => {
      await setTimeout(2000);
      const response = await github.users.getByUsername({ username });
      
      return response.data;
    },
  })