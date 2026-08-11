---
title: "Date类型"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "ECMAScript的Date类型是在早期Java中的java.util.Date类的基础上构建的。为此，Date类型使用自UTC(Coordinated Universal Time，国际协调时间）1970年1月1日零时开始经过的毫秒数来保存日期。 在使用这种数据存储格式的条件。"
sidebarWeight: 34
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Date类型/Date类型.md"
---
::: v-pre

# Date类型

> 本节目标：理解“Date类型”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
**使用****UTC**
```

ECMAScript的Date类型是在早期Java中的java.util.Date类的基础上构建的。为此，Date类型使用自UTC(Coordinated Universal Time，国际协调时间）1970年1月1日零时开始经过的毫秒数来保存日期。

在使用这种数据存储格式的条件下，Date类型保存的日期能精确到1月1日之前或之后 的100，000，000天。

```
**创建****Date****类型实例（对象）**
new 操作符+Date构造函数：
var now = new Date();
```

**初始化**
不传参：创建当前日期和时间的Date对象。
传参：创建指定时间的Date对象。

```
**参数类型：**
```

数值：传递一个数值（整数或浮点数都行），则表示从1970年1月1日零时经过的毫秒数，如果是负数，则表示从1970年1月1日往前回退的毫秒数。

字符串：传递一个表示日期的字符串。把表示日期的字符串传递给Date构造函数，会在后台调用Date.parse()。

多数值参数：传递多个分别表示年月日时分秒毫秒的数值参数，这样Date构造函数会在后台调用Date.UTC()方法。日期和时间都基于本地时区而非GMT来创建。

**Date****.now()**
ECMAScript 5增加了Date.now()方法，这个方法返回一个调用这个方法时的日期和时间的毫秒数。

:::
