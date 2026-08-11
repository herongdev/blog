---
title: "Src-index.js"
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
description: "新建 React from ReactDOM from // babel会调用自动调用React.createElement去转换 let element1 ( color: \"red\" 了解元素 element 主要属性。"
sidebarWeight: 47
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/jsx转换/Src-index.js.md"
---
::: v-pre

# Src-index.js

> 本节目标：理解“Src-index.js”的核心思路，并能把它用于实际开发或面试表达。
新建

```
src\index.js
import
```

 `React` `from`

```
"./react";
import
```

 `ReactDOM` `from`

```
"./react-dom";
```
 // babel会调用自动调用React.createElement去转换
`let` `element1` `=` `(`

```
<div
```

```
className="title"
```

```
style={{
```

 `color:` `"red"`

```
}}>
```

```
<span>hello</span>world
```

```
</div>
);
//
```

了解元素`element`主要属性

```
console.log(JSON.stringify(element1,
```

```
null,
```

```
2));
ReactDOM.render(element1,
```

```
document.getElementById("root"));
```

:::
