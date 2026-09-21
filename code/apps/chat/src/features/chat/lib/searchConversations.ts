import type { Conversation } from "../types";

export const searchResultLimit = 50;
const compact = (text: string) => text.replace(/\s+/gu, " ").trim();
export function searchPattern(query: string) {
  const value = compact(query);
  return value
    ? new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu")
    : undefined;
}

/** Built only while search is open. Attachments, reasoning and deleted content are excluded. */
export function indexConversations(conversations: Conversation[]) {
  return conversations
    .filter(
      (c) => !c.deleted && (c.messages.length || c.hasDraft || c.titleEdited),
    )
    .map((conversation) => ({
      conversation,
      title:
        conversation.messages.length || conversation.titleEdited
          ? compact(conversation.title)
          : "",
      texts: [
        ...conversation.messages.map((m) => compact(m.content)),
        compact(conversation.draft ?? ""),
      ].filter(Boolean),
    }));
}

export function searchConversations(
  index: ReturnType<typeof indexConversations>,
  query: string,
  offset = 0,
) {
  const pattern = searchPattern(query);
  const results = index.flatMap(({ conversation, title, texts }) => {
    const titleMatch = !!pattern?.test(title);
    const matchedText = pattern
      ? texts.find((text) => pattern.test(text))
      : undefined;
    if (pattern && !titleMatch && !matchedText) return [];
    const text = matchedText ?? texts.at(-1) ?? "";
    const position = pattern?.exec(text)?.index ?? 0;
    const start = Math.max(0, position - 48);
    const end = Math.min(
      text.length,
      Math.max(start + 160, position + compact(query).length),
    );
    return [
      {
        conversation,
        title,
        titleMatch,
        snippet: `${start ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`,
      },
    ];
  });
  results.sort((a, b) => Number(b.titleMatch) - Number(a.titleMatch));
  return {
    total: results.length,
    items: results.slice(offset, offset + searchResultLimit),
  };
}

export type ChatSearchResults = ReturnType<typeof searchConversations>;
export type SearchChats = (
  query: string,
  offset: number,
  signal: AbortSignal,
) => Promise<ChatSearchResults>;
