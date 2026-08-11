---
title: "v-if-else if-esle"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "指令用于条件性地渲染一块内容。 当指令的表达式返回 truthy 值的时，被绑定的元素才会被渲染。 表示 v if 条件不为真是，要渲染的元素。 v else 元素 必须 紧跟在带 v if 或者 v else if 的元素的后面，否则它将不会被识别。 新增 v else if。"
sidebarWeight: 45
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/条件渲染/v-if-else if-esle.md"
---
::: v-pre

# v-if-else if-esle

> 本节目标：理解“v-if-else if-esle”的核心思路，并能把它用于实际开发或面试表达。
```
v-if
v-if
```

 ==指令用于条件性地渲染一块内容。==
==当指令的表达式返回== `truthy` ==值的时，被绑定的元素才会被渲染。==

```
<h1 v-if="awesome">Vue is awesome!</h1>
```

```
v-else
v-else
```

==表示== `v-if` ==条件不为真是，要渲染的元素。==
`v-else` ==元素==**必须**==紧跟在带==

- `v-if`
- ==或者== `v-else-if`

==的元素的后面，否则它将不会被识别。==

```
<div v-if="Math.random() > 0.5">  Now you see me</div><div v-else>  Now you don't</div>
```

```
v-else-if
2.1.0
```

==新增==
`v-else-if`==，充当== `v-if` ==的“==`else-if` ==块”，可以连续使用：==
`v-else-if` ==也必须紧跟在==

- ==带== `v-if`
- ==或== `v-else-if` ==的元素之后。==

```
<div v-if="type === 'A'">  A</div><div v-else-if="type === 'B'">  B</div><div v-else-if="type === 'C'">  C</div><div v-else>  Not A/B/C</div>
```

**使用** `\<template\>` **元素实现多元素条件渲染**
==切换多个元素时，可以把使用== `\<template\>` ==元素包裹其它多个元素，并在== `\<template\>` ==上面使用== `v-if`==。==
==注意：==`\<template\>` ==元素不会被渲染出来。==

```
<template v-if="ok">  <h1>Title</h1>  <p>Paragraph 1</p>  <p>Paragraph 2</p></template>
```

:::
