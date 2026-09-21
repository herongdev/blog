---
title: "直接Reactive对象和复制一个对象"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "下面用 一个极简可运行的小例子 带你完整走一遍 场景 代码 现象 执行时序 ❌ 错误写法 直接对 core.state 做 reactive example wrong.ts 视图 / watchEffect 不更新 ① Core 改“源对象” ② Vue 看不见 ③ Objec。"
sidebarWeight: 156
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/直接Reactive对象和复制一个对象.md"
---
::: v-pre

# 直接Reactive对象和复制一个对象

> 本节目标：理解“直接Reactive对象和复制一个对象”的核心思路，并能把它用于实际开发或面试表达。
下面用 **一个极简可运行的小例子** 带你完整走一遍

|   |   |   |   |
|---|---|---|---|
|**场景**|**代码**|**现象**|**执行时序**|
|❌ **错误写法**
直接对 core.state 做 reactive|example-wrong.ts|视图 / watchEffect 不更新|① Core 改“源对象”
② Vue **看不见**
③ Object.assign 复制“相同值” → setter 不触发|
|✅ **正确写法**
用 **镜像对象** + sync()|example-right.ts|每次输入 / 失焦立刻更新|① Core 改源对象
② sync() 把“新值”写进 Proxy → setter 触发
③ 视图 & watch响应该变化|

**1. 准备一个「纯逻辑 Core」(core.ts)**
// core.ts —— 不依赖任何框架
export type CoreState = \{ formatted: string; counter: number \}
export function createCore(): \{
  state: CoreState
  parseInput: (str: string) =\> void
  commit: () =\> void
\} \{
  const state: CoreState = \{ formatted: '100', counter: 0 \}
return \{
    state,
    /** 用户每打一个字符 */
    parseInput(str) \{
      state.formatted = str          // ← 直接改原始对象
    \},
    /** 用户失焦 / 回车 */
    commit() \{
      const n = Number(state.formatted)
      state.formatted = Number.isNaN(n) ? '–' : n.toFixed(2)
      state.counter++
    \}
  \}
\}

**2.** **❌** **错误写法：直接 reactive(core.state)**
// example-wrong.ts
import \{ createApp, reactive, watchEffect \} from 'vue'
import \{ createCore \} from './core'
const core = createCore()
const vueState = reactive(core.state)      // 直接把原始对象做成 Proxy
watchEffect(() =\> console.log('-\> watch', vueState.formatted))
const App = \{
  template: `
    \<input :value="vueState.formatted"
           @input="e =\> onInput(e.target.value)"
           @blur="onBlur" /\>
    \<p\>Counter: \{\{ vueState.counter \}\}\</p\>`,
  setup() \{
    const onInput = (v: string) =\> core.parseInput(v)  // 改原始对象
    const onBlur  = () =\> core.commit()                // 改原始对象
    return \{ vueState, onInput, onBlur \}
  \}
\}
createApp(App).mount('#app')
\<img src="https://i.imgur.com/f2vNYnC.gif" width="390" /\>

**现象**：

- 打字 & 失焦后，\<p\> 与 watchEffect **都不更新**。

**一步步发生了什么？**

|   |   |   |   |
|---|---|---|---|
|**时刻**|**操作**|**发生的写入**|**Vue 是否拦截**|
|① 打字|core.parseInput('ccc')|core.state.formatted = 'ccc'（改原始对象）|❌ Proxy 无感知|
|② 失焦|core.commit() 把 'ccc' → 'NaN'|仍改原始对象|❌ Proxy 无感知|
|③ 你若调用 Object.assign(vueState, core.state)|把 'NaN' 复制给同名属性，但
**vueState.formatted 早就是 'NaN'**（因它与原对象同址）|setter 比对旧值 === 新值 → **不触发依赖**||

**3.** **✅** **正确写法：镜像 + sync()**
// example-right.ts
import \{ createApp, reactive, watchEffect \} from 'vue'
import \{ createCore \} from './core'
const core = createCore()
// 复制一份快照做响应式代理
const vueState = reactive(\{ ...core.state \})
function sync() \{
  // 把最新值写回 Proxy（Setter → 触发依赖）
  vueState.formatted = core.state.formatted
  vueState.counter   = core.state.counter
\}
watchEffect(() =\> console.log('-\> watch', vueState.formatted))
const App = \{
  template: `
    \<input :value="vueState.formatted"
           @input="e =\> onInput(e.target.value)"
           @blur="onBlur" /\>
    \<p\>Counter: \{\{ vueState.counter \}\}\</p\>`,
  setup() \{
    const onInput = (v: string) =\> \{ core.parseInput(v); sync() \}
    const onBlur  = () =\> \{ core.commit();       sync() \}
    return \{ vueState, onInput, onBlur \}
  \}
\}
createApp(App).mount('#app')
\<img src="https://i.imgur.com/f2vNYnC.gif" width="390" /\>
**效果**：

- 每次输入立刻打印
- 失焦后被格式化为 123.00 并打印
- Counter 增加

**4. 关键点 & 深拷贝疑问**

|   |   |
|---|---|
|**疑问**|**解释**|
|**reactive(\{ …core.state \}) 是浅拷贝，errors 数组怎么办？**|在 sync() 里
vueState.errors = [...core.state.errors]
重新分配新数组 → setter 始终触发 → 避免引用共享。|
|**能不能直接 Object.assign？**|可以，但务必保证 Core 与 Proxy **不是同一对象**，并确保新旧值不同才能触发。|
|**为什么 Core 不能直接用 Proxy？**|Core 要保持 “框架无关” 及 **可单元测试**；把逻辑与 Vue Proxy 混在一起会让其它框架（React/Vue2/纯 JS）无法复用。|

**TL;DR**

1. **Vue 响应式 = 依赖 Proxy setter**。
2. Core 改原始对象 → Vue 不知道。
3. 用「**镜像 reactive 对象 + 每次写回 setter**」就能两全其美。

:::
