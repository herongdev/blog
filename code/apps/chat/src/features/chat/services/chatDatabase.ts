export { chatDatabaseName, chatDatabaseVersion } from "./chatDatabaseConfig";

/** Schema changes are short; legacy records migrate in resumable transactions after opening. */
export function upgradeChatDatabase(
  request: IDBOpenDBRequest,
  oldVersion: number,
) {
  const db = request.result;
  const tx = request.transaction!;
  const store = (name: string, options?: IDBObjectStoreParameters) =>
    db.objectStoreNames.contains(name)
      ? tx.objectStore(name)
      : db.createObjectStore(name, options);
  store("conversations", { keyPath: "id" });
  const meta = store("meta");
  const summaries = store("summaries", { keyPath: "id" });
  const messages = store("messages", { keyPath: "key" });
  const assets = store("assets", { keyPath: "id" });
  const search = store("search", { keyPath: "id" });
  for (const [name, key] of [
    ["list", ["list", "sortPinned", "sortUpdated", "id"]],
    ["recent", ["searchable", "sortUpdated", "id"]],
  ] as const)
    if (!summaries.indexNames.contains(name))
      summaries.createIndex(name, [...key]);
  if (!messages.indexNames.contains("conversation"))
    messages.createIndex("conversation", ["conversationId", "position"]);
  if (!assets.indexNames.contains("conversation"))
    assets.createIndex("conversation", "conversationId");
  if (!search.indexNames.contains("conversation"))
    search.createIndex("conversation", "conversationId");
  if (search.indexNames.contains("grams")) search.deleteIndex("grams");
  if (oldVersion < 4) {
    search.clear();
    meta.put({ done: 0 }, "migration");
  }
}
