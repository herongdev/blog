---

title: ArkTS（HarmonyOS）版 SSE 解析器·最小实现（作为 WS 失败后的回退）
date: 2025-10-14
tags: []
---

> 只给**需要新增/修改的代码片段**；复杂逻辑上方已加中文注释。
> 作用：当 **WebSocket** 连接失败时，使用 **`fetch + ReadableStream`** 解析 `text/event-stream`，逐块追加到对话文本。

## 一、新增：通用 SSE 解析器（ArkTS 文件，例如 `entry/src/main/ets/common/sseClient.ets`）

```ts
// ✅ 新增文件：common/sseClient.ets
// 【复杂逻辑】逐行解析 text/event-stream（SSE）：以空行 \n\n 作为帧边界，提取以 "data: " 开头的行。
// 运行前会检测环境是否支持 fetch+ReadableStream（HarmonyOS 新版有；旧版不支持则直接抛错给上层回退 HTTP）。
export async function startSSEStream(
  url: string,
  {
    onData,      // 每个 data: 帧的文本增量
    onDone,      // 收到 [DONE] 或流结束
    onError,     // 发生异常
    headers,     // 可选：额外请求头
    signal       // 可选：AbortSignal，用于取消
  }: {
    onData: (chunk: string) => void;
    onDone?: () => void;
    onError?: (err: Error) => void;
    headers?: Record<string, string>;
    signal?: AbortSignal;
  }
): Promise<void> {
  // 【复杂逻辑】能力检测：ReadableStream 在部分 HarmonyOS 版本不可用
  const hasFetch = typeof (globalThis as any).fetch === 'function';
  const canStream = !!(globalThis as any).ReadableStream;
  if (!hasFetch || !canStream) {
    throw new Error('SSE 不受当前运行环境支持（缺少 fetch/ReadableStream）');
  }

  let response: Response | undefined;
  const decoder = new TextDecoder('utf-8'); // 处理 UTF-8 半字符切片
  let buffer = '';                           // 帧缓冲

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {})
      },
      // 注意：SSE 接口常为 POST + JSON 入参；若你的后端不需要请求体，可去掉 body
      body: JSON.stringify({ /* 占位：实际调用时由上层传参 */ }),
      signal
    });

    if (!response.ok || !response.body) {
      throw new Error(`SSE HTTP ${response.status}`);
    }

    const reader = response.body.getReader();

    while (true) {
      // 【复杂逻辑】逐块读取与解码，避免中文被截断
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // 解析帧：SSE 以空行 \n\n 结帧
      const frames = buffer.split('\n\n');
      buffer = frames.pop() || '';

      for (const frame of frames) {
        // 每帧可能包含多行（event/id/data 多行）
        const lines = frame.split('\n');
        for (const line of lines) {
          // 只处理 data: 行；其它如 event:/id: 可按需扩展
          if (line.startsWith('data:')) {
            const payload = line.slice(5).trim();
            if (payload === '[DONE]') {
              onDone && onDone();
              try { reader.cancel(); } catch {}
              return;
            }
            onData(payload);
          }
        }
      }
    }

    // 流正常结束
    onDone && onDone();
  } catch (err) {
    onError && onError(err as Error);
    // 外层会做回退，不再抛出
  } finally {
    // 无需额外关闭，fetch/ReadableStream 自行回收
  }
}
```

> 说明：这里把 **POST** 当作默认发法以匹配你后端 `/ai/scenario-dialog/stream`；如果你的流式接口是 **GET**，把 `method/body` 去掉即可。

---

## 二、在页面里接入（`ScenarioDialogPage.ets`）

### 1) 顶部导入

```ts
// ✅ 新增：引入刚才的 SSE 客户端
import { startSSEStream } from '../common/sseClient';
```

### 2) 新增：SSE 回退调用封装

```ts
// ✅ 新增：SSE 回退（仅在 WS 失败时使用）
// 【复杂逻辑】和 WS 一样做“缓冲 + 合并刷新”，避免每个 token 刷一帧导致卡顿。
// 这里兼容你现有的 BASE_URL 与历史裁剪策略。
async callAIStreamSSE(userMessage: string, onDelta: (t: string) => void): Promise<void> {
  // 仅传最近 10 条历史，减少负载
  const historyPayload = this.dialogMessages.slice(-10).map((m) => ({ role: m.role, content: m.content }));

  // Abort 控制，便于用户中断
  const ctrl = new AbortController();

  // —— 节流合并策略 —— //
  let acc = '';
  let rafId: number | null = null;
  let lastFlush = Date.now();

  const flush = () => {
    if (!acc) return;
    const now = Date.now();
    // 【复杂逻辑】最小片段阈值 + 标点触发 + 最大等待 200ms
    const small = acc.length < 6 && (now - lastFlush) < 80;
    const punct = /[，。！？\n]/.test(acc);
    const timeout = (now - lastFlush) > 200;

    if (!small || punct || timeout) {
      onDelta(acc);
      acc = '';
      lastFlush = now;
    } else {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          flush();
        });
      }
    }
  };

  // 发送到你后端的 SSE 流式端点
  const url = `${BASE_URL}/ai/scenario-dialog/stream`;

  await startSSEStream(url, {
    onData: (chunk: string) => {
      acc += chunk;
      flush();
    },
    onDone: () => {
      // 收尾：把残余缓冲刷掉
      if (acc) { onDelta(acc); acc = ''; }
    },
    onError: (_err: Error) => {
      // 交给上层进一步回退（一次性 HTTP）
      if (acc) { onDelta(acc); acc = ''; }
    },
    headers: {
      // 你的后端需要 JSON 请求体，这里把参数放到 body（见下方 startSSEStream 调整）
      // 但 startSSEStream 默认空体，这里通过 signal 标识，我们稍后用“重载调用”写法传参
      'Accept': 'text/event-stream'
    },
    signal: ctrl.signal
  });
}
```

