---
title: "runtime-core-createRender"
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
description: "围绕“runtime-core-createRender”整理的概念、示例与实践笔记。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/runtime-core-createRender.md"
---
::: v-pre

# runtime-core-createRender

> 本节目标：理解“runtime-core-createRender”的核心思路，并能把它用于实际开发或面试表达。
```
runtime-core/packages/runtime-core/src/renderer.ts
一、创建元素
二、创建属性
三、处理子元素
四、将元素插入到容器
```

```
import { ShapeFlags } from "@vue/shared";
export function createRenderer(renderOptions) {
  let {
    // 增加 删除 修改 查询
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText,
    setText: hostSetText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    createElement: hostCreateElement,
    createText: hostCreateText,
    patchProp: hostPatchProp
    // 文本节点 ， 元素中的内容
  } = renderOptions

 //  核心的patch方法
  const patch = (n1, n2, container) => {
    // n2 可能是一个文本
    if (n1 === n2) return;
    if (n1 == null) {
      // 初次渲染
      // 后续还有组件的初次渲染，目前是元素的初始化渲染
      mountElement(n2, container);
    } else {
      // 更新流程
    }
  }

const mountElement = (vnode, container) => {
    let { type, props, children, shapeFlag } = vnode;
    let el = vnode.el = hostCreateElement(type);
    // 将真实元素挂载到这个虚拟节点上，后续用于复用节点和更新
    if (props) {
      for (let key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    // 在vnode.ts中，let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;
    // 最后还会进行|运行，即：
    // vnode.shapeFlag | （ShapeFlags.ARRAY_CHILDREN或者ShapeFlags.TEXT_CHILDREN）
    // shapeFlag中包含了children的类型，就像权限管理赋予权限一样
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) { // 文本
      hostSetElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 数组
      mountChildren(children, el)
    }
    hostInsert(el, container)
  }
```

```
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container)
    }
  }
```

```
  // vnode 虚拟dom
  const render = (vnode, container) => {
    // 渲染过程是用你传入的renderOptions来渲染
    if (vnode == null) {
      // 卸载逻辑
    } else {
      // 这里既有初始化的逻辑，又有更新的逻辑
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
    // 如果当前vnode是空的话
  }
```

```
  return {
    render
  }
}
```

:::
