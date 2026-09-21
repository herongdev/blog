import { readSearchCandidates } from "./searchCandidates";
import { RankedResults } from "../lib/rankedResults";
import { chatDatabaseName, chatDatabaseVersion } from "./chatDatabaseConfig";
import {
  searchConversations,
  searchPattern,
  searchResultLimit,
  type ChatSearchResults,
} from "../lib/searchConversations";
import type { SearchDocument } from "../lib/conversationSummary";

type Result = ChatSearchResults["items"][number] & {
  updatedAt: number;
  textId?: string;
};
let latest = 0;
// One bounded query cache; only summaries/snippets, never full messages or binary attachments.
const cacheLimit = 1000;
let cache: { key: string; items: Result[]; total: number } | undefined;
const read = <T>(request: IDBRequest<T>) =>
  new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
const searchable = (c: SearchDocument["conversation"]) =>
  !c.deleted && !!(c.messageCount || c.hasDraft || c.titleEdited);
function match(doc: SearchDocument, query: string): Result | undefined {
  if (!searchable(doc.conversation)) return;
  const result = searchConversations(
    [
      {
        conversation: doc.conversation,
        title:
          doc.conversation.messageCount || doc.conversation.titleEdited
            ? doc.conversation.title
            : "",
        texts: doc.texts,
      },
    ],
    query,
  ).items[0];
  return result && { ...result, updatedAt: doc.updatedAt };
}
async function hydrate(items: Result[], db: IDBDatabase, query: string) {
  const tx = db.transaction("search");
  return Promise.all(
    items.map(async (item) => {
      if (!item.textId) return item;
      const doc = await read(tx.objectStore("search").get(item.textId));
      const result =
        doc &&
        match(
          {
            conversation: item.conversation,
            updatedAt: item.updatedAt,
            texts: [doc.text],
          } as SearchDocument,
          query,
        );
      return result ?? item;
    }),
  );
}
self.onmessage = async (
  event: MessageEvent<{
    id: number;
    query: string;
    offset: number;
    overrides: SearchDocument[];
    cancel?: boolean;
  }>,
) => {
  const { id, query, offset, overrides, cancel } = event.data;
  latest = id;
  if (cancel) return;
  let db: IDBDatabase | undefined;
  try {
    db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(chatDatabaseName, chatDatabaseVersion);
      let failed = false;
      const fail = () => {
        failed = true;
        clearTimeout(timeout);
        reject(new Error("Search unavailable"));
      };
      const timeout = setTimeout(fail, 3000);
      request.onerror = fail;
      request.onblocked = fail;
      request.onupgradeneeded = () => request.transaction?.abort();
      request.onsuccess = () => {
        clearTimeout(timeout);
        if (failed) request.result.close();
        else resolve(request.result);
      };
    });
    if (latest !== id) return;
    const revision = await read(
      db.transaction("meta").objectStore("meta").get("searchRevision"),
    );
    const key = JSON.stringify([
      query.trim(),
      revision,
      overrides.map((doc) => [doc.id, doc.revision]),
    ]);
    if (
      cache?.key === key &&
      (offset + searchResultLimit <= cache.items.length ||
        cache.items.length === cache.total)
    ) {
      self.postMessage({
        id,
        results: {
          total: cache.total,
          items: await hydrate(
            cache.items.slice(offset, offset + searchResultLimit),
            db,
            query,
          ),
        },
      });
      return;
    }
    const replacements = new Map(overrides.map((doc) => [doc.id, doc]));
    const pattern = searchPattern(query);
    const results = new Map<string, Result>();
    if (!pattern) {
      // Empty search follows chronological index order and reads only the requested prefix.
      const tx = db.transaction("summaries");
      const store = tx.objectStore("summaries");
      const range = IDBKeyRange.bound(
        [1, -Number.MAX_VALUE],
        [1, Number.MAX_VALUE, []],
      );
      const totalPromise = read(store.index("recent").count(range));
      let adjustments = 0;
      for (const doc of replacements.values()) {
        const previous = (await read(
          db.transaction("summaries").objectStore("summaries").get(doc.id),
        )) as SearchDocument | undefined;
        adjustments +=
          Number(searchable(doc.conversation)) -
          Number(!!previous && searchable(previous.conversation));
      }
      await new Promise<void>((resolve, reject) => {
        const transaction = db!.transaction("summaries");
        const request = transaction
          .objectStore("summaries")
          .index("recent")
          .openCursor(range);
        request.onsuccess = () => {
          if (latest !== id) {
            transaction.abort();
            return;
          }
          const cursor = request.result;
          if (
            !cursor ||
            results.size >= offset + searchResultLimit + overrides.length
          )
            return;
          const summary = cursor.value as SearchDocument;
          if (!replacements.has(summary.id)) {
            const result = match({ ...summary, texts: [] }, "");
            if (result) results.set(summary.id, result);
          }
          cursor.continue();
        };
        transaction.oncomplete = () => resolve();
        transaction.onabort = () => reject(transaction.error);
      });
      for (const doc of overrides) {
        const result = match(doc, "");
        if (result) results.set(doc.id, result);
      }
      const items = [...results.values()]
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(offset, offset + searchResultLimit);
      if (latest === id)
        self.postMessage({
          id,
          results: { total: (await totalPromise) + adjustments, items },
        });
      return;
    }
    const seen = new Set<string>();
    const ranked = new RankedResults<Result & { id: string }>(
      Math.max(cacheLimit, offset + searchResultLimit),
      (a, b) =>
        Number(b.titleMatch) - Number(a.titleMatch) ||
        b.updatedAt - a.updatedAt ||
        a.id.localeCompare(b.id),
    );
    const retain = (result: Result) => {
      seen.add(result.conversation.id);
      ranked.add({ ...result, id: result.conversation.id });
    };
    await readSearchCandidates(
      db,
      (doc) => !replacements.has(doc.conversationId) && pattern.test(doc.text),
      (textId, summary) => {
        if (!searchable(summary.conversation)) return;
        const title =
          summary.conversation.messageCount || summary.conversation.titleEdited
            ? summary.conversation.title.replace(/\s+/gu, " ").trim()
            : "";
        retain({
          conversation: summary.conversation,
          title,
          titleMatch: pattern.test(title),
          snippet: "",
          updatedAt: summary.updatedAt,
          textId,
        });
      },
      () => latest !== id,
    );
    for (const doc of overrides) {
      const result = match(doc, query);
      if (result) retain(result);
    }
    const items = ranked.sorted();
    cache = { key, total: seen.size, items: items.slice(0, cacheLimit) };
    if (latest === id)
      self.postMessage({
        id,
        results: {
          total: seen.size,
          items: await hydrate(
            items.slice(offset, offset + searchResultLimit),
            db,
            query,
          ),
        },
      });
  } catch {
    if (latest === id) self.postMessage({ id, error: true });
  } finally {
    db?.close();
  }
};
