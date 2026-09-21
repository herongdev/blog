import type { NestExpressApplication } from "@nestjs/platform-express";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp, type AppOptions } from "../../server/app";
import { readRuntimeConfig } from "../../server/common/runtime-config";

const apps: NestExpressApplication[] = [];
afterEach(async () => {
  for (const app of apps.splice(0)) await app.close();
});
async function serve(options: AppOptions) {
  const app = await createApp(options);
  apps.push(app);
  await app.listen(0, "127.0.0.1");
  return app.getUrl();
}
const providerEnv = {
  DEEPSEEK_API_KEY: "test-only-key",
  DEEPSEEK_MODELS: "test-model",
};
const body = {
  provider: "deepseek",
  model: "test-model",
  thinking: false,
  messages: [{ role: "user", content: "test" }],
};
const post = (url: string, signal?: AbortSignal, model = body.model) =>
  fetch(`${url}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, model }),
    signal,
  });

describe("deployment configuration", () => {
  it("fails closed for invalid public configuration without echoing values", () => {
    expect(readRuntimeConfig({}).bindAddress).toBe("127.0.0.1");
    for (const env of [
      { APP_BIND_ADDRESS: "0.0.0.0" },
      { APP_ORIGIN: "https://user:private-password@example.com" },
      { APP_ORIGIN: "https://example.com/path" },
      { APP_ORIGIN: "file:///tmp/test" },
      { APP_MAX_ACTIVE_GENERATIONS: "0" },
      { APP_CHAT_TIMEOUT_MS: "600001" },
      { PORT: "3001oops" },
    ]) {
      expect(() => readRuntimeConfig(env)).toThrow();
      try {
        readRuntimeConfig(env);
      } catch (error) {
        expect(String(error)).not.toContain("private-password");
      }
    }
  });

  it("reports readiness without model calls and matches the exact configured origin", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const url = await serve({
      env: { APP_ORIGIN: "https://chat.example.com:8443" },
      fetcher,
    });
    const health = await fetch(`${url}/api/healthz`);
    expect(await health.json()).toEqual({ status: "ok" });
    expect(health.headers.get("cache-control")).toBe("no-store");
    expect(health.headers.get("x-request-id")).toBeTruthy();
    for (const origin of [
      "https://chat.example.com",
      "http://chat.example.com:8443",
      "https://chat.example.com.evil.test:8443",
      "http://localhost:5173",
      "null",
    ]) {
      expect(
        (await fetch(`${url}/api/providers`, { headers: { Origin: origin } }))
          .status,
      ).toBe(403);
    }
    expect(
      (
        await fetch(`${url}/api/providers`, {
          headers: { Origin: "https://chat.example.com:8443" },
        })
      ).status,
    ).toBe(200);
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe("generation capacity lifecycle", () => {
  it("returns 429 before SSE, aborts upstream on disconnect and releases capacity", async () => {
    let upstreamAborted = false;
    let calls = 0;
    const url = await serve({
      env: { ...providerEnv, APP_MAX_ACTIVE_GENERATIONS: "1" },
      fetcher: (async (_input, options) => {
        if (++calls > 1)
          return new Response("data: [DONE]\n\n", {
            headers: { "Content-Type": "text/event-stream" },
          });
        return new Promise((_resolve, reject) => {
          options!.signal!.addEventListener(
            "abort",
            () => {
              upstreamAborted = true;
              reject(new DOMException("aborted", "AbortError"));
            },
            { once: true },
          );
        });
      }) as typeof fetch,
    });
    const controller = new AbortController();
    const first = await post(url, controller.signal);
    const busy = await post(url);
    expect(busy.status).toBe(429);
    expect(busy.headers.get("content-type")).toContain("application/json");
    expect(busy.headers.get("retry-after")).toBe("1");
    expect(await busy.json()).toEqual({
      error: "当前生成任务较多，请稍后重试。",
    });
    controller.abort();
    await first.body?.cancel().catch(() => {});
    await vi.waitFor(() => expect(upstreamAborted).toBe(true));
    expect(await (await post(url)).text()).toContain('"type":"done"');
    expect(calls).toBe(2);
  });

  it.each(["validation", "upstream", "timeout", "success"])(
    "releases the slot after %s",
    async (scenario) => {
      let calls = 0;
      const url = await serve({
        env: {
          ...providerEnv,
          APP_MAX_ACTIVE_GENERATIONS: "1",
          APP_CHAT_TIMEOUT_MS: "80",
        },
        fetcher: (async (_input, options) => {
          calls++;
          if (calls === 1 && scenario === "upstream")
            return new Response("private upstream details", { status: 500 });
          if (calls === 1 && scenario === "timeout")
            return new Promise((_resolve, reject) => {
              options!.signal!.addEventListener(
                "abort",
                () => reject(new DOMException("aborted", "AbortError")),
                { once: true },
              );
            });
          return new Response("data: [DONE]\n\n", {
            headers: { "Content-Type": "text/event-stream" },
          });
        }) as typeof fetch,
      });
      const first = await post(
        url,
        undefined,
        scenario === "validation" ? "not-configured" : body.model,
      );
      const text = await first.text();
      if (scenario === "validation") expect(first.status).toBe(400);
      if (scenario === "timeout") expect(text).toContain("超时");
      expect(text).not.toContain("private upstream details");
      const second = await post(url);
      expect(second.status).toBe(200);
      expect(await second.text()).toContain('"type":"done"');
    },
  );
});
