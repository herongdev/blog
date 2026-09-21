import { isGenerating } from "../state/selectors";
import { migrateChatRecords, type MigrationProgress } from "./chatMigration";
import { deltaJournalSchema, journalEntry } from "../lib/recoveryJournal";
import {
  readDirectoryPage,
  directoryRange,
  directoryPageSize,
  type DirectoryPage,
} from "./conversationDirectory";
import {
  manifest,
  messageKey,
  packMessage,
  type MessageRecord,
  type ConversationRecord,
} from "./normalizedRecords";
import { messageIndexRecord, textIndexRecord } from "../lib/textIndexRecords";
import { ChatSearchClient } from "./chatSearchClient";
import { newConversation } from "../lib/newConversation";
import type { ChatState } from "../state/chatReducer";
import type { Conversation, ChatProject } from "../types";
import {
  journalSchema,
  storedProjectSchema,
  restoreConversation,
  storedConversationSchema,
  type PendingConversation,
  type StoredConversation,
} from "../lib/persistedChat";

import {
  chatDatabaseName,
  chatDatabaseVersion,
  upgradeChatDatabase,
} from "./chatDatabase";
import {
  summaryRecord,
  summarySchema,
  searchRecord,
  summarize,
} from "../lib/conversationSummary";
export { chatDatabaseName } from "./chatDatabase";
export const chatJournalKey = "zhixu.chat.pending.v1";
const activeKey = "zhixu.chat.active.v1";
export type SaveStatus = "saved" | "saving" | "error" | "conflict";
export type LoadIssue = "unavailable" | "damaged" | "conflict" | undefined;

class ConflictError extends Error {}

/** One record per conversation; never replace the whole database with a tab's snapshot. */
export class ChatStorage {
  private searchClient = new ChatSearchClient();
  private database?: Promise<IDBDatabase>;
  private closed = false;
  readonly directories = new Map<string, DirectoryPage>();
  private committed = new Map<string, Conversation>();
  private assetIds = new Set<string>();
  private baseline = new Map<string, Conversation>();
  private revisions = new Map<string, string>();
  private pending = new Map<string, PendingConversation>();
  private inFlight: PendingConversation[] = [];
  private projects = new Map<string, ChatProject>();
  private projectRevisions = new Map<string, string>();
  private inFlightProjects: ChatProject[] = [];
  private pendingProjects = new Map<string, ChatProject>();
  private activeId = "";
  private activeDirty = false;
  private timer?: ReturnType<typeof setTimeout>;
  private saving?: Promise<void>;
  private failed = false;

  constructor(
    private report: (status: SaveStatus) => void,
    private progress: (progress: MigrationProgress) => void = () => undefined,
  ) {}

