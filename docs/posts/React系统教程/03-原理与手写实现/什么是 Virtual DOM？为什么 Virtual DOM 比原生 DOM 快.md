---
title: "什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "我对 Virtual DOM 的理解是，首先对我们将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName 、 props 和 Children 这些属性。然后我们将这个 js 对象树给保存下来，最后再将 DOM 片段插入到。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快.md"
---
::: v-pre

# 什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快

> 本节目标：理解“什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快”的核心思路，并能把它用于实际开发或面试表达。
==我对== ==Virtual DOM== ==的理解是，首先对我们将要插入到文档中的== ==DOM== ==树结构进行分析，使用== ==js== ==对象将其表示出来，比如一个元素对象，包含== ==TagName====、====props== ==和== ==Children== ==这些属性。然后我们将这个== ==js== ==对象树给保存下来，最后再将== ==DOM== ==片段插入到文档中。======
==当页面的状态发生改变，我们需要对页面的== ==DOM== ==的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。最后将记录的有差异的地方应用到真正的== ==DOM== ==树中去，这样视图就更新了。==
==我认为== ==Virtual DOM== ==这种方法对于我们需要有大量的== ==DOM== ==操作的时候，能够很好的提高我们的操作效率，通过在操作前确定需要做的最小修改，尽可能的减少== ==DOM== ==操作带来的重流和重绘的影响。其实== ==Virtual DOM== ==并不一定比我们真实的操作== ==DOM== ==要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作。==
==详细资料可以参考：== ==《====Virtual DOM====》== ==《理解== ==Virtual DOM====》== ==《深度剖析：如何实现一个== ==Virtual DOM== ==算法》== ==《网上都说操作真实== ==DOM== ==慢，但测试结果却比== ==React== ==更快，为什么？》==
 \> 来自

```
 <https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md>
```

:::
