---
title: "封装trigger和track"
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
description: "围绕“封装trigger和track”整理的概念、示例与实践笔记。"
sidebarWeight: 80
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/响应式思路/封装trigger和track.md"
---
::: v-pre

# 封装trigger和track

> 本节目标：理解“封装trigger和track”的核心思路，并能把它用于实际开发或面试表达。
```
// 存储副作用函数的桶
const bucket = new WeakMap()
// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶里取出并执行
    trigger(target, key)
  }
})
```

```
function track(target, key) {
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}
```

```
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn => fn())
}
```

```
// 用一个全局变量存储当前激活的 effect 函数
let activeEffect
function effect(fn) {
  // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
  activeEffect = fn
  // 执行副作用函数
  fn()
}
effect(() => {
  console.log('effect run')
  document.body.innerText = obj.text
})
setTimeout(() => {
  trigger(data, 'text')
}, 1000)
```

:::
