import { describe, expect, it } from "vitest";
import { chatReducer, type ChatState } from "./chatReducer";
import { newConversation } from "../lib/newConversation";
import { journalSchema, storedConversationSchema } from "../lib/persistedChat";

const conversation = newConversation();
const project = { id: "job", name: "  求职准备  ", createdAt: 123 };
const initial: ChatState = {
  conversations: [conversation],
  activeId: conversation.id,
  projects: [],
};
const create = () =>
  chatReducer(initial, {
    type: "create-project",
    project,
    conversation: newConversation(),
  });
describe("project membership", () => {
  it("creates a project and its first conversation atomically and rejects invalid names or duplicate IDs", () => {
    const state = create();
    expect(state.projects[0].name).toBe("求职准备");
    expect(
      state.conversations.find((c) => c.id === state.activeId)?.projectId,
    ).toBe(project.id);
    for (const name of ["  ", "x".repeat(81), "😀".repeat(41)])
      expect(
        chatReducer(initial, {
          type: "create-project",
          project: { ...project, name },
          conversation,
        }),
      ).toBe(initial);
    expect(
      chatReducer(state, { type: "create-project", project, conversation }),
    ).toBe(state);
  });
  it("moving a conversation preserves its draft, model, pinned/archived state and current selection", () => {
    let state = create();
    state = chatReducer(state, {
      type: "draft",
      id: conversation.id,
      value: "保留草稿",
    });
    state = chatReducer(state, {
      type: "pin",
      id: conversation.id,
      pinnedAt: 42,
    });
    const before = state.conversations.find((c) => c.id === conversation.id)!;
    const moved = chatReducer(state, {
      type: "move-project",
      id: conversation.id,
      projectId: project.id,
    });
    expect(moved.activeId).toBe(state.activeId);
    expect(moved.conversations.find((c) => c.id === conversation.id)).toEqual({
      ...before,
      projectId: project.id,
    });
    expect(
      chatReducer(moved, {
        type: "move-project",
        id: conversation.id,
        projectId: "missing",
      }),
    ).toBe(moved);
    const removed = chatReducer(moved, {
      type: "move-project",
      id: conversation.id,
    });
    expect(
      removed.conversations.find((c) => c.id === conversation.id)?.projectId,
    ).toBeUndefined();
  });
  it("archiving/deleting the last project chat keeps the project; deleted chats cannot be moved back", () => {
    const state = create();
    const archived = chatReducer(state, {
      type: "archive",
      id: state.activeId,
      archived: true,
      fallback: conversation,
    });
    expect(archived.projects).toBe(state.projects);
    const deleted = chatReducer(state, {
      type: "delete",
      id: state.activeId,
      fallback: conversation,
    });
    const moved = chatReducer(deleted, {
      type: "move-project",
      id: state.activeId,
      projectId: project.id,
    });
    expect(moved.projects).toBe(state.projects);
    expect(
      moved.conversations.find((c) => c.id === state.activeId)?.projectId,
    ).toBeUndefined();
  });
  it("round-trips project membership and recovers pending projects without breaking legacy journals", () => {
    const record = storedConversationSchema.parse({
      version: 1,
      id: conversation.id,
      revision: "r",
      updatedAt: 1,
      conversation: { ...conversation, projectId: project.id },
    });
    expect(record.conversation.projectId).toBe(project.id);
    const journal = {
      version: 1,
      activeId: conversation.id,
      records: [{ record, baseRevisions: [] }],
    };
    expect(journalSchema.parse(journal).projects).toEqual([]);
    expect(
      journalSchema.parse({ ...journal, projects: [project] }).projects[0].name,
    ).toBe("求职准备");
  });
});

it("project rename and pin retain conversation identity; deleting a project releases every chat and cannot be undone by stale actions", () => {
  let state = create();
  const chats = state.conversations;
  state = chatReducer(state, {
    type: "rename-project",
    id: project.id,
    name: " 新项目名 ",
    revision: "r1",
  });
  state = chatReducer(state, {
    type: "pin-project",
    id: project.id,
    pinnedAt: 42,
    revision: "r2",
  });
  expect(state.projects[0]).toMatchObject({
    name: "新项目名",
    pinnedAt: 42,
    revision: "r2",
  });
  expect(state.conversations).toBe(chats);
  expect(
    chatReducer(state, {
      type: "rename-project",
      id: project.id,
      name: " ",
      revision: "invalid",
    }),
  ).toBe(state);
  const deleted = chatReducer(state, {
    type: "delete-project",
    id: project.id,
    revision: "r3",
  });
  expect(deleted.activeId).toBe(state.activeId);
  expect(
    deleted.conversations.map((c) => ({ ...c, projectId: undefined })),
  ).toEqual(state.conversations.map((c) => ({ ...c, projectId: undefined })));
  expect(deleted.conversations.every((c) => c.projectId !== project.id)).toBe(
    true,
  );
  expect(deleted.projects[0]).toMatchObject({ name: "", deleted: true });
  expect(
    chatReducer(deleted, {
      type: "rename-project",
      id: project.id,
      name: "late",
      revision: "r4",
    }),
  ).toBe(deleted);
  expect(
    chatReducer(deleted, {
      type: "move-project",
      id: conversation.id,
      projectId: project.id,
    }),
  ).toBe(deleted);
});
