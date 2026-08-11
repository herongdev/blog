---
title: "从零开始实现一个React"
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
description: "前言 React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。 提起React，总是。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/从零开始实现一个React/从零开始实现一个React.md"
---
::: v-pre

# 从零开始实现一个React

> 本节目标：理解“从零开始实现一个React”的核心思路，并能把它用于实际开发或面试表达。
**前言**
==React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。==
==提起React，总是免不了和Vue做一番对比==
==Vue====的====API====设计非常简洁，但是其实现方式却让人感觉是“魔法”，开发者虽然能马上上手，但其原理却很难说清楚。==
==相比之下====React====的设计哲学非常简单，虽然有很多需要自己处理的细节问题，但它没有引入任何新的概念，相对更加的干净和简单。==
 \> **大致思路：**

1. babel会对代码进行转译，发现jsx语法，即调用react.createElement方法将其转化为一个对象，也就是我们常说的虚拟dom。比如这个jsx：

    ```
    const element = (
    </div>
    )
    会被babel转译成：
    )
    ```

    ```
    这个虚拟dom也就是对象有两个属性，以下是createElement方法
    ```

    ```
    }
    ==We use the== _spread operator_ ==for the== ==props== ==and the== _rest parameter syntax_ ==for the== ==children, this way the== ==children== ==prop will always be an array.==
    For example, createElement("div") returns:
    ==}==
    createElement("div", null, a) returns:
    ==}==
    and createElement("div", null, a, b) returns:
    ==}==
    ```

    一为type，表示虚拟dom的类型，类型可能是原生类型，也可能是我们自定义的组件类型，原生类型用字符串来表示；自定义类型则为一个函数。

    二为props，这就是jsx中的属性键值对，属性中还有一个重要children属性，它是一个字符串或是数组，用来表示虚拟dom子元素。如果子元素也是jsx，则递归调用createElement方法，直到children不存在或为字符串为止。

    ```
    }
    children的值有可能是原始值，也有可能是对象（jsx对象会被createElement方法递归转换成对象）， 分开对待，修改createElement方法：
    }
    ```

    ```
    }
    ```

然后我们调用ReactDOM.render()方法，将React.createElement()方法返回的的对象也就是虚拟Dom转换成真实的dom，并将其挂载在真实Dom中去，我们一般使用document.getElementById来获取一个页面中真实的Dom。

```
使用Diff算法避免Dom的重描，提高效率。
```

```
使用异步的setState方法来优化得渲染。
```

```
<div id="foo">
<a>bar</a>
<b />
const element = React.createElement(
"div",
{ id: "foo" },
React.createElement("a", null, "bar"),
React.createElement("b")
function createElement(type, props, ...children) {
return {
type,
props: {
...props,
children,
},
}
=={==
=="type"====: "div",==
=="props"====: {== =="children"====: [] }==
=={==
=="type"====: "div",==
=="props"====: {== =="children"====: [====a====] }==
=={==
=="type"====: "div",==
=="props"====: {== =="children"====: [====a====,== ==b====] }==
const element = {
type: "h1",
props: {
title: "foo",
children: "Hello",
},
function createElement(type, props, ...children) {
return {
type,
props: {
...props,
children: children.map(child =>
typeof child === "object"
? child
: createTextElement(child)
),
},
}
```

```
function createTextElement(text) {
return {
type: "TEXT_ELEMENT",
props: {
nodeValue: text,
children: [],
},
}
```

:::
