import type { ChatEvent } from "@shared/contracts/chat";
import { imageDataUrl } from "./attachmentAssets";
import { selectContext } from "../lib/contextBudget";
import type { ChatMessage, Conversation, Scenario } from "../types";
import { toRequestMessages } from "../lib/chatHistory";
import { streamAPI } from "./remoteChat";
import { streamLocal } from "./localReplay";

export interface GenerationOptions {
  scenario: Scenario;
  speed: number;
  thinking: boolean;
}

/** Source routing ends here. The run controller consumes the same ChatEvent stream for every source. */
export async function* streamChat(
  conversation: Conversation,
  messages: ChatMessage[],
  options: GenerationOptions,
  signal: AbortSignal,
): AsyncGenerator<ChatEvent> {
  if (conversation.provider === "local")
    return yield* streamLocal({ ...options, signal });
  const selected = selectContext(messages).messages;
  if (selected.some((message) => message.images?.length))
    yield { type: "metadata", requestStage: "preparing" };
  const expanded = await Promise.all(
    selected.map(async (message) => ({
      ...message,
      ...(message.images
        ? {
            images: await Promise.all(
              message.images.map(async (image) => ({
                ...image,
                dataUrl: await imageDataUrl(image),
              })),
            ),
          }
        : {}),
    })),
  );
  signal.throwIfAborted();
  yield { type: "metadata", requestStage: "sending" };
  return yield* streamAPI(
    {
      provider: conversation.provider,
      model: conversation.model,
      thinking: options.thinking,
      messages: toRequestMessages(expanded),
    },
    signal,
  );
}
