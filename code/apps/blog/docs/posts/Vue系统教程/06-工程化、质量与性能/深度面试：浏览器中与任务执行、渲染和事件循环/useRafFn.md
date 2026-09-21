---
title: "useRafFn"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "下面基于 VueUse v12+ 的源码声明，给出 准确 的 useRafFn 使用文档总结。 1. 功能简介 在浏览器每次重绘前（requestAnimationFrame），调用指定函数；并可随时暂停／恢复，还能限制最大帧率。 2. 接口签名 declare function。"
sidebarWeight: 55
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/深度面试：浏览器中与任务执行、渲染和事件循环/useRafFn.md"
---
::: v-pre

# useRafFn

> 本节目标：理解“useRafFn”的核心思路，并能把它用于实际开发或面试表达。
下面基于 VueUse v12+ 的源码声明，给出**准确**的 useRafFn 使用文档总结。

**1. 功能简介**
在浏览器每次重绘前（requestAnimationFrame），调用指定函数；并可随时暂停／恢复，还能限制最大帧率。

**2. 接口签名**
declare function useRafFn( fn: (args: UseRafFnCallbackArguments) =\> void, options?: UseRafFnOptions): Pausable

- **fn**
    - 回调函数，每帧触发时执行
    - 参数是一个对象 \{ delta, timestamp \}
- **options** (UseRafFnOptions)
    - immediate?: boolean
        - 初始化后是否立刻开启 RAF 循环
        - **默认：true**
    - fpsLimit?: number
        - 限制最大调用频率（帧/秒），undefined 表示不限制
        - 例如 fpsLimit: 10 表示每秒最多调用 10 次，等价于 ~100ms 间隔
- **返回值** (Pausable)interface Pausable \{ pause(): void // 暂停 RAF 循环 resume(): void // 恢复 RAF 循环 isActive: Ref\<boolean\> // 当前循环是否在运行中\}

**3. 回调参数详解**
interface UseRafFnCallbackArguments \{ /** 本次回调距离上次触发的时间差（ms） */ delta: number /** 从页面加载到当前的高精度时间戳 */ timestamp: DOMHighResTimeStamp\}

- delta：与上一次执行之间的间隔，用于做运动或节流判断。
- timestamp：performance.now() 提供的时间，用于精确测量。

**4. 典型用法**
\<script setup lang="ts"\>

import \{ useRafFn \} from '@vueuse/core'
let count = ref(0)
// 每帧执行，并输出 delta
const \{ pause, resume, isActive \} = useRafFn((\{ delta, timestamp \}) =\> \{
  count.value++
  console.log(`第 ${count.value} 帧，距上次 ${delta.toFixed(1)} ms，总时长 ${timestamp.toFixed(1)} ms`)
\}, \{
  immediate: false,    // 不自动启动
  fpsLimit: 10,        // 最多 10 FPS
\})
// 某个事件触发时，开始循环
function start() \{
  resume()
\}
// 停止循环
function stop() \{
  pause()
\}

\</script\>

- **节流**：通过 fpsLimit 控制最大帧率，不需自己计算 Date.now() 间隔。
- **手动控制**：immediate: false 可以在需要时再 resume() 而非页面加载即开始。
- **暂停判断**：可在回调内部根据业务条件自动 pause()，例如数据为空就停掉循环。

**5. 与 setTimeout 区别**

- useRafFn 与浏览器重绘完全同步，动画更流畅；
- fpsLimit 内部依旧使用 RAF，但跳过不必要的帧，避免过高的调用频率；
- setTimeout 受底层最小 4 ms clamp & 后台节流影响，并不与绘制同步，易产生“抖动”或“漂移”。
 \> 来自 \<[https://chatgpt.com/c/6826b40a-17d4-8004-8e2c-1a024db519bc](https://chatgpt.com/c/6826b40a-17d4-8004-8e2c-1a024db519bc)\>

:::
