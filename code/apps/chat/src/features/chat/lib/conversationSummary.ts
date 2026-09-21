import { z } from "zod";
import type { Conversation } from "../types";
import type { StoredConversation } from "./persistedChat";

export const summarySchema = z
  .object({
    id: z.string().min(1),
    revision: z.string().min(1),
    updatedAt: z.number(),
    conversation: z.object({
      id: z.string().min(1),
      title: z.string(),
      provider: z.enum(["local", "deepseek", "aliyun"]),
      model: z.string(),
      titleEdited: z.boolean().optional(),
      pinnedAt: z.number().optional(),
      archived: z.boolean().optional(),
      deleted: z.boolean().optional(),
      projectId: z.string().optional(),
      hasDraft: z.boolean(),
      messageCount: z.number().nonnegative(),
      unloaded: z.literal(true),
      messages: z.array(z.never()),
    }),
  })
  .refine((r) => r.id === r.conversation.id);
export function summarize(conversation: Conversation): Conversation {
  const {
    id,
    title,
    provider,
    model,
    titleEdited,
    pinnedAt,
    archived,
    deleted,
    projectId,
  } = conversation;
  return {
    id,
    title,
    provider,
    model,
    titleEdited,
    pinnedAt,
    archived,
    deleted,
    projectId,
    hasDraft: !!(
      conversation.hasDraft ||
      conversation.draft?.trim() ||
      conversation.attachments?.length
    ),
    messageCount: conversation.messageCount ?? conversation.messages.length,
    unloaded: true,
    messages: [],
  };
}
export function summaryRecord(record: StoredConversation) {
  return {
    list: record.conversation.deleted
      ? "deleted"
      : record.conversation.archived
        ? "archived"
        : record.conversation.projectId
          ? `project:${record.conversation.projectId}`
          : "history",
    sortPinned: -(record.conversation.pinnedAt ?? 0),
    sortUpdated: -record.updatedAt,
    searchable: Number(
      !record.conversation.deleted &&
        !!(
          record.conversation.messages.length ||
          record.conversation.hasDraft ||
          record.conversation.draft?.trim() ||
          record.conversation.attachments?.length ||
          record.conversation.titleEdited
        ),
    ),
    id: record.id,
    revision: record.revision,
    updatedAt: record.updatedAt,
    conversation: summarize(record.conversation),
  };
}
export const messageCount = (conversation: Conversation) =>
  conversation.unloaded
    ? (conversation.messageCount ?? 0)
    : conversation.messages.length;
export function searchRecord(record: StoredConversation) {
  const texts = record.conversation.deleted
    ? []
    : [
        ...record.conversation.messages.map((m) => m.content),
        record.conversation.draft ?? "",
      ]
        .filter(Boolean)
        .map((s) => s.replace(/\s+/gu, " ").trim());
  return {
    ...summaryRecord(record),
    texts,
  };
}
export type SearchDocument = ReturnType<typeof searchRecord>;
