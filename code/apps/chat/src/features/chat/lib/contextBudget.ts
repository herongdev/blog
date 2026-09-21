import { requestImageBudget } from "@shared/contracts/images";
import type { ChatMessage } from "../types";

// Conservative application budget, not a claim about a provider's tokenizer or context window.
export const contextBudget = {
  messages: 80,
  textBytes: 96_000,
  contentChars: 100_000,
  reasoningChars: 200_000,
  imageBytes: requestImageBudget,
} as const;
const bytes = (text: string) => new TextEncoder().encode(text).length;

/** Keep the newest complete turns within a deterministic transport budget; never rewrite stored history. */
export function selectContext(messages: ChatMessage[]) {
  const eligible = messages.filter(
    (m) => m.role === "user" || (m.status === "complete" && !!m.content),
  );
  const turns: ChatMessage[][] = [];
  for (const message of eligible) {
    if (message.role === "user" || !turns.length) turns.push([]);
    turns.at(-1)!.push(message);
  }
  const selected: ChatMessage[][] = [];
  let textBytes = 0,
    imageBytes = 0,
    count = 0;
  for (let i = turns.length - 1; i >= 0; i--) {
    const turn = turns[i];
    const text = turn.reduce(
      (sum, m) =>
        sum +
        bytes(m.content) +
        bytes(
          m.activities
            .filter((a) => a.kind === "reasoning")
            .map((a) => a.content)
            .join("\n"),
        ),
      0,
    );
    const images = turn.reduce(
      (sum, m) =>
        sum +
        (m.images?.reduce(
          (n, image) => n + (image.encodedSize ?? image.dataUrl.length),
          0,
        ) ?? 0),
      0,
    );
    const invalid = turn.some(
      (m) =>
        m.content.length > contextBudget.contentChars ||
        m.activities
          .filter((a) => a.kind === "reasoning")
          .map((a) => a.content)
          .join("\n").length > contextBudget.reasoningChars,
    );
    if (
      invalid ||
      count + turn.length > contextBudget.messages ||
      textBytes + text > contextBudget.textBytes ||
      imageBytes + images > contextBudget.imageBytes
    ) {
      if (!selected.length)
        throw new Error("当前问题或附件过大，请缩短内容后重试。");
      break;
    }
    selected.unshift(turn);
    count += turn.length;
    textBytes += text;
    imageBytes += images;
  }
  return { messages: selected.flat(), limited: count < eligible.length };
}
