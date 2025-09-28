import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openRouter } from "./open-router";

export async function GET(_: NextRequest) {
  const result = await generateText({
    model: openRouter.chat("openai/chatgpt-4o-latest"),
    prompt: "Hello, how are you? Translate this to 5 different languages.",
    system:
      "You are a specialized AI in translating text. Always return in the most direct way possible.",
  });

  return NextResponse.json({ message: result.text });
}
