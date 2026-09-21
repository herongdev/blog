import { describe, expect, it, vi } from "vitest";
import { streamUpstream } from "../../server/model-providers/upstream";
import { getProviders } from "../../server/model-providers/providers.config";
import { CHAT_SYSTEM_PROMPT } from "../../server/chat/chat.policy";
import { applyEvent } from "../../src/features/chat/state/chatReducer";
import type { ChatEvent, ChatRequest } from "../../shared/contracts/chat";
import type { ChatMessage } from "../../src/features/chat/types";

const config = getProviders({
  DEEPSEEK_API_KEY: "fake-test-key",
  DEEPSEEK_MODELS: "test-model",
}).find((p) => p.id === "deepseek")!;
const request: ChatRequest = {
  provider: "deepseek",
  model: "test-model",
  thinking: true,
  messages: [{ role: "user", content: "测试" }],
};
const message = (): ChatMessage => ({
  id: "a",
  role: "assistant",
  content: "",
  activities: [],
  references: {},
  status: "waiting",
  createdAt: 0,
});
function stream(response: Response) {
  return streamUpstream(
    config,
    request,
    CHAT_SYSTEM_PROMPT,
    new AbortController().signal,
    (async () => response) as typeof fetch,
  );
}
const sse = (...chunks: unknown[]) =>
  new Response(
    chunks
      .map(
        (chunk) =>
          `data: ${typeof chunk === "string" ? chunk : JSON.stringify(chunk)}\n\n`,
      )
      .join(""),
    { headers: { "Content-Type": "text/event-stream" } },
  );
async function collect(source: AsyncIterable<ChatEvent>) {
  const events: ChatEvent[] = [];
  for await (const event of source) events.push(event);
  return events;
}

describe("供应商边界：基于 issue 的兼容与错误矩阵", () => {
  it("[OSS-API-002] 空 tool_calls 不拆碎思考，空控制帧和 usage 帧不生成正文（AI #20203）", async () => {
    const events = await collect(
      stream(
        sse(
          { choices: [{ delta: { role: "assistant" } }] },
          {
            choices: [
              {
                delta: {
                  reasoning_content: "先分析",
                  content: "",
                  tool_calls: [],
                },
              },
            ],
          },
          {
            choices: [
              { delta: { reasoning_content: "再核对", tool_calls: [] } },
            ],
          },
          { choices: [{ delta: { content: "答案", tool_calls: [] } }] },
          { choices: [], usage: { total_tokens: 12 } },
          "[DONE]",
        ),
      ),
    );
    const result = events.reduce((m, e) => applyEvent(m, e, 1), message());
    expect(result).toMatchObject({
      content: "答案",
      status: "complete",
      activities: [
        { id: "reasoning-0", content: "先分析再核对", status: "complete" },
      ],
    });
    expect(result.activities).toHaveLength(1);
  });

  it.each([
    [401, "API Key"],
    [403, "权限"],
    [402, "余额"],
    [429, "额度受限"],
    [400, "配置不可用"],
    [404, "配置不可用"],
    [503, "HTTP 503"],
  ] as const)(
    "[APP-API-001] HTTP %i 有可操作提示并取消响应体（错误格式风险迁移）",
    async (status, hint) => {
      const cancel = vi.fn();
      const body = new ReadableStream<Uint8Array>({ cancel });
      await expect(
        collect(stream(new Response(body, { status }))),
      ).rejects.toThrow(hint);
      expect(cancel).toHaveBeenCalledOnce();
    },
  );

  it.each([
    ["length", "输出上限"],
    ["content_filter", "调整问题"],
    ["tool_calls", "尚未配置工具"],
  ])(
    "[APP-API-002] finish_reason=%s 保留部分文本，不能伪装正常完成",
    async (reason, hint) => {
      const source = stream(
        sse(
          {
            choices: [
              { delta: { content: "已经收到的正文" }, finish_reason: reason },
            ],
          },
          "[DONE]",
        ),
      );
      expect((await source.next()).value).toEqual({
        type: "text",
        delta: "已经收到的正文",
      });
      await expect(source.next()).rejects.toThrow(hint);
    },
  );

  it("[APP-API-003] 流内 error 与破损 JSON 不能回显上游详情", async () => {
    for (const response of [
      sse({ error: { message: "private-provider-detail" } }),
      sse("private-provider-detail"),
    ]) {
      const error = await collect(stream(response)).catch(
        (value) => value as Error,
      );
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).not.toContain("private-provider-detail");
    }
  });
  it("[OSS-RUN-004] DONE 后重复结束或迟到正文不累加，合法重复 token 应保留（NextChat #4966，迁移场景）", async () => {
    const delta = { choices: [{ delta: { content: "哈" } }] };
    const events = await collect(
      stream(
        sse(delta, delta, "[DONE]", "[DONE]", {
          choices: [{ delta: { content: "迟到" } }],
        }),
      ),
    );
    expect(events).toEqual([
      { type: "text", delta: "哈" },
      { type: "text", delta: "哈" },
      { type: "done" },
    ]);
  });
});

describe("状态交叉组合（项目派生；不是声称上游同实现）", () => {
  it("[APP-STATE-001] 思考、工具快照、正文交错时活动顺序与状态正确（AI #10755 启发）", () => {
    const events: ChatEvent[] = [
      { type: "reasoning", id: "r1", delta: "第一轮" },
      {
        type: "tool",
        id: "t1",
        title: "检索",
        content: "检索中",
        status: "running",
      },
      {
        type: "tool",
        id: "t1",
        title: "检索",
        content: "找到来源",
        status: "complete",
      },
      { type: "reasoning", id: "r2", delta: "第二轮" },
      { type: "text", delta: "答案" },
    ];
    const result = events.reduce((m, e) => applyEvent(m, e, 1), message());
    expect(result.activities.map((a) => [a.id, a.content, a.status])).toEqual([
      ["r1", "第一轮", "complete"],
      ["t1", "找到来源", "complete"],
      ["r2", "第二轮", "complete"],
    ]);
  });
  it.each(["complete", "stopped", "error", "empty"] as const)(
    "[APP-STATE-002] 终态 %s 拒收所有事件种类",
    (status) => {
      const previous = { ...message(), status };
      const events: ChatEvent[] = [
        { type: "text", delta: "晚到" },
        { type: "reasoning", id: "r", delta: "晚到" },
        {
          type: "tool",
          id: "t",
          title: "晚到",
          content: "晚到",
          status: "running",
        },
        {
          type: "references",
          items: [
            {
              id: "1_0",
              title: "晚到",
              content: "晚到",
              link: "https://example.com",
            },
          ],
        },
        { type: "metadata", recordId: "晚到", sourceDurationMs: 999 },
        { type: "error", message: "晚到" },
        { type: "done" },
      ];
      for (const event of events)
        expect(applyEvent(previous, event, 2)).toBe(previous);
    },
  );
});
