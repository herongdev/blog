import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { ChatMessage } from "../../src/features/chat/types";
import { readSSE } from "../../shared/transport/sse";
import { abortableDelay } from "../../shared/async/abortableDelay";
import {
  adaptSample,
  type SampleEnvelope,
} from "../../src/features/chat/services/localReplay";
import { applyEvent } from "../../src/features/chat/state/chatReducer";
import {
  citationIds,
  readableMarkdown,
  remarkCitations,
  safeWebUrl,
} from "../../src/features/chat/lib/citations";

function message(): ChatMessage {
  return {
    id: "m",
    role: "assistant",
    content: "",
    status: "waiting",
    activities: [],
    references: {},
    createdAt: 0,
  };
}
const sample: SampleEnvelope[] = JSON.parse(
  readFileSync(
    new URL("../../public/data/sample.json", import.meta.url),
    "utf8",
  ),
);

describe("the actual company fixture", () => {
  it("reconstructs the response, preserves two reasoning stages and merges one tool", () => {
    const result = sample
      .flatMap(adaptSample)
      .reduce((m, e) => applyEvent(m, e, 1000), message());
    expect(result.status).toBe("complete");
    expect(result.content.length).toBe(891);
    expect(result.activities.map((a) => a.kind)).toEqual([
      "reasoning",
      "tool",
      "reasoning",
    ]);
    expect(result.activities.every((a) => a.status === "complete")).toBe(true);
    expect(Object.keys(result.references)).toHaveLength(10);
    const groups = result.content.match(/\[(?:\[\d+_\d+\])+\]/g)!;
    expect(groups).toHaveLength(16);
    for (const id of citationIds(groups.join("")))
      expect(result.references[id]).toBeDefined();
    expect(result.sourceDurationMs).toBe(49391);
  });
});

describe("terminal states and cancellation", () => {
  it("does not let late chunks revive stopped or completed messages", () => {
    for (const status of ["stopped", "complete", "error", "empty"] as const) {
      const previous = { ...message(), content: "保留", status };
      expect(
        applyEvent(previous, { type: "text", delta: "旧请求" }, 1000),
      ).toBe(previous);
      expect(applyEvent(previous, { type: "done" }, 1000)).toBe(previous);
    }
  });
  it("classifies whitespace-only answers as empty and settles running activities", () => {
    let previous = applyEvent(
      message(),
      { type: "reasoning", id: "r", delta: "思考" },
      1,
    );
    previous = applyEvent(previous, { type: "text", delta: "\n " }, 2);
    const result = applyEvent(previous, { type: "done" }, 3);
    expect(result.status).toBe("empty");
    expect(result.activities[0].status).toBe("complete");
  });
  it("cancels a pending replay wait immediately", async () => {
    const controller = new AbortController();
    const result = abortableDelay(60_000, controller.signal);
    controller.abort();
    await expect(result).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("citation parsing", () => {
  it("buffers every partial boundary of a streamed multi-source citation", () => {
    const marker = "[[1_0][1_2]]";
    for (let i = 1; i < marker.length; i++)
      expect(readableMarkdown(`正文${marker.slice(0, i)}`), `prefix ${i}`).toBe(
        "正文",
      );
    expect(readableMarkdown(`正文${marker}`)).toBe(`正文${marker}`);
  });
  it("preserves completed Markdown and skips citations inside code and ordinary links", async () => {
    const source =
      "正文[[1_0][1_2]]\n\n`[[1_0]]`\n\n[普通链接](https://example.com)\n\n```text\n[[1_0]]\n```";
    const processor = unified().use(remarkParse).use(remarkCitations);
    const tree = await processor.run(processor.parse(source));
    const serialized = JSON.stringify(tree);
    expect(serialized.match(/#citation:/g)).toHaveLength(1);
    expect(serialized).toContain("#citation:1_0,1_2");
    expect(serialized).toContain("https://example.com");
    expect(readableMarkdown("**正常加粗**")).toBe("**正常加粗**");
  });
  it("rejects executable citation URLs", () => {
    expect(safeWebUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeWebUrl("https://example.com")).toBe("https://example.com/");
  });
});

describe("SSE network framing", () => {
  it("handles multibyte characters, CRLF, comments and multiple data lines split at every byte", async () => {
    const input = new TextEncoder().encode(
      ": heartbeat\r\ndata: 中文\r\ndata: second\r\n\r\ndata: [DONE]\n\n",
    );
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const byte of input) controller.enqueue(Uint8Array.of(byte));
        controller.close();
      },
    });
    const events = [];
    for await (const event of readSSE(body)) events.push(event);
    expect(events).toEqual(["中文\nsecond", "[DONE]"]);
  });
});
