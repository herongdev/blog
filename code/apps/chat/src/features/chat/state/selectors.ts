import type { ChatMessage } from "../types";

export function isGenerating(message?: ChatMessage) {
  return message?.status === "waiting" || message?.status === "streaming";
}
