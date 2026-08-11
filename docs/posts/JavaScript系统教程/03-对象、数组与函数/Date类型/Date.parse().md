---
title: "Date.parse()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。ECMA 262没有定义Date.parse()应该支持哪种日期格式，因此这个方法的行为因实现而异，而且是因地区而异。将地区设置为美国浏览器通常得了接受下列日期格式：。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Date类型/Date.parse().md"
---
::: v-pre

# Date.parse()

> 本节目标：理解“Date.parse()”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。ECMA-262没有定义Date.parse()应该支持哪种日期格式，因此这个方法的行为因实现而异，而且是因地区而异。将地区设置为美国浏览器通常得了接受下列日期格式：

```
如果传入Date.parse()方法的字符串不能表示日期，那么它返回NaN。
```

```
**特殊参数值的处理：**
```

```
不在0-11之间的月份参数
```

```
不在1-31之间的日期参数
```

```
不在0-23之间的时间参数
```

```
不在0-59之间的分秒参数
```

:::
