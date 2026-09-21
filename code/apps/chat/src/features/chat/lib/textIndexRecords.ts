import type { Conversation, ChatMessage } from "../types";
export interface TextIndexRecord {
  id: string;
  conversationId: string;
  kind: "title" | "draft" | "message";
  text: string;
}
export function textIndexRecord(
  conversationId: string,
  id: string,
  kind: TextIndexRecord["kind"],
  value: string,
): TextIndexRecord {
  const text = value.replace(/\s+/gu, " ").trim();
  return {
    id: `${conversationId}:${kind}:${id}`,
    conversationId,
    kind,
    text,
  };
}
export function messageIndexRecord(
  conversationId: string,
  message: ChatMessage,
) {
  return textIndexRecord(
    conversationId,
    message.id,
    "message",
    message.content,
  );
}
export function textIndexRecords(conversation: Conversation) {
  if (conversation.deleted) return [];
  return [
    textIndexRecord(
      conversation.id,
      "",
      "title",
      conversation.messages.length || conversation.titleEdited
        ? conversation.title
        : "",
    ),
    textIndexRecord(conversation.id, "", "draft", conversation.draft ?? ""),
    ...conversation.messages.map((message) =>
      messageIndexRecord(conversation.id, message),
    ),
  ];
}
