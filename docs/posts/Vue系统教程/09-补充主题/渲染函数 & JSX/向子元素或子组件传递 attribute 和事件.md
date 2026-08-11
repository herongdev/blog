---
title: "向子元素或子组件传递 attribute 和事件"
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
description: "在普通组件中，没有被定义为 prop 的 attribute 会自动添加到组件的根元素上，将已有的同名 attribute 进行替换或与其进行 智能合并 。 然而函数式组件要求你显式定义该行为： 完全透传任何 attribute 、事件监听器、子节点等。 通过向 createEl。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/可复用和组合/渲染函数 & JSX/向子元素或子组件传递 attribute 和事件.md"
---
::: v-pre

# 向子元素或子组件传递 attribute 和事件

> 本节目标：理解“向子元素或子组件传递 attribute 和事件”的核心思路，并能把它用于实际开发或面试表达。
==在普通组件中，没有被定义为== `prop` ==的== `attribute` ==会自动添加到组件的根元素上，将已有的同名== `attribute` ==进行替换或与其进行====智能合并====。==
==然而函数式组件要求你显式定义该行为：==

```
Vue.component('my-functional-button', {  functional: true,  render: function (createElement, context) {    //
```

==完全透传任何== `attribute`==、事件监听器、子节点等。==

```
    return createElement('button', context.data, context.children)  }})
```
 ==通过向== `createElement` ==传入== `context.data` ==作为第二个参数，我们就把== `my-functional-button` ==上面所有的== `attribute` ==和事件监听器都传递下去了。事实上这是非常透明的，以至于那些事件甚至并不要求== `.native` ==修饰符。==
==如果你使用基于模板的函数式组件，那么你还需要手动添加== `attribute` ==和监听器。因为我们可以访问到其独立的上下文内容，所以我们可以使用== `data.attrs` ==传递任何== `HTML attribute`==，也可以使用== `listeners` `(`_即_ `data.on` _的别名_`)` ==传递任何事件监听器。==

```
<template functional>  <button    class="btn btn-primary"    v-bind="data.attrs"    v-on="listeners"  >    <slot/>  </button></template>
```

:::
