import { chooseProvider } from "./fixtures";
import type { Page } from "@playwright/test";
import type {
  ChatEvent,
  ChatRequest,
  ProviderInfo,
} from "../../shared/contracts/chat";
import { expect } from "./fixtures";

interface RequestRun {
  requestId: string;
  body: ChatRequest;
  aborted: boolean;
  cancelled: boolean;
  push: (events: ChatEvent[]) => void;
  end: () => void;
}
declare global {
  interface Window {
    __chatRuns: RequestRun[];
  }
}

/** Mock only the transport, exercising the production controller/reducer/renderer.
 * Deliberately permit delivery after abort to verify stale-run isolation.
 * No test endpoints or controls are added to the application.
 */
export async function controlledChat(
  page: Page,
  models = ["test-a", "test-b"],
  initialize = true,
) {
  const providers: ProviderInfo[] = [
    { id: "local", name: "本地样例", configured: true, models: ["sample"] },
    {
      id: "deepseek",
      name: "DeepSeek",
      configured: true,
      models,
    },
    {
      id: "aliyun",
      name: "阿里云百炼",
      configured: true,
      models: ["qwen-test"],
    },
  ];
  await page.route("**/api/providers", (route) =>
    route.fulfill({ json: { providers } }),
  );
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.__chatRuns = [];
    window.fetch = async (input, init) => {
      if (String(input) !== "/api/chat") return originalFetch(input, init);
      const encoder = new TextEncoder();
      let controller!: ReadableStreamDefaultController<Uint8Array>;
      const run: RequestRun = {
        requestId: crypto.randomUUID(),
        body: JSON.parse(String(init?.body)),
        aborted: init?.signal?.aborted ?? false,
        cancelled: false,
        push: (events) => {
          if (!run.cancelled)
            controller.enqueue(
              encoder.encode(
                events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join(""),
              ),
            );
        },
        end: () => {
          if (!run.cancelled) controller.close();
        },
      };
      const body = new ReadableStream<Uint8Array>({
        start(value) {
          controller = value;
        },
        cancel() {
          run.cancelled = true;
        },
      });
      init?.signal?.addEventListener(
        "abort",
        () => {
          run.aborted = true;
        },
        { once: true },
      );
      window.__chatRuns.push(run);
      return new Response(body, {
        headers: {
          "Content-Type": "text/event-stream",
          "X-Request-Id": run.requestId,
        },
      });
    };
  });
  if (initialize) {
    await page.goto("/");
    await chooseProvider(page, "DeepSeek");
  }
  return {
    async waitForRequests(count: number) {
      await expect
        .poll(() => page.evaluate(() => window.__chatRuns.length))
        .toBe(count);
    },
    async emit(index: number, ...events: ChatEvent[]) {
      await page.evaluate(
        ({ index, events }) => window.__chatRuns[index].push(events),
        { index, events },
      );
    },
    async end(index: number) {
      await page.evaluate((i) => window.__chatRuns[i].end(), index);
    },
    async requests() {
      return page.evaluate(() =>
        window.__chatRuns.map(({ body, aborted, cancelled, requestId }) => ({
          body,
          aborted,
          cancelled,
          requestId,
        })),
      );
    },
  };
}
