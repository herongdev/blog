---
title: "h"
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
description: "围绕“h”整理的概念、示例与实践笔记。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/h.md"
---
::: v-pre

# h

> 本节目标：理解“h”的核心思路，并能把它用于实际开发或面试表达。
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
// 第三个参数之后的都为children
export function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    // 为什么要将儿子包装成数组， 因为元素可以循环创建。 文本不需要包装了
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // isObject则可能是对象、函数或数组
      // h('div',{style:{"color":'red'}})
      // h('div',h('span'))，h调用
      // 虚拟节点或属性
      if (isVnode(propsOrChildren)) { // 虚拟节点就包装成数组
        return createVnode(type, null, [propsOrChildren])
      }
      return createVnode(type, propsOrChildren); // 属性
    } else {
      // 包含了!isObject()&&!isArray 和 isObject&&isArray的情况
      // h('div','hello'),文本
      // h('div',[h('span'),h('span')])，数组，数组元素可以是文本或h调用
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
