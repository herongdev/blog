---
title: "实现createElement方法"
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
description: "围绕“实现createElement方法”整理的概念、示例与实践笔记。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/从零开始实现一个React/实现createElement方法.md"
---
::: v-pre

# 实现createElement方法

> 本节目标：理解“实现createElement方法”的核心思路，并能把它用于实际开发或面试表达。
```
babel会对代码进行转译，发现jsx语法，即按照编译指示，比如调用react.createElement方法将其转化为一个对象。比如：
const element = (
<div id="foo">
<a>bar</a>
<b />
</div>
)
会被babel转译成：
const element = React.createElement(
"div",
{ id: "foo" },
React.createElement("a", null, "bar"),
React.createElement("b")
)
```

```
以下是createElement方法：
function createElement(type, props, ...children) {
return {
type,
props: {
...props,
children,
},
}
}
==We use the== _spread operator_ ==for the== ==props== ==and the== _rest parameter syntax_ ==for the== ==children, this way the== ==children== ==prop will always be an array====。==For example, createElement("div") returns:
=={==
=="type"====: "div",==
=="props"====: {== =="children"====: [] }==
==}==
createElement("div", null, a) returns:
=={==
=="type"====: "div",==
=="props"====: {== =="children"====: [====a====] }==
==}==
and createElement("div", null, a, b) returns:
=={==
=="type"====: "div",==
=="props"====: {== =="children"====: [====a====,== ==b====] }==
==}==
==如上所示，====createElement====方法返回的对象有两个属性：==
一为type，表示虚拟dom的类型，可能是原生类型，也可能是我们自定义的组件类型，原生类型用字符串来表示，自定义类型则为一个函数。
二为props，这就是jsx中的属性键值对，属性中还有一个重要children属性，
children的值有可能是原始值（true,false,数字，字符串，null等），也有可能是对象（jsx对象会被createElement方法递归转换成对象）， 分开对待，修改createElement方法：
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
}
```

:::
