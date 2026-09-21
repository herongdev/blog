---
title: "Global对象方法"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "enCodeURI()不会对URI的合法的特殊字符进行编码，例如冒号、点号、正斜杠、问号、&和 字号，会对空格进行编码； 一般来说，我们使用encodeURIComponent()方法的时候要比encodeURI()更多，因为实践中更常见的是对查询字符串参数而不是基础URI进行编。"
sidebarWeight: 71
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/详解内置对象/Global对象方法.md"
---
::: v-pre

# Global对象方法

> 本节目标：理解“Global对象方法”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
除此之外 ，Global对象还包含其他方法：
```

```
**URI****编码方法**
encodeURI()和encodeURIComponent()方法会用UTF-8编码替换掉URI中所有无效的字符。
```

```
**区别：**
```

```
encodeURI()主要用于整个URI，而encodeURIComponent()主要对URI的某一段进行编码。
```

enCodeURI()不会对URI的合法的特殊字符进行编码，例如冒号、点号、正斜杠、问号、&和#字号，会对空格进行编码；

```
encodeURIComponent()则会对除了合法域名中特殊字符（点号、中划线、下划线）以外的非字母和数字的字符进行编码。
```

```
来看下面的例子：
```

一般来说，我们使用encodeURIComponent()方法的时候要比encodeURI()更多，因为实践中更常见的是对查询字符串参数而不是基础URI进行编码。

```
**URI****解码方法**
与encodeURI()和encodeURICompnonet()对应的是decodeURI()和decodeURIComponent()。
```

区别：
其中decodeURI()只能对可使用encodeURI()编码的字符进行解码。
而decodeURIComponent()能够解码使用encodeURIComponent()编码的所有字符，即它可以解码任何特殊字符的编码，如下：

```
注意：URI能够编码所有Unicode 字符而不仅是ASCII字符。
```

eval()方法
这是整个ECMAScript语言中最强大的一个方法。
这个方法就像是一个完整的ECMAScript 解析器，它只接受一个参数，即要执行的Javascrpt字符串。如下所示：

```
相当于代码：
```

当解析器发现代码中调用eval()方法时，它会将传入的参数当作实际的ECMAScript语句来解析，然后把执行结果插入到原位置。通过eval()执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域链。这意味着通过eval()执行的代码可以引用在包含环境中定义的变量，比如：

同样地，我们可以在eval()调用中定义一个函数，然后再在该调用的外部代码中引用这个函数：

在eval()中创建的任何变量和函数都不会被提升，因为在解析代码的时候，它们被包含在一个字符串中；它们只有eval()执行的时候创建。

严格模式下，在外部访问不到eval()中创建的任何变量或函数，并且，为eval赋值也会导致错误：

能够解释字符串的能力非常强大，但也非常危险，因此要十分谨慎，特别是在用它执行用户输入数据的情况下。

:::
