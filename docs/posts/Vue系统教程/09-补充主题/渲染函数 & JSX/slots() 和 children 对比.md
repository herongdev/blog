---
title: "slots() 和 children 对比"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "补充主题"
description: "你可能想知道为什么同时需要 slots() 和 children 。 slots().default 不是和 children 类似的吗？在一些场景中，是这样——但如果是如下的带有子节点的函数式组件呢？ 对于这个组件， children 会给你两个段落标签，而 slots().d。"
sidebarWeight: 8
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/可复用和组合/渲染函数 & JSX/slots() 和 children 对比.md"
---
::: v-pre

# slots() 和 children 对比

> 本节目标：理解“slots() 和 children 对比”的核心思路，并能把它用于实际开发或面试表达。
==你可能想知道为什么同时需要== `slots()` ==和== `children`==。==`slots().default` ==不是和== `children` ==类似的吗？在一些场景中，是这样——但如果是如下的带有子节点的函数式组件呢？==

```
<my-functional-component>  <p v-slot:foo>    first  </p>  <p>second</p></my-functional-component>
```
 ==对于这个组件，==`children` ==会给你两个段落标签，而== `slots().default` ==只会传递第二个匿名段落标签，==`slots().foo` ==会传递第一个具名段落标签。同时拥有== `children` ==和== `slots()`==，因此你可以选择让组件感知某个插槽机制，还是简单地通过传递== `children`==，移交给其它组件去处理。==

==模板编译==
==你可能会有兴趣知道，==`Vue` ==的模板实际上被编译成了渲染函数。这是一个实现细节，通常不需要关心。但如果你想看看模板的功能具体是怎样被编译的，可能会发现会非常有意思。下面是一个使用== `Vue.compile` ==来实时编译模板字符串的简单示例：==
 \> 来自

```
 <https://cn.vuejs.org/v2/guide/render-function.html>
```

:::
