import type { ProviderId } from "@shared/contracts/chat";
import type { Conversation } from "../types";

export function newConversation(
  provider: ProviderId = "local",
  model = "sample",
): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "新的对话",
    provider,
    model,
    messages: [],
  };
}
