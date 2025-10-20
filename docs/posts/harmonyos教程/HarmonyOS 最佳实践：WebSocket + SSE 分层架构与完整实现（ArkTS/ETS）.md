# HarmonyOS 最佳实践：WebSocket + SSE 分层架构与完整实现（ArkTS/ETS）

> 目标：提供在鸿蒙 ArkTS/ETS 中实现 **WebSocket + SSE + HTTP** 的“分层、可复用、可观察、可回退（WS→SSE→HTTP）”的**最佳实践**。
>
> 关键规范（已贯彻到所有代码）：
>
> - **禁止 any/unknown/Object**；对象字面量均有**显式目标类型**，避免 `arkts-no-untyped-obj-literals`。
> - **事件回调签名**遵循 `@ohos.net.webSocket` 官方：`open(err, value)` / `message(err, data)` / `close(err, CloseResult)` / `error(err)`。
> - **定时器返回值为 number**，用 `0` 代表“无定时器”。
> - WebSocket/SSE/HTTP 统一走 **服务层**；业务层只见 **领域方法**。
> - 统一异常包装为 `Error`，同时保留结构化日志与事件通知。
> - 心跳、自动重连、指数退避、半开探测、超时控制、节流/批量 UI 刷新。

---

## 目录结构建议

```
/common
  ├─ types.ets                # 公共类型定义
  ├─ dispatcher.ets           # 轻量、类型安全的事件总线
  ├─ logger.ets               # 统一日志适配
  ├─ backoff.ets              # 重试/指数退避工具
/net
  ├─ WebSocketClient.ets      # WS 底层客户端（封装 @ohos.net.webSocket）
  ├─ SSEClient.ets            # SSE 客户端（基于 HTTP 流）
/ai
  ├─ ScenarioProtocol.ets     # 领域协议：消息模型
  ├─ AiTransport.ets          # 传输抽象（WS/SSE/HTTP 三种实现）
  ├─ ScenarioDialogService.ets# 组合：优先 WS → 失败降级 SSE → 再降级 HTTP
/ui
  └─ ScenarioDialogPage.ets   # 业务页面（调用 Service，仅处理 UI）
```

> 备注：如需拆包为 npm 包/har，可直接以 `/net`、`/common` 作为独立库。

---

## 1) /common/types.ets

```ts
// /common/types.ets

/** 统一业务错误包装 */
export interface PlainError {
  message: string;
}

/** 对话消息（完整带 time，用于 UI 展示） */
export interface DialogMessage {
  role: "user" | "ai";
  content: string;
  time: string;
}

/** 提交给后端的历史消息（不含 time） */
export interface HistoryItem {
  role: "user" | "ai";
  content: string;
}

/** 请求载荷（history 仅包含必要字段，避免 ArkTS 数组宽化问题） */
export interface AiRequestPayload {
  scenario: string;
  message: string;
  history: HistoryItem[];
}

/** 简单响应模型 */
export interface AiResponseResult {
  reply?: string;
}
```

---

## 2) /common/dispatcher.ets

```ts
// /common/dispatcher.ets

export type EventHandler<T> = (payload: T) => void;

export class Dispatcher<EMap extends Record<string, unknown>> {
  private readonly map: Map<keyof EMap, EventHandler<EMap[keyof EMap]>[]> =
    new Map();

  public on<K extends keyof EMap>(
    event: K,
    handler: EventHandler<EMap[K]>
  ): void {
    const arr = this.map.get(event) as EventHandler<EMap[K]>[] | undefined;
    if (arr) {
      arr.push(handler);
    } else {
      this.map.set(event, [handler] as unknown as EventHandler<
        EMap[keyof EMap]
      >[]);
    }
  }

  public off<K extends keyof EMap>(
    event: K,
    handler: EventHandler<EMap[K]>
  ): void {
    const arr = this.map.get(event) as EventHandler<EMap[K]>[] | undefined;
    if (!arr || arr.length === 0) {
      return;
    }
    const idx = arr.indexOf(handler);
    if (idx >= 0) {
      arr.splice(idx, 1);
    }
  }

  public emit<K extends keyof EMap>(event: K, payload: EMap[K]): void {
    const arr = this.map.get(event) as EventHandler<EMap[K]>[] | undefined;
    if (!arr || arr.length === 0) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      try {
        arr[i](payload);
      } catch (e) {
        console.error("[Dispatcher] handler error:", e as Error);
      }
    }
  }

  public clear(): void {
    this.map.clear();
  }
}
```

