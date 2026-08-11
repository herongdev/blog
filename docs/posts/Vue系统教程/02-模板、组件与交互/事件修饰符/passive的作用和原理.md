---
title: "passive的作用和原理"
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
description: "passived 主要用于优化浏览器页面滚动的性能，让页面滚动更顺滑 ：可能是目前最好用的移动端滚动插件 passived 产生的历史时间线 在早期 addEventListener 是这样的： 是否允许事件捕捉，但是很少会传 true ，然后就变成可选项了： 到现在就变成了这个。"
sidebarWeight: 26
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/事件修饰符/passive的作用和原理.md"
---
::: v-pre

# passive的作用和原理

> 本节目标：理解“passive的作用和原理”的核心思路，并能把它用于实际开发或面试表达。
`passived`主要用于优化浏览器页面滚动的性能，让页面滚动更顺滑

```
~~
BetterScroll
```

：可能是目前最好用的移动端滚动插件
`passived`产生的历史时间线
在早期`addEventListener`是这样的：

```
addEventListener(type, listener, useCapture)
useCapture:
```

是否允许事件捕捉，但是很少会传`true`，然后就变成可选项了：

```
addEventListener(type, listener[, useCapture ])
```
 到现在就变成了这个样子：

```
addEventListener(type, listener, {    capture: false, //
```

==捕获==

```
    passive: false,     once: false    //
```

==只触发一次==

```
})
```

`passive`**的出现**
`passive`这个修饰符会执行默认方法。
明明默认执行的，为什么会设置这样一个修饰符。这就要说一下这个修饰符的本意了。

【浏览器只有等内核线程执行到事件监听器对应的`JavaScript`代码时，才能知道内部是否会调用`preventDefault`函数来阻止事件的默认行为，所以浏览器本身是没有办法对这种场景进行优化的。这种场景下，用户的手势事件无法快速产生，会导致页面无法快速执行滑动逻辑，从而让用户感觉到页面卡顿。】

通俗点说就是每次事件产生，浏览器都会去查询一下是否有`preventDefault`阻止该次事件的默认动作。我们加上`passive`**就是为了告诉浏览器，不用查询了，我们没用**`preventDefault`**阻止默认动作。**

这里一般用在滚动监听，`@scoll`，`@touchmove` 。因为滚动监听过程中，移动每个像素都会产生一次事件，每次都使用内核线程查询`prevent`会使滑动卡顿。我们通过`passive`将内核线程查询跳过，可以大大提升滑动的流畅度。
**注：**`passive`**和**`prevent`**冲突，不能同时绑定在一个监听器上。**

:::
