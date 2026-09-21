import type { Conversation, ImageAttachment } from "../types";
import { chatDatabaseName } from "./chatDatabaseConfig";

/** Open existing storage only; the repository exclusively owns database upgrades. */
async function assetBlob(id: string): Promise<Blob> {
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(chatDatabaseName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => request.transaction?.abort();
  });
  try {
    return await new Promise<Blob>((resolve, reject) => {
      const tx = db.transaction("assets", "readonly");
      const request = tx.objectStore("assets").get(id);
      tx.oncomplete = () =>
        request.result?.blob instanceof Blob
          ? resolve(request.result.blob)
          : reject(new Error("图片附件无法读取，请重新添加。"));
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
const previews = new Map<string, { promise: Promise<string>; users: number }>();
export function acquireImage(image: ImageAttachment) {
  if (image.dataUrl)
    return { url: Promise.resolve(image.dataUrl), release: () => undefined };
  const id = image.assetId!;
  let entry = previews.get(id);
  if (!entry) {
    entry = {
      promise: assetBlob(id).then((blob) => URL.createObjectURL(blob)),
      users: 0,
    };
    previews.set(id, entry);
  }
  entry.users++;
  const owned = entry;
  let released = false;
  return {
    url: owned.promise,
    release: () => {
      if (released) return;
      released = true;
      if (--owned.users === 0) {
        previews.delete(id);
        void owned.promise.then(
          (url) => URL.revokeObjectURL(url),
          () => undefined,
        );
      }
    },
  };
}
export async function imageDataUrl(image: ImageAttachment): Promise<string> {
  if (image.dataUrl) return image.dataUrl;
  const blob = await assetBlob(image.assetId!);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
/** Export resolves binaries on demand; normal navigation only reads metadata. */
export async function expandImages(
  conversation: Conversation,
): Promise<Conversation> {
  const expand = async (image: ImageAttachment) => {
    const { assetId: _id, encodedSize: _size, ...rest } = image;
    return { ...rest, dataUrl: await imageDataUrl(image) };
  };
  return {
    ...conversation,
    messages: await Promise.all(
      conversation.messages.map(async (message) => ({
        ...message,
        ...(message.images
          ? { images: await Promise.all(message.images.map(expand)) }
          : {}),
      })),
    ),
    ...(conversation.attachments
      ? {
          attachments: await Promise.all(
            conversation.attachments.map((file) =>
              "kind" in file && file.kind === "image" ? expand(file) : file,
            ),
          ),
        }
      : {}),
  };
}
