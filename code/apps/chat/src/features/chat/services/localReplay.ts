import type { ChatEvent, Reference } from "@shared/contracts/chat";
import type { StreamOptions } from "../types";
import { abortableDelay } from "@shared/async/abortableDelay";

import { parseSample, type SampleEnvelope } from "../lib/sampleEnvelope";
export type { SampleEnvelope } from "../lib/sampleEnvelope";

function toolDetails(argumentsText?: string): string {
  try {
    const args = JSON.parse(argumentsText ?? "{}");
    return typeof args.query === "string"
      ? `搜索「${args.query}」`
      : "正在获取相关资料";
  } catch {
    return "正在获取相关资料";
  }
}

export function adaptSample(envelope: SampleEnvelope): ChatEvent[] {
  const data = envelope.data;
  if (data.raw === "[DONE]") return [{ type: "done" }];
  switch (data.event) {
    case "content":
      return [{ type: "text", delta: data.content ?? "" }];
    case "reasoning_content":
      return [
        {
          type: "reasoning",
          id: `reasoning-${data.index ?? 0}`,
          delta: data.content ?? "",
        },
      ];
    case "reference":
      return [
        {
          type: "references",
          items: (data.reference ?? []).map((ref): Reference => ({
            id: ref.id,
            title: ref.title,
            content: ref.content,
            link: ref.link,
            media: ref.web?.media,
            icon: ref.web?.icon,
          })),
        },
      ];
    case "call_tool":
    case "tool_stream":
    case "tool_result": {
      if (!data.tool) return [];
      let content = toolDetails(data.tool.call?.function?.arguments);
      if (data.event === "tool_stream")
        content = "已收到搜索结果，正在整理来源";
      if (data.event === "tool_result") {
        try {
          const results = JSON.parse(data.tool.result ?? "[]");
          content = `找到 ${Array.isArray(results) ? results.length : 0} 份相关资料`;
        } catch {
          content = "搜索已完成";
        }
      }
      return [
        {
          type: "tool",
          id: data.tool.id,
          title:
            data.tool.key === "insightful_ai_search" || !data.tool.key
              ? "搜索资料"
              : data.tool.key,
          content,
          status: data.event === "tool_result" ? "complete" : "running",
        },
      ];
    }
    case "assistant_record_id":
      return [{ type: "metadata", recordId: data.recordId }];
    case "title":
      return [{ type: "metadata", title: data.content }];
    case "timer_finished":
      return [
        {
          type: "metadata",
          sourceDurationMs: Number(data.content) || undefined,
        },
      ];
    default:
      return [];
  }
}

export const markdownDemo = `## 把复杂问题，拆成清晰的步骤

一个好的回答应该有结论，也有可以验证的过程。

### 三个实用习惯

1. **明确问题**：先确认输入和预期结果。
2. **拆小步骤**：每一步都能独立验证。
3. **及时复盘**：把取舍和原因记录下来。

> 理解一段代码，最好的方式是解释它为什么存在。

\`useReducer\` 将状态变化集中管理：

\`\`\`tsx
function reducer(state, action) {
  switch (action.type) {
    case 'append':
      return { ...state, text: state.text + action.delta };
    default:
      return state;
  }
}
\`\`\`

| 场景 | 处理方式 |
| --- | --- |
| 持续输出 | 追加消息内容 |
| 主动停止 | 取消请求，保留已有内容 |
| 发生错误 | 提示原因，允许重试 |

- [x] 标题与列表
- [x] 代码与表格
- [x] ~~旧方案~~ 与新思路

普通链接：[React 文档](https://react.dev/)。代码里的引用标记应保持原样：\`[[1_0][1_2]]\`。

**下一步：动手写一个最小例子。**`;

export async function* streamLocal(
  options: StreamOptions,
): AsyncGenerator<ChatEvent> {
  const { signal, speed, scenario } = options;
  await abortableDelay(350 / speed, signal);
  if (scenario === "empty") {
    yield { type: "done" };
    return;
  }
  if (scenario === "error") {
    yield { type: "text", delta: "已经收到你的问题，正在整理回答…" };
    await abortableDelay(1300 / speed, signal);
    throw new Error("连接暂时中断了。这是异常演示，你可以重试或切换样例。");
  }
  if (scenario === "markdown") {
    for (let i = 0; i < markdownDemo.length; i += 5) {
      await abortableDelay(25 / speed, signal);
      yield { type: "text", delta: markdownDemo.slice(i, i + 5) };
    }
    yield { type: "done" };
    return;
  }
  const response = await fetch("/data/sample.json", { signal });
  if (!response.ok)
    throw new Error("本地样例加载失败，请检查附件文件是否存在。");
  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    signal.throwIfAborted();
    throw new Error("本地样例格式不正确。");
  }
  signal.throwIfAborted();
  const envelopes = parseSample(raw);
  for (const envelope of envelopes) {
    const kind = envelope.data.event;
    // Preserve original event boundaries and order; only playback time is synthetic.
    const delay =
      kind === "reasoning_content" ? 12 : kind === "content" ? 15 : 100;
    await abortableDelay(delay / speed, signal);
    for (const event of adaptSample(envelope)) yield event;
  }
}
