---
title: "列表 & Key"
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
description: "围绕“列表 & Key”整理的概念、示例与实践笔记。"
sidebarWeight: 64
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/列表 & Key/列表 & Key.md"
---
::: v-pre

# 列表 & Key

> 本节目标：理解“列表 & Key”的核心思路，并能把它用于实际开发或面试表达。
```
**渲染多个组件**
你可以通过使用 {} 在 JSX 内构建一个[元素集合](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。
```

```
下面，我们使用 Javascript 中的 [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法来遍历 numbers 数组。将数组中的每个元素变成 <li> 标签，最后我们将得到的数组赋值给 listItems：
const numbers = [1, 2, 3, 4, 5];const listItems = numbers.map((number) =>  <li>{number}</li>);
我们把整个 listItems 插入到 <ul> 元素中，然后[渲染进](https://react.docschina.org/docs/rendering-elements.html#rendering-an-element-into-the-dom) DOM：
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
这段代码生成了一个 1 到 5 的项目符号列表。
```

```
**基础列表组件**
通常你需要在一个[组件](https://react.docschina.org/docs/components-and-props.html)中渲染列表。
我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。
function NumberList(props) {
  const numbers = props.numbers;
  const listItems =
    numbers.map((number) => <li>{number}</li>);
  return (
    <ul>{listItems}</ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
当我们运行这段代码，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。我们将在下一节讨论这是为什么。
```

:::
