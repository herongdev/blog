import { describe, expect, it } from "vitest";
import type { StoredConversation } from "./persistedChat";
import { searchRecord, summarize } from "./conversationSummary";
import { searchPattern } from "./searchConversations";

const record: StoredConversation = {
  version: 1,
  id: "chat",
  revision: "revision",
  updatedAt: 1,
  conversation: {
    id: "chat",
    title: "多行\n标题",
    model: "fixture",
    provider: "local",
    draft: "未发送草稿",
    attachments: [{ id: "file", name: "secret.txt", content: "附件秘密" }],
    messages: [
      {
        id: "message",
        role: "assistant",
        content: "甲硝唑 😀 [a+b] Kelvin ſample ẞeta 第一行\n第二行",
        status: "complete",
        createdAt: 1,
        activities: [
          {
            id: "thought",
            kind: "reasoning",
            title: "thinking",
            content: "独立思考内容",
            status: "complete",
          },
        ],
        references: {
          x: {
            id: "x",
            title: "source",
            content: "来源原文",
            link: "https://example.com",
          },
        },
      },
    ],
  },
};
describe("conversation summaries and candidate index", () => {
  it("keeps navigation metadata while releasing body, draft and attachment payloads", () => {
    const summary = summarize(record.conversation);
    expect(summary).toMatchObject({
      id: "chat",
      messageCount: 1,
      hasDraft: true,
      unloaded: true,
      messages: [],
    });
    for (const field of ["draft", "attachments"])
      expect(summary).not.toHaveProperty(field);
    expect(summarize(summary)).toEqual(summary);
  });
  it("normalized search preserves literal Unicode, whitespace and punctuation matches", () => {
    const index = searchRecord(record);
    for (const query of [
      "甲硝唑",
      "😀 [a+b]",
      "kelvin",
      "sample",
      "ßeta",
      "第一行 第二行",
      "多行 标题",
      "未发送",
    ]) {
      expect(
        [record.conversation.title.replace(/\s+/gu, " "), ...index.texts].some(
          (text) => searchPattern(query)!.test(text),
        ),
        query,
      ).toBe(true);
    }
    for (const excluded of ["附件秘密", "独立思考内容", "来源原文"])
      expect(index.texts.join(" ")).not.toContain(excluded);
  });
  it("deleted records do not retain searchable body text", () => {
    const index = searchRecord({
      ...record,
      conversation: {
        ...record.conversation,
        title: "",
        draft: "",
        messages: [],
        deleted: true,
      },
    });
    expect(index.texts).toEqual([]);
  });
});
