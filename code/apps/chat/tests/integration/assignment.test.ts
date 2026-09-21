import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  adaptSample,
  type SampleEnvelope,
} from "../../src/features/chat/services/localReplay";
import { applyEvent } from "../../src/features/chat/state/chatReducer";
import { MarkdownContent } from "../../src/features/chat/components/MarkdownContent";
import type { ChatMessage } from "../../src/features/chat/types";

const sample: SampleEnvelope[] = JSON.parse(
  readFileSync(
    new URL("../../public/data/sample.json", import.meta.url),
    "utf8",
  ),
);
const initial: ChatMessage = {
  id: "assignment",
  role: "assistant",
  content: "",
  status: "waiting",
  activities: [],
  references: {},
  createdAt: 0,
};

describe("原任务书直接验收（不是 OSS 扩展场景）", () => {
  it("[REQ-DATA] 附件正文和两段思考按原始事件顺序完整重建", () => {
    const result = sample
      .flatMap(adaptSample)
      .reduce((m, e) => applyEvent(m, e, 1), initial);
    // Derive expectations from raw envelopes, not from the adapter under test.
    const rawText = sample
      .filter((e) => e.data.event === "content")
      .map((e) => e.data.content)
      .join("");
    expect(result.content).toBe(rawText);
    const thoughts = new Map<number, string>();
    for (const { data } of sample)
      if (data.event === "reasoning_content")
        thoughts.set(
          data.index!,
          (thoughts.get(data.index!) ?? "") + data.content,
        );
    expect(
      result.activities
        .filter((a) => a.kind === "reasoning")
        .map((a) => a.content),
    ).toEqual([...thoughts.values()]);
    expect(result.activities.map((a) => a.kind)).toEqual([
      "reasoning",
      "tool",
      "reasoning",
    ]);
    expect(result.activities.find((a) => a.kind === "tool")).toMatchObject({
      title: "搜索资料",
      content: "找到 10 份相关资料",
      status: "complete",
    });
    expect(result.status).toBe("complete");
  });

  it("[REQ-REF-DATA] reference 事件的全部资料字段按 ID 保留，不能仅数量正确", () => {
    const result = sample
      .flatMap(adaptSample)
      .reduce((m, e) => applyEvent(m, e, 1), initial);
    const originals = sample
      .filter((e) => e.data.event === "reference")
      .flatMap((e) => e.data.reference ?? []);
    expect(originals).toHaveLength(10);
    expect(Object.keys(result.references).sort()).toEqual(
      originals.map((r) => r.id).sort(),
    );
    for (const ref of originals)
      expect(result.references[ref.id]).toEqual({
        id: ref.id,
        title: ref.title,
        content: ref.content,
        link: ref.link,
        media: ref.web?.media,
        icon: ref.web?.icon,
      });
  });

  it("[REQ-REF-SYNTAX] 任务书逗号占位符和附件嵌套占位符都渲染成同一组来源标签", () => {
    const references = {
      "1_0": {
        id: "1_0",
        title: "来源甲",
        content: "摘录甲",
        link: "https://example.com/a",
      },
      "1_2": {
        id: "1_2",
        title: "来源乙",
        content: "摘录乙",
        link: "https://example.com/b",
      },
    };
    for (const marker of ["[1_0,1_2]", "[1_0, 1_2]", "[[1_0][1_2]]"]) {
      const html = renderToStaticMarkup(
        createElement(MarkdownContent, {
          content: `前文${marker}后文`,
          references,
        }),
      );
      expect(html).toContain('aria-label="查看引用：来源甲，共 2 个来源"');
      expect(html.match(/data-citation="true"/g)).toHaveLength(1);
      expect(html).toContain("<sup>+1</sup>");
      expect(html).not.toContain(marker);
      expect(html).toContain("前文");
      expect(html).toContain("后文");
    }
  });
});
