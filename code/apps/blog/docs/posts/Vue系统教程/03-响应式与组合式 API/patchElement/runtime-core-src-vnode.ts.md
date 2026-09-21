---
title: "runtime-core-src-vnode.ts"
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
description: "围绕“runtime-core-src-vnode.ts”整理的概念、示例与实践笔记。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/patchElement/runtime-core-src-vnode.ts.md"
---
::: v-pre

# runtime-core-src-vnode.ts

> 本节目标：理解“runtime-core-src-vnode.ts”的核心思路，并能把它用于实际开发或面试表达。
```
import { isArray, isString, ShapeFlags } from "@vue/shared";
export const Text = Symbol('Text')
export function isVnode(value) {
  return !!(value && value.__v_isVnode)
}
export function isSameVnode(n1, n2) {
  // 要求是标签名和key都相等
  return (n1.type === n2.type) && (n1.key === n2.key)
}
export function createVnode(type, props, children = null) {
  // 虚拟节点类型ShapeFlags：组件、元素、文本；
  // 1为元素，其它为0，1和0均当作二进制数
  let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;
  const vnode = {
    type,
    props,
    children,
    el: null,
    key: props?.['key'],
    __v_isVnode: true,
    shapeFlag
  }
  // 为ShapeFlags加上children标识
  if (children) {
    // 默认为0，即不影响原ShapFlags类型
    let type = 0;
    // children不是数组，就是文本；或是默认值null
    if (isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN;
    } else {
      // 是否考虑null值？
      children = String(children);
      type = ShapeFlags.TEXT_CHILDREN;
    }
    vnode.shapeFlag |= type
  }
  return vnode
}
```

:::
