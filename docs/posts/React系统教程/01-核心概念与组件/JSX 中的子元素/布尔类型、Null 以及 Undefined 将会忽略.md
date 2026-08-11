---
title: "布尔类型、Null 以及 Undefined 将会忽略"
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
description: "是有一些 “falsy” 值，如数字 0，NaN，仍然会被 React 渲染。例如，以下代码并不会像你预期那样工作，因为当 props.messages 是空数组时，0 仍然会被渲染： \\ 来自。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX 中的子元素/布尔类型、Null 以及 Undefined 将会忽略.md"
---
::: v-pre

# 布尔类型、Null 以及 Undefined 将会忽略

> 本节目标：理解“布尔类型、Null 以及 Undefined 将会忽略”的核心思路，并能把它用于实际开发或面试表达。
```
false, null, undefined, and true 是合法的子元素。但它们并不会被渲染。以下的 JSX 表达式渲染结果相同：
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
这有助于依据特定条件来渲染其他的 React 元素。例如，在以下 JSX 中，仅当 showHeader 为 true 时，才会渲染 <Header /> 组件：
<div>  {showHeader && <Header />}  <Content /></div>
```

```
**值得注意的**
```

是有一些 [“](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)falsy” 值，如数字 0，NaN，仍然会被 React 渲染。例如，以下代码并不会像你预期那样工作，因为当 props.messages 是空数组时，0 仍然会被渲染：

```
<div>
    {
        props.messages.length
        && <MessageList messages={props.messages} />
    }
</div>
要解决这个问题，确保 && 之前的表达式总是布尔值：
<div>
    {
        props.messages.length > 0
        && <MessageList messages={props.messages} />
    }
</div>
```

```
要渲染 false、true、null、undefined 等值，需要先将它们[转换为字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion)：
```

```
<div>  My JavaScript variable is {String(myVariable)}.</div>
```
 \> 来自

```
 <https://react.docschina.org/docs/jsx-in-depth.html>
```

:::
