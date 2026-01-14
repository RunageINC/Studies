import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { openrouter } from "./open-router";
import { z } from "zod";

// export async function GET(request: NextRequest) {
//   const result = await generateText({
//     model: openai("gpt-4o"),
//     prompt: 'Traduza "Hello, world!" para português',
//     system:
//       "Você é uma AI especializada em tradução. Sempre retorne da maneira mais suscinta possível",
//   });

//   return NextResponse.json({ message: result.text });
// }

export async function GET(request: NextRequest) {
  // generateObject embora tenha sido ensinado na pós está depreciado e esta é a nova maneira.
  const result = await generateText({
    model: openrouter.chat("openai/chatgpt-4o-latest"),
    prompt: 'Traduza "Hello, world!" para diferentes idiomas',
    system:
      "Você é uma AI especializada em tradução. Sempre retorne da maneira mais suscinta possível",
    output: Output.object({
      schema: z.object({
        en: z.string().describe("Tradução para inglês"),
        es: z.string().describe("Tradução para espanhol"),
        fr: z.string().describe("Tradução para francês"),
        de: z.string().describe("Tradução para alemão"),
        it: z.string().describe("Tradução para italiano"),
        pt: z.string().describe("Tradução para português"),
        ja: z.string().describe("Tradução para japonês"),
        zh: z.string().describe("Tradução para chinês"),
        ar: z.string().describe("Tradução para árabe"),
        ru: z.string().describe("Tradução para russo"),
        ko: z.string().describe("Tradução para coreano"),
      }),
    }),
  });

  return NextResponse.json({ message: result.response.body });
}
