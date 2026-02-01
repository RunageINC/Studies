import { setTimeout } from "timers/promises";
import { tool } from "ai";
import { z } from "zod";

export const fetchHttp = tool({
description: 'Essa ferramenta serve para realizar uma requisição HTTP em uma URL requisitada',
inputSchema: z.object({
    url: z.string().describe('O nome da organização no Github'),
}),
execute: async ({ url }) => {
    await setTimeout(2000);
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
})