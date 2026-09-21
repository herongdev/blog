import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseSample } from "./sampleEnvelope";
import { adaptSample } from "../services/localReplay";

describe("sample boundary", () => {
  it.each([
    null,
    {},
    [null],
    [{ event: "message" }],
    [{ event: "message", data: { event: "content" } }],
    [{ event: "message", data: { event: "content", content: 12 } }],
    [{ event: "message", data: { event: "reference", reference: {} } }],
    [
      {
        event: "message",
        data: { event: "reference", reference: [{ id: "1_0" }] },
      },
    ],
    [{ event: "message", data: { event: "call_tool", tool: {} } }],
  ])("rejects malformed envelopes with a safe error (%#)", (value) => {
    expect(() => parseSample(value)).toThrow("本地样例格式不正确。");
  });
  it("preserves the original event sequence and meaningful content", () => {
    const raw = JSON.parse(
      readFileSync(
        new URL("../../../../public/data/sample.json", import.meta.url),
        "utf8",
      ),
    );
    const parsed = parseSample(raw);
    expect(parsed).toHaveLength(1136);
    expect(parsed.flatMap(adaptSample)).toEqual(raw.flatMap(adaptSample));
  });
  it("ignores unknown event names while retaining valid events and the terminal marker", () => {
    const parsed = parseSample([
      { event: "message", data: { event: "future_event", extra: { x: 1 } } },
      { event: "message", data: { event: "content", content: "正常正文" } },
      { event: "message", data: { raw: "[DONE]" } },
    ]);
    expect(parsed.flatMap(adaptSample)).toEqual([
      { type: "text", delta: "正常正文" },
      { type: "done" },
    ]);
    expect(parseSample([])).toEqual([]);
  });
});
