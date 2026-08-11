---
title: "Reflect的使用"
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
description: "围绕“Reflect的使用”整理的概念、示例与实践笔记。"
sidebarWeight: 82
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现Reactive/Reflect的使用.md"
---
::: v-pre

# Reflect的使用

> 本节目标：理解“Reflect的使用”的核心思路，并能把它用于实际开发或面试表达。
```
Reflect的使用
```

```
import { isObject } from "@vue/shared";
// 只能做对象的代理
export function reactivity(object) {
  if (!isObject) {
    return
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
  return proxy
}
```

:::
