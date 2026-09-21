import { summarySchema } from "../lib/conversationSummary";
import type { Conversation } from "../types";
export type DirectoryCursor = [string, number, number, string];
export interface DirectoryPage {
  conversations: Conversation[];
  cursor?: DirectoryCursor;
  more: boolean;
  total: number;
}
export const directoryPageSize = 50;
export function directoryRange(scope: string, cursor?: DirectoryCursor) {
  return IDBKeyRange.bound(
    cursor ?? [scope, -Number.MAX_VALUE],
    [scope, Number.MAX_VALUE, Number.MAX_VALUE, []],
    !!cursor,
  );
}
/** Stable keyset pagination; values before the cursor are not deserialized again. */
export function readDirectoryPage(
  db: IDBDatabase,
  scope: string,
  cursor?: DirectoryCursor,
): Promise<DirectoryPage & { revisions: Map<string, string> }> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("summaries");
    const index = tx.objectStore("summaries").index("list");
    const rows = index.getAll(
      directoryRange(scope, cursor),
      directoryPageSize + 1,
    );
    const count = index.count(directoryRange(scope));
    tx.oncomplete = () => {
      try {
        const page = rows.result.slice(0, directoryPageSize);
        const last = page.at(-1);
        const parsed = page.map((row) => summarySchema.parse(row));
        resolve({
          conversations: parsed.map((row) => row.conversation),
          revisions: new Map(parsed.map((row) => [row.id, row.revision])),
          cursor: last && [
            last.list,
            last.sortPinned,
            last.sortUpdated,
            last.id,
          ],
          more: rows.result.length > directoryPageSize,
          total: count.result,
        });
      } catch (error) {
        reject(error);
      }
    };
    tx.onabort = () => reject(tx.error);
  });
}
