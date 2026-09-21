import { expect, it } from "vitest";
import { journalEntry } from "./recoveryJournal";
import type { Conversation } from "../types";
it("journal contains changed tail and IDs, not the full immutable message history", () => {
  const base: Conversation = {
    id: "chat",
    title: "标题",
    model: "sample",
    provider: "local",
    messages: Array.from({ length: 1000 }, (_, i) => ({
      id: String(i),
      role: "user",
      content: "immutable ".repeat(100),
      activities: [],
      references: {},
      status: "complete",
      createdAt: i,
    })),
  };
  const current = { ...base, draft: "新草稿" };
  const entry = journalEntry(
    {
      version: 1,
      id: "chat",
      revision: "next",
      updatedAt: 1,
      conversation: current,
      baseRevisions: ["base"],
    },
    base,
    new Set(),
  );
  expect(entry.record.conversation.messages).toHaveLength(2);
  expect(entry.messageOrder).toHaveLength(1000);
  expect(JSON.stringify(entry).length).toBeLessThan(
    JSON.stringify(base).length / 10,
  );
});
