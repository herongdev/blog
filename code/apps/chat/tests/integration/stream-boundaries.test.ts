import { afterEach, describe, expect, it, vi } from "vitest";
import { readSSE } from "../../shared/transport/sse";
import { parseChatEvent } from "../../shared/contracts/chatEventSchema";
import {
  streamAPI,
  requestHeadersTimeoutMs,
} from "../../src/features/chat/services/remoteChat";
import type { ChatRequest } from "../../shared/contracts/chat";

const encoder = new TextEncoder();
function byteStream(input: string) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const byte of encoder.encode(input))
        controller.enqueue(Uint8Array.of(byte));
      controller.close();
    },
  });
}
async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  const values: T[] = [];
  for await (const value of source) values.push(value);
  return values;
}

describe("SSE protocol boundaries", () => {
  // https://github.com/rexxars/eventsource-parser/issues/17
  it.each([false, true])(
    "[OSS-SSE-001] CR 后的 LF 独立到达=%s 时，多行数据仍是一个事件",
    async (splitCRLF) => {
      const chunks = [
        "data: 甲\r\n",
        "data: 乙\r",
        ...(splitCRLF ? ["\n"] : []),
        "data: 丙\r\n",
        "\n",
      ];
      const body = new ReadableStream<Uint8Array>({
        start(controller) {
          for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
          controller.close();
        },
      });
      expect(await collect(readSSE(body))).toEqual(["甲\n乙\n丙"]);
    },
  );

  it("accepts BOM and CR-only lines even when every byte arrives separately", async () => {
    expect(
      await collect(
        readSSE(byteStream("\uFEFF: 心跳\rdata: 中文\rdata: 二\r\rdata:\r\r")),
      ),
    ).toEqual(["中文\n二", ""]);
  });

  // #18 was closed as spec-compliant: never invent a delimiter at EOF.
  // https://github.com/rexxars/eventsource-parser/issues/18
  it("[OSS-SSE-002] dispatches complete events only; EOF does not complete an unfinished event", async () => {
    const input = 'data: first\n\ndata: {"type":"done"}\n';
    expect(await collect(readSSE(byteStream(input)))).toEqual(["first"]);
  });

  it("ignores optional unknown fields and retry metadata without replaying the POST", async () => {
    const input = "future-field: 1\nid: abc\nretry: 1000\ndata: answer\n\n";
    expect(await collect(readSSE(byteStream(input)))).toEqual(["answer"]);
  });

  it("limits an unfinished event spanning many small data lines", async () => {
    await expect(
      collect(
        readSSE(byteStream("data: 123456789\n".repeat(20)), {
          maxBufferSize: 32,
        }),
      ),
    ).rejects.toThrow("缓冲超过限制");
  });

  it("cancels the source when the consumer leaves after a terminal event", async () => {
    const cancel = vi.fn();
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("data: done\n\n"));
      },
      cancel,
    });
    for await (const value of readSSE(body)) {
      expect(value).toBe("done");
      break;
    }
    await vi.waitFor(() => expect(cancel).toHaveBeenCalledOnce());
  });
});

describe("network event validation", () => {
  it.each([
    "null",
    "[]",
    '{"type":"text","delta":7}',
    '{"type":"references","items":[{"id":"1"}]}',
    '{"type":"unknown"}',
  ])("rejects invalid event %s before the reducer", (input) => {
    expect(() => parseChatEvent(input)).toThrow("格式不符合约定");
  });

  it("does not echo a malformed response into the error shown to the reader", () => {
    expect(() => parseChatEvent("private-upstream-body")).toThrow(
      "收到无法解析的消息数据",
    );
  });
});

