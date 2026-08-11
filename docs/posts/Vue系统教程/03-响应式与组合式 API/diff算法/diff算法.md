---
title: "diff算法"
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
description: "围绕“diff算法”整理的概念、示例与实践笔记。"
sidebarWeight: 29
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/diff算法/diff算法.md"
---
::: v-pre

# diff算法

> 本节目标：理解“diff算法”的核心思路，并能把它用于实际开发或面试表达。
```
runtime-core/src/renderer.ts
const patchChildren = (n1, n2, el) => {
  const c1 = n1.children;
  const c2 = n2.children;
  const prevShapeFlag = n1.shapeFlag; // 之前的
  const shapeFlag = n2.shapeFlag; // 之后的
  // children的可能类型：文本、空的null和数组
  // 现在是文本，之前可能是文本、空的null和数组
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 之前是数组：删除老儿子，设置文本内容
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      unmountChildren(c1)
    }
    if (c1 !== c2) {
      // 包括了文本和空：更新文本即可
      hostSetElementText(el, c2)
    }
  } else {
    // 现在为数组或者为空都写在else里，然后再通过if-else细分
    // 分的时候以之前是不是数组为条件
    // 之前是数组
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 现在是数组
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // diff算法
        ==patchKeyedChildren====(====c1====,== ==c2====,== ==el====);== ==//== ==全量比对==
      } else {
        // 现在是空：删除所有儿子
        unmountChildren(c1); // 空 数组
      }
    } else {
      // 之前是文本或空，现在可能是数组或空
      // 之前不是空，那就之前是文本，
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // 之前是文本和现在是空或数组：清空文本，进行挂载
        hostSetElementText(el, '')   // 数组  文本
      }
      // 之前是空，现在是数组：清空文本，进行挂载
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(c2, el)
      }
      // 之前是空，现在是空：不处理
    }
  }
}
```

:::