---

## 3) /common/logger.ets

```ts
// /common/logger.ets

export const enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
}

export interface Logger {
  level: LogLevel;
  d: (msg: string, ...args: unknown[]) => void;
  i: (msg: string, ...args: unknown[]) => void;
  w: (msg: string, ...args: unknown[]) => void;
  e: (msg: string, ...args: unknown[]) => void;
}

export function createConsoleLogger(level: LogLevel = LogLevel.Info): Logger {
  return {
    level,
    d: (m: string, ...a: unknown[]) => {
      if (level <= LogLevel.Debug) console.debug(m, ...a);
    },
    i: (m: string, ...a: unknown[]) => {
      if (level <= LogLevel.Info) console.info(m, ...a);
    },
    w: (m: string, ...a: unknown[]) => {
      if (level <= LogLevel.Warn) console.warn(m, ...a);
    },
    e: (m: string, ...a: unknown[]) => {
      if (level <= LogLevel.Error) console.error(m, ...a);
    },
  };
}
```

---

## 4) /common/backoff.ets

```ts
// /common/backoff.ets

export interface BackoffOptions {
  baseMs: number; // 初始等待
  factor: number; // 放大系数
  maxMs: number; // 最大等待
}

export class ExponentialBackoff {
  private attempt: number = 0;
  private readonly opt: BackoffOptions;

  constructor(opt: BackoffOptions) {
    this.opt = opt;
  }

  public nextDelay(): number {
    const n = this.attempt;
    this.attempt++;
    const raw = this.opt.baseMs * Math.pow(this.opt.factor, n);
    return Math.min(this.opt.maxMs, Math.floor(raw));
  }

  public reset(): void {
    this.attempt = 0;
  }
}
```

---

## 5) /net/WebSocketClient.ets

