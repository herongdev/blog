import { once } from "node:events";
import type { Response } from "express";
import type { ChatEvent } from "../../shared/contracts/chat";
import { StreamError } from "../common/stream-error";
import { requestTrace } from "./request-diagnostics";

export async function sendChatStream(
  response: Response,
  source: (signal: AbortSignal) => AsyncIterable<ChatEvent>,
  timeoutMs: number,
) {
  const controller = new AbortController();
  const events = source(controller.signal);
  const trace = requestTrace(response);
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    trace?.fail("timeout");
    controller.abort();
  }, timeoutMs);
  const disconnect = () => controller.abort();
  response.on("close", disconnect);

  const write = async (event: ChatEvent) => {
    controller.signal.throwIfAborted();
    if (response.destroyed || response.writableEnded) return;
    if (!response.write(`data: ${JSON.stringify(event)}\n\n`)) {
      await once(response, "drain", { signal: controller.signal });
    }
  };

  try {
    response.status(200).set({
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });
    response.flushHeaders();
    if (response.destroyed) controller.abort();
    let terminal = false;
    for await (const event of events) {
      await write(event);
      trace?.observe(event);
      if (event.type === "done" || event.type === "error") {
        terminal = true;
        break;
      }
    }
    if (!terminal && !controller.signal.aborted) {
      await write({ type: "error", message: "回答意外中断，请重试。" });
      trace?.fail("incomplete");
    }
  } catch (error) {
    if (!timedOut) trace?.fail("upstream_error");
    if (!response.destroyed && !response.writableEnded) {
      const message = timedOut
        ? "等待模型响应超时，请稍后重试。"
        : error instanceof StreamError
          ? error.message
          : error instanceof TypeError
            ? "无法连接模型服务，请检查网络与接口地址。"
            : "生成失败，请稍后重试。";
      response.write(`data: ${JSON.stringify({ type: "error", message })}\n\n`);
    }
  } finally {
    clearTimeout(timeout);
    response.off("close", disconnect);
    controller.abort();
    if (!response.destroyed && !response.writableEnded) response.end();
  }
}
