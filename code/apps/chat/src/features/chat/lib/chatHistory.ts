import { selectContext } from "./contextBudget";
import type { ChatMessage } from "../types";
import type { ChatRequest } from "@shared/contracts/chat";

/** Only completed assistant replies form model context; UI-only state never crosses the API boundary. */
export function toRequestMessages(
  messages: ChatMessage[],
): ChatRequest["messages"] {
  return selectContext(messages).messages.map((message) => ({
    role: message.role,
    content: message.content,
    ...(message.role === "user" && message.images?.length
      ? { images: message.images.map((image) => image.dataUrl) }
      : {}),
    ...(message.role === "assistant"
      ? {
          reasoning_content: message.activities
            .filter((activity) => activity.kind === "reasoning")
            .map((activity) => activity.content)
            .join("\n"),
        }
      : {}),
  }));
}