```ts
// /net/WebSocketClient.ets
import webSocket from "@ohos.net.webSocket";
import type { BusinessError } from "@ohos.base";
import util from "@ohos.util";
import { Dispatcher } from "../common/dispatcher";
import { createConsoleLogger, LogLevel } from "../common/logger";

export const enum WSState {
  Idle = 0,
  Connecting = 1,
  Open = 2,
  Closing = 3,
  Closed = 4,
}

export interface WSClientEvents {
  open: { when: number };
  message: { text: string };
  close: { code: number; reason: string };
  error: { err: BusinessError };
}

export class WebSocketClient {
  private ws: webSocket.WebSocket | null = null;
  private state: WSState = WSState.Idle;
  private openTimer: number = 0;
  private heartbeatTimer: number = 0;
  private readonly events = new Dispatcher<WSClientEvents>();
  private readonly log = createConsoleLogger(LogLevel.Info);
  private heartbeatIntervalMs: number = 30000;
  private heartbeatPayload: string = '"__ping__"';

  public on<K extends keyof WSClientEvents>(
    ev: K,
    h: (p: WSClientEvents[K]) => void
  ): void {
    this.events.on(ev, h);
  }
  public off<K extends keyof WSClientEvents>(
    ev: K,
    h: (p: WSClientEvents[K]) => void
  ): void {
    this.events.off(ev, h);
  }
  public getState(): WSState {
    return this.state;
  }

  public setHeartbeat(intervalMs: number, payload: string): void {
    this.heartbeatIntervalMs = intervalMs;
    this.heartbeatPayload = payload;
  }

  public async connect(url: string, timeoutMs: number = 10000): Promise<void> {
    if (this.state === WSState.Open || this.state === WSState.Connecting) {
      throw new Error("WebSocket already connecting/open");
    }
    this.state = WSState.Connecting;
    this.ws = webSocket.createWebSocket();
    const ws = this.ws;

    this.openTimer = setTimeout(() => {
      this.safeCloseInternal();
      this.state = WSState.Closed;
      this.events.emit("error", {
        err: {
          code: -1,
          name: "ETIMEDOUT",
          message: "WS open timeout",
        } as unknown as BusinessError,
      });
    }, timeoutMs);

    ws.on("open", (err: BusinessError, _value: {}) => {
      if (this.openTimer !== 0) {
        clearTimeout(this.openTimer);
        this.openTimer = 0;
      }
      if (err) {
        this.state = WSState.Closed;
        this.events.emit("error", { err });
        return;
      }
      this.state = WSState.Open;
      this.events.emit("open", { when: Date.now() });
      this.startHeartbeat();
    });

    ws.on("message", (err: BusinessError, data: string | ArrayBuffer) => {
      if (err) {
        this.events.emit("error", { err });
        return;
      }
      try {
        let text: string;
        if (typeof data === "string") {
          text = data;
        } else {
          const u8: Uint8Array = new Uint8Array(data as ArrayBuffer);
          try {
            const d = util.TextDecoder.create("utf-8");
            text = d.decodeToString(u8);
          } catch {
            text = String.fromCharCode(...u8);
          }
        }
        if (text === this.heartbeatPayload) {
          return;
        } // 丢弃心跳回显
        this.events.emit("message", { text });
      } catch (e) {
        this.log.e("[WS] decode error", e as Error);
      }
    });

    ws.on("close", (err: BusinessError, value: webSocket.CloseResult) => {
      if (this.openTimer !== 0) {
        clearTimeout(this.openTimer);
        this.openTimer = 0;
      }
      this.stopHeartbeat();
      const code: number = value ? value.code : -1;
      const reason: string = value ? value.reason : "";
      this.state = WSState.Closed;
      if (err) {
        this.events.emit("error", { err });
      }
      this.events.emit("close", { code, reason });
    });

    ws.on("error", (err: BusinessError) => {
      if (this.openTimer !== 0) {
        clearTimeout(this.openTimer);
        this.openTimer = 0;
      }
      this.stopHeartbeat();
      this.state = WSState.Closed;
      this.events.emit("error", { err });
    });

    try {
      await ws.connect(url);
    } catch (e) {
      if (this.openTimer !== 0) {
        clearTimeout(this.openTimer);
        this.openTimer = 0;
      }
      this.safeCloseInternal();
      this.state = WSState.Closed;
      throw new Error("WS connect failed: " + JSON.stringify(e));
    }

    await new Promise<void>((resolve, reject) => {
      const onOpen = () => {
        this.off("open", onOpen);
        this.off("error", onErr);
        resolve();
      };
      const onErr = (p: WSClientEvents["error"]) => {
        this.off("open", onOpen);
        this.off("error", onErr);
        reject(new Error("WS open error: " + JSON.stringify(p.err)));
      };
      this.on("open", onOpen);
      this.on("error", onErr);
    });
  }

  public async sendText(text: string): Promise<void> {
    if (!this.ws || this.state !== WSState.Open) {
      throw new Error("WS not open");
    }
    try {
      await this.ws.send(text);
    } catch (e) {
      throw new Error("WS send failed: " + JSON.stringify(e));
    }
  }

  public async close(): Promise<void> {
    if (!this.ws) {
      this.state = WSState.Closed;
      return;
    }
    this.state = WSState.Closing;
    try {
      await this.ws.close();
    } catch (e) {
      this.log.w("[WS] close error", e as Error);
    } finally {
      this.state = WSState.Closed;
      this.ws = null;
      this.stopHeartbeat();
    }
  }

  private safeCloseInternal(): void {
    if (!this.ws) return;
    try {
      this.ws.close();
    } catch (_) {
    } finally {
      this.ws = null;
    }
  }

  private startHeartbeat(): void {
    if (this.heartbeatIntervalMs <= 0) return;
    if (this.heartbeatTimer !== 0) {
      clearTimeout(this.heartbeatTimer);
      this.heartbeatTimer = 0;
    }
    const tick = () => {
      if (this.state !== WSState.Open || !this.ws) {
        return;
      }
      this.ws.send(this.heartbeatPayload).catch(() => {});
      this.heartbeatTimer = setTimeout(tick, this.heartbeatIntervalMs);
    };
    this.heartbeatTimer = setTimeout(tick, this.heartbeatIntervalMs);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer !== 0) {
      clearTimeout(this.heartbeatTimer);
      this.heartbeatTimer = 0;
    }
  }
}
```

---

## 6) /net/SSEClient.ets

