import { storedConversationSchema } from "../lib/persistedChat";
import { summaryRecord } from "../lib/conversationSummary";
import { textIndexRecords } from "../lib/textIndexRecords";
import { manifest, messageKey, packMessage } from "./normalizedRecords";
export interface MigrationProgress {
  done: number;
  total: number;
}
interface Checkpoint {
  after?: IDBValidKey;
  done: number;
}
const stores = [
  "conversations",
  "messages",
  "assets",
  "summaries",
  "search",
  "meta",
];

/** Commit data and cursor together; another tab or a restart continues from the committed batch. */
export async function migrateChatRecords(
  db: IDBDatabase,
  report: (progress: MigrationProgress) => void,
  cancelled: () => boolean,
) {
  for (;;) {
    if (cancelled()) throw new DOMException("Closed", "AbortError");
    const progress = await new Promise<
      (MigrationProgress & { more: boolean }) | undefined
    >((resolve, reject) => {
      const tx = db.transaction(stores, "readwrite");
      const meta = tx.objectStore("meta");
      const marker = meta.get("migration");
      let result: (MigrationProgress & { more: boolean }) | undefined;
      marker.onsuccess = () => {
        const checkpoint = marker.result as Checkpoint | undefined;
        if (!checkpoint) return;
        const conversations = tx.objectStore("conversations");
        const total = conversations.count();
        const rows = conversations.getAll(
          checkpoint.after === undefined
            ? undefined
            : IDBKeyRange.lowerBound(checkpoint.after, true),
          100,
        );
        rows.onsuccess = () => {
          try {
            for (const raw of rows.result) {
              const parsed = storedConversationSchema.safeParse(raw);
              if (!parsed.success) {
                meta.put(true, "migrationDamaged");
                continue;
              }
              const record = parsed.data;
              const assets = tx.objectStore("assets");
              const known = new Set<string>();
              record.conversation.messages.forEach((message, position) =>
                tx.objectStore("messages").put({
                  key: messageKey(record.id, message.id),
                  conversationId: record.id,
                  position,
                  message: packMessage(message, record.id, assets, known),
                }),
              );
              conversations.put(manifest(record, assets, known));
              tx.objectStore("summaries").put(summaryRecord(record));
              for (const entry of textIndexRecords(record.conversation))
                tx.objectStore("search").put(entry);
            }
            result = {
              done: checkpoint.done + rows.result.length,
              total: total.result,
              more: rows.result.length === 100,
            };
            if (result.more)
              meta.put(
                { done: result.done, after: rows.result.at(-1).id },
                "migration",
              );
            else meta.delete("migration");
            meta.put(crypto.randomUUID(), "searchRevision");
          } catch {
            tx.abort();
          }
        };
      };
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(tx.error ?? new Error("Migration failed"));
    });
    if (!progress) return;
    report(progress);
    if (!progress.more) return;
    // Yield between committed batches so progress and close events can be processed.
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
}
