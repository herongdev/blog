import type { ChatEvent, ChatRequest } from "@shared/contracts/chat";

// This covers sending the body and waiting for response headers. The server owns
// the separate model-generation timeout after it has accepted the complete body.
export const requestHeadersTimeoutMs = 120_000;

export async function* streamAPI(
  request: ChatRequest,
  signal: AbortSignal,
): AsyncGenerator<ChatEvent> {
  // Local replay needs neither network parsing nor Zod; load them when an API run actually starts.
  const [{ readSSE }, { parseChatEvent, parseRequestId }] = await Promise.all([
    import("@shared/transport/sse"),
    import("@shared/contracts/chatEventSchema"),
  ]);
  signal.throwIfAborted();
  const controller = new AbortController();
  const abort = () => controller.abort(signal.reason);
  signal.addEventListener("abort", abort, { once: true });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, requestHeadersTimeoutMs);
  let response: Response | undefined;
  try {
    response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const requestId = parseRequestId(response.headers.get("x-request-id"));
    // Normalize transport metadata once; views do not read HTTP headers.
    // Emit it before parsing the body so HTTP errors and broken streams remain traceable.
    const streaming =
      response.ok &&
      response.headers.get("content-type")?.includes("text/event-stream");
    if (requestId || streaming)
      yield {
        type: "metadata",
        ...(requestId ? { requestId } : {}),
        ...(streaming ? { requestStage: "waiting" as const } : {}),
      };
    if (!response.ok) {
      const body: unknown = await response.json().catch(() => null);
      const message =
        typeof body === "object" &&
        body !== null &&
        "error" in body &&
        typeof body.error === "string" &&
        body.error.trim()
          ? body.error
          : "无法连接本地服务，请稍后重试。";
      throw new Error(message);
    }
    if (!response.headers.get("content-type")?.includes("text/event-stream")) {
      await response.body?.cancel();
      throw new Error("本地服务没有返回流式消息，请检查服务是否正常启动。");
    }
    if (!response.body) throw new Error("浏览器未收到响应数据。");
    for await (const data of readSSE(response.body)) {
      signal.throwIfAborted();
      const event = parseChatEvent(data);
      yield event;
      if (event.type === "done" || event.type === "error") return;
    }
    throw new Error("连接在回答完成前中断，已保留收到的内容，请重试。");
  } catch (error) {
    if (timedOut && !signal.aborted)
      throw new Error("发送请求超时，请检查网络或减少附件后重试。", {
        cause: error,
      });
    throw error;
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", abort);
    // A consumer may stop immediately after metadata, before readSSE owns the body.
    if (response?.body && !response.body.locked)
      await response.body.cancel().catch(() => undefined);
  }
}
