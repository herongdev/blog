---
title: "Object.assign 的目标对象是一个 Proxy，而源对象是该 Proxy 的原始目标对象"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "当 Object.assign(proxy, targetObj) 的目标是 Proxy，源是 Proxy 的原始目标对象（targetObj），Object.assign 会遍历 targetObj 的可枚举属性，并为每个属性执行 proxy[key] targetObj[ke。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object.assign()/Object.assign 的目标对象是一个 Proxy，而源对象是该 Proxy 的原始目标对象.md"
---
::: v-pre

# Object.assign 的目标对象是一个 Proxy，而源对象是该 Proxy 的原始目标对象

> 本节目标：理解“Object.assign 的目标对象是一个 Proxy，而源对象是该 Proxy 的原始目标对象”的核心思路，并能把它用于实际开发或面试表达。
- 当 Object.assign(proxy, targetObj) 的目标是 Proxy，源是 Proxy 的原始目标对象（targetObj），Object.assign 会遍历 targetObj 的可枚举属性，并为每个属性执行 proxy[key] = targetObj[key]。
- 每次赋值都会触发 Proxy 的 set 捕获器，即使 targetObj[key] 与 proxy[key]（通过 targetObj）的值相同。
- 你可以在 set 捕获器中检查值是否相等以避免不必要的更新，或在调用 Object.assign 前过滤属性以优化性能。
- 特殊情况（如循环引用或只读属性）需要注意 set 捕获器的逻辑，以避免错误或意外行为。
- 实际对象（targetObj）的值只会在 set 捕获器明确修改时改变。

:::