  private connect(): Promise<IDBDatabase> {
    if (this.database) return this.database;
    this.database = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(chatDatabaseName, chatDatabaseVersion);
      let settled = false;
      const fail = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        reject(
          (request.readyState === "done" ? request.error : null) ??
            new Error("History storage unavailable"),
        );
      };
      const timeout = setTimeout(fail, 3000);
      request.onblocked = fail;
      request.onerror = fail;
      request.onupgradeneeded = (event) => {
        if (settled || this.closed) {
          request.transaction?.abort();
          return;
        }
        // Once migration starts, its duration depends on the existing data volume.
        clearTimeout(timeout);
        upgradeChatDatabase(request, event.oldVersion);
      };
      request.onsuccess = () => {
        clearTimeout(timeout);
        const db = request.result;
        if (settled || this.closed) {
          db.close();
          if (!settled) reject(new Error("Storage closed"));
          return;
        }
        settled = true;
        db.onversionchange = () => {
          db.close();
          this.database = undefined;
        };
        db.onclose = () => {
          this.database = undefined;
        };
        resolve(db);
      };
    }).catch((error: unknown) => {
      this.database = undefined;
      throw error;
    });
    return this.database;
  }

  async load(): Promise<{ state?: ChatState; issue: LoadIssue }> {
    let rows: unknown[] = [];
    let active: unknown;
    let metadata: unknown[] = [];
    let issue: LoadIssue;
    try {
      const db = await this.connect();
      await migrateChatRecords(db, this.progress, () => this.closed);
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(
          ["summaries", "meta", "conversations"],
          "readonly",
        );
        const all = tx
          .objectStore("summaries")
          .index("list")
          .getAll(directoryRange("history"), directoryPageSize);
        const summaryCount = tx.objectStore("summaries").count();
        const bodyCount = tx.objectStore("conversations").count();
        const projectRows = tx.objectStore("meta").getAll();
        const selected = tx.objectStore("meta").get("activeId");
        const damaged = tx.objectStore("meta").get("migrationDamaged");
        tx.oncomplete = () => {
          metadata = projectRows.result as unknown[];
          rows = all.result as unknown[];
          active = selected.result;
          if (damaged.result || bodyCount.result !== summaryCount.result)
            issue = "damaged";
          resolve();
        };
        tx.onabort = () => reject(tx.error);
      });
    } catch {
      issue = "unavailable";
      this.failed = true;
    }
    if (!issue || issue === "damaged") {
      try {
        const db = await this.connect();
        const ids = new Set<string>();
        if (typeof active === "string") ids.add(active);
        try {
          const tabActive = sessionStorage.getItem(activeKey);
          if (tabActive) ids.add(tabActive);
          const journal = sessionStorage.getItem(chatJournalKey);
          const parsed = journal && zJournal(JSON.parse(journal));
          if (parsed && parsed.success)
            for (const entry of parsed.data.records) ids.add(entry.record.id);
        } catch {
          /* Recovery validation below reports malformed journals. */
        }
        await Promise.all(
          [...ids].map(
            (id) =>
              new Promise<void>((resolve, reject) => {
                const request = db
                  .transaction("summaries")
                  .objectStore("summaries")
                  .get(id);
                request.onsuccess = () => {
                  if (
                    request.result &&
                    !rows.some((raw) => (raw as { id: string }).id === id)
                  )
                    rows.push(request.result);
                  resolve();
                };
                request.onerror = () => reject(request.error);
              }),
          ),
        );
        const page = await this.directory("history");
        for (const conversation of page.conversations)
          if (
            !rows.some((raw) => (raw as { id: string }).id === conversation.id)
          )
            rows.push({
              id: conversation.id,
              revision: this.revisions.get(conversation.id),
              updatedAt: 0,
              conversation,
            });
      } catch {
        issue ??= "damaged";
      }
    }
    if (this.closed) return { issue };
    for (const raw of metadata) {
      if (
        !raw ||
        typeof raw !== "object" ||
        !("kind" in raw) ||
        raw.kind !== "project"
      )
        continue;
      const parsed = storedProjectSchema.safeParse(raw);
      if (parsed.success) {
        this.projects.set(parsed.data.project.id, parsed.data.project);
        this.projectRevisions.set(
          parsed.data.project.id,
          parsed.data.project.revision ?? "legacy",
        );
      } else issue ??= "damaged";
    }
    const restored = new Map<
      string,
      { conversation: Conversation; updatedAt: number }
    >();
    for (const raw of rows) {
      const parsed = summarySchema.safeParse(raw);
      if (!parsed.success) {
        issue = "damaged";
        continue;
      }
      const record = parsed.data;
      this.revisions.set(record.id, record.revision);
      restored.set(record.id, {
        conversation: record.conversation,
        updatedAt: record.updatedAt,
      });
    }
    let recoveredJournal = false;
    // Small, per-tab recovery journal covers ordinary refreshes before async commits finish.
    // It is not a replacement for IndexedDB and is not a cross-device backup.
    try {
      active = sessionStorage.getItem(activeKey) ?? active;
      const raw = sessionStorage.getItem(chatJournalKey);
      if (raw) {
        const parsed = journalSchema.safeParse(
          await this.expandJournal(
            JSON.parse(raw),
            new Set(
              [...restored]
                .filter(([, value]) => value.conversation.deleted)
                .map(([id]) => id),
            ),
          ),
        );
        if (!parsed.success) issue ??= "damaged";
        else {
          recoveredJournal = true;
          active = parsed.data.activeId;
          for (const project of parsed.data.projects) {
            const existing = this.projects.get(project.id);
            if (
              existing?.deleted ||
              (existing && existing.revision === project.revision)
            )
              continue;
            if (
              existing &&
              !parsed.data.projectBases[project.id]?.includes(
                existing.revision ?? "legacy",
              )
            ) {
              issue ??= "conflict";
              continue;
            }
            this.projects.set(project.id, project);
            this.pendingProjects.set(project.id, project);
          }
          for (const { record, baseRevisions } of parsed.data.records) {
            const existing = this.revisions.get(record.id);
            if (
              existing === record.revision ||
              restored.get(record.id)?.conversation.deleted
            )
              continue;
            let conversation = restoreConversation(record);
            // A different tab won the update: preserve this tab's recovery as a separate chat.
            if (existing && !baseRevisions.includes(existing)) {
              conversation = { ...conversation, id: crypto.randomUUID() };
              if (active === record.id) active = conversation.id;
            }
            restored.set(conversation.id, {
              conversation,
              updatedAt: record.updatedAt,
            });
            this.pending.set(conversation.id, this.record(conversation));
          }
        }
      }
    } catch {
      /* Keep IndexedDB usable, but report an unreadable recovery journal. */
      issue ??= "damaged";
    }
    const conversations = [...restored.values()]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map((item) =>
        this.projects.get(item.conversation.projectId ?? "")?.deleted
          ? { ...item.conversation, projectId: undefined }
          : item.conversation,
      );
    this.baseline = new Map(conversations.map((c) => [c.id, c]));
    this.activeId =
      conversations.find((c) => c.id === active && !c.deleted)?.id ??
      conversations.find((c) => !c.deleted && !c.archived)?.id ??
      "";
    if ((conversations.length || this.projects.size) && !this.activeId) {
      const fresh = newConversation();
      conversations.unshift(fresh);
      this.activeId = fresh.id;
      this.pending.set(fresh.id, this.record(fresh));
    }
    const currentIndex = conversations.findIndex((c) => c.id === this.activeId);
    if (
      currentIndex >= 0 &&
      conversations[currentIndex].unloaded &&
      !conversations[currentIndex].deleted
    ) {
      try {
        conversations[currentIndex] = await this.readConversation(
          this.activeId,
        );
      } catch {
        issue ??= "damaged";
      }
    }
    // Drop consumed/stale journal entries so a resolved conflict does not repeat on every reload.
    if (recoveredJournal) this.checkpoint();
    if (this.pending.size || this.pendingProjects.size) {
      this.activeDirty = true;
      this.schedule();
    }
    return {
      state: conversations.length
        ? {
            conversations,
            activeId: this.activeId,
            projects: [...this.projects.values()].sort(
              (a, b) => a.createdAt - b.createdAt,
            ),
          }
        : undefined,
      issue,
    };
  }

  async directory(scope: string, more = false): Promise<DirectoryPage> {
    const previous = this.directories.get(scope);
    if (previous && (!more || !previous.more))
      return { ...previous, conversations: [] };
    const page = await readDirectoryPage(
      await this.connect(),
      scope,
      more ? previous?.cursor : undefined,
    );
    for (const [id, revision] of page.revisions)
      if (!this.revisions.has(id)) this.revisions.set(id, revision);
    for (const conversation of page.conversations)
      if (!this.baseline.has(conversation.id))
        this.baseline.set(conversation.id, conversation);
    this.directories.set(scope, page);
    return page;
  }

  async readConversation(id: string): Promise<Conversation> {
    const pending = this.pending.get(id)?.conversation;
    if (pending) return pending;
    const cached = this.baseline.get(id);
    if (cached && !cached.unloaded) return cached;
    const db = await this.connect();
    const raw: unknown = await new Promise((resolve, reject) => {
      const tx = db.transaction(["conversations", "messages"], "readonly");
      const request = tx.objectStore("conversations").get(id);
      const rows = tx
        .objectStore("messages")
        .index("conversation")
        .getAll(IDBKeyRange.bound([id, 0], [id, Number.MAX_SAFE_INTEGER]));
      tx.oncomplete = () => {
        const record = request.result as ConversationRecord | undefined;
        if (record?.normalized && record.messageCount !== rows.result.length) {
          reject(new Error("Incomplete conversation"));
          return;
        }
        resolve(
          record?.normalized
            ? {
                ...record,
                conversation: {
                  ...record.conversation,
                  messages: (rows.result as MessageRecord[]).map(
                    (row) => row.message,
                  ),
                },
              }
            : record,
        );
      };
      tx.onabort = () => reject(tx.error);
    });
    if (this.closed) throw new Error("Storage closed");
    if (this.pending.has(id)) return this.pending.get(id)!.conversation;
    const parsed = storedConversationSchema.safeParse(raw);
    if (!parsed.success) throw new Error("Conversation unavailable");
    let conversation = restoreConversation(parsed.data);
    if (conversation.deleted) throw new Error("Conversation deleted");
    if (this.projects.get(conversation.projectId ?? "")?.deleted)
      conversation = { ...conversation, projectId: undefined };
    this.revisions.set(id, parsed.data.revision);
    this.baseline.set(id, conversation);
    this.committed.set(id, conversation);
    for (const image of [
      ...conversation.messages.flatMap((m) => m.images ?? []),
      ...(conversation.attachments ?? []).filter(
        (f) => "kind" in f && f.kind === "image",
      ),
    ])
      if ("assetId" in image && image.assetId) this.assetIds.add(image.assetId);
    return conversation;
  }

  release(conversation: Conversation) {
    // Background streams still reduce events into their message bodies.
    if (isGenerating(conversation.messages.at(-1))) return conversation;
    const summary = summarize(conversation);
    this.baseline.set(conversation.id, summary);
    if (!this.pending.has(conversation.id))
      this.committed.delete(conversation.id);
    return summary;
  }

  private record(conversation: Conversation): PendingConversation {
    const baseRevisions = [
      this.revisions.get(conversation.id),
      ...this.inFlight
        .filter((r) => r.id === conversation.id)
        .map((r) => r.revision),
    ].filter((v): v is string => Boolean(v));
    return {
      version: 1,
      id: conversation.id,
      conversation,
      revision: crypto.randomUUID(),
      updatedAt: Date.now(),
      baseRevisions,
    };
  }

  observe(state: ChatState, changed?: Conversation[]) {
    // Track only changed project records, with independent revision checks.
    for (const project of state.projects) {
      if (this.projects.get(project.id) === project) continue;
      this.projects.set(project.id, project);
      this.pendingProjects.set(project.id, project);
    }
    for (const conversation of changed ?? state.conversations) {
      if (conversation.unloaded) continue;
      if (this.baseline.get(conversation.id) === conversation) continue;
      this.baseline.set(conversation.id, conversation);
      this.pending.set(conversation.id, this.record(conversation));
    }
    if (state.activeId !== this.activeId) {
      this.activeId = state.activeId;
      this.activeDirty = true;
      try {
        sessionStorage.setItem(activeKey, state.activeId);
      } catch {
        /* Best effort tab selection. */
      }
    }
    this.schedule();
  }

  private schedule() {
    if (
      this.closed ||
      this.failed ||
      (!this.pending.size && !this.pendingProjects.size && !this.activeDirty)
    )
      return;
    this.report("saving");
    if (!this.timer && !this.saving)
      this.timer = setTimeout(() => {
        this.timer = undefined;
        void this.flush();
      }, 200);
  }

  private projectBases(project: ChatProject): string[] {
    return [
      this.projectRevisions.get(project.id),
      ...this.inFlightProjects
        .filter((p) => p.id === project.id)
        .map((p) => p.revision ?? "legacy"),
    ].filter((r): r is string => r !== undefined);
  }

  private async expandJournal(
    raw: unknown,
    deleted: Set<string>,
  ): Promise<unknown> {
    const parsed = deltaJournalSchema.safeParse(raw);
    if (!parsed.success) return raw;
    const records = await Promise.all(
      parsed.data.records.map(async (entry) => {
        if (!entry.messageOrder) return entry;
        if (
          deleted.has(entry.record.id) ||
          this.baseline.get(entry.record.id)?.deleted
        )
          return {
            ...entry,
            record: {
              ...entry.record,
              conversation: { ...entry.record.conversation, messages: [] },
            },
          };
        const base = await this.readConversation(entry.record.id);
        const messages = new Map(
          base.messages.map((message) => [message.id, message]),
        );
        for (const message of entry.record.conversation.messages)
          messages.set(message.id, message);
        return {
          ...entry,
          record: {
            ...entry.record,
            conversation: {
              ...entry.record.conversation,
              messages: entry.messageOrder.map((id) => {
                const message = messages.get(id);
                if (!message) throw new Error("Incomplete recovery journal");
                return message;
              }),
            },
          },
        };
      }),
    );
    return { ...parsed.data, version: 1, records };
  }

  checkpoint() {
    if (!this.activeId) return;
    try {
      if (this.pending.size || this.pendingProjects.size)
        sessionStorage.setItem(
          chatJournalKey,
          JSON.stringify({
            version: 2,
            activeId: this.activeId,
            projects: [...this.pendingProjects.values()],
            projectBases: Object.fromEntries(
              [...this.pendingProjects.values()].map((p) => [
                p.id,
                this.projectBases(p),
              ]),
            ),
            records: [...this.pending.values()].map((entry) =>
              journalEntry(entry, this.committed.get(entry.id), this.assetIds),
            ),
          }),
        );
      else sessionStorage.removeItem(chatJournalKey);
    } catch {
      /* Main storage status comes from real IndexedDB transaction completion. */
    }
  }

  retry() {
    this.failed = false;
    return this.flush();
  }

  flush(): Promise<void> {
    clearTimeout(this.timer);
    this.timer = undefined;
    if (this.saving) return this.saving;
    if (this.closed || this.failed) return Promise.resolve();
    this.saving = this.writePending().finally(() => {
      this.saving = undefined;
      this.schedule();
    });
    return this.saving;
  }

  private async writePending() {
    try {
      while (
        !this.closed &&
        (this.pending.size || this.pendingProjects.size || this.activeDirty)
      ) {
        const db = await this.connect();
        const batch = [...this.pending.values()];
        const projectBatch = [...this.pendingProjects.values()];
        this.inFlight = batch;
        this.inFlightProjects = projectBatch;
        const activeId = this.activeId;
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(
            [
              "conversations",
              "meta",
              "summaries",
              "search",
              "messages",
              "assets",
            ],
            "readwrite",
          );
          const store = tx.objectStore("conversations");
          const knownAssets = new Set(this.assetIds);
          const put = (record: StoredConversation) => {
            const previous = this.committed.get(record.id);
            const messages = tx.objectStore("messages");
            const search = tx.objectStore("search");
            const assets = tx.objectStore("assets");
            const nextIds = new Set(
              record.conversation.messages.map((m) => m.id),
            );
            const previousMessages = new Map(
              previous?.messages.map((m, position) => [
                m.id,
                { message: m, position },
              ]),
            );
            const removeRows = () => {
              const cursor = messages
                .index("conversation")
                .openCursor(
                  IDBKeyRange.bound(
                    [record.id, 0],
                    [record.id, Number.MAX_SAFE_INTEGER],
                  ),
                );
              cursor.onsuccess = () => {
                const row = cursor.result;
                if (!row) return;
                if (!nextIds.has((row.value as MessageRecord).message.id)) {
                  search.delete(
                    `${record.id}:message:${(row.value as MessageRecord).message.id}`,
                  );
                  row.delete();
                }
                row.continue();
              };
            };
            if (!previous || record.conversation.deleted) removeRows();
            else
              for (const old of previous.messages)
                if (!nextIds.has(old.id)) {
                  messages.delete(messageKey(record.id, old.id));
                  search.delete(`${record.id}:message:${old.id}`);
                }
            record.conversation.messages.forEach((message, position) => {
              const old = previousMessages.get(message.id);
              if (old?.message === message && old.position === position) return;
              messages.put({
                key: messageKey(record.id, message.id),
                conversationId: record.id,
                position,
                message: packMessage(message, record.id, assets, knownAssets),
              });
              if (old?.message.content !== message.content)
                search.put(messageIndexRecord(record.id, message));
            });
            if (record.conversation.deleted) {
              for (const name of ["search", "assets"]) {
                const cursor = tx
                  .objectStore(name)
                  .index("conversation")
                  .openCursor(record.id);
                cursor.onsuccess = () => {
                  const row = cursor.result;
                  if (row) {
                    row.delete();
                    row.continue();
                  }
                };
              }
            } else {
              if (
                !previous ||
                previous.title !== record.conversation.title ||
                previous.titleEdited !== record.conversation.titleEdited ||
                !previous.messages.length !==
                  !record.conversation.messages.length
              )
                search.put(
                  textIndexRecord(
                    record.id,
                    "",
                    "title",
                    record.conversation.messages.length ||
                      record.conversation.titleEdited
                      ? record.conversation.title
                      : "",
                  ),
                );
              if (!previous || previous.draft !== record.conversation.draft)
                search.put(
                  textIndexRecord(
                    record.id,
                    "",
                    "draft",
                    record.conversation.draft ?? "",
                  ),
                );
            }
            if (
              previous &&
              (previous.attachments !== record.conversation.attachments ||
                previous.messages.length !==
                  record.conversation.messages.length)
            ) {
              const used = new Set(
                [
                  ...record.conversation.messages.flatMap(
                    (message) => message.images ?? [],
                  ),
                  ...(record.conversation.attachments ?? []).filter(
                    (file) => "kind" in file && file.kind === "image",
                  ),
                ].map((file) =>
                  "assetId" in file && file.assetId
                    ? file.assetId
                    : messageKey(record.id, file.id),
                ),
              );
              const cursor = assets.index("conversation").openCursor(record.id);
              cursor.onsuccess = () => {
                const row = cursor.result;
                if (!row) return;
                if (!used.has(String(row.primaryKey))) {
                  knownAssets.delete(String(row.primaryKey));
                  row.delete();
                }
                row.continue();
              };
            }
            store.put(manifest(record, assets, knownAssets));
            tx.objectStore("summaries").put(summaryRecord(record));
          };
          let conflict = false;
          let writeError: unknown;
          for (const entry of batch) {
            const request = store.get(entry.id);
            request.onsuccess = () => {
              try {
                const existing = request.result as
                  StoredConversation | undefined;
                if (
                  existing &&
                  ((existing.conversation?.deleted &&
                    !entry.conversation.deleted) ||
                    typeof existing.revision !== "string" ||
                    existing.version !== 1 ||
                    (existing.revision !== entry.revision &&
                      existing.revision !== this.revisions.get(entry.id) &&
                      !entry.baseRevisions.includes(existing.revision)))
                ) {
                  conflict = true;
                  tx.abort();
                  return;
                }
                const { baseRevisions: _bases, ...record } = entry;
                if (entry.conversation.projectId) {
                  const membership = tx
                    .objectStore("meta")
                    .get(`project:${entry.conversation.projectId}`);
                  membership.onsuccess = () => {
                    const raw = membership.result as
                      { project?: ChatProject } | undefined;
                    if (raw?.project?.deleted) {
                      conflict = true;
                      tx.abort();
                    } else put(record);
                  };
                } else put(record);
              } catch (error) {
                writeError = error;
                tx.abort();
              }
            };
          }
          for (const project of projectBatch) {
            const meta = tx.objectStore("meta");
            const key = `project:${project.id}`;
            const request = meta.get(key);
            request.onsuccess = () => {
              const raw: unknown = request.result;
              const parsed =
                raw === undefined
                  ? undefined
                  : storedProjectSchema.safeParse(raw);
              if (
                parsed &&
                (!parsed.success ||
                  parsed.data.project.deleted ||
                  ((parsed.data.project.revision ?? "legacy") !==
                    (project.revision ?? "legacy") &&
                    (parsed.data.project.revision ?? "legacy") !==
                      this.projectRevisions.get(project.id)))
              ) {
                conflict = true;
                tx.abort();
                return;
              }
              meta.put({ version: 1, kind: "project", project }, key);
              if (project.deleted) {
                const cursor = tx
                  .objectStore("summaries")
                  .index("list")
                  .openCursor(directoryRange(`project:${project.id}`));
                cursor.onsuccess = () => {
                  const row = cursor.result;
                  if (!row) return;
                  const value = row.value;
                  row.update({
                    ...value,
                    list: "history",
                    conversation: {
                      ...value.conversation,
                      projectId: undefined,
                    },
                  });
                  row.continue();
                };
              }
            };
          }
          if (this.activeDirty)
            tx.objectStore("meta").put(activeId, "activeId");
          tx.objectStore("meta").put(crypto.randomUUID(), "searchRevision");
          tx.oncomplete = () => {
            this.assetIds = knownAssets;
            resolve();
          };
          tx.onabort = () =>
            reject(conflict ? new ConflictError() : (writeError ?? tx.error));
        });
        for (const entry of batch) {
          this.committed.set(entry.id, entry.conversation);
          this.revisions.set(entry.id, entry.revision);
          if (this.pending.get(entry.id) === entry)
            this.pending.delete(entry.id);
          else {
            const next = this.pending.get(entry.id);
            if (next) next.baseRevisions = [entry.revision];
          }
        }
        for (const project of projectBatch) {
          if (project.deleted) this.directories.delete("history");
          this.projectRevisions.set(project.id, project.revision ?? "legacy");
          if (this.pendingProjects.get(project.id) === project)
            this.pendingProjects.delete(project.id);
        }
        this.inFlightProjects = [];
        this.inFlight = [];
        for (const id of this.committed.keys())
          if (this.baseline.get(id)?.unloaded && !this.pending.has(id))
            this.committed.delete(id);
        if (activeId === this.activeId) this.activeDirty = false;
        this.checkpoint();
      }
      if (!this.closed) this.report("saved");
    } catch (error) {
      this.inFlight = [];
      this.inFlightProjects = [];
      this.failed = true;
      this.checkpoint();
      if (!this.closed)
        this.report(error instanceof ConflictError ? "conflict" : "error");
    }
  }

  search(query: string, offset: number, signal: AbortSignal) {
    return this.searchClient.query(
      query,
      offset,
      [...this.pending.values()].map((record) => searchRecord(record)),
      signal,
    );
  }

  close() {
    this.searchClient.close();
    this.checkpoint();
    this.closed = true;
    clearTimeout(this.timer);
    void this.database?.then((db) => db.close()).catch(() => undefined);
  }
}

function zJournal(raw: unknown) {
  const delta = deltaJournalSchema.safeParse(raw);
  return delta.success ? delta : journalSchema.safeParse(raw);
}
