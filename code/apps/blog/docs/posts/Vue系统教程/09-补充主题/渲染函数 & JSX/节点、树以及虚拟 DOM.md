---
title: "节点、树以及虚拟 DOM"
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
description: "在深入渲染函数之前，了解一些浏览器的工作原理是很重要的。以下面这段 HTML 为例： 当浏览器读到这些代码时，它会建立一个 “ DOM 节点”树 来保持追踪所有内容。上述 HTML 对应的 DOM 节点树如下图所示： 每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/可复用和组合/渲染函数 & JSX/节点、树以及虚拟 DOM.md"
---
::: v-pre

# 节点、树以及虚拟 DOM

> 本节目标：理解“节点、树以及虚拟 DOM”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
==在深入渲染函数之前，了解一些浏览器的工作原理是很重要的。以下面这段== `HTML` ==为例：==

```
<div>  <h1>My title</h1>  Some text content  <!-- TODO: Add tagline --></div>
```
 ==当浏览器读到这些代码时，它会建立一个====“==`DOM` ==节点”树====来保持追踪所有内容。上述== `HTML` ==对应的== `DOM` ==节点树如下图所示：==

==每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。高效地更新所有这些节点会是比较困难的，不过所幸你不必手动完成这个工作。你只需要告诉== `Vue` ==你希望页面上的== `HTML` ==是什么，这可以是在：==
==一个模板里：==

```
<h1>{{ blogTitle }}</h1>
```
 ==或者一个渲染函数里：==

```
render: function (createElement) {  return createElement('h1', this.blogTitle)}
```
 ==在这两种情况下，==`Vue` ==都会自动保持页面的更新，即便== `blogTitle` ==发生了改变。==

**虚拟**

```
 DOM
Vue
```

==通过建立一个====虚拟== `DOM` ==来追踪自己要如何改变真实== `DOM`==。请仔细看这行代码：==

```
return createElement('h1', this.blogTitle)
createElement
```

 ==到底会返回什么呢？其实不是一个==_实际的_ `DOM` ==元素。它更准确的名字可能是== `createNodeDescription`==，因为它所包含的信息会告诉== `Vue` ==页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点== `(virtual node)`==”，也常简写它为“==`VNode`==”。“虚拟== `DOM`==”是我们对由== `Vue` ==组件树建立起来的整个== `VNode` ==树的称呼。==

:::
