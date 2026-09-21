import { afterEach, describe, expect, it } from "vitest";
import type { Server } from "node:http";
import { createApp, type AppOptions } from "../../server/app";
import type { NestExpressApplication } from "@nestjs/platform-express";
import {
  publicProvider,
  getProviders,
} from "../../server/model-providers/providers.config";
import {
  streamUpstream,
  upstreamBody,
} from "../../server/model-providers/upstream";
import { CHAT_SYSTEM_PROMPT } from "../../server/chat/chat.policy";
import type { ChatRequest } from "../../shared/contracts/chat";

const env = {
  DEEPSEEK_API_KEY: "test-only-key",
  DEEPSEEK_MODELS: "test-model",
};
const config = getProviders(env).find((p) => p.id === "deepseek")!;
const request: ChatRequest = {
  provider: "deepseek",
  model: "test-model",
  thinking: true,
  messages: [{ role: "user", content: "你好" }],
};
const sseResponse = (text: string) =>
  new Response(text, { headers: { "Content-Type": "text/event-stream" } });
const apps: NestExpressApplication[] = [];
afterEach(async () => {
  for (const app of apps.splice(0)) await app.close();
});
async function serve(
  fetcher?: typeof fetch,
  options: Partial<AppOptions> = {},
) {
  const app = await createApp({ env, fetcher, ...options });
  apps.push(app);
  await app.listen(0, "127.0.0.1");
  const server: Server = app.getHttpServer();
  const address = server.address();
  return `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;
}

describe("provider adapters", () => {
  it("exposes capability metadata without keys or base URLs", () => {
    expect(JSON.stringify(publicProvider(config))).not.toContain(
      "test-only-key",
    );
    expect(publicProvider(config)).not.toHaveProperty("baseUrl");
  });
  it("sets each vendor thinking parameter and preserves history", () => {
    expect(
      upstreamBody(
        { ...request, model: "deepseek-v4-flash" },
        CHAT_SYSTEM_PROMPT,
      ),
    ).toMatchObject({
      stream: true,
      thinking: { type: "enabled" },
    });
    expect(
      upstreamBody(
        { ...request, provider: "aliyun", model: "qwen-plus", thinking: false },
        CHAT_SYSTEM_PROMPT,
      ),
    ).toMatchObject({ enable_thinking: false });
    expect(upstreamBody(request, CHAT_SYSTEM_PROMPT).messages.at(-1)).toEqual(
      request.messages[0],
    );
  });
  it("adapts reasoning and answer deltas independently", async () => {
    const fetcher = (async (_url, options) => {
      expect((options?.headers as Record<string, string>).Authorization).toBe(
        "Bearer test-only-key",
      );
      return sseResponse(
        'data: {"choices":[{"delta":{"reasoning_content":"思考","content":"答案"}}]}\n\ndata: [DONE]\n\n',
      );
    }) as typeof fetch;
    const events = [];
    for await (const event of streamUpstream(
      config,
      request,
      CHAT_SYSTEM_PROMPT,
      new AbortController().signal,
      fetcher,
    ))
      events.push(event);
    expect(events).toEqual([
      { type: "reasoning", id: "reasoning-0", delta: "思考" },
      { type: "text", delta: "答案" },
      { type: "done" },
    ]);
  });
  it("does not treat an abruptly closed upstream as success", async () => {
    const run = async () => {
      for await (const event of streamUpstream(
        config,
        request,
        CHAT_SYSTEM_PROMPT,
        new AbortController().signal,
        (async () =>
          sseResponse(
            'data: {"choices":[{"delta":{"content":"半句话"}}]}\n\n',
          )) as typeof fetch,
      ))
        void event;
    };
    await expect(run()).rejects.toThrow("中断");
  });
});

describe("local API boundary", () => {
  it("sends images through both providers as image_url parts and rejects non-vision models before SSE", async () => {
    const image = "data:image/png;base64,iVBORw0KGgo=";
    let calls = 0;
    const url = await serve(
      (async (_url, options) => {
        calls++;
        const body = JSON.parse(String(options?.body));
        expect(body.messages.at(-1)).toEqual({
          role: "user",
          content: [
            { type: "text", text: "分析图表" },
            { type: "image_url", image_url: { url: image } },
          ],
        });
        expect(body.messages.at(-1)).not.toHaveProperty("images");
        return sseResponse("data: [DONE]\n\n");
      }) as typeof fetch,
      {
        env: {
          DEEPSEEK_API_KEY: "test-only-key",
          DEEPSEEK_MODELS: "test-model,deepseek-v4-flash-vision-exp",
          DASHSCOPE_API_KEY: "test-only-key",
          DASHSCOPE_MODELS: "qwen3-vl-plus",
        },
      },
    );
    for (const [provider, model] of [
      ["deepseek", "deepseek-v4-flash-vision-exp"],
      ["aliyun", "qwen3-vl-plus"],
      ["deepseek", "test-model"],
    ]) {
      const response = await fetch(`${url}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          model,
          thinking: false,
          messages: [{ role: "user", content: "分析图表", images: [image] }],
        }),
      });
      expect(response.status).toBe(model === "test-model" ? 400 : 200);
      const body = await response.text();
      if (model === "test-model") expect(body).toContain("不支持图片");
      else expect(body).toContain('"type":"done"');
    }
    expect(calls).toBe(2);
  });

  it("delivers a successful upstream answer through the Nest SSE endpoint", async () => {
    const url = await serve((async () =>
      sseResponse(
        'data: {"choices":[{"delta":{"reasoning_content":"先分析"}}]}\n\ndata: {"choices":[{"delta":{"content":"回答"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n',
      )) as typeof fetch);
    const response = await fetch(`${url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    expect(response.headers.get("content-type")).toContain("text/event-stream");
    const body = await response.text();
    const events = body
      .trim()
      .split("\n\n")
      .map((line) => JSON.parse(line.slice(6)));
    expect(events).toEqual([
      { type: "reasoning", id: "reasoning-0", delta: "先分析" },
      { type: "text", delta: "回答" },
      { type: "done" },
    ]);
  });
  it("rejects missing keys, unconfigured models, external origins and malformed messages before upstream requests", async () => {
    const url = await serve((async () => {
      throw new Error("should not call upstream");
    }) as typeof fetch);
    const post = (body: unknown, origin?: string) =>
      fetch(`${url}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(origin ? { Origin: origin } : {}),
        },
        body: JSON.stringify(body),
      });
    expect((await post({ ...request, provider: "aliyun" })).status).toBe(503);
    expect((await post({ ...request, model: "arbitrary" })).status).toBe(400);
    expect((await post(request, "https://outside.example")).status).toBe(403);
    expect((await post({ ...request, messages: [] })).status).toBe(400);
    const metadata = await (await fetch(`${url}/api/providers`)).text();
    expect(metadata).not.toContain("test-only-key");
  });
  it("streams through the actual Nest route without echoing upstream secrets in errors", async () => {
    const url = await serve(
      (async () =>
        new Response("secret provider body test-only-key", {
          status: 401,
        })) as typeof fetch,
    );
    const response = await fetch(`${url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const text = await response.text();
    expect(text).toContain("API Key");
    expect(text).not.toContain("test-only-key");
    expect(text).not.toContain("secret provider body");
  });
  it("keeps validation errors as JSON and rejects oversized or malformed bodies before streaming", async () => {
    let calls = 0;
    const url = await serve((async () => {
      calls++;
      throw new Error("must not call upstream");
    }) as typeof fetch);
    for (const [body, status] of [
      ['{"private-input": sensitive-invalid-json}', 400],
      [JSON.stringify({ ...request, extra: "private-input" }), 400],
      [
        JSON.stringify({
          ...request,
          messages: [{ role: "assistant", content: "private-input" }],
        }),
        400,
      ],
      [JSON.stringify({ text: "x".repeat(20 * 1_048_576) }), 413],
    ] as const) {
      const response = await fetch(`${url}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      expect(response.status).toBe(status);
      expect(response.headers.get("content-type")).toContain(
        "application/json",
      );
      const payload = await response.json();
      expect(Object.keys(payload)).toEqual(["error"]);
      expect(payload.error).not.toContain("private-input");
      expect(payload.error).not.toContain("sensitive-invalid-json");
    }
    expect(calls).toBe(0);
  });
  it("cancels upstream on timeout and sends one terminal error without a done event", async () => {
    let upstreamSignal: AbortSignal | null | undefined;
    const url = await serve(
      (async (_url, options) => {
        upstreamSignal = options?.signal;
        return new Promise<Response>((_resolve, reject) => {
          upstreamSignal?.addEventListener(
            "abort",
            () => reject(new DOMException("Aborted", "AbortError")),
            { once: true },
          );
        });
      }) as typeof fetch,
      { chatTimeoutMs: 30 },
    );
    const response = await fetch(`${url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const events = (await response.text())
      .trim()
      .split("\n\n")
      .map((line) => JSON.parse(line.slice(6)));
    expect(response.status).toBe(200);
    expect(upstreamSignal?.aborted).toBe(true);
    expect(events).toEqual([
      { type: "error", message: "等待模型响应超时，请稍后重试。" },
    ]);
  });
  it("does not send unexpected exception details to the browser", async () => {
    const url = await serve((async () => {
      throw new Error("private provider exception test-only-key");
    }) as typeof fetch);
    const response = await fetch(`${url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    expect(await response.text()).toBe(
      'data: {"type":"error","message":"生成失败，请稍后重试。"}\n\n',
    );
  });
  it("isolates provider configuration between Nest application instances", async () => {
    const configured = await serve();
    const isolated = await serve(undefined, { env: {} });
    const first = await (await fetch(`${configured}/api/providers`)).json();
    const second = await (await fetch(`${isolated}/api/providers`)).json();
    expect(
      first.providers.find(
        (provider: { id: string }) => provider.id === "deepseek",
      ).configured,
    ).toBe(true);
    expect(
      second.providers.find(
        (provider: { id: string }) => provider.id === "deepseek",
      ).configured,
    ).toBe(false);
    expect(
      await (await fetch(`${isolated}/api/missing`)).json(),
    ).toHaveProperty("error");
  });
  it("cancels an active upstream request when the Nest application closes", async () => {
    let aborted!: () => void;
    const cancellation = new Promise<void>((resolve) => {
      aborted = resolve;
    });
    const url = await serve((async (_url, options) => {
      return new Promise<Response>((_resolve, reject) => {
        options?.signal?.addEventListener(
          "abort",
          () => {
            aborted();
            reject(new DOMException("Aborted", "AbortError"));
          },
          { once: true },
        );
      });
    }) as typeof fetch);
    const response = await fetch(`${url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const closed = response.text().catch(() => "closed");
    await apps.pop()!.close();
    await cancellation;
    await closed;
  });
  // Express observes connection closure; a browser AbortSignal is not a wire protocol.
  // https://github.com/vercel/ai/issues/8720 (closed as invalid, not an SDK fix)
  it("[OSS-API-001] aborts upstream when the browser cancels a streaming response", async () => {
    let aborted!: () => void;
    const cancellation = new Promise<void>((resolve) => {
      aborted = resolve;
    });
    const url = await serve((async (_url, options) => {
      options?.signal?.addEventListener("abort", aborted, { once: true });
      return new Promise<Response>((_resolve, reject) =>
        options?.signal?.addEventListener(
          "abort",
          () => reject(new DOMException("Aborted", "AbortError")),
          { once: true },
        ),
      );
    }) as typeof fetch);
    const controller = new AbortController();
    const response = await fetch(`${url}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    expect(response.ok).toBe(true);
    controller.abort();
    await cancellation;
  });
});
