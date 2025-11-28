---
title: HarmonyOS ArkTS（.ets）与 TypeScript 的差异速修：定位并修掉你截图里的 15 个问题
date: 2025-10-15
tags:
---

## 背景

你在 `.ets` 中写了一个基于 `fetch + ReadableStream` 的 SSE 客户端，ArkTS 编译/检查抛出一串错误（见图）。这些错误可以分成两类：

1. **语法/风格受限**：不允许 `any/unknown`、不支持**解构变量声明**、不支持**展开/剩余（spread/rest）**、不建议/不支持 `globalThis`。
2. **标准库类型缺失**：`AbortSignal`、`TextDecoder`、`Response`、`fetch`、`ReadableStream` 在 ArkTS 环境没有 DOM 类型声明。

本文给出**对照式最小改动**，每条只给出需要调整的代码；遇到复杂逻辑时在上一行加注释。

---

## 整体思路

- **ArkTS 更保守**：尽量避免“语法糖”，把 TS 常见写法变成“显式、平铺”的老派写法。
- **缺失类型自己补**：用“**零运行时开销**”的最小类型声明（`declare interface/declare class`）让编译器闭嘴。
- **能力探测要温和**：不要直接用 `globalThis`；能 `try/catch` 就别 `typeof globalThis.xxx`。

---

## 逐条修复清单（对照式）

### 1) `arkts-no-any-unknown`：禁止 `any/unknown`

**TS 写法（问题点）**

```ts
body?: any;
```

**ETS 改法**

```ts
// 将 any 精准化为可序列化的联合
body?: object | string | number | boolean | null;
```

---

### 2) `arkts-no-destruct-decls`：不支持解构**变量声明**

**TS 写法（问题点）**

```ts
const { value, done } = await reader.read();
```

**ETS 改法**

```ts
// 【复杂逻辑】避免解构声明，先接 result 再逐项取值
const result = await reader.read();
const done = result.done;
const value = result.value;
```

> 说明：**函数参数**里尽量也不要用解构；能提前取出再用更稳。

---

### 3) `arkts-no-spread`：不支持对象/数组展开

**TS 写法（问题点）**

```ts
headers: {
  'Content-Type': 'application/json',
  'Accept': 'text/event-stream',
  ...(headers || {})
}
```

**ETS 改法**

```ts
// 【复杂逻辑】用显式赋值循环代替对象展开
const hdrs: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "text/event-stream",
};
if (headers) {
  for (const k in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, k)) {
      hdrs[k] = headers[k];
    }
  }
}
// 使用 hdrs
```

---

### 4) `arkts-no-globalthis`：不支持 `globalThis`

**TS 写法（问题点）**

```ts
const hasFetch = typeof (globalThis as any).fetch === "function";
const canStream = !!(globalThis as any).ReadableStream;
```

**ETS 改法（两种任选其一）**

**A. 延迟验证 + try/catch（推荐）**

```ts
// 【复杂逻辑】用 try/catch 做能力探测，避免直接引用全局名导致类型报错
let hasTextDecoder = true;
try {
  new TextDecoder("utf-8");
} catch (_) {
  hasTextDecoder = false;
}
```

**B. 直接使用标识符 + 编译期最小声明**

```ts
// 声明放在文件顶部：让编译器知道有这些全局（不会生成运行时代码）
declare function fetch(...args: any[]): Promise<any>;
declare class TextDecoder {
  constructor(label?: string);
  decode(u8?: Uint8Array, opts?: { stream?: boolean }): string;
}

// 代码里直接使用 fetch/TextDecoder，而不是 globalThis.fetch
```

---

### 5) `Cannot find name 'AbortSignal'/'TextDecoder'/'Response'/'fetch'`

**原因**：ArkTS 默认不带 DOM lib。需要**最小类型声明**（仅供编译通过，不产生 JS）。

**在文件顶部追加（或独立 `types.d.ts` 引入）**

