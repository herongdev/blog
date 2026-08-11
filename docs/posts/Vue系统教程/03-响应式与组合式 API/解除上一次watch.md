---
title: "解除上一次watch"
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
description: "当用户在输入框中输入内容的时候，我们要根据输入的内容返回ajax结果； 如果watch输入的内容，输入框的内容一变化就可以访问接口，渲染页面可能会出现什么问题呢？ 光加上防抖不够； 因为每次请求返回的时间是不一样的，可能后面的请求先返回，显示了后面的结果； 实现： 给watch的。"
sidebarWeight: 122
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/解除上一次watch.md"
---
::: v-pre

# 解除上一次watch

> 本节目标：理解“解除上一次watch”的核心思路，并能把它用于实际开发或面试表达。
当用户在输入框中输入内容的时候，我们要根据输入的内容返回ajax结果；

如果watch输入的内容，输入框的内容一变化就可以访问接口，渲染页面可能会出现什么问题呢？
光加上防抖不够；
因为每次请求返回的时间是不一样的，可能后面的请求先返回，显示了后面的结果；

实现：
给watch的第二个参数即调度函数传入第三个参数：onCleanup，每次执行本次调度函数的时候，会执行上一次watch的onCleanup；

```
const state = reactive({ flag: true, name: 'jw', age: 30 })
let i = 2000;
function getData(timer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(timer)
        }, timer);
    })
}
watch(() => state.age, async (newValue, oldValue, onCleanup) => {
    let clear = false;
    onCleanup(() => {
        clear = true;
    })
    i -= 1000;
    let r = await getData(i); // 第一次执行1s后渲染1000， 第二次执行0s后渲染0， 最终应该是0
    if (!clear) { document.body.innerHTML = r; }
}, { flush: 'sync' });
state.age = 31;
state.age = 32;
// 第一次调用watch的时候传入一个回调， 第二次调用watch的时候执行上一次传入的回调
```

```
在上例中：
// 1) 第一次调用watch的时候用户注入一个取消的回调
// 2) 第二次调用watch的时候会执行第一次用户注入的回调
// 3) 第三次调用watch会执行第二次注入的回调
// 后面的watch触发会将上次watch中的clear 置为true
export function watch(source, cb) {
  let getter;
  if (isReactive(source)) {
    getter = () => traversal(source)
  } else if (isFunction(source)) {
    getter = source
  } else {
    return
  }
  let cleanup;
  const onCleanup = (fn) => {
    cleanup = fn; // 保存用户的函数
  }
  let oldValue;
  const job = () => {
    if (cleanup) cleanup(); // 下一次watch开始触发上一次watch的清理
    const newValue = effect.run();
    cb(newValue, oldValue, onCleanup);
    oldValue = newValue
  }
  // 在effect中访问属性就会依赖收集
  const effect = new ReactiveEffect(getter, job);
  oldValue = effect.run();
}
```

:::
