import { afterEach, describe, expect, it, vi } from "vitest";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { createApp, type AppOptions } from "../../server/app";
import type { ApiRequestLog } from "../../server/http/request-diagnostics";
import { ChatService } from "../../server/chat/chat.service";
import type { ChatRequest } from "../../shared/contracts/chat";

const request: ChatRequest = {
  provider: "deepseek",
  model: "test-model",
  thinking: true,
  messages: [{ role: "user", content: "private-question" }],
};
const apps: NestExpressApplication[] = [];
afterEach(async () => {
  for (const app of apps.splice(0)) await app.close();
});
async function serve(options: Partial<AppOptions> = {}) {
  const entries: ApiRequestLog[] = [];
  const app = await createApp({
    env: {
      DEEPSEEK_API_KEY: "private-test-key",
      DEEPSEEK_MODELS: "test-model",
    },
    fetcher: async () => {
      throw new Error("Unexpected external request");
    },
    requestLogger: (entry) => entries.push(entry),
    ...options,
  });
  apps.push(app);
  await app.listen(0, "127.0.0.1");
  const url = await app.getUrl();
  return {
    app,
    url,
    entries,
    post: (body: unknown = request) =>
      fetch(`${url}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
  };
}
const sse = (body: string) =>
  new Response(body, { headers: { "Content-Type": "text/event-stream" } });
const answer =
  'data: {"choices":[{"delta":{"content":"private-answer"}}]}\n\ndata: [DONE]\n\n';

describe("request diagnostics across the actual Nest connection", () => {
  it.each([
    { name: "completed", response: () => sse(answer), firstText: true },
    {
      name: "empty",
      response: () =>
        sse(
          'data: {"choices":[{"delta":{"reasoning_content":"private-thought","content":"  "}}]}\n\ndata: [DONE]\n\n',
        ),
      firstText: false,
    },
    {
      name: "upstream_error",
      response: () => new Response("private-provider-error", { status: 401 }),
      firstText: false,
    },
  ] as const)(
    "records $name independently of SSE HTTP 200, without private content",
    async ({ name, response: upstreamResponse, firstText }) => {
      const { entries, post } = await serve({
        fetcher: async () => upstreamResponse(),
      });
      const response = await post();
      await response.text();
      await vi.waitFor(() => expect(entries).toHaveLength(1));
      expect(entries[0]).toMatchObject({
        event: "api_request",
        requestId: response.headers.get("x-request-id"),
        route: "/api/chat",
        method: "POST",
        statusCode: 200,
        outcome: name,
        provider: "deepseek",
        model: "test-model",
        thinking: true,
        messageCount: 1,
        imageCount: 0,
        imageBytes: 0,
        textBytes: Buffer.byteLength("private-question"),
        upstreamStatus: name === "upstream_error" ? 401 : 200,
      });
      expect(entries[0].requestId).toMatch(
        /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/,
      );
      expect(entries[0].acceptedMs).toBeGreaterThanOrEqual(0);
      expect(entries[0].upstreamHeadersMs).toBeGreaterThanOrEqual(
        entries[0].acceptedMs!,
      );
      expect(entries[0].durationMs).toBeGreaterThanOrEqual(
        entries[0].upstreamHeadersMs!,
      );
      if (name !== "upstream_error")
        expect(entries[0].firstActivityMs).toBeGreaterThanOrEqual(
          entries[0].upstreamHeadersMs!,
        );
      if (firstText) {
        expect(entries[0].firstTextMs).toBeGreaterThanOrEqual(0);
        expect(entries[0].firstTextMs).toBeLessThanOrEqual(
          entries[0].durationMs,
        );
      } else expect(entries[0]).not.toHaveProperty("firstTextMs");
      expect(JSON.stringify(entries)).not.toContain("private-");
      expect(Object.keys(entries[0]).sort()).toEqual(
        [
          "event",
          "at",
          "requestId",
          "method",
          "route",
          "statusCode",
          "outcome",
          "durationMs",
          "acceptedMs",
          "upstreamHeadersMs",
          "upstreamStatus",
          "provider",
          "model",
          "thinking",
          "messageCount",
          "imageCount",
          "imageBytes",
          "textBytes",
          ...(name !== "upstream_error" ? ["firstActivityMs"] : []),
          ...(firstText ? ["firstTextMs"] : []),
        ].sort(),
      );
    },
  );

  it("assigns independent IDs before parsing, rejects caller IDs and redacts arbitrary paths/queries", async () => {
    const { entries, url, post } = await serve();
    const responses = await Promise.all([
      post({ privateBody: "private-content" }),
      post({ ...request, model: "private-unconfigured-model" }),
      fetch(`${url}/api/chat?secret=private-query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": "private-caller-id",
        },
        body: "{private-json",
      }),
      fetch(`${url}/api/private-path?secret=private-query`),
      fetch(`${url}/api/providers`, {
        headers: { Origin: "https://private-outside.example" },
      }),
    ]);
    await Promise.all(responses.map((response) => response.text()));
    await vi.waitFor(() => expect(entries).toHaveLength(5));
    const ids = responses.map((response) =>
      response.headers.get("x-request-id"),
    );
    expect(new Set(ids).size).toBe(5);
    for (const response of responses) {
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(
        entries.find(
          (entry) => entry.requestId === response.headers.get("x-request-id"),
        ),
      ).toMatchObject({ outcome: "rejected", statusCode: response.status });
    }
    expect(entries.some((entry) => entry.route === "/api/other")).toBe(true);
    expect(JSON.stringify(entries)).not.toContain("private-");
  });

  it("records timeout once and aborts upstream; receiving headers alone is not first text", async () => {
    let signal: AbortSignal | null | undefined;
    const { entries, post } = await serve({
      chatTimeoutMs: 30,
      fetcher: async (_url, options) => {
        signal = options?.signal;
        return new Promise<Response>((_resolve, reject) =>
          signal?.addEventListener(
            "abort",
            () => reject(new Error("private-abort")),
            { once: true },
          ),
        );
      },
    });
    const response = await post();
    expect(await response.text()).toContain("超时");
    await vi.waitFor(() => expect(entries).toHaveLength(1));
    expect(signal?.aborted).toBe(true);
    expect(entries[0]).toMatchObject({ statusCode: 200, outcome: "timeout" });
    expect(entries[0]).not.toHaveProperty("firstTextMs");
  });

  it("records disconnect once and cancels upstream when the client leaves", async () => {
    let signal: AbortSignal | null | undefined;
    const { entries, post } = await serve({
      fetcher: async (_url, options) => {
        signal = options?.signal;
        return new Promise<Response>((_resolve, reject) =>
          signal?.addEventListener(
            "abort",
            () => reject(new Error("private-abort")),
            { once: true },
          ),
        );
      },
    });
    const response = await post();
    await response.body?.cancel();
    await vi.waitFor(() => {
      expect(signal?.aborted).toBe(true);
      expect(entries).toHaveLength(1);
    });
    expect(entries[0]).toMatchObject({
      requestId: response.headers.get("x-request-id"),
      statusCode: 200,
      outcome: "disconnected",
    });
  });

  it("does not report a silently exhausted adapter as successful completion", async () => {
    const { app, entries, post } = await serve();
    vi.spyOn(app.get(ChatService), "stream").mockImplementation(
      async function* () {
        yield { type: "text", delta: "partial" };
      },
    );
    const response = await post();
    const body = await response.text();
    expect(body).toContain("partial");
    expect(body).toContain('"type":"error"');
    expect(body).not.toContain('"type":"done"');
    await vi.waitFor(() => expect(entries).toHaveLength(1));
    expect(entries[0].outcome).toBe("incomplete");
  });

  it("keeps the API usable when the injected log writer throws", async () => {
    const logger = vi.fn(() => {
      throw new Error("private-sink-failure");
    });
    const { url } = await serve({ requestLogger: logger });
    const response = await fetch(`${url}/api/providers`);
    expect(response.status).toBe(200);
    expect(await response.text()).not.toContain("private-");
    await vi.waitFor(() => expect(logger).toHaveBeenCalledOnce());
  });
});

