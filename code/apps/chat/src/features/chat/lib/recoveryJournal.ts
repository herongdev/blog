import { z } from "zod";
import { journalSchema, type PendingConversation } from "./persistedChat";
import type { Conversation, ImageAttachment } from "../types";

export const deltaJournalSchema = journalSchema.extend({
  version: z.literal(2),
  records: z.array(
    z.object({
      record: journalSchema.shape.records.element.shape.record,
      baseRevisions: z.array(z.string()),
      messageOrder: z.array(z.string()).optional(),
    }),
  ),
});

/** Retain changed messages plus the mutable tail; immutable earlier messages are restored from IndexedDB. */
export function journalEntry(
  entry: PendingConversation,
  base: Conversation | undefined,
  assets: Set<string>,
) {
  const reference = (image: ImageAttachment) => {
    const assetId = image.assetId ?? `${entry.id}:${image.id}`;
    return assets.has(assetId)
      ? {
          ...image,
          assetId,
          encodedSize: image.encodedSize ?? image.dataUrl.length,
          dataUrl: "",
        }
      : image;
  };
  const previous = new Map(
    base?.messages.map((message) => [message.id, message]),
  );
  const conversation = entry.conversation;
  const messages = (
    base
      ? conversation.messages.filter(
          (message, i) =>
            i >= conversation.messages.length - 2 ||
            previous.get(message.id) !== message,
        )
      : conversation.messages
  ).map((message) =>
    message.images
      ? { ...message, images: message.images.map(reference) }
      : message,
  );
  const { baseRevisions, ...record } = entry;
  return {
    record: {
      ...record,
      conversation: {
        ...conversation,
        messages,
        attachments: conversation.attachments?.map((file) =>
          "kind" in file && file.kind === "image" ? reference(file) : file,
        ),
      },
    },
    baseRevisions,
    ...(base
      ? { messageOrder: conversation.messages.map((message) => message.id) }
      : {}),
  };
}
