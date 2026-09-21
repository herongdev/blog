import { describe, expect, it } from "vitest";
import {
  indexConversations,
  searchConversations,
  searchPattern,
  searchResultLimit,
} from "./searchConversations";
import type { Conversation } from "../types";
const chat = (id: string, title: string, content: string): Conversation => ({
  id,
  title,
  provider: "local",
  model: "sample",
  messages: [
    {
      id: `${id}-m`,
      role: "assistant",
      content,
      status: "complete",
      activities: [],
      references: {},
      createdAt: 1,
    },
  ],
});
const find = (chats: Conversation[], query: string) =>
  searchConversations(indexConversations(chats), query);
describe("local chat search", () => {
  it("matches literal multilingual text, case and whitespace without interpreting regular expressions", () => {
    const source = chat("1", "React SSE", "甲硝唑 😀 [a+b] 第一行\n第二行");
    for (const query of [
      "react",
      "甲硝唑",
      "😀",
      "[a+b]",
      "第一行 第二行",
      "  SSE  ",
    ])
      expect(find([source], query).total).toBe(1);
    expect(find([source], ".*").total).toBe(0);
    expect(find([source], "[ab]").total).toBe(0);
    expect(searchPattern(" ")).toBeUndefined();
  });
  it("includes drafts, archived and project chats, excludes deleted chats, reasoning and empty placeholders", () => {
    const project = {
      ...chat("p", "项目问题", "归档中的关键词"),
      archived: true,
      projectId: "project",
    };
    const draft = {
      ...chat("d", "新的对话", ""),
      messages: [],
      draft: "关键词草稿",
      hasDraft: true,
    };
    const deleted = { ...chat("x", "关键词", "关键词"), deleted: true };
    expect(
      find(
        [
          project,
          draft,
          deleted,
          { ...draft, id: "blank", draft: "", hasDraft: false },
        ],
        "关键词",
      ).items.map((r) => r.conversation.id),
    ).toEqual(["p", "d"]);
    const hidden = chat("h", "Title", "visible");
    hidden.messages[0].activities = [
      {
        id: "thought",
        kind: "reasoning",
        title: "Thought",
        content: "secret",
        status: "complete",
      },
    ];
    expect(find([hidden], "secret").total).toBe(0);
  });
  it("prioritizes title matches, centers long snippets on the match and counts results beyond the visible limit", () => {
    const long = chat(
      "long",
      "普通标题",
      "前".repeat(2000) + "关键词" + "后".repeat(2000),
    );
    const named = chat("named", "关键词标题", "short");
    const result = find([long, named], "关键词");
    expect(result.items[0].conversation.id).toBe("named");
    expect(result.items[1].snippet).toContain("关键词");
    expect(result.items[1].snippet.length).toBeLessThan(200);
    const many = Array.from({ length: 70 }, (_, i) =>
      chat(String(i), "matched", "body"),
    );
    expect(find(many, "").total).toBe(70);
    expect(find(many, "").items).toHaveLength(searchResultLimit);
  });
});
