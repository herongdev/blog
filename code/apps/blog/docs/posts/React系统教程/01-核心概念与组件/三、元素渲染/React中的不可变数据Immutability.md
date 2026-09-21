---
title: "React中的不可变数据Immutability"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "更改数据的两种方式： 1、直接更改变量； 2、建立所需修改变量的副本，进行修改后替换原数据。 不直接改变数据的好处 1、可以帮助我们增强组件和整体应用性能。 2、更简单的撤消/重做和步骤重现 3、不可变数据（Immutability）还使一些复杂的功能更容易实现。避免数据改变，使。"
sidebarWeight: 49
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/三、元素渲染/React中的不可变数据Immutability.md"
---
::: v-pre

# React中的不可变数据Immutability

> 本节目标：理解“React中的不可变数据Immutability”的核心思路，并能把它用于实际开发或面试表达。
**更改数据的两种方式：**
1、直接更改变量；
2、建立所需修改变量的副本，进行修改后替换原数据。

**不直接改变数据的好处**
1、可以帮助我们增强组件和整体应用性能。
2、更简单的撤消/重做和步骤重现
3、不可变数据（Immutability）还使一些复杂的功能更容易实现。避免数据改变，使我们能够保留对旧数据的引用，如果我们需要在它们之间切换。
4、追踪变更（Tracking Changes）
确定可变对象是否已更改是复杂的，因为直接对对象进行更改。这样就需要将当前对象与先前的副本进行比较，遍历整个对象树，并比较每个变量和值。这个过程可能变得越来越复杂。确定不可变对象如何改变是非常容易的。如果被引用的对象与之前不同，那么对象已经改变了。仅此而已。
5、确定何时重新渲染（Determining When to Re-render in React）
React 中不可变数据最大好处在于当您构建简单的 _纯__(pure)__组件_ 时。由于不可变数据可以更容易地确定是否已经进行了更改，这也有助于确定组件何时需要重新渲染。
与shouldComponentUpdate()相关。
 \> 来自

```
 <https://www.jianshu.com/p/7a3d0dee5dd7>
```

:::