> **重要**：上面 `startSSEStream` 里默认把 `body` 写成空对象。为了把 `scenario/message/history` 传过去，我们**建议在发起前对 `startSSEStream` 做一次“重载调用”**（见下一段“③ 修改：把请求体带上”）。

### 3) 修改：带请求体调用 `startSSEStream`（在页面里 patch 一下调用）

```ts
// ✅ 修改：在调用前，临时“包装” startSSEStream，把业务 JSON 放在 body 里。
// 这样你不用改 sseClient.ets 的公共签名。
async callAIStreamSSE(userMessage: string, onDelta: (t: string) => void): Promise<void> {
  const historyPayload = this.dialogMessages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
  const ctrl = new AbortController();

  let acc = '';
  let rafId: number | null = null;
  let lastFlush = Date.now();
  const flush = () => { /* 与上文相同，省略 */ };

  const url = `${BASE_URL}/ai/scenario-dialog/stream`;

  // —— 这里临时“内联”一个带 body 的 fetch，直接复用解析逻辑 —— //
  const hasFetch = typeof (globalThis as any).fetch === 'function';
  const canStream = !!(globalThis as any).ReadableStream;
  if (!hasFetch || !canStream) {
    throw new Error('SSE 不受当前运行环境支持');
  }

  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream'
    },
    body: JSON.stringify({
      scenario: this.currentScenario,
      message: userMessage,
      history: historyPayload
    }),
    signal: ctrl.signal
  });

  if (!resp.ok || !resp.body) {
    throw new Error(`SSE HTTP ${resp.status}`);
  }

  const reader = resp.body.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const frames = buffer.split('\n\n');
    buffer = frames.pop() || '';
    for (const frame of frames) {
      const lines = frame.split('\n');
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const payload = line.slice(5).trim();
          if (payload === '[DONE]') {
            if (acc) { onDelta(acc); acc = ''; }
            return;
          }
          acc += payload;
          flush();
        }
      }
    }
  }

  if (acc) { onDelta(acc); acc = ''; }
}
```

---

## 三、把 SSE 回退插到发送链路里

> 在你已有的 `handleSendMessage()` 中，**WS 优先**；若抛错，则**尝试 SSE**；再失败，回退到一次性 HTTP（你已有的 `callAI()`）。

```ts
// ✅ 仅展示需要替换的片段：将 “WS 失败 → 回退 HTTP” 扩展为 “WS 失败 → SSE → HTTP”
async handleSendMessage() {
  const text = this.inputText.trim();
  if (!text) return;

  this.dialogMessages.push(this.createMessage('user', text));
  this.inputText = '';

  const idx = this.dialogMessages.push(this.createMessage('ai', '')) - 1;

  let acc = '';
  const applyDelta = (chunk: string) => {
    acc += chunk;
    this.dialogMessages[idx] = this.createMessage('ai', acc);
  };

  try {
    // 1) 优先 WebSocket 流式
    await this.callAIStreamWS(text, applyDelta);
    return;
  } catch (_e1) {
    // 2) 回退 SSE
    try {
      await this.callAIStreamSSE(text, applyDelta);
      return;
    } catch (_e2) {
      // 3) 最后回退一次性 HTTP
      try {
        const reply = await this.callAI(text);
        this.dialogMessages[idx] = this.createMessage('ai', reply);
        return;
      } catch (_e3) {
        this.dialogMessages[idx] = this.createMessage('ai', '抱歉，服务暂时不可用，请稍后再试~');
        return;
      }
    }
  }
}
```

---

## 四、注意事项（HarmonyOS/ArkTS 实战）

* **ReadableStream 支持**：部分 HarmonyOS 版本/设备不提供 `fetch().body` 流式读取能力；上文代码已做**能力检测**，不支持时会抛错交给上一层回退。
* **超时与取消**：通过 `AbortController` 即可主动**中断当前 SSE**；用户改问题时要调用 `controller.abort()`。
* **Nginx 配置**：SSE location 继续保持 `proxy_buffering off`、`add_header X-Accel-Buffering no;`、`proxy_read_timeout 600s`。
* **频繁渲染**：务必使用**缓冲 + 合并刷新**（上文的最小片段阈值/标点触发/最大等待 + rAF），否则 UI 会抖动且耗电。
* **编码**：必须用 `TextDecoder(stream:true)`，否则中文容易出现乱码或半个字。

---

如果你确认设备/系统版本**不支持 ReadableStream**，我可以再给一版“**伪 SSE（短轮询）**”的最小适配：后端暴露 `/ai/scenario-dialog/poll`，前端每 300ms 拉一次“未读增量”，体验也能接近流式（比一次性强不少）。需要的话告诉我。
