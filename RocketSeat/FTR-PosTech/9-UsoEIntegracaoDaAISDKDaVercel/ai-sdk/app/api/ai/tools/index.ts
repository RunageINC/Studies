import type { TypedToolCall, TypedToolResult } from "ai";

import { githubProfile } from "./github-profile";
import { fetchHttp } from "./fetch-http";

export type AIToolSet = TypedToolCall<typeof tools>
export type AIToolResult = TypedToolResult<typeof tools>

export const tools = {
    githubProfile,
    fetchHttp
}