import type { ChatEvent } from "@shared/contracts/chat";
import { isGenerating } from "./selectors";
import type { ChatMessage, Conversation, ChatProject } from "../types";

export interface ChatState {
  conversations: Conversation[];
  projects: ChatProject[];
  activeId: string;
}
export type Action =
  | { type: "rename-project"; id: string; name: string; revision: string }
  | { type: "pin-project"; id: string; pinnedAt?: number; revision: string }
  | { type: "delete-project"; id: string; revision: string }
  | { type: "create-project"; project: ChatProject; conversation: Conversation }
  | { type: "move-project"; id: string; projectId?: string }
  | { type: "new"; conversation: Conversation }
  | { type: "select"; id: string }
  | { type: "rename"; id: string; title: string }
  | { type: "pin"; id: string; pinnedAt: number | undefined }
  | { type: "archive"; id: string; archived: boolean; fallback: Conversation }
  | { type: "delete"; id: string; fallback: Conversation }
  | { type: "draft"; id: string; value: string }
  | {
      type: "attachments";
      id: string;
      value: NonNullable<Conversation["attachments"]>;
    }
  | {
      type: "settings";
      id: string;
      model: string;
      provider?: Conversation["provider"];
    }
  | {
      type: "start";
      id: string;
      messages: ChatMessage[];
      title: string;
      clearDraft?: boolean;
    }
  | {
      type: "events";
      id: string;
      messageId: string;
      events: ChatEvent[];
      now: number;
    }
  | { type: "stop"; id: string; messageId: string; now: number };

function finish(
  message: ChatMessage,
  status: ChatMessage["status"],
  now: number,
): ChatMessage {
  return {
    ...message,
    status,
    finishedAt: now,
    activities: message.activities.map((item) => ({
      ...item,
      status:
        item.status === "running"
          ? status === "stopped"
            ? "stopped"
            : status === "error"
              ? "error"
              : "complete"
          : item.status,
    })),
  };
}

export function applyEvent(
  message: ChatMessage,
  event: ChatEvent,
  now: number,
): ChatMessage {
  // Late network callbacks must never revive a stopped/completed message.
  if (!isGenerating(message)) return message;
  switch (event.type) {
    case "text":
      return {
        ...message,
        status: "streaming",
        content: message.content + event.delta,
        activities: message.activities.map((a) =>
          a.kind === "reasoning" && event.delta.trim()
            ? { ...a, status: "complete" }
            : a,
        ),
      };
    case "reasoning": {
      const existing = message.activities.find((a) => a.id === event.id);
      return {
        ...message,
        status: "streaming",
        activities: existing
          ? message.activities.map((a) =>
              a.id === event.id
                ? { ...a, content: a.content + event.delta }
                : a,
            )
          : [
              ...message.activities.map((a) => ({
                ...a,
                status: "complete" as const,
              })),
              {
                id: event.id,
                kind: "reasoning",
                title: "思考",
                content: event.delta,
                status: "running",
              },
            ],
      };
    }
    case "tool": {
      const tool = {
        id: event.id,
        kind: "tool" as const,
        title: event.title,
        content: event.content,
        status: event.status,
      };
      return {
        ...message,
        status: "streaming",
        activities: message.activities.some((a) => a.id === event.id)
          ? message.activities.map((a) => (a.id === event.id ? tool : a))
          : [
              ...message.activities.map((a) =>
                a.kind === "reasoning"
                  ? { ...a, status: "complete" as const }
                  : a,
              ),
              tool,
            ],
      };
    }
    case "references":
      return {
        ...message,
        references: {
          ...message.references,
          ...Object.fromEntries(event.items.map((r) => [r.id, r])),
        },
      };
    case "metadata":
      return {
        ...message,
        recordId: event.recordId ?? message.recordId,
        requestId: event.requestId ?? message.requestId,
        requestStage: event.requestStage ?? message.requestStage,
        sourceDurationMs: event.sourceDurationMs ?? message.sourceDurationMs,
      };
    case "done":
      return finish(
        message,
        message.content.trim() ? "complete" : "empty",
        now,
      );
    case "error":
      return { ...finish(message, "error", now), error: event.message };
  }
}

