import { selectContext } from "../lib/contextBudget";
import { useCallback, useEffect, useRef } from "react";
import type { ChatEvent, ProviderId } from "@shared/contracts/chat";
import type { ChatMessage, Conversation, ImageAttachment } from "../types";
import { newConversation } from "../lib/newConversation";
import { useConversationNavigation } from "./useConversationNavigation";
import { useChatStorage } from "./useChatStorage";
import { streamChat, type GenerationOptions } from "../services/streamChat";

function newMessage(role: ChatMessage["role"], content = ""): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    status: role === "user" ? "complete" : "waiting",
    activities: [],
    references: {},
    createdAt: Date.now(),
  };
}
interface Run {
  controller: AbortController;
  conversationId: string;
  messageId: string;
  flush: () => void;
  timer?: ReturnType<typeof setTimeout>;
}

export function useChat() {
  const runsRef = useRef(new Map<string, Run>());
  const flushGeneration = useCallback(() => {
    for (const run of runsRef.current.values()) run.flush();
  }, []);
  const persistence = useChatStorage(flushGeneration);
  const { state, dispatch, ready, checkpoint } = persistence;
  const activate = useCallback(
    (id: string) => {
      dispatch({ type: "select", id });
    },
    [dispatch],
  );
  const navigation = useConversationNavigation(
    persistence.ensureConversation,
    activate,
  );
  const cancelNavigation = navigation.cancel;
  const current = state.conversations.find((c) => c.id === state.activeId)!;
  const setDraft = useCallback(
    (id: string, value: string) => {
      dispatch({ type: "draft", id, value });
    },
    [dispatch],
  );
  const setAttachments = useCallback(
    (id: string, value: NonNullable<Conversation["attachments"]>) => {
      dispatch({ type: "attachments", id, value });
    },
    [dispatch],
  );

  useEffect(() => {
    const save = () => {
      flushGeneration();
      checkpoint();
    };
    const hidden = () => {
      if (document.visibilityState === "hidden") save();
    };
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [checkpoint, flushGeneration]);

  useEffect(
    () => () => {
      for (const run of runsRef.current.values()) {
        clearTimeout(run.timer);
        run.controller.abort();
      }
      runsRef.current.clear();
    },
    [],
  );

  const stopConversation = useCallback(
    (id: string) => {
      const run = runsRef.current.get(id);
      if (!run) return;
      run.flush();
      run.controller.abort();
      dispatch({
        type: "stop",
        id,
        messageId: run.messageId,
        now: Date.now(),
      });
      runsRef.current.delete(id);
    },
    [dispatch],
  );
  const stop = useCallback(
    () => stopConversation(current.id),
    [current.id, stopConversation],
  );

  const create = useCallback(
    (
      provider: ProviderId = current.provider,
      model = current.model,
      projectId = current.projectId,
    ) => {
      cancelNavigation();
      dispatch({
        type: "new",
        conversation: { ...newConversation(provider, model), projectId },
      });
    },
    [
      current.provider,
      current.model,
      current.projectId,
      dispatch,
      cancelNavigation,
    ],
  );
  function createStandalone() {
    cancelNavigation();
    dispatch({
      type: "new",
      conversation: newConversation(current.provider, current.model),
    });
  }
  function createProject(name: string) {
    if (!name.trim() || name.trim().length > 80) return;
    cancelNavigation();
    dispatch({
      type: "create-project",
      project: { id: crypto.randomUUID(), name, createdAt: Date.now() },
      conversation: newConversation(current.provider, current.model),
    });
  }
  function manageProject(
    id: string,
    action: "rename" | "pin" | "delete" | "new",
    name?: string,
  ) {
    const project = state.projects.find((p) => p.id === id && !p.deleted);
    if (!project) return;
    if (action === "new") {
      create(current.provider, current.model, id);
      return;
    }
    const revision = crypto.randomUUID();
    if (action === "rename")
      dispatch({ type: "rename-project", id, name: name ?? "", revision });
    if (action === "pin")
      dispatch({
        type: "pin-project",
        id,
        pinnedAt: project.pinnedAt ? undefined : Date.now(),
        revision,
      });
    if (action === "delete") {
      dispatch({ type: "delete-project", id, revision });
    }
  }
  async function moveToProject(id: string, projectId?: string) {
    if (!(await persistence.ensureConversation(id))) return;
    dispatch({ type: "move-project", id, projectId });
  }
  async function select(id: string) {
    if (id === current.id && !current.unloaded) {
      cancelNavigation();
      return;
    }
    await navigation.open(id);
  }
  const setModel = useCallback(
    (model: string) => {
      if (current.unloaded) return;
      cancelNavigation();
      if (current.messages.length) create(current.provider, model);
      else dispatch({ type: "settings", id: current.id, model });
    },
    [
      cancelNavigation,
      current.unloaded,
      current.messages.length,
      current.provider,
      current.id,
      create,
      dispatch,
    ],
  );

  function setProvider(provider: ProviderId, model: string) {
    if (current.unloaded) return;
    cancelNavigation();
    if (current.messages.length) create(provider, model);
    else dispatch({ type: "settings", id: current.id, provider, model });
  }

  async function manageConversation(
    id: string,
    action: "pin" | "archive" | "delete" | "rename" | "export",
    title?: string,
  ) {
    const conversation = await persistence.ensureConversation(id);
    if (!conversation) return;
    if (action === "export") {
      persistence.exportConversation(id);
      return;
    }
    if (action === "archive" || action === "delete") stopConversation(id);
    if (action === "rename")
      dispatch({ type: "rename", id, title: title ?? "" });
    if (action === "pin")
      dispatch({
        type: "pin",
        id,
        pinnedAt: conversation.pinnedAt ? undefined : Date.now(),
      });
    if (
      (action === "archive" || action === "delete") &&
      (id === current.id || id === navigation.pending?.id)
    )
      cancelNavigation();
    if (action === "archive")
      dispatch({
        type: "archive",
        id,
        archived: !conversation.archived,
        fallback: newConversation(conversation.provider, conversation.model),
      });
    if (action === "delete")
      dispatch({
        type: "delete",
        id,
        fallback: newConversation(conversation.provider, conversation.model),
      });
  }

  async function send(
    text: string,
    options: GenerationOptions,
    retry = false,
    images: ImageAttachment[] = [],
  ) {
    if (
      !ready ||
      current.unloaded ||
      runsRef.current.has(current.id) ||
      (!retry && !text.trim() && !images.length)
    )
      return;
    cancelNavigation();
    const assistant = newMessage("assistant");
    const previous = retry
      ? current.messages.slice(0, -1)
      : [
          ...current.messages,
          {
            ...newMessage("user", text.trim()),
            ...(images.length ? { images } : {}),
          },
        ];
    if (previous.at(-1)?.role !== "user") return;
    if (current.provider !== "local") {
      try {
        assistant.contextLimited = selectContext(previous).limited;
      } catch {
        /* The stream reports an oversized latest turn through the normal error path. */
      }
    }
    const run: Run = {
      controller: new AbortController(),
      conversationId: current.id,
      messageId: assistant.id,
      flush: () => undefined,
    };
    runsRef.current.set(current.id, run);
    let pending: ChatEvent[] = [];
    run.flush = () => {
      clearTimeout(run.timer);
      run.timer = undefined;
      if (runsRef.current.get(run.conversationId) !== run || !pending.length)
        return;
      dispatch({
        type: "events",
        id: current.id,
        messageId: assistant.id,
        events: pending,
        now: Date.now(),
      });
      pending = [];
    };
    dispatch({
      type: "start",
      id: current.id,
      messages: [...previous, assistant],
      title: Array.from(
        (previous[0].content || previous[0].images?.[0]?.name || "")
          .replace(/\s+/g, " ")
          .trim(),
      )
        .slice(0, 28)
        .join(""),
      clearDraft: !retry,
    });
    let finished = false;
    try {
      const source = streamChat(
        current,
        previous,
        options,
        run.controller.signal,
      );
      for await (const event of source) {
        if (
          runsRef.current.get(run.conversationId) !== run ||
          run.controller.signal.aborted
        )
          break;
        pending.push(event);
        if (event.type === "done" || event.type === "error") {
          finished = true;
          run.flush();
          break;
        }
        // Small batches keep a fast stream from re-rendering Markdown for every token.
        if (!run.timer) run.timer = setTimeout(run.flush, 32);
      }
      if (
        !finished &&
        !run.controller.signal.aborted &&
        runsRef.current.get(run.conversationId) === run
      )
        throw new Error("回答意外中断，请重试。");
    } catch (error) {
      if (
        runsRef.current.get(run.conversationId) === run &&
        !run.controller.signal.aborted
      ) {
        pending.push({
          type: "error",
          message:
            error instanceof Error ? error.message : "生成失败，请重试。",
        });
        run.flush();
      }
    } finally {
      run.flush();
      clearTimeout(run.timer);
      if (runsRef.current.get(run.conversationId) === run)
        runsRef.current.delete(run.conversationId);
    }
  }
  return {
    state,
    catalog: persistence.catalog,
    opening: navigation.pending,
    cancelOpening: cancelNavigation,
    retryOpening: () => navigation.pending && select(navigation.pending.id),
    migration: persistence.migration,
    search: persistence.search,
    directories: persistence.directories,
    loadDirectory: persistence.loadDirectory,
    current,
    send,
    stop,
    create,
    select,
    setModel,
    setProvider,
    manageConversation,
    createStandalone,
    createProject,
    manageProject,
    moveToProject,
    setDraft,
    setAttachments,
    ready,
    saveStatus: persistence.saveStatus,
    exportFailed: !!persistence.exportErrorId,
    retryExport: () =>
      persistence.exportErrorId &&
      persistence.exportConversation(persistence.exportErrorId),
    readError: persistence.readErrorId === current.id,
    retryRead: () => persistence.ensureConversation(current.id),
    loadIssue: persistence.loadIssue,
    retrySave: persistence.retrySave,
  };
}