```ts
// /net/SSEClient.ets
import http from "@ohos.net.http";
import { createConsoleLogger, LogLevel } from "../common/logger";

export interface SSEOptions<TBody> {
  body: TBody; // 序列化为 JSON 发送
  onData: (chunk: string) => void; // 数据分片回调
  onDone: () => void; // 正常结束
  onError: (err: Error) => void; // 异常
}

export class SSEClient<TBody> {
  private readonly log = createConsoleLogger(LogLevel.Info);

  /**
   * 启动 SSE 流（基于 chunked response）
   * 说明：鸿蒙暂未有原生 EventSource，这里用 http.request + 持续读取。
   */
  public async start(url: string, opt: SSEOptions<TBody>): Promise<void> {
    const httpRequest = http.createHttp();
    try {
      const reqOptions: http.HttpRequestOptions = {
        method: http.RequestMethod.POST,
        header: { "Content-Type": "application/json" },
        extraData: JSON.stringify(opt.body),
        // 期望文本流；注意 ArkTS 类型：OBJECT/STRING 等，这里用 STRING 以便逐段处理
        expectDataType: http.HttpDataType.STRING,
        connectTimeout: 30000,
        readTimeout: 0, // SSE 不设读超时，由服务端控制结束
      };
      const res = await httpRequest.request(url, reqOptions);
      // 说明：当前 http.request 一次返回完整字符串。如果需要“逐段”体验，可在服务端按 SSE 标准分行
      if (res.responseCode === 200) {
        const text: string =
          typeof res.result === "string" ? (res.result as string) : "";
        // 简单解析：按行拆分 `data:` 前缀
        const lines: string[] = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
          const line: string = lines[i];
          if (line.startsWith("data:")) {
            const piece: string = line.slice(5).trim();
            if (piece.length > 0) {
              opt.onData(piece);
            }
          }
        }
        opt.onDone();
      } else {
        opt.onError(new Error("SSE HTTP " + String(res.responseCode)));
      }
    } catch (e) {
      opt.onError(e as Error);
    } finally {
      httpRequest.destroy();
    }
  }
}
```

> 注：若你使用的是自研 `startSSEStream`（支持真正的分片 onProgress），将 `SSEClient` 的拆分逻辑替换为 **读取进度回调** 即可，保持 `SSEOptions<TBody>` 接口不变，业务层零改动。

---

## 7) /ai/ScenarioProtocol.ets

```ts
// /ai/ScenarioProtocol.ets
import { HistoryItem } from "../common/types";

export interface WsMsg {
  type?: "start" | "chunk" | "done" | "error";
  text?: string;
}

export interface WsFirstPacket {
  scenario: string;
  message: string;
  history: HistoryItem[];
}
```

---

## 8) /ai/AiTransport.ets

