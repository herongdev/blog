---
title: "src-nodeOps.ts"
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
description: "围绕“src-nodeOps.ts”整理的概念、示例与实践笔记。"
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/src-nodeOps.ts.md"
---
::: v-pre

# src-nodeOps.ts

> 本节目标：理解“src-nodeOps.ts”的核心思路，并能把它用于实际开发或面试表达。
```
export const nodeOps = {
  // 增加 删除 修改 查询
  insert(child, parent, anchor = null) {
    // insertBefore 可以等价于appendChild
    parent.insertBefore(child, anchor);
  },
  remove(child) { // 删除节点
    const parentNode = child.parentNode;
    if (parentNode) {
      parentNode.removeChild(child)
    }
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  setText(node, text) {
    // document.createTextNode()
    node.nodeValue = text;
  },
  querySelector(selector) {
    return document.querySelector(selector)
  },
  parentNode(node) {
    return node.parentNode
  },
  nextSibling(node) {
    return node.nextSibling
  },
  createElement(tagName) {
    return document.createElement(tagName);
  },
  createText(text) {
    return document.createTextNode(text);
  }
  // 文本节点 ， 元素中的内容
}
```

:::
