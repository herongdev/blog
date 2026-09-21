import { expect, it } from "vitest";
import { selectContext, contextBudget } from "./contextBudget";
import type { ChatMessage } from "../types";
const message = (
  id: number,
  role: "user" | "assistant",
  content = "内容",
): ChatMessage => ({
  id: String(id),
  role,
  content,
  status: "complete",
  activities: [],
  references: {},
  createdAt: id,
});
it("bounds long histories by whole turns and preserves the newest question and original history", () => {
  const history = Array.from({ length: 201 }, (_, i) =>
    message(i, i % 2 ? "assistant" : "user"),
  );
  const before = structuredClone(history);
  const result = selectContext(history);
  expect(result.limited).toBe(true);
  expect(result.messages.length).toBeLessThanOrEqual(contextBudget.messages);
  expect(result.messages[0].role).toBe("user");
  expect(result.messages.at(-1)!.id).toBe("200");
  expect(history).toEqual(before);
});
it("uses a byte budget for multilingual text and reports an oversized newest question", () => {
  const history = [
    message(0, "user", "中".repeat(20000)),
    message(1, "assistant", "答".repeat(20000)),
    message(2, "user", "继续"),
  ];
  expect(selectContext(history).messages).toEqual([history[2]]);
  expect(() => selectContext([message(0, "user", "中".repeat(40000))])).toThrow(
    "当前问题或附件过大",
  );
});