```ts
// ===== 最小类型声明：零运行时开销 =====
interface AbortSignalLike {
  aborted?: boolean;
}
interface ReadableStreamReaderLike {
  read(): Promise<{ value?: Uint8Array; done: boolean }>;
  cancel(): Promise<void> | void;
}
interface ReadableStreamLike {
  getReader(): ReadableStreamReaderLike;
}
interface ResponseLike {
  ok: boolean;
  status: number;
  body: ReadableStreamLike | null;
}

declare function fetch(
  input: string,
  init: {
    method: "POST";
    headers: Record<string, string>;
    body?: string;
    signal?: AbortSignalLike;
  }
): Promise<ResponseLike>;

declare class TextDecoder {
  constructor(label?: string);
  decode(input?: Uint8Array, options?: { stream?: boolean }): string;
}
```

> 如果你已在工程里集中管理类型声明，建议放到 `global.d.ts` 并在编译配置里包含它。

---

### 6) `arkts-no-any-unknown`（二次命中）：参数/返回类型补全

**TS 写法（问题点）**

```ts
onError?: (err: Error) => void;
// catch (err) { onError && onError(err as Error); }
```

**ETS 改法**

```ts
// 【复杂逻辑】缩小 err 的类型范围，避免 unknown/any 传播
catch (e) {
  const error = e instanceof Error ? e : new Error(String(e));
  if (onError) onError(error);
  throw error;
}
```

---

### 7) 其它细节建议（避免触发更多规则）

- **不要使用参数解构**，例如 `function foo({a, b}: {a:number;b:number})`，改成普通参数后在函数体内取出。
- **避免可选链的链式陷阱**（部分旧运行时行为差异），关键路径宁愿 `if`。
- **字符串模板里不要拼太复杂表达式**，出问题就抽变量。

---

## 最小可运行片段（对照）

> 目标：在 ArkTS 环境内稳定读取 SSE 的 `ReadableStream`，并保证中文不被截断。

**TS 常见写法（会报你截图那类错）**

```ts
const { value, done } = await reader.read();
buffer += decoder.decode(value, { stream: true });
```

**ETS 兼容写法**

```ts
// 【复杂逻辑】避免解构；逐项取值更稳
const r = await reader.read();
const done = r.done;
const value = r.value;
if (value) {
  // 【复杂逻辑】保持解码器状态以避免中文被截断
  buffer += decoder.decode(value, { stream: true });
}
```

---

## “问题 ↔ 解决策略”总表（速查）

| 报错/限制                    | 触发场景              | 修法                                          |
| ---------------------------- | --------------------- | --------------------------------------------- |
| `arkts-no-any-unknown`       | `any`/`unknown`       | 改精确联合类型；`catch` 中收敛为 `Error`      |
| `arkts-no-destruct-decls`    | `const {a}=...`       | 先接 `result`，再 `result.a`                  |
| `arkts-no-spread`            | `{...obj}`/`[...arr]` | 用 `for-in` 明确复制；数组用 `push/apply`     |
| `arkts-no-globalthis`        | `globalThis.xxx`      | 直接用标识符 + `declare`，或 `try/catch` 探测 |
| `Cannot find name 'fetch'/…` | 缺 DOM lib            | 写最小 `declare` 接口/类                      |
| `ReadableStream` 相关        | 类型不见              | 自定义 `ReadableStreamLike` 接口              |

---

## 常见坑位答疑

- **Q：我真的不能用解构吗？**
  A：**变量声明处**不要用（`const {a}=...`），函数体内临时变量赋值后再解构式访问是可以被替代的；这样最稳。

- **Q：`globalThis` 为啥不行？**
  A：ArkTS Lint 默认禁，它既影响多端一致性也容易引出缺失类型。用最小 `declare` + 直接标识符更干净。

- **Q：最小类型声明会不会影响运行时？**
  A：不会。`declare` 仅在编译期存在，不会生成任何代码。

---

## 结语

照着上面的**对照式最小改动**把你的 SSE 客户端改一遍，就能把截图里的 15 个问题一次清干净。后续在 ArkTS 写代码的心法是：**少糖、多显式、类型精确、能力探测用 try/catch**。如果你把某段 TS 写法改不过来，丢给我那一小段——我只回你**必要的改动片段**，并在复杂逻辑上一行加注释。