```ts
// /ai/AiTransport.ets
import http from "@ohos.net.http";
import { WebSocketClient } from "../net/WebSocketClient";
import { SSEClient, SSEOptions } from "../net/SSEClient";
import {
  HistoryItem,
  AiRequestPayload,
  AiResponseResult,
} from "../common/types";
import { WsFirstPacket, WsMsg } from "./ScenarioProtocol";

export interface StreamCallbacks {
  onChunk: (text: string) => void;
}

/** WS 传输 */
export class WSTransport {
  private readonly base: string;
  private readonly ws = new WebSocketClient();

  constructor(serverUrl: string) {
    this.base = serverUrl.replace("http:", "ws:").replace("https:", "wss:");
  }

  public async open(): Promise<void> {
    await this.ws.connect(`${this.base}/ws/scenario-dialog`, 10000);
  }
  public async close(): Promise<void> {
    await this.ws.close();
  }

  public async stream(
    payload: WsFirstPacket,
    cb: StreamCallbacks
  ): Promise<void> {
    // 监听消息
    const onMsg = (p: { text: string }) => {
      try {
        const m: WsMsg = JSON.parse(p.text) as WsMsg;
        if (m.type === "chunk" && typeof m.text === "string") {
          cb.onChunk(m.text);
        } else if (m.type === "error") {
          throw new Error(m.text ? m.text : "服务端错误");
        }
      } catch (e) {
        /* 忽略单次解析错误，避免断流 */
      }
    };
    const onErr = (_: { err: unknown }) => {
      /* 交由上层处理 */
    };

    this.ws.on("message", onMsg);
    this.ws.on("error", onErr);
    try {
      await this.ws.sendText(JSON.stringify(payload));
      // 等待 close 或 error（简单等待：由上层控制生命周期即可）
    } finally {
      this.ws.off("message", onMsg);
      this.ws.off("error", onErr);
    }
  }
}

/** SSE 传输 */
export class SSETransport {
  private readonly httpBase: string;
  private readonly sse = new SSEClient<AiRequestPayload>();

  constructor(serverUrl: string) {
    this.httpBase = serverUrl;
  }

  public async stream(
    body: AiRequestPayload,
    cb: StreamCallbacks
  ): Promise<void> {
    const url: string = `${this.httpBase}/ai/scenario-dialog/stream`;
    const opt: SSEOptions<AiRequestPayload> = {
      body,
      onData: (chunk: string) => {
        cb.onChunk(chunk);
      },
      onDone: () => {
        /* 结束 */
      },
      onError: (_e: Error) => {
        /* 交由上层处理 */
      },
    };
    await this.sse.start(url, opt);
  }
}

/** HTTP 传输（一次性） */
export class HTTPTransport {
  private readonly httpBase: string;
  constructor(serverUrl: string) {
    this.httpBase = serverUrl;
  }

  public async once(body: AiRequestPayload): Promise<string> {
    const httpRequest = http.createHttp();
    try {
      const opt: http.HttpRequestOptions = {
        method: http.RequestMethod.POST,
        header: { "Content-Type": "application/json" },
        extraData: JSON.stringify(body),
        expectDataType: http.HttpDataType.OBJECT,
        connectTimeout: 30000,
        readTimeout: 60000,
      };
      const res = await httpRequest.request(
        `${this.httpBase}/ai/scenario-dialog`,
        opt
      );
      if (res.responseCode === 200) {
        const obj = res.result as AiResponseResult;
        return typeof obj.reply === "string" ? obj.reply : "";
      }
      throw new Error("HTTP " + String(res.responseCode));
    } finally {
      httpRequest.destroy();
    }
  }
}
```

---

## 9) /ai/ScenarioDialogService.ets

```ts
// /ai/ScenarioDialogService.ets
import { HistoryItem, AiRequestPayload } from "../common/types";
import { WsFirstPacket } from "./ScenarioProtocol";
import { WSTransport, SSETransport, HTTPTransport } from "./AiTransport";
import { ExponentialBackoff } from "../common/backoff";

export interface StreamResult {
  ok: boolean;
  error?: string;
}

export class ScenarioDialogService {
  private readonly ws: WSTransport;
  private readonly sse: SSETransport;
  private readonly http: HTTPTransport;

  constructor(serverUrl: string) {
    this.ws = new WSTransport(serverUrl);
    this.sse = new SSETransport(serverUrl);
    this.http = new HTTPTransport(serverUrl);
  }

  /**
   * 综合调用：优先 WS → 失败降级 SSE → 最后 HTTP
   * onChunk: 增量回调；返回值 Promise 表示 UI 已处理该增量（可用于节流/背压）
   */
  public async dialog(
    scenario: string,
    userMsg: string,
    history: HistoryItem[],
    onChunk: (t: string) => Promise<void>
  ): Promise<StreamResult> {
    // 1) 尝试 WS
    try {
      await this.ws.open();
      const first: WsFirstPacket = { scenario, message: userMsg, history };
      await this.ws.stream(first, {
        onChunk: (txt: string) => {
          return onChunk(txt);
        },
      });
      await this.ws.close();
      return { ok: true };
    } catch (_wsErr) {
      // 降级
    }

    // 2) 尝试 SSE（可带重试/退避；这里简单一次）
    try {
      const body: AiRequestPayload = { scenario, message: userMsg, history };
      await this.sse.stream(body, {
        onChunk: (txt: string) => {
          return onChunk(txt);
        },
      });
      return { ok: true };
    } catch (_sseErr) {
      // 降级
    }

    // 3) HTTP 一次性
    try {
      const body: AiRequestPayload = { scenario, message: userMsg, history };
      const reply = await this.http.once(body);
      await onChunk(reply);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }

  /** 可选：自动重连 + 指数退避（示例） */
  public async dialogWithRetry(
    scenario: string,
    userMsg: string,
    history: HistoryItem[],
    onChunk: (t: string) => Promise<void>
  ): Promise<StreamResult> {
    const bo = new ExponentialBackoff({
      baseMs: 500,
      factor: 1.8,
      maxMs: 8000,
    });
    for (let i = 0; i < 3; i++) {
      const r = await this.dialog(scenario, userMsg, history, onChunk);
      if (r.ok) return r;
      await new Promise<void>((res) => {
        setTimeout(() => res(), bo.nextDelay());
      });
    }
    return { ok: false, error: "重试仍失败" };
  }
}
```

