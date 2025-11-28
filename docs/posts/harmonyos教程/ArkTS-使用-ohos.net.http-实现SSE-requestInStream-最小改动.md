---
title: ArkTS/鸿蒙下用 @ohos.net.http 流式实现 SSE（requestInStream + dataReceive）最小改动
date: 2025-10-15
tags: [ArkTS, 鸿蒙, SSE, Network Kit, HTTP]
categories:
  - 开发笔记
---

你说得对：**在 ArkTS/鸿蒙里直接用浏览器的 `fetch`/`EventSource` 并不合适**。官方推荐用 **`@ohos.net.http`**（Network Kit / RCP 能力），并且**做流式处理要用 `requestInStream()` + 事件回调**（`dataReceive`、`dataEnd` 等）。下面是我基于**官方文档**给出的结论与最小改动示例（只给关键代码片段，复杂逻辑上一行注释）。

## 结论（基于官方文档）

1. **HTTP 请求能力来源**：`@ohos.net.http` 模块（又称 Network Kit / RCP 的 HTTP 能力）。官方“发送网络请求（ArkTS）”与 API 参考都指向该模块。[华为开发者网站][1]

2. **流式接收（SSE 场景）**：不是 `fetch`，而是 **`httpRequest.requestInStream()`**，并通过 **`on('dataReceive')` / `on('dataEnd')` / `on('dataReceiveProgress')`** 事件逐块读取数据。官方 API 变更与讨论明确这些事件存在，且“只有 `requestInStream` 支持进度/流式监听”。[华为开发者网站][2]

3. **TextDecoder**：在鸿蒙侧应使用 **`@ohos.util` 的 `TextDecoder`**（而不是浏览器全局的 `TextDecoder`）。[华为开发者网站][3]

4. **没有内置 `EventSource`**：官方 ArkTS/Network Kit 文档列出的网络能力为 HTTP 与 WebSocket，并未提供浏览器式 `EventSource` API；因此 SSE 要用上面的 **HTTP 流式 + 事件** 自行解析。[华为开发者网站][4]

---

## 你项目里需要的“最小改动”片段

> 场景：把原先用 `fetch` 读 `text/event-stream` 的代码，替换为鸿蒙官方 `@ohos.net.http` 的**流式**实现。

```ts
// ① 引入官方 HTTP 与 util.TextDecoder
import http from "@ohos.net.http";
import util from "@ohos.util";

export interface SSEOptions {
  onData: (chunk: string) => void;
  onDone?: () => void;
  onError?: (err: Error) => void;
  headers?: Record<string, string>;
  body?: object | string | number | boolean | null;
  // ArkTS 下没有浏览器 AbortSignal，这里按你的工程自定义（可选）
  signal?: { aborted?: boolean };
}

// 【复杂逻辑】使用 requestInStream 开启流式请求；用 dataReceive 持续取块
export async function startSSEStream(
  url: string,
  options: SSEOptions
): Promise<void> {
  const httpRequest = http.createHttp();
  const decoder = util.TextDecoder.create("utf-8"); // 鸿蒙的 TextDecoder
  let buffer = "";

  // ② 事件订阅（先订阅，再发起），逐块解析 \n\n 分帧与 data: 行
  httpRequest.on("dataReceive", (ab: ArrayBuffer) => {
    // 【复杂逻辑】保持解码器状态，避免中文被截断
    const text = decoder.decode(new Uint8Array(ab), { stream: true } as any);
    buffer += text;

    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      if (!frame.trim()) continue;
      for (const line of frame.split("\n")) {
        if (line.startsWith("data:")) {
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") {
            options.onDone?.();
            // 结束：可选择取消/销毁
            try {
              httpRequest.destroy();
            } catch {}
            return;
          }
          // 【复杂逻辑】尽量按 JSON 解析；失败则按纯文本
          try {
            const data = JSON.parse(payload);
            if (data?.type === "chunk" && data.text) options.onData(data.text);
            else if (data?.type === "done") {
              options.onDone?.();
              try {
                httpRequest.destroy();
              } catch {}
            } else if (data?.type === "error")
              throw new Error(data.text || "服务端错误");
            else options.onData(payload);
          } catch {
            options.onData(payload);
          }
        }
      }
    }
  });

  httpRequest.on("dataEnd", () => {
    options.onDone?.();
    try {
      httpRequest.destroy();
    } catch {}
  });

  httpRequest.on("headersReceive", (_hdrs) => {
    // 可选：校验响应码/头部
  });

  httpRequest.on("dataReceiveProgress", (_p) => {
    // 可选：进度
  });

  // ③ 以流式方式发起请求（POST/GET 都可；SSE 常见为 GET，但你后端也支持 POST）
  try {
    await httpRequest.requestInStream(url, {
      method: http.RequestMethod.POST, // 或 GET，按你的服务端
      header: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      // 【复杂逻辑】体可为字符串；对象转 JSON
      extraData:
        typeof options.body === "string"
          ? options.body
          : options.body == null
          ? ""
          : JSON.stringify(options.body),
      // 超时、证书等可按需配置
      connectTimeout: 60000,
      readTimeout: 0, // SSE 不超时读
    });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    options.onError?.(err);
    try {
      httpRequest.destroy();
    } catch {}
    throw err;
  }
}
```

**同时别忘了权限**（`module.json5` 或 `config.json`）里声明上网权限：

```json
{
  "module": {
    "reqPermissions": [{ "name": "ohos.permission.INTERNET" }]
  }
}
```

官方“使用 HTTP 访问网络/发送网络请求”文档均有说明需声明网络权限。[华为开发者网站][5]

---

## 关键依据（官方文档/页面）

- **发送网络请求（ArkTS 指南）**：介绍 ArkTS 下如何发送 HTTP 请求。[华为开发者网站][1]
- **`@ohos.net.http` API 参考**：官方的 HTTP 模块说明（含 `requestInStream`、事件）。[华为开发者网站][4]
- **API 变更页**：明确存在 `on("dataReceive")` 等事件（用于流式响应）。[华为开发者网站][2]
- **论坛答复**：确认**只有 `requestInStream`** 支持进度/流式监听。[华为开发者网站][6]
- **`@ohos.util` 的 `TextDecoder`**：鸿蒙环境的解码器应从 util 使用。[华为开发者网站][3]

---

如果你愿意，我可以把你现有的 `fetch` 版 **逐行替换** 成上面的 `@ohos.net.http` 版，并只发“需要修改的片段”。

[1]: https://developer.huawei.com/consumer/en/doc/harmonyos-guides/remote-communication-netsend-arkts?utm_source=chatgpt.com "Sending a Network Request (ArkTS)"
[2]: https://developer.huawei.com/consumer/cn/doc/harmonyos-releases/js-apidiff-networkkit-hdc?utm_source=chatgpt.com "Network Kit-HarmonyOS NEXT Developer Beta1引入的API ..."
[3]: https://developer.huawei.com/consumer/en/doc/harmonyos-references-V5/js-apis-util-V5?utm_source=chatgpt.com "ohos.util (util)"
[4]: https://developer.huawei.com/consumer/en/doc/harmonyos-references-V5/js-apis-http-0000001861887649-V5?catalogVersion=V5&utm_source=chatgpt.com "ohos.net.http (Data Request)"
[5]: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/http-request?utm_source=chatgpt.com "使用HTTP访问网络"
[6]: https://developer.huawei.com/consumer/cn/forum/topic/0204192989342354394?utm_source=chatgpt.com "华为开发者问答"
