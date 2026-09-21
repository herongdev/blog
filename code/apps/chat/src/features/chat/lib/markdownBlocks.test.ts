import { expect, it } from "vitest";
import { MarkdownBlocks } from "./markdownBlocks";
it("appending fenced code and tables preserves completed blocks and raw source", () => {
  const parser = new MarkdownBlocks();
  const initial = "# 标题\n\n第一段\n\n第二段\n\n```ts\nconst x = ";
  const first = parser.parse(initial);
  const next = parser.parse(
    initial + "1;\n```\n\n| a | b |\n| - | - |\n| 1 | 2 |\n",
  );
  expect(next[0]).toBe(first[0]);
  expect(next.map((b) => b.source).join("")).toBe(
    initial + "1;\n```\n\n| a | b |\n| - | - |\n| 1 | 2 |\n",
  );
  expect(
    next.some(
      (b) => b.source.includes("```ts") && b.source.includes("1;\n```"),
    ),
  ).toBe(true);
});
it("late link definitions and edited shorter content invalidate reuse safely", () => {
  const parser = new MarkdownBlocks();
  parser.parse("# Title\n\n[link][id]\n\nparagraph\n\nend");
  const value =
    "# Title\n\n[link][id]\n\nparagraph\n\nend\n\n[id]: https://example.com";
  expect(parser.parse(value)).toEqual([{ offset: 0, source: value }]);
  expect(parser.parse("短内容")).toEqual([{ offset: 0, source: "短内容" }]);
});
