import { ChatCatalog } from "../services/chatCatalog";
import type { DirectoryPage } from "../services/conversationDirectory";
import { expandImages } from "../services/attachmentAssets";
import { useCallback, useEffect, useRef, useState } from "react";
import { chatReducer, type Action, type ChatState } from "../state/chatReducer";
import { conversationExport } from "../lib/conversationExport";
import { newConversation } from "../lib/newConversation";
import {
  ChatStorage,
  type LoadIssue,
  type SaveStatus,
} from "../services/chatStorage";

export function useChatStorage(flushGeneration: () => void) {
  const [state, setState] = useState<ChatState>(() => {
    const conversation = newConversation();
    return {
      conversations: [conversation],
      activeId: conversation.id,
      projects: [],
    };
  });
  const [catalog] = useState(() => new ChatCatalog());
  const positions = useRef(new Map<string, number>());
  const stateRef = useRef(state);
  const storage = useRef<ChatStorage | null>(null);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [migration, setMigration] = useState<{ done: number; total: number }>();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [readErrorId, setReadErrorId] = useState<string>();
  const [exportErrorId, setExportErrorId] = useState<string>();
  const [directories, setDirectories] = useState<
    Record<string, Omit<DirectoryPage, "conversations"> & { error?: boolean }>
  >({});
  const directoryLoads = useRef(new Set<string>());
  const [loadIssue, setLoadIssue] = useState<LoadIssue>();
  const exportUrl = useRef<string | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    setReady(false);
    const repository = new ChatStorage(
      (status) => {
        if (mounted) setSaveStatus(status);
      },
      (progress) => {
        if (mounted) setMigration(progress);
      },
    );
    storage.current = repository;
    void repository.load().then(({ state: restored, issue }) => {
      if (!mounted) return;
      if (restored) {
        stateRef.current = restored;
        catalog.update(restored.conversations);
        positions.current = new Map(
          restored.conversations.map((c, i) => [c.id, i]),
        );
        setState(restored);
      }
      setLoadIssue(issue);
      if (issue === "unavailable") setSaveStatus("error");
      catalog.update(stateRef.current.conversations);
      readyRef.current = true;
      setReady(true);
    });
    return () => {
      // Preserve the last stream batch during component replacement / hot updates, too.
      flushGeneration();
      mounted = false;
      readyRef.current = false;
      repository.close();
      if (exportUrl.current) URL.revokeObjectURL(exportUrl.current);
    };
  }, [flushGeneration, catalog]);

  const ensureConversation = useCallback(
    async (id: string) => {
      const current = stateRef.current.conversations.find(
        (c) => c.id === id && !c.deleted,
      );
      if (current && !current.unloaded) return current;
      const repository = storage.current;
      if (!repository) return undefined;
      try {
        const restored = await repository.readConversation(id);
        if (storage.current !== repository || !readyRef.current)
          return undefined;
        const latest = stateRef.current.conversations.find((c) => c.id === id);
        if (latest?.deleted) return undefined;
        if (latest && !latest.unloaded) return latest;
        const next = {
          ...stateRef.current,
          conversations: (latest
            ? stateRef.current.conversations
            : [...stateRef.current.conversations, restored]
          ).map((c) =>
            c.id === id
              ? restored
              : c.id !== stateRef.current.activeId && !c.unloaded
                ? repository.release(c)
                : c,
          ),
        };
        stateRef.current = next;
        catalog.update(next.conversations);
        positions.current = new Map(
          next.conversations.map((c, i) => [c.id, i]),
        );
        setState(next);
        setReadErrorId(undefined);
        return restored;
      } catch {
        if (storage.current === repository && readyRef.current)
          setReadErrorId(id);
        return undefined;
      }
    },
    [catalog],
  );

  const loadDirectory = useCallback(
    async (scope: string, more = false) => {
      const repository = storage.current;
      if (!repository || !readyRef.current || directoryLoads.current.has(scope))
        return;
      directoryLoads.current.add(scope);
      try {
        const page = await repository.directory(scope, more);
        if (storage.current !== repository || !readyRef.current) return;
        if (page.conversations.length) {
          const known = new Set(
            stateRef.current.conversations.map((c) => c.id),
          );
          const next = {
            ...stateRef.current,
            conversations: [
              ...stateRef.current.conversations,
              ...page.conversations.filter((c) => !known.has(c.id)),
            ],
          };
          stateRef.current = next;
          catalog.update(next.conversations);
          positions.current = new Map(
            next.conversations.map((c, i) => [c.id, i]),
          );
          setState(next);
        }
        setDirectories((value) => ({
          ...value,
          [scope]: { cursor: page.cursor, more: page.more, total: page.total },
        }));
      } catch {
        if (storage.current === repository)
          setDirectories((value) => ({
            ...value,
            [scope]: {
              ...value[scope],
              total: value[scope]?.total ?? 0,
              more: true,
              error: true,
            },
          }));
      } finally {
        directoryLoads.current.delete(scope);
      }
    },
    [catalog],
  );

  useEffect(() => {
    if (ready && saveStatus === "saved") void loadDirectory("history");
  }, [ready, saveStatus, loadDirectory]);

  const selected = state.conversations.find((c) => c.id === state.activeId);
  useEffect(() => {
    if (ready && selected?.unloaded) void ensureConversation(selected.id);
  }, [ready, selected?.id, selected?.unloaded, ensureConversation]);

  const dispatch = useCallback(
    (action: Action) => {
      if (!readyRef.current) return;
      const previous = stateRef.current;
      const hot = [
        "draft",
        "attachments",
        "settings",
        "start",
        "events",
        "stop",
        "rename",
        "pin",
        "move-project",
      ].includes(action.type);
      const index =
        "id" in action ? positions.current.get(action.id) : undefined;
      let next;
      if (hot && index !== undefined) {
        const target = previous.conversations[index];
        const reduced = chatReducer(
          { ...previous, conversations: [target] },
          action,
        ).conversations[0];
        if (reduced === target) return;
        const conversations = previous.conversations.slice();
        conversations[index] = reduced;
        next = { ...previous, conversations };
      } else next = chatReducer(previous, action);
      const repository = storage.current;
      repository?.observe(
        next,
        hot && index !== undefined ? [next.conversations[index]] : undefined,
      );
      // Keep the active body and live background streams; release settled history.
      const compact =
        repository && !hot
          ? {
              ...next,
              conversations: next.conversations.map((c) =>
                c.id !== next.activeId && !c.unloaded
                  ? repository.release(c)
                  : c,
              ),
            }
          : next;
      stateRef.current = compact;
      catalog.update(
        hot && index !== undefined
          ? [compact.conversations[index]]
          : compact.conversations,
      );
      if (!hot || index === undefined)
        positions.current = new Map(
          compact.conversations.map((c, i) => [c.id, i]),
        );
      setState(compact);
    },
    [catalog],
  );
  const checkpoint = useCallback(() => storage.current?.checkpoint(), []);
  const retrySave = useCallback(() => {
    void storage.current?.retry();
  }, []);
  const exportConversation = useCallback(
    async (id: string) => {
      flushGeneration();
      if (!(await ensureConversation(id))) return;
      const snapshot = conversationExport(stateRef.current, id);
      if (!snapshot) return;
      try {
        snapshot.data.conversations = await Promise.all(
          snapshot.data.conversations.map(expandImages),
        );
        if (!readyRef.current) return;
        if (exportUrl.current) URL.revokeObjectURL(exportUrl.current);
        exportUrl.current = URL.createObjectURL(
          new Blob([JSON.stringify(snapshot.data, null, 2)], {
            type: "application/json",
          }),
        );
        const link = document.createElement("a");
        link.href = exportUrl.current;
        link.download = snapshot.filename;
        link.click();
        setExportErrorId(undefined);
      } catch {
        if (readyRef.current) setExportErrorId(id);
      }
    },
    [flushGeneration, ensureConversation],
  );
  const search = useCallback(
    (query: string, offset: number, signal: AbortSignal) => {
      flushGeneration();
      if (!storage.current)
        return Promise.reject(new Error("Storage unavailable"));
      return storage.current.search(query, offset, signal);
    },
    [flushGeneration],
  );
  return {
    catalog,
    migration,
    search,
    directories,
    loadDirectory,
    state,
    dispatch,
    ready,
    saveStatus,
    loadIssue,
    checkpoint,
    retrySave,
    exportConversation,
    exportErrorId,
    ensureConversation,
    readErrorId,
  };
}
