import { describe, expect, it } from "vitest";
import { chatReducer } from "./chatReducer";
import type { Conversation } from "../types";
import {
  restoreConversation,
  storedConversationSchema,
} from "../lib/persistedChat";

const initial: Conversation = {
  id: "first",
  title: "New",
  model: "sample",
  provider: "local",
  messages: [],
};
const fallback = { ...initial, id: "fallback" };
describe("conversation management", () => {
  it("preserves a manual title on the first send and ignores blank renames", () => {
    let state: import("./chatReducer").ChatState = {
      projects: [],
      activeId: initial.id,
      conversations: [initial],
    };
    state = chatReducer(state, {
      type: "rename",
      id: initial.id,
      title: "  我的计划  ",
    });
    state = chatReducer(state, {
      type: "start",
      id: initial.id,
      title: "自动标题",
      messages: [],
    });
    state = chatReducer(state, {
      type: "rename",
      id: initial.id,
      title: "   ",
    });
    expect(state.conversations[0].title).toBe("我的计划");
  });
  it("replaces the active conversation on archive, but does not disturb it for background operations", () => {
    const state = {
      projects: [],
      activeId: initial.id,
      conversations: [initial, fallback],
    };
    const background = chatReducer(state, {
      type: "archive",
      id: fallback.id,
      archived: true,
      fallback,
    });
    expect(background.activeId).toBe(initial.id);
    const archived = chatReducer(state, {
      type: "archive",
      id: initial.id,
      archived: true,
      fallback,
    });
    expect(archived.activeId).toBe(fallback.id);
    expect(archived.conversations[0].archived).toBe(true);
  });
  it("clears deleted content and rejects stale draft updates or selection", () => {
    let state: import("./chatReducer").ChatState = {
      projects: [],
      activeId: initial.id,
      conversations: [
        {
          ...initial,
          title: "private",
          draft: "private",
          attachments: [{ id: "file", name: "private", content: "private" }],
        } as Conversation,
      ],
    };
    state = chatReducer(state, { type: "delete", id: initial.id, fallback });
    expect(state.activeId).toBe(fallback.id);
    expect(JSON.stringify(state)).not.toContain("private");
    state = chatReducer(state, {
      type: "draft",
      id: initial.id,
      value: "late",
    });
    state = chatReducer(state, { type: "select", id: initial.id });
    expect(state.activeId).toBe(fallback.id);
    expect(
      state.conversations.find((c) => c.id === initial.id)?.draft,
    ).toBeUndefined();
  });
  it("round-trips management metadata and accepts older records", () => {
    for (const conversation of [
      initial,
      { ...initial, titleEdited: true, pinnedAt: 123, archived: true },
      { ...initial, deleted: true },
    ]) {
      const record = storedConversationSchema.parse({
        version: 1,
        id: initial.id,
        revision: "r",
        updatedAt: 1,
        conversation,
      });
      expect(restoreConversation(record)).toMatchObject(conversation);
    }
  });
});
