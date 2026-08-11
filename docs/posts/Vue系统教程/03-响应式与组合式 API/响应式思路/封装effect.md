---
title: "封装effect"
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
description: "未被代理的属性被修改时，不应该触发effect函数执行；所以，不能使用Set来收集副作用函数。"
sidebarWeight: 79
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/响应式思路/封装effect.md"
---
::: v-pre

# 封装effect

> 本节目标：理解“封装effect”的核心思路，并能把它用于实际开发或面试表达。
```
// 存储副作用函数的桶
const bucket = new Set()
// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    bucket.add(activeEffect)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶里取出并执行
    bucket.forEach(fn => fn())
  }
})
```

```
// 用一个全局变量存储当前激活的 effect 函数
let activeEffect
function effect(fn) {
  // 当调用 effect 注册副作用函数时，将activeEffect指向当前副作用函数
  activeEffect = fn
  // 执行副作用函数
  fn()
}
effect(() => {
  console.log('effect run')
  document.body.innerText = obj.text
})
setTimeout(() => {
  obj.text2 = 'hello vue3'
}, 1000)
```

未被代理的属性被修改时，不应该触发effect函数执行；所以，不能使用Set来收集副作用函数；

:::
