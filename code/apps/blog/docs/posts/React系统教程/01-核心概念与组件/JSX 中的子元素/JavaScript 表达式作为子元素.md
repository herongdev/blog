---
title: "JavaScript 表达式作为子元素"
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
description: "围绕“JavaScript 表达式作为子元素”整理的概念、示例与实践笔记。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX 中的子元素/JavaScript 表达式作为子元素.md"
---
::: v-pre

# JavaScript 表达式作为子元素

> 本节目标：理解“JavaScript 表达式作为子元素”的核心思路，并能把它用于实际开发或面试表达。
```
JavaScript 表达式可以被包裹在 {} 中作为子元素。例如，以下表达式是等价的：
<MyComponent>foo</MyComponent>
<MyComponent>{'foo'}</MyComponent>
这对于展示任意长度的列表非常有用。例如，渲染 HTML 列表：
function Item(props) {
    return <li>{props.message}</li>;
}
function TodoList() {
    const todos = ['finish doc', 'submit pr', 'nag dan to review'];
    return (
        <ul>
            {todos.map((message) => <Item
                key={message}
                message={message}
            />)}
        </ul>
    );
}
```

```
JavaScript 表达式也可以和其他类型的子元素组合。这种做法可以方便地替代模板字符串：
function Hello(props) {  return <div>Hello {props.addressee}!</div>;
}
```

:::