const request: ChatRequest = {
  provider: "deepseek",
  model: "test-model",
  thinking: false,
  messages: [{ role: "user", content: "测试" }],
};
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
describe("browser transport", () => {
  it.each([
    {
      body: '{"error":"配置失效"}',
      status: 503,
      contentType: "application/json",
      message: "配置失效",
    },
    {
      body: "data: invalid-json\n\n",
      status: 200,
      contentType: "text/event-stream",
      message: "无法解析",
    },
    {
      body: 'data: {"type":"text","delta":"部分答案"}\n\n',
      status: 200,
      contentType: "text/event-stream",
      message: "中断",
    },
  ])(
    "keeps response correlation before a $message failure",
    async ({ body, status, contentType, message }) => {
      const requestId = "cd46aacb-714d-4b79-a061-c99d99dbe184";
      vi.stubGlobal(
        "fetch",
        vi.fn(
          async () =>
            new Response(body, {
              status,
              headers: {
                "Content-Type": contentType,
                "X-Request-Id": requestId,
              },
            }),
        ),
      );
      const stream = streamAPI(request, new AbortController().signal);
      expect((await stream.next()).value).toEqual({
        type: "metadata",
        requestId,
        ...(status === 200 ? { requestStage: "waiting" } : {}),
      });
      await expect(collect(stream)).rejects.toThrow(message);
    },
  );

  it("ignores malformed diagnostic IDs rather than showing arbitrary header text", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response('data: {"type":"done"}\n\n', {
            headers: {
              "Content-Type": "text/event-stream",
              "X-Request-Id": "private-invalid-header",
            },
          }),
      ),
    );
    expect(
      await collect(streamAPI(request, new AbortController().signal)),
    ).toEqual([
      { type: "metadata", requestStage: "waiting" },
      { type: "done" },
    ]);
  });

  it("cancels the response body if the consumer stops immediately after request metadata", async () => {
    const cancel = vi.fn();
    const body = new ReadableStream<Uint8Array>({ cancel });
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(body, {
            headers: {
              "Content-Type": "text/event-stream",
              "X-Request-Id": "cd46aacb-714d-4b79-a061-c99d99dbe184",
            },
          }),
      ),
    );
    const stream = streamAPI(request, new AbortController().signal);
    await stream.next();
    await stream.return(undefined);
    expect(cancel).toHaveBeenCalledOnce();
  });
  // AI #9579 reports a different gateway/stream-lock problem. These are adapted
  // malformed-error cases for our own transport, not reproductions of its root cause.
  it("[APP-NET-001] 非标准 HTTP 错误体仍给出稳定提示，不显示 TypeError 或对象字符串", async () => {
    for (const body of [
      "null",
      "[]",
      '{"error":{"message":"private-detail"}}',
      "<html>proxy</html>",
    ]) {
      vi.stubGlobal(
        "fetch",
        vi.fn(async () => new Response(body, { status: 502 })),
      );
      await expect(
        collect(streamAPI(request, new AbortController().signal)),
      ).rejects.toThrow("无法连接本地服务，请稍后重试。");
    }
  });
  it("rejects HTTP 200 HTML instead of silently treating it as a chat response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response("<html>proxy</html>", {
            headers: { "Content-Type": "text/html" },
          }),
      ),
    );
    await expect(
      collect(streamAPI(request, new AbortController().signal)),
    ).rejects.toThrow("没有返回流式消息");
  });

  it("preserves received content but reports a disconnect without a completed done frame", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            'data: {"type":"text","delta":"半句话"}\n\ndata: {"type":"done"}\n',
            { headers: { "Content-Type": "text/event-stream" } },
          ),
      ),
    );
    const stream = streamAPI(request, new AbortController().signal);
    expect((await stream.next()).value).toEqual({
      type: "metadata",
      requestStage: "waiting",
    });
    expect((await stream.next()).value).toEqual({
      type: "text",
      delta: "半句话",
    });
    await expect(stream.next()).rejects.toThrow("中断");
  });
});

describe("request header deadline", () => {
  it.each(["timeout", "stop"])(
    "aborts a stalled upload on %s without retrying",
    async (cause) => {
      vi.useFakeTimers();
      let transportSignal: AbortSignal | undefined;
      const fetcher = vi.fn((_url: string, options: RequestInit) => {
        transportSignal = options.signal as AbortSignal;
        return new Promise<Response>((_resolve, reject) => {
          transportSignal!.addEventListener(
            "abort",
            () => reject(transportSignal!.reason),
            { once: true },
          );
        });
      });
      vi.stubGlobal("fetch", fetcher);
      const caller = new AbortController();
      const remove = vi.spyOn(caller.signal, "removeEventListener");
      const result = collect(streamAPI(request, caller.signal)).catch(
        (error) => error as Error,
      );
      await vi.waitFor(() => expect(fetcher).toHaveBeenCalledOnce());
      if (cause === "stop") caller.abort();
      else await vi.advanceTimersByTimeAsync(requestHeadersTimeoutMs);
      const error = await result;
      expect(error).toBeInstanceOf(Error);
      if (cause === "timeout")
        expect((error as Error).message).toContain("发送请求超时");
      else expect((error as Error).name).toBe("AbortError");
      expect(transportSignal?.aborted).toBe(true);
      expect(remove).toHaveBeenCalledWith("abort", expect.any(Function));
      expect(vi.getTimerCount()).toBe(0);
      expect(fetcher).toHaveBeenCalledOnce();
    },
  );

  it("ends the upload deadline at headers and still forwards an explicit stop", async () => {
    vi.useFakeTimers();
    let transportSignal: AbortSignal | undefined;
    const cancel = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, options: RequestInit) => {
        transportSignal = options.signal as AbortSignal;
        return new Response(new ReadableStream({ cancel }), {
          headers: { "Content-Type": "text/event-stream" },
        });
      }),
    );
    const caller = new AbortController();
    const stream = streamAPI(request, caller.signal);
    expect((await stream.next()).value).toEqual({
      type: "metadata",
      requestStage: "waiting",
    });
    await vi.advanceTimersByTimeAsync(requestHeadersTimeoutMs + 1);
    expect(transportSignal?.aborted).toBe(false);
    caller.abort();
    expect(transportSignal?.aborted).toBe(true);
    await stream.return(undefined);
    expect(cancel).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });
});
