import { expect, it, vi } from "vitest";
import { ChatCatalog } from "./chatCatalog";
import type { Conversation } from "../types";
it("streaming and draft text changes do not notify directory subscribers; navigation metadata does", () => {
  const catalog = new ChatCatalog();
  const listener = vi.fn();
  const unsubscribe = catalog.subscribe(listener);
  const conversation: Conversation = {
    id: "c",
    title: "标题",
    provider: "local",
    model: "sample",
    messages: [
      {
        id: "m",
        role: "assistant",
        content: "first",
        activities: [],
        references: {},
        status: "streaming",
        createdAt: 1,
      },
    ],
    draft: "one",
    hasDraft: true,
  };
  catalog.update([conversation]);
  const snapshot = catalog.getSnapshot();
  expect(snapshot[0].generating).toBe(true);
  catalog.update([
    {
      ...conversation,
      draft: "two",
      messages: [{ ...conversation.messages[0], content: "first + second" }],
    },
  ]);
  expect(catalog.getSnapshot()).toBe(snapshot);
  expect(listener).toHaveBeenCalledTimes(1);
  catalog.update([{ ...conversation, title: "新标题" }]);
  expect(listener).toHaveBeenCalledTimes(2);
  catalog.update([
    {
      ...conversation,
      title: "新标题",
      messages: [{ ...conversation.messages[0], status: "complete" }],
    },
  ]);
  expect(catalog.getSnapshot()[0].generating).toBe(false);
  expect(listener).toHaveBeenCalledTimes(3);
  unsubscribe();
  catalog.update([{ ...conversation, deleted: true }]);
  expect(listener).toHaveBeenCalledTimes(3);
});
