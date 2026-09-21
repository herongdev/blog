import type { ChatMessage, Conversation, ImageAttachment } from "../types";
import type { StoredConversation } from "../lib/persistedChat";

export interface MessageRecord {
  key: string;
  conversationId: string;
  position: number;
  message: ChatMessage;
}
export type ConversationRecord = StoredConversation & {
  normalized?: true;
  messageCount?: number;
};
export const messageKey = (conversationId: string, id: string) =>
  `${conversationId}:${id}`;

/** Separate binary payloads from message metadata; existing references remain reusable. */
export function packImage(
  image: ImageAttachment,
  conversationId: string,
  assets: IDBObjectStore,
  known: Set<string>,
): ImageAttachment {
  const assetId = messageKey(conversationId, image.id);
  if (!image.dataUrl) {
    if (image.assetId === assetId) return image;
    // Conflict recovery may copy a conversation under a new ID. Give the copy
    // its own binary ownership so deleting the original cannot break it.
    if (!known.has(assetId)) {
      const original = assets.get(image.assetId!);
      original.onsuccess = () => {
        if (!(original.result?.blob instanceof Blob)) {
          assets.transaction.abort();
          return;
        }
        assets.put({ id: assetId, conversationId, blob: original.result.blob });
      };
      known.add(assetId);
    }
    return { ...image, assetId };
  }
  if (!known.has(assetId)) {
    const [header, base64] = image.dataUrl.split(",");
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    assets.put({
      id: assetId,
      conversationId,
      blob: new Blob([bytes], { type: header.slice(5, header.indexOf(";")) }),
    });
    known.add(assetId);
  }
  return { ...image, dataUrl: "", assetId, encodedSize: image.dataUrl.length };
}
export function packMessage(
  message: ChatMessage,
  conversationId: string,
  assets: IDBObjectStore,
  known: Set<string>,
): ChatMessage {
  return message.images?.length
    ? {
        ...message,
        images: message.images.map((image) =>
          packImage(image, conversationId, assets, known),
        ),
      }
    : message;
}
export function manifest(
  record: StoredConversation,
  assets: IDBObjectStore,
  known: Set<string>,
): ConversationRecord {
  const {
    unloaded: _unloaded,
    messageCount: _count,
    ...conversation
  } = record.conversation as Conversation;
  return {
    ...record,
    normalized: true,
    messageCount: conversation.messages.length,
    conversation: {
      ...conversation,
      messages: [],
      attachments: conversation.attachments?.map((file) =>
        "kind" in file && file.kind === "image"
          ? packImage(file, record.id, assets, known)
          : file,
      ),
    },
  };
}