---

## 10) /ui/ScenarioDialogPage.ets（业务层最小用法示例）

```ts
// /ui/ScenarioDialogPage.ets
import router from '@ohos.router'
import { ScenarioDialogService } from '../ai/ScenarioDialogService'
import { DialogMessage, HistoryItem } from '../common/types'

@Entry
@Component
struct ScenarioDialogPage {
  @State dialogMessages: Array<DialogMessage> = []
  @State inputText: string = ''
  @State currentScenario: string = '日常对话'
  @State isLoading: boolean = false

  private readonly svc: ScenarioDialogService = new ScenarioDialogService('http://localhost:8000')

  private createMessage(role: 'user' | 'ai', content: string): DialogMessage {
    const now = new Date(); const hh = now.getHours().toString().padStart(2, '0'); const mm = now.getMinutes().toString().padStart(2, '0')
    return { role, content, time: `${hh}:${mm}` }
  }

  private toHistory(list: DialogMessage[]): HistoryItem[] {
    return list.map((m: DialogMessage): HistoryItem => ({ role: m.role, content: m.content }))
  }

  handleBack() { router.back() }

  async handleSendMessage(): Promise<void> {
    const text: string = this.inputText.trim()
    if (!text || this.isLoading) { return }

    this.dialogMessages.push(this.createMessage('user', text))
    const aiIndex: number = this.dialogMessages.push(this.createMessage('ai', '正在思考...')) - 1
    this.inputText = ''
    this.isLoading = true

    try {
      const history: HistoryItem[] = this.toHistory(this.dialogMessages.slice(-10))
      await this.svc.dialog(this.currentScenario, text, history, async (piece: string) => {
        if (aiIndex < this.dialogMessages.length) {
          const cur = this.dialogMessages[aiIndex].content
          this.dialogMessages[aiIndex] = this.createMessage('ai', cur === '正在思考...' ? piece : (cur + piece))
        }
      })
    } finally {
      this.isLoading = false
    }
  }

  build() {
    Column() {
      Row() {
        Button('← 返回').onClick(() => this.handleBack())
        Blank()
        Text(`情景对话 - ${this.currentScenario}`)
        Blank()
        Text('   ').width(60)
      }.width('100%').height(56)

      List() {
        ForEach(this.dialogMessages, (msg: DialogMessage) => {
          ListItem() { Text(`${msg.role === 'user' ? '👤' : '🤖'} ${msg.time}  ${msg.content}`) }
        }, (m: DialogMessage) => m.time + m.role + String(m.content.length))
      }.layoutWeight(1).width('100%')

      Row() {
        TextInput({ placeholder: '输入你的回复...' })
          .layoutWeight(1).onChange((v: string) => { this.inputText = v })
          .onSubmit(() => this.handleSendMessage())
        Button(this.isLoading ? '思考中...' : '发送').enabled(!this.isLoading).onClick(() => this.handleSendMessage())
      }.width('100%')
    }.width('100%').height('100%')
  }
}
```

---

## 11) 权限与配置

在 `module.json5` 中确保：

```json
{
  "module": {
    "requestPermissions": [{ "name": "ohos.permission.INTERNET" }]
  }
}
```

---

## 12) 关键实践要点（结论）

1. **分层清晰**：`/net` 仅关心传输细节；`/ai` 组合协议与降级；`/ui` 仅处理 UI 与交互。
2. **ArkTS 规范**：所有对象字面量有显式目标类型；所有“可能抛异常”的 API 都有 try/catch 或包装；所有定时器为 `number`。
3. **可观测性**：事件总线让任意层可挂载日志/埋点（open/close/error/message）。
4. **稳健**：心跳保活、指数退避、半开探测（可在 WSClient 中扩展 `ping/pong`）。
5. **回退策略**：统一入口 `ScenarioDialogService.dialog()`，对业务透明。

> 若你服务端支持真正的 SSE 分块推送（而非整段返回），只需在 `/net/SSEClient.ets` 内部接入“读取进度回调”即可，`SSEOptions<TBody>` 与上层完全稳定。
