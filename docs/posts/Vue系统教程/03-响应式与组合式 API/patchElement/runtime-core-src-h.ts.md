---
title: "runtime-core-src-h.ts"
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
description: "围绕“runtime-core-src-h.ts”整理的概念、示例与实践笔记。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/patchElement/runtime-core-src-h.ts.md"
---
::: v-pre

# runtime-core-src-h.ts

> 本节目标：理解“runtime-core-src-h.ts”的核心思路，并能把它用于实际开发或面试表达。
```
h方法在内部调vnode中的createVnode方法，创建虚拟dom，即返回一个对象；
```

```
h方法是给用户来用的 具备着多样性：
h('div', { style: { "color"：“red” } }, 'hello')
h('div', 'hello')
h('div', null, 'hello', 'world')
h('div', null, h('span'))
h('div', null, [h('span')])
```

```
import { isArray, isObject } from "@vue/shared";
import { createVnode, isVnode } from "./vnode";
// 第二个参数之后的都为children
export function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // isObject则可能是对象、函数或数组，如果不是数组，就是函数或对象了
      // h('div',{style:{"color":'red'}})
      // h('div',h('span'))，h调用返回一个对象
      // h方法返回的vnode或属性
      if (isVnode(propsOrChildren)) {
      // 虚拟节点就包装成数组，即当成子元素
        return createVnode(type, null, [propsOrChildren])
      }
      return createVnode(type, propsOrChildren); // 属性
    } else {
      // 包含了!isObject()&&!isArray 和 isObject&&isArray的情况，则
      // 一、是文本： h('div','hello')
      // 二、是数组： h('div',[h('span'),h('span')])，数组元素可以是文本或h调用
   //  所以属性值为null
      return createVnode(type, null, propsOrChildren); // 是数组或文本
    }
  } else {
    if (l > 3) {
      children = Array.from(arguments).slice(2)
    } else if (l === 3 && isVnode(children)) {
      // h('div,{}',h('span'))
      children = [children]
    }
    // 其他
    // children的情况有两种 文本 / 数组
    return createVnode(type, propsOrChildren, children);
  }
}
```

:::
