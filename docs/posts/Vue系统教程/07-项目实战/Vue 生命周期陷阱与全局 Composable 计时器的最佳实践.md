---
title: "Vue 生命周期陷阱与全局 Composable 计时器的最佳实践"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "一、思路总览 1. 先搞清楚「钩子 在哪些场合会失效 」。 • onMounted / onUnmounted / onScopeDispose 等生命周期 API 只有在 组件的 setup() 调用栈 内才会注册成功。 • Pinia Store、普通模块、表格渲染函数、 c。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/Vue 生命周期陷阱与全局 Composable 计时器的最佳实践.md"
---
::: v-pre

# Vue 生命周期陷阱与全局 Composable 计时器的最佳实践

> 本节目标：理解“Vue 生命周期陷阱与全局 Composable 计时器的最佳实践”的核心思路，并能把它用于实际开发或面试表达。
一、思路总览

1. 先搞清楚「钩子 **在哪些场合会失效**」。
• `onMounted / onUnmounted / onScopeDispose` 等生命周期 API 只有在 **组件的 `setup()` 调用栈** 内才会注册成功。
• Pinia Store、普通模块、表格渲染函数、`console.log()` 调试语句等 **均不属于组件上下文**。

2. 识别常见“失效迹象”。
• `watch()` 的回调只执行一次 `immediate`。
• 计时器、事件监听、WebSocket 未启动。
• ref 从不变化，依赖它的派生值永远是 `undefined` 或初始值。

3. 选取合适的**资源管理模式**：
A. 组件专用：用生命周期 API，随组件创建/销毁。
B. 全局共享：自行启动并引用计数；或直接用 VueUse 现成方案。
C. 混合：先尝试复用已存在的全局实例，若无则在组件内创建。

4. 固化流程：
• 写 composable 时先问自己：“它能被组件外代码调用吗？”
• 若答案可能是“会”，就把计时器 / 监听写成**惰性单例 + 引用计数**。
• 建议 **封装到 composable 内部**，调用方无需关心实现细节。

二、要点详解
1. 为什么生命周期钩子会失效？
Vue 在调用 `setup()` 时会把当前组件实例压栈；`onMounted` 读取栈顶实例并把回调存进它的生命周期队列。
离开 `setup()` 栈后调用 API，栈顶为空 =\> API 无效。

// 组件上下文 ✔️
setup() \{
onMounted(() =\> console.log('mounted'))
\}   // 组件外部 ❌
someUtilFn() \{
onMounted(() =\> console.log('never runs'))
\}

2. 典型错误场景
| 场景 | 表现 |
|-------------------------|-----------------------------------------------------------------|
| Pinia store/composable | `watch(now, ...)` 只跑一次 |
| 表格渲染器 / JSX 函数 | 计时器不走、倒计时不刷新 |
| 纯 JS 工具模块 | 浏览器事件（resize、keydown…）未绑定或无法自动清理 |

3. 解决模式
3.1 组件专用（单组件私有资源）
适用：DOM 事件、一次性动画等**必须**跟随组件销毁。
export function useDrag() \{
const pos = ref(\{ x: 0, y: 0 \})

function onMove(e: MouseEvent) \{ pos.value = \{ x: e.clientX, y: e.clientY \} \}

onMounted(() =\> window.addEventListener('mousemove', onMove))
onUnmounted(() =\> window.removeEventListener('mousemove', onMove))

return \{ pos \}
\}

调用方只能在 `setup()` 内使用，**禁止放到 store**。

3.2 全局单例 + 引用计数（你的计时器案例）
适用：
• 定时 `setInterval` / `requestAnimationFrame`
• WebSocket / SSE 连接
• 全局事件（visibilitychange、online/offline…）

核心要素
1. **共享 Ref**：多处调用返回同一个响应式数据。
2. **引用计数**：有人用就 `++`，没人用就 `--`；`0` 时停止资源。
3. **`getCurrentInstance()` 检测**：只有在组件调用时才注册 `onScopeDispose`。

极简示例（提炼自你的 `useMarketClock` / `useCountdown`）：
export function useNowMinute() \{
  const pool = useNowMinute as unknown as \{ ref?: Ref\<Date\>; c?: number \};
  if (pool.ref) \{
    // 已存在：复用
    pool.c!++;
    release(pool);
    return \{ now: readonly(pool.ref) \};
  \}
  const now = ref(new Date());
  const timer = setInterval(() =\> (now.value = new Date()), 60_000);
  pool.ref = now;
  pool.c = 1;
  release(pool, timer);
  return \{ now: readonly(now) \};
\}
function release(pool: any, timer?: any) \{
  if (!getCurrentInstance()) return; // 仅组件内才自动清理
  onScopeDispose(() =\> \{
    if (--pool.c === 0) \{
      clearInterval(timer);
      delete pool.ref;
    \}
  \});
\}

3.3 直接使用 VueUse
VueUse 已经把上面逻辑封装好了，能用就用：
const now = useDateNow(\{ interval: 60_000 \}) // 计时器自动管理
const \{ pause, resume \} = useWebSocket(url) // WS 自动重连 / 暂停

4. 快速排查清单
1. `getCurrentInstance()` 打印一下 – 若为 `null` 就说明不在组件上下文。
2. 检查是否用了 `onMounted / onUnmounted / watch` 等 API。
3. 若要跨组件/模块共享，改成全局单例或改用 VueUse。
4. 写单测 / 断言：确保首次调用后 *now* 等 ref 会在预期时间变化。

三、用你的代码“最小完现”示例

3.1 Bug 版（生命周期失效）
// ❌ useCountdown.ts（旧）
export function useCountdown(symbol: string) \{
  onMounted(() =\> \{                     // 在组件外被调用时无效
    setInterval(() =\> \{ ... \}, 1000)
  \})
  return \{ countdown \}
\}
调用：
// 表格列渲染器 / 普通函数
function renderRow(sym: string) \{
  const \{ countdown \} = useCountdown(sym)   // 定时器未启动
  return countdown.value                   // 永远是 '--:--'
\}
3.2 改进版（引用计数单例）
// ✅ useCountdown.ts（简化）
const pool = new Map\<string, \{ txt: Ref\<string\>; timer: number; n: number \}\>()
export function useCountdown(sym: string) \{
  if (pool.has(sym)) \{
    const e = pool.get(sym)!
    e.n++
    release(sym, e)
    return \{ countdown: readonly(e.txt) \}
  \}
  const txt = ref('--:--')
  const timer = setInterval(() =\> txt.value = Date.now().toString(), 1000)
  pool.set(sym, \{ txt, timer, n: 1 \})
  release(sym, pool.get(sym)!)
  return \{ countdown: readonly(txt) \}
\}
function release(sym: string, e: any) \{
  if (getCurrentInstance()) \{
    onScopeDispose(() =\> \{
      if (--e.n === 0) \{
        clearInterval(e.timer)
        pool.delete(sym)
      \}
    \})
  \}
\}

表格、store、组件里随处可用且自动清理。

四、结语

• **先区分场景**：组件内 or 全局共享。
• **组件外不要依赖生命周期钩子**，必要时改成单例+引用计数，或直接上 VueUse。
• **写 composable 前先想清楚使用者是谁** —— 这是避免此类 bug 的本质。

:::
