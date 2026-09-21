import { describe, expect, it } from "vitest";
import type { ChatMessage } from "../types";
import { toRequestMessages } from "./chatHistory";

function message(overrides: Partial<ChatMessage>): ChatMessage {
  return {
    id: "test",
    role: "assistant",
    content: "原始回答",
    status: "complete",
    activities: [],
    references: {},
    createdAt: 0,
    ...overrides,
  };
}

describe("model conversation history", () => {
  it("keeps user questions and completed answers, excluding interrupted or empty answers", () => {
    const user = message({ role: "user", content: "问题" });
    const incomplete = [
      "waiting",
      "streaming",
      "stopped",
      "error",
      "empty",
    ] as const;
    const history = [
      user,
      message({}),
      ...incomplete.map((status) => message({ status })),
    ];
    expect(toRequestMessages(history)).toEqual([
      { role: "user", content: "问题" },
      { role: "assistant", content: "原始回答", reasoning_content: "" },
    ]);
  });

  it("preserves raw Markdown and reasoning order without exposing tool text or UI metadata", () => {
    const source = message({
      content: "**未改写的原文 [[1_0]]",
      recordId: "ui-only",
      activities: [
        {
          id: "a",
          kind: "reasoning",
          title: "思考",
          content: "第一步",
          status: "complete",
        },
        {
          id: "b",
          kind: "tool",
          title: "搜索",
          content: "工具内部结果",
          status: "complete",
        },
        {
          id: "c",
          kind: "reasoning",
          title: "思考",
          content: "第二步",
          status: "complete",
        },
      ],
    });
    const before = structuredClone(source);
    expect(toRequestMessages([source])).toEqual([
      {
        role: "assistant",
        content: source.content,
        reasoning_content: "第一步\n第二步",
      },
    ]);
    expect(source).toEqual(before);
  });
});