export function chatReducer(state: ChatState, action: Action): ChatState {
  if (
    action.type === "rename-project" ||
    action.type === "pin-project" ||
    action.type === "delete-project"
  ) {
    const project = state.projects.find(
      (p) => p.id === action.id && !p.deleted,
    );
    if (!project) return state;
    if (
      action.type === "rename-project" &&
      (!action.name.trim() || action.name.trim().length > 80)
    )
      return state;
    return {
      ...state,
      projects: state.projects.map((p) =>
        p.id !== action.id
          ? p
          : action.type === "delete-project"
            ? {
                id: p.id,
                createdAt: p.createdAt,
                name: "",
                deleted: true,
                revision: action.revision,
              }
            : {
                ...p,
                revision: action.revision,
                ...(action.type === "rename-project"
                  ? { name: action.name.trim() }
                  : { pinnedAt: action.pinnedAt }),
              },
      ),
      conversations:
        action.type === "delete-project"
          ? state.conversations.map((c) =>
              c.projectId === action.id ? { ...c, projectId: undefined } : c,
            )
          : state.conversations,
    };
  }
  if (action.type === "create-project") {
    const name = action.project.name.trim();
    if (
      !name ||
      name.length > 80 ||
      state.projects.some((p) => p.id === action.project.id)
    )
      return state;
    return {
      ...state,
      projects: [...state.projects, { ...action.project, name }],
      conversations: [
        { ...action.conversation, projectId: action.project.id },
        ...state.conversations,
      ],
      activeId: action.conversation.id,
    };
  }
  if (
    action.type === "move-project" &&
    action.projectId &&
    !state.projects.some((p) => p.id === action.projectId && !p.deleted)
  )
    return state;
  if (action.type === "new")
    return {
      ...state,
      activeId: action.conversation.id,
      conversations: [action.conversation, ...state.conversations],
    };
  if (action.type === "select")
    return state.conversations.some((c) => c.id === action.id && !c.deleted)
      ? { ...state, activeId: action.id }
      : state;
  if (action.type === "delete" || action.type === "archive") {
    const target = state.conversations.find((c) => c.id === action.id);
    if (!target || target.deleted) return state;
    const conversations = state.conversations.map((c) =>
      c.id !== action.id
        ? c
        : action.type === "delete"
          ? {
              id: c.id,
              provider: c.provider,
              model: c.model,
              title: "",
              messages: [],
              deleted: true,
            }
          : { ...c, archived: action.archived },
    );
    if (
      state.activeId !== action.id ||
      (action.type === "archive" && !action.archived)
    )
      return { ...state, conversations };
    const next = conversations.find((c) => !c.deleted && !c.archived);
    return {
      ...state,
      conversations: next ? conversations : [action.fallback, ...conversations],
      activeId: next?.id ?? action.fallback.id,
    };
  }
  return {
    ...state,
    conversations: state.conversations.map((conversation) => {
      if (
        conversation.id !== action.id ||
        conversation.deleted ||
        conversation.unloaded
      )
        return conversation;
      if (action.type === "move-project")
        return { ...conversation, projectId: action.projectId };
      if (action.type === "rename") {
        const title = action.title.trim().slice(0, 80);
        return title
          ? { ...conversation, title, titleEdited: true }
          : conversation;
      }
      if (action.type === "pin")
        return { ...conversation, pinnedAt: action.pinnedAt };
      if (action.type === "draft")
        return conversation.draft === action.value
          ? conversation
          : {
              ...conversation,
              draft: action.value,
              hasDraft: Boolean(
                action.value.trim() || conversation.attachments?.length,
              ),
            };
      if (action.type === "attachments")
        return {
          ...conversation,
          attachments: action.value,
          hasDraft: Boolean(conversation.draft?.trim() || action.value.length),
        };
      if (action.type === "settings")
        return {
          ...conversation,
          model: action.model,
          provider: action.provider ?? conversation.provider,
        };
      if (action.type === "start")
        return {
          ...conversation,
          messages: action.messages,
          ...(action.clearDraft
            ? { draft: "", attachments: [], hasDraft: false }
            : {}),
          title:
            conversation.messages.length || conversation.titleEdited
              ? conversation.title
              : action.title,
        };
      const last = conversation.messages.length - 1;
      const index =
        conversation.messages[last]?.id === action.messageId
          ? last
          : conversation.messages.findIndex(
              (message) => message.id === action.messageId,
            );
      const message = conversation.messages[index];
      if (!message || !isGenerating(message)) return conversation;
      const messages = conversation.messages.slice();
      messages[index] =
        action.type === "stop"
          ? finish(message, "stopped", action.now)
          : action.events.reduce(
              (current, event) => applyEvent(current, event, action.now),
              message,
            );
      return { ...conversation, messages };
    }),
  };
}
