---
title: "src-vnode.ts"
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
description: "围绕“src-vnode.ts”整理的概念、示例与实践笔记。"
sidebarWeight: 50
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/src-vnode.ts.md"
---
::: v-pre

# src-vnode.ts

> 本节目标：理解“src-vnode.ts”的核心思路，并能把它用于实际开发或面试表达。
```
import { isArray, isString, ShapeFlags } from "@vue/shared";
```

```
export const Text = Symbol('Text');
```

```
export function isVnode(value) {
  return !!(value && value.__v_isVnode)
}
```

```
export function isSameVnode(n1, n2) {
  // 判断两个虚拟节点是否是相同节点，套路是：
  // 一要标签名相同，二要key是一样的
  return (n1.type === n2.type) && (n1.key === n2.key)
}
```

```
// 虚拟节点有很多：组件的、元素的、文本的
export function createVnode(type, props, children = null) {
  // 组合方案 shapeFlag
  // 我想知道一个元素中包含的是多个儿子还是一个儿子，用标识
  let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;
  // 虚拟dom就是一个对象，好处有二：跨平台和便于diff算法。
  // 真实dom的属性比较多，创建和删除费性能
  const vnode = { // key
    type,
    props,
    children,
    el: null, // 虚拟节点上对应的真实节点，后续diff算法
    key: props?.['key'],
    __v_isVnode: true,
    shapeFlag
  }
  if (children) {
    let type = 0;
    if (isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN;
    } else {
      children = String(children);
      type = ShapeFlags.TEXT_CHILDREN;
    }
    // |操作得到的结果是，即是组件或元素，同时还是文本子元素或数组子元素
    // 之后就可以用&操作来判断是文本子元素还是数组子元素了，同权限一个道理
    vnode.shapeFlag |= type
  }
  return vnode
}
```

:::
