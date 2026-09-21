---
title: "nextTick"
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
description: "可以看出 nextTick 接受一个函数为参数，同时会创建一个微任务 在我们页面调用 nextTick 的时候，会执行该函数，把我们的参数 fn 赋值给 p.then(fn)，在队列的任务完成后，fn 就执行了 由于加了几个维护队列的方法，所以执行顺序是这样的： queueJob。"
sidebarWeight: 64
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/全局api/nextTick.md"
---
::: v-pre

# nextTick

> 本节目标：理解“nextTick”的核心思路，并能把它用于实际开发或面试表达。
```
nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行;
```

```
举例：
<template>
  <div ref="test">{{ name }}</div>
  <el-button @click="handleClick">按钮</el-button>
</template>
 <script setup>
import { ref, nextTick } from "vue";
const name = ref("沐华");
const test = ref(null);
async function handleClick() {
  name.value = "掘金";
  console.log(test.value.innerText); // 沐华
  await nextTick();
  console.log(test.value.innerText); // 掘金
}
</script>
Vue3 里这一块有大改，不过事件循环的原理还是一样，只是加了几个专门维护队列的方法，以及关联到 effect，不过好在这里源码的代码不多，所以不如直接看源码会更容易理解
```

```
**nextTick 源码剖析**
源码版本：3.2.11，源码地址：packages/runtime-core/src/sheduler.ts
const resolvedPromise: Promise<any> = Promise.resolve()
let currentFlushPromise: Promise<void> | null = null
export function nextTick<T = void>(this: T, fn?: (this: T) => void): Promise<void> {
  const p = currentFlushPromise || resolvedPromise
  return fn
    ? p.then(this ? fn.bind(this) : fn)
    : p
}
```

可以看出 nextTick 接受一个函数为参数，同时会创建一个微任务
在我们页面调用 nextTick 的时候，会执行该函数，把我们的参数 fn 赋值给 p.then(fn)，在队列的任务完成后，fn 就执行了

由于加了几个维护队列的方法，所以执行顺序是这样的：
queueJob -\> queueFlush -\> flushJobs -\> nextTick参数的 fn

现在不知道都是干嘛的不要紧，几分钟后你就会清楚了
我们按顺序来，先看一下入口函数 queueJob 是在哪里调用的，看代码

:::
