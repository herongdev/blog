---
title: "深入 JSX"
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
description: "以小写字母开头的元素代表一个 HTML 内置组件，比如 \\<div\\ 或者 \\<span\\ 会生成相应的字符串 'div' 或者 'span' 传递给 React.createElement（作为参数）。 大写字母开头的元素则对应着在 JavaScript 引入或自定义的组件，如。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX深入/深入 JSX.md"
---
::: v-pre

# 深入 JSX

> 本节目标：理解“深入 JSX”的核心思路，并能把它用于实际开发或面试表达。
```
**指定** **React** **元素类型**
JSX 标签的第一部分指定了 React 元素的类型。
```

以小写字母开头的元素代表一个 HTML 内置组件，比如 \<div\> 或者 \<span\> 会生成相应的字符串 'div' 或者 'span' 传递给 React.createElement（作为参数）。

大写字母开头的元素则对应着在 JavaScript 引入或自定义的组件，如 \<Foo /\> 会编译为 React.createElement(Foo)。

```
注意：
```

```
建议使用大写字母开头命名自定义组件。
```

如果你确实需要一个以小写字母开头的组件，则在 JSX 中使用它之前，必须将它赋值给一个大写字母开头的变量。

```
**React** **必须在作用域内**
由于 JSX 会编译为 React.createElement 调用形式，所以：
```

```
只要使用jsx语法，就必须引入 React 库。
```

如果你不使用 JavaScript 打包工具而是直接通过 \<script\> 标签加载 React，则必须将 React挂载到全局变量中。

```
**在** **JSX** **类型中使用点语法**
可以使用点语法来引用一个React组件。例如
import React from 'react';
const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}
function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}
```

```
**在运行时选择元素类型**
这通常用于根据 prop 来渲染不同组件的情况下。
```

```
不能将通用表达式作为 React 元素类型。
```

如果你想通过通用表达式来（动态）决定元素类型，你需要首先将它赋值给大写字母开头的变量。

```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';
const components = {
    photo: PhotoStory,
    video: VideoStory
};
function Story(props) {
    // 错误！JSX 类型不能是一个表达式。
    return <components[props.storyType] story = { props.story } />;
}
// 要解决这个问题, 需要首先将类型赋值给一个大写字母开头的变量：
import React from 'react';
import { PhotoStory, VideoStory } from './stories';
const components = {
    photo: PhotoStory,
    video: VideoStory
};
function Story(props) {
    // 正确！JSX 类型可以是大写字母开头的变量。
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
}
```

:::
