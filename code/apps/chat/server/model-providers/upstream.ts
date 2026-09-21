import { supportsThinkingToggle } from "../../shared/contracts/modelCapabilities";
import type { ChatEvent, ChatRequest } from "../../shared/contracts/chat";
import type { ProviderConfig } from "./providers.config";
import { readSSE } from "../../shared/transport/sse";
import { StreamError } from "../common/stream-error";

export function upstreamBody(request: ChatRequest, systemPrompt: string) {
  return {
    model: request.model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...request.messages.map(({ images, ...message }) =>
        images?.length
          ? {
              ...message,
              content: [
                ...(message.content
                  ? [{ type: "text", text: message.content }]
                  : []),
                ...images.map((url) => ({
                  type: "image_url",
                  image_url: { url },
                })),
              ],
            }
          : message,
      ),
    ],
    stream: true,
    ...(!supportsThinkingToggle(request.provider, request.model)
      ? {}
      : request.provider === "aliyun"
        ? { enable_thinking: request.thinking }
        : { thinking: { type: request.thinking ? "enabled" : "disabled" } }),
  };
}

export function upstreamError(status: number): string {
  if (status === 401 || status === 403)
    return "模型服务拒绝了访问，请检查 API Key、地域与模型权限。";
  if (status === 402) return "模型账户额度不足，请检查账户余额。";
  if (status === 429) return "请求过于频繁或额度受限，请稍后重试。";
  if (status === 400 || status === 404)
    return "模型或请求配置不可用，请检查模型名称、接口地址与思考模式支持。";
  return `模型服务暂时不可用（HTTP ${status}），请稍后重试。`;
}

export async function* streamUpstream(
  config: ProviderConfig,
  request: ChatRequest,
  systemPrompt: string,
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
  onHeaders?: (status: number) => void,
): AsyncGenerator<ChatEvent> {
  const response = await fetcher(
    `${config.baseUrl.replace(/\/$/, "")}/chat/completions`,
    {
      method: "POST",
      signal,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(upstreamBody(request, systemPrompt)),
    },
  );
  onHeaders?.(response.status);
  if (!response.ok) {
    await response.body?.cancel();
    throw new StreamError(upstreamError(response.status));
  }
  if (
    !response.body ||
    !response.headers.get("content-type")?.includes("text/event-stream")
  ) {
    await response.body?.cancel();
    throw new StreamError("模型服务没有返回预期的流式数据，请检查接口地址。");
  }
  let finished = false;
  for await (const data of readSSE(response.body)) {
    signal.throwIfAborted();
    if (data === "[DONE]") {
      finished = true;
      break;
    }
    let chunk;
    try {
      chunk = JSON.parse(data);
    } catch {
      throw new StreamError("模型返回了无法解析的数据，请重试。");
    }
    if (chunk.error)
      throw new StreamError("模型生成失败，请检查账户额度、模型配置后重试。");
    const choice = chunk.choices?.[0];
    const delta = choice?.delta;
    if (typeof delta?.reasoning_content === "string")
      yield {
        type: "reasoning",
        id: "reasoning-0",
        delta: delta.reasoning_content,
      };
    if (typeof delta?.content === "string")
      yield { type: "text", delta: delta.content };
    if (choice?.finish_reason === "length")
      throw new StreamError(
        "回答达到模型输出上限，已保留生成的内容。请缩小问题范围后重试。",
      );
    if (choice?.finish_reason === "content_filter")
      throw new StreamError("模型服务未能完成这次回答，请调整问题后重试。");
    if (choice?.finish_reason === "tool_calls")
      throw new StreamError("该模型请求执行工具，当前聊天接口尚未配置工具。");
    if (choice?.finish_reason === "stop") finished = true;
  }
  if (!finished)
    throw new StreamError("连接在回答完成前中断，已保留收到的内容，请重试。");
  yield { type: "done" };
}
