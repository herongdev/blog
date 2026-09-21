import type { TextIndexRecord } from "../lib/textIndexRecords";
import type { SearchDocument } from "../lib/conversationSummary";

/** Read candidate bodies in batches, retain only matching IDs, and batch large summary joins. */
export function readSearchCandidates(
  db: IDBDatabase,
  accept: (doc: TextIndexRecord) => boolean,
  receive: (textId: string, summary: SearchDocument) => void,
  cancelled: () => boolean,
) {
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(["search", "summaries"]);
    const store = tx.objectStore("search");
    const summaries = tx.objectStore("summaries");
    const matches = new Map<string, string>();
    const guard = () => {
      if (cancelled()) {
        tx.abort();
        return false;
      }
      return true;
    };
    const join = () => {
      if (!guard()) return;
      if (matches.size <= 512) {
        for (const [id, textId] of matches) {
          const request = summaries.get(id);
          request.onsuccess = () => {
            if (request.result) receive(textId, request.result);
          };
        }
      } else {
        const batch = (after?: IDBValidKey) => {
          if (!guard()) return;
          const rows = summaries.getAll(
            after === undefined
              ? undefined
              : IDBKeyRange.lowerBound(after, true),
            256,
          );
          rows.onsuccess = () => {
            for (const row of rows.result) {
              const textId = matches.get(row.id);
              if (textId) receive(textId, row);
            }
            if (rows.result.length === 256) batch(rows.result.at(-1).id);
          };
        };
        batch();
      }
    };
    const scan = (after?: IDBValidKey) => {
      if (!guard()) return;
      const rows = store.getAll(
        after === undefined ? undefined : IDBKeyRange.lowerBound(after, true),
        256,
      );
      rows.onsuccess = () => {
        for (const doc of rows.result as TextIndexRecord[]) {
          if (
            accept(doc) &&
            (!matches.has(doc.conversationId) || doc.kind === "title")
          )
            matches.set(doc.conversationId, doc.id);
        }
        if (rows.result.length === 256) scan(rows.result.at(-1).id);
        else join();
      };
    };
    scan();
    tx.oncomplete = () => resolve();
    tx.onabort = () =>
      reject(tx.error ?? new DOMException("Aborted", "AbortError"));
  });
}
