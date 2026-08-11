---
title: "Reflect对象创建目的"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "将Object对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到Reflect对象上。 Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在 Reflect对象上找到对应的方 法。这就让Proxy对象可。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Reflect/Reflect对象创建目的.md"
---
::: v-pre

# Reflect对象创建目的

> 本节目标：理解“Reflect对象创建目的”的核心思路，并能把它用于实际开发或面试表达。
将Object对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到Reflect对象上。

```
修改某些Object方法的返回结果，让其变得更合理。
```

```
让Object操作都变成函数行为。
```

Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在 Reflect对象上找到对应的方 法。这就让Proxy对象可以方便地调用对应的Reflect 法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

:::
