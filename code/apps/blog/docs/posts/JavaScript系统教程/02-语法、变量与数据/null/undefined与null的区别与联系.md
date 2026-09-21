---
title: "undefined与null的区别与联系"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "如果没有合适的初始值，可以不初始化，这样它的初始值就是undefined；如果这个变量将来用于保存对象，可以将它初始化为null。"
sidebarWeight: 72
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/null/undefined与null的区别与联系.md"
---
::: v-pre

# undefined与null的区别与联系

> 本节目标：理解“undefined与null的区别与联系”的核心思路，并能把它用于实际开发或面试表达。
```
一般的定义变量时，最好初始化。
```

如果没有合适的初始值，可以不初始化，这样它的初始值就是undefined；如果这个变量将来用于保存对象，可以将它初始化为null。

```
JSON：undefined不是一个有效的JSON，而null是；
```

```
typeof：typeof undefined返回'undefined'；typeof null返回'object'；
```

:::
