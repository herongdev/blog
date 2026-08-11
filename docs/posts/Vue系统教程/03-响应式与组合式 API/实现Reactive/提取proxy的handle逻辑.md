---
title: "提取proxy的handle逻辑"
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
description: "围绕“提取proxy的handle逻辑”整理的概念、示例与实践笔记。"
sidebarWeight: 86
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现Reactive/提取proxy的handle逻辑.md"
---
::: v-pre

# 提取proxy的handle逻辑

> 本节目标：理解“提取proxy的handle逻辑”的核心思路，并能把它用于实际开发或面试表达。
```
创建packages/reactivity/src/baseHandle.ts
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
export const mutableHandlers = {
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    };
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver)
  }
}
```

```
修改packages/reactivity/src/reactive.ts
import { isObject } from "@vue/shared";
import { mutableHandlers } from "./baseHandle";
// 1、将数据转化为响应式数据，只能做对象的代理
const reactiveMap = new WeakMap();
const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
export function reactive(target) {
  if (!isObject) {
    return
  }
  // 首次代理一个对象时，对象上肯定没有这个属性，则跳过
  // 对象被代理过后是一个proxy，这时再取这个属性时
  // 会走到get方法的if (key === ReactiveFlags.IS_REACTIVE) 判断中
  // 条件成立，直接返回proxy本身
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
  // 有缓存取缓存
  let existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  };
  const proxy = new Proxy(target, mutableHandlers)
  // 创建缓存
  reactiveMap.set(target, proxy);
  return proxy
}
```

:::
