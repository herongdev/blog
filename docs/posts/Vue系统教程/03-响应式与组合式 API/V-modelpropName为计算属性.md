---
title: "V-modelpropName为计算属性"
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
description: "V model:propName 为计算属性，并且这个计算属性有 get 和 set 属性，可读可写； get 方法用来计算出 propName 的值； set 方法用来当 v model 中 update 事件发生时，我们将得到的新值赋值给 get 方法中的响应式变量；这里确实。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/V-modelpropName为计算属性.md"
---
::: v-pre

# V-modelpropName为计算属性

> 本节目标：理解“V-modelpropName为计算属性”的核心思路，并能把它用于实际开发或面试表达。
`V-model:propName`为计算属性，并且这个计算属性有`get`和`set`属性，可读可写；
`get`方法用来计算出`propName`的值；
`set`方法用来当`v-model`中`update`事件发生时，我们将得到的新值赋值给`get`方法中的响应式变量；这里确实改变了传入的`props`值，但由于我们改变的属性是一个响应式的引用值，`vue`是许可的，并且会重新运行副作用，即重新运行`get`方法来得到新值；如果我们改变的属性值为一个基本值，而不是一个响应式对象的一个属性的话，则这个值由于不是响应性的，将会提示属性是可读的，不能重新赋值；

```
const formulaData = computed({
  get: () => {
    const _formulaData = toRef(otherData.value, "formula");
    return _formulaData.value;
  },
  set: (value) => {
    otherData.value.formula = value;
  },
});
```
 上例中，`otherData`是一个响应式的对象，有`formula`属性，我们更改这个属性值，肯定会被检测到，从而运行副作用，即运行`get`函数，计算新值；

这样，也相当于完成了一个双向绑定：
这种通常用于自定义组件；
即传入的属性值变化了，组件会反应出来；
而组件内部事件的发生，会产生新值，这个新值会修改传入的响应式属性，而属性的变化由于是响应性的，会被检测到，在组件内会重新计算属性值，并最终反应出来；

:::
