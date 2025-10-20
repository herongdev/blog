---

title: 前端用 Vue/React 怎么优雅展示 SSE 流？（含节流策略与代码片段）
date: 2025-10-14
tags: [ ]

---

## TL;DR

* 是的，主流做法是：**收到 SSE 数据 → 追加到响应式变量 → 触发 UI 渲染**。
* 但为了**不卡顿**、**省电**：应做**节流/合并刷新**（如 `requestAnimationFrame`、最小片段阈值、标点触发、最大等待间隔）。

---

## 常见两种接入方式

1. **EventSource**（最简）：浏览器原生 SSE 客户端，事件即拿即用。
2. **fetch + ReadableStream**：逐块读取 `text/event-stream` 行，更灵活（Node/SSR 同构或自定义解析）。

---

## Vue 3（Composition API）最小实现（含节流）

> 目标：**增量显示**且**合并更新**，避免每个 token 都触发重渲染。

```ts
// useSSEStream.ts
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useSSEStream(url: string) {
  const text = ref('')        // UI 绑定的响应式内容
  let buffer = ''             // 增量缓冲，不直接触发渲染
  let es: EventSource | null = null
  let rafId = 0
  let lastFlushTs = 0

  // 【复杂逻辑】统一的“合并刷新”函数：用 rAF + 时间上限 + 最小片段阈值
  const scheduleFlush = () => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      rafId = 0
      // ① 最小片段阈值：避免 1~2 字频繁重绘
      if (buffer.length < 6 && performance.now() - lastFlushTs < 80) {
        // 不满足最低阈值与时间间隔，延后
        scheduleFlush()
        return
      }
      // ② 标点触发（中文逗号/句号/问号/换行）
      const punctuations = /[，。！？\n]/.test(buffer)
      // ③ 最大等待时间：即使没到阈值，也要兜底刷新
      const timedOut = performance.now() - lastFlushTs > 200

      if (buffer.length >= 6 || punctuations || timedOut) {
        text.value += buffer
        buffer = ''
        lastFlushTs = performance.now()
      } else {
        scheduleFlush()
      }
    })
  }

  onMounted(() => {
    es = new EventSource(url, { withCredentials: false })

    es.addEventListener('message', (e) => {
      // 服务器每帧发的是 data: "<chunk>"（JSON/纯文本均可）
      const payload = e.data
      if (payload === '[DONE]') {
        // 可选：流结束后做收尾，比如滚动到底部
        return
      }
      buffer += payload
      scheduleFlush()
    })

    es.addEventListener('error', () => {
      // 可选：自动重连或回退到一次性 HTTP
      es?.close()
    })
  })

  onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId)
    es?.close()
  })

  return { text }
}
```

```vue
<!-- ChatStream.vue -->
<script setup lang="ts">
import { useSSEStream } from './useSSEStream'
// 示例：指向你的 /ai/scenario-dialog/stream
const { text } = useSSEStream('https://your.domain.com/ai/scenario-dialog/stream')
</script>

<template>
  <div class="ai-reply">{{ text }}</div>
</template>
```

---

## React（Hooks）最小实现（EventSource + 节流）

> 同样用 **缓冲区 + rAF 合并刷新**，避免频繁 setState。

```tsx
// useSSEStream.tsx
import { useEffect, useRef, useState } from 'react'

export function useSSEStream(url: string) {
  const [text, setText] = useState('')
  const bufferRef = useRef('')
  const rafRef = useRef<number | null>(null)
  const lastFlushRef = useRef(0)
  const esRef = useRef<EventSource | null>(null)

  // 【复杂逻辑】合并刷新策略：rAF + 最小片段 + 标点触发 + 最大等待
  const scheduleFlush = () => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const buffer = bufferRef.current
      const now = performance.now()
      const small = buffer.length < 6 && (now - lastFlushRef.current) < 80
      const punct = /[，。！？\n]/.test(buffer)
      const timeout = (now - lastFlushRef.current) > 200

      if (!small || punct || timeout) {
        if (buffer.length) {
          setText(prev => prev + buffer)
          bufferRef.current = ''
          lastFlushRef.current = now
        }
      } else {
        scheduleFlush()
      }
    })
  }

  useEffect(() => {
    const es = new EventSource(url)
    esRef.current = es

    es.addEventListener('message', (e) => {
      const payload = (e as MessageEvent).data
      if (payload === '[DONE]') return
      bufferRef.current += payload
      scheduleFlush()
    })

    es.addEventListener('error', () => {
      es.close()
      // TODO: 按需回退到 HTTP 或 WebSocket
    })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      es.close()
    }
  }, [url])

  return { text }
}
```

```tsx
// ChatStream.tsx
import { useSSEStream } from './useSSEStream'

export default function ChatStream() {
  const { text } = useSSEStream('https://your.domain.com/ai/scenario-dialog/stream')
  return <div className="ai-reply">{text}</div>
}
```

---

## 如果你是 fetch + ReadableStream（自定义解析）

> 适合需要自实现“行解析/JSON 解码/断点续传”的场景；Node/同构也常用。

```ts
// 【复杂逻辑】逐行解析 text/event-stream：以 \n\n 作为事件帧边界，提取以 "data: " 开头的行
async function readEventStream(resp: Response, onData: (chunk: string) => void) {
  const reader = resp.body!.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    // 分帧：SSE 以空行结尾
    const parts = buf.split('\n\n')
    buf = parts.pop() || ''
    for (const frame of parts) {
      const lines = frame.split('\n')
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim()
          if (data === '[DONE]') return
          onData(data)
        }
      }
    }
  }
}
```

---

## 必要的节流/合并策略（经验参数）

* **最小片段阈值**：累计 ≥ **6 个字符**再刷新；
* **标点触发**：遇到 `，。！？\n` 立即刷新（读起来更自然）；
* **最大等待时间**：即使没到阈值，**200ms** 必刷一次，保证“持续在动”；
* **rAF 合批**：用 `requestAnimationFrame` 将多次追加合并为一次 DOM 更新；
* **滚动定位**：刷新后若需跟随到底部，**节流滚动**（如每 100ms 执行一次平滑滚动）；
* **取消与回退**：用户改问题时停止当前流（关闭 EventSource / AbortController），再发新流。

---

## 与 WebSocket 的一致思路

* 即便是 **WS** 流式文本，同样建议走“**缓冲 → 合并刷新**”的策略；唯一区别是接收端事件由 `onmessage` 驱动，数据格式多为你自定义的 JSON（如 `{type:'chunk', text:'...'}`）。

---

## 常见坑

* **频繁 setState / ref.value**：卡顿、耗电；务必加“缓冲+节流”。
* **Nginx/网关缓冲**：忘记关闭会导致“等很久才齐刷刷出现”。（SSE 已在你服务器配置中给出解决方案）
* **编码问题**：增量分片恰好切在多字节 UTF-8 中间，必须用 `TextDecoder(stream:true)`。
* **错误恢复**：网络波动断流时可**指数退避重连**；但注意**避免重复拼接**（可用最后一帧 id 去重）。

---

## 你可以直接照做

1. 在 Vue/React 里按上面 **Hook/Composable** 接入，绑定到对话气泡的内容。
2. 保留你现有的 **WS 优先 → SSE 回退 → HTTP 兜底** 策略，三者都复用同一套“缓冲 + 节流”更新逻辑。
3. 需要我给你**ArkTS（HarmonyOS）版的 `fetch + ReadableStream` SSE 解析器**吗？可以作为你当前 WS 的再下一层回退分支，风格与上面一致。
