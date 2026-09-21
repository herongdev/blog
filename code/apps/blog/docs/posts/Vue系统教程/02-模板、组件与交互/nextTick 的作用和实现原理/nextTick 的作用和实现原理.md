---
title: "nextTick 的作用和实现原理"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "作用 Vue.nextTick 是 Vue.js 提供的一个方法，用于在下一个 DOM 更新周期结束后执行延迟回调。在 Vue 中，当你修改组件的状态时，Vue 会异步更新 DOM。 nextTick 允许你在 DOM 更新完成后立即执行一些操作。 常见使用场景 1. 操作更新后。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/`nextTick` 的作用和实现原理/`nextTick` 的作用和实现原理.md"
---
::: v-pre

# nextTick 的作用和实现原理

> 本节目标：理解“nextTick 的作用和实现原理”的核心思路，并能把它用于实际开发或面试表达。
作用
`Vue.nextTick` 是 Vue.js 提供的一个方法，用于在下一个 DOM 更新周期结束后执行延迟回调。在 Vue 中，当你修改组件的状态时，Vue 会异步更新 DOM。`nextTick` 允许你在 DOM 更新完成后立即执行一些操作。

常见使用场景
1. **操作更新后的 DOM**：在数据变化后，需要立即操作更新后的 DOM 元素。
2. **获取更新后的 DOM 状态**：在数据变化后，需要获取更新后的 DOM 状态（如尺寸、位置等）。

示例
new Vue(\{
data: \{
message: 'Hello'
\},
methods: \{
updateMessage() \{
this.message = 'Hello, Vue!';
this.$nextTick(() =\> \{
// 在这里操作 DOM 或获取 DOM 状态
console.log(this.$refs.messageElement.textContent); // 获取更新后的 DOM 内容
\});
\}
\},
template: `
\<div\>
\<p ref="messageElement"\>\{\{ message \}\}\</p\>
\<button @click="updateMessage"\>Update Message\</button\>
\</div\>
`
\});

实现原理
`nextTick` 的实现原理依赖于 JavaScript 中的异步队列机制。Vue.js 通过使用微任务（microtasks）和宏任务（macrotasks）来实现这一功能。
1. **微任务（Microtasks）**：通常由 `Promise.then`、`MutationObserver` 等生成。微任务在当前任务结束后立即执行。
2. **宏任务（Macrotasks）**：通常由 `setTimeout`、`setInterval` 等生成。宏任务在所有微任务执行完后才会执行。

实现过程
- Vue 首先尝试使用 `Promise.then`（微任务）来实现异步回调。
- 如果不支持 `Promise`，则尝试使用 `MutationObserver`。
- 如果以上方法都不支持，则使用 `setTimeout`（宏任务）作为回退。

源码实现（简化版）
function nextTick(cb, ctx) \{
var _resolve;
callbacks.push(function() \{
if (cb) \{
try \{
cb.call(ctx);
\} catch (e) \{
handleError(e, ctx, 'nextTick');
\}
\} else if (_resolve) \{
_resolve(ctx);
\}
\});
if (!pending) \{
pending = true;
if (useMicroTask) \{
microTimerFunc();
\} else \{
macroTimerFunc();
\}
\}   if (!cb && typeof Promise !== 'undefined') \{
return new Promise(function(resolve) \{
_resolve = resolve;
\});
\}
\}
var callbacks = [];
var pending = false;
function microTimerFunc() \{
Promise.resolve().then(flushCallbacks);
\}
function macroTimerFunc() \{
setTimeout(flushCallbacks, 0);
\}
function flushCallbacks() \{
pending = false;
var copies = callbacks.slice(0);
callbacks.length = 0;
for (var i = 0; i \< copies.length; i++) \{
copies[i]();
\}
\}

总结
`Vue.nextTick` 的主要作用是在下一个 DOM 更新周期结束后执行回调，用于确保在数据变化后立即操作更新后的 DOM 元素或获取更新后的 DOM 状态。其实现原理是利用 JavaScript 的异步队列机制，通过优先使用微任务（Promise.then），然后回退到宏任务（setTimeout）来实现异步回调。

:::