it("keeps three-round visual context and logs sizes without image data", async () => {
  const image = "data:image/png;base64,iVBORw0KGgo=";
  const fetcher = vi.fn(async () => sse(answer));
  const { entries, post } = await serve({
    env: {
      DASHSCOPE_API_KEY: "private-test-key",
      DASHSCOPE_MODELS: "qwen3-vl-plus",
    },
    fetcher,
  });
  const messages: ChatRequest["messages"] = [];
  for (let turn = 0; turn < 3; turn++) {
    messages.push({
      role: "user",
      content: `private-question-${turn}`,
      ...(turn === 0 ? { images: [image] } : {}),
    });
    const response = await post({
      provider: "aliyun",
      model: "qwen3-vl-plus",
      thinking: false,
      messages,
    });
    expect(response.status).toBe(200);
    expect(await response.text()).toContain('"type":"done"');
    messages.push({ role: "assistant", content: "private-answer" });
  }
  await vi.waitFor(() => expect(entries).toHaveLength(3));
  for (let turn = 0; turn < 3; turn++) {
    expect(entries[turn]).toMatchObject({
      provider: "aliyun",
      model: "qwen3-vl-plus",
      thinking: false,
      messageCount: turn * 2 + 1,
      imageCount: 1,
      imageBytes: image.length,
      outcome: "completed",
    });
  }
  // Inspect the mock call, never contact a real provider.
  const calls = fetcher.mock.calls as unknown as [unknown, RequestInit][];
  const body = JSON.parse(calls[2][1].body as string);
  expect(body.enable_thinking).toBe(false);
  expect(JSON.stringify(body.messages)).toContain(image);
  expect(JSON.stringify(entries)).not.toContain(image);
  expect(JSON.stringify(entries)).not.toContain("private-");
});
