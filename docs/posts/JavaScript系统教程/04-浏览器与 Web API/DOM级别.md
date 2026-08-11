---
title: "DOM级别"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "注意：有时看到DOM0，实际上DOM0级标准是不存在的。所谓的DOM0级只是DOM历史坐标的一个参照点而已。具体来说，DOM0级指的是IE4.0和Netscape Navigator 4.0最初支持的DHTML。 DOM1 DOM11级于1998年10月成为W3C的推荐标准。DO。"
sidebarWeight: 31
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/DOM级别.md"
---
::: v-pre

# DOM级别

> 本节目标：理解“DOM级别”的核心思路，并能把它用于实际开发或面试表达。
注意：有时看到DOM0，实际上DOM0级标准是不存在的。所谓的DOM0级只是DOM历史坐标的一个参照点而已。具体来说，DOM0级指的是IE4.0和Netscape Navigator 4.0最初支持的DHTML。

**DOM1**
DOM11级于1998年10月成为W3C的推荐标准。DOM1级由两个模块组成：
DOM核心（DOM Core）和DOM HTML。其中，DOM核心规定的是如何映射于基于XML的文档结构，以便于简化对文档中任意部分的访问和操作。DOM HTML模块则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法。

```
注意：
```

```
很多别的语言也都实现了DOM
```

在Web浏览器中，基于ECMAScript实现的DOM的确成为Javascript这门语言的一个重要组成部分。

**DOM2**
DOM2级将DOM1级中的DOM核心模块进行扩展，开始支持XML的命名空间。此外，还新增了以下模块：

DOM视图（DOM Views)：定义了跟踪不同文档（例如，应用CSS之前和之后的文档）视图的接口；

```
DOM事件（DOM Events): 定义了事件和事件处理的接口；
```

```
DOM样式（DOM Style）： 定义基于CSS为元素应用样式的接口；
```

```
DOM遍历和范围（DOM Traversal and Range)：定义了遍历和操作文档树的接口。
```

```
**DOM3**
进一步扩展了DOM，
```

引入了以统一方式加载和保存文档的方法：在DOM加载和保存（DOM Load and Save)模块中定义；

```
新增了验证文档的方法：在DOM验证（DOM validation)模块中定义。
```

```
对DOM核心进行了扩展，开始支持XML1.0规范，涉及XML Infoset、Xpath和XML Base。
```

除了DOM核心和DOM HTML接口之外，另外几种语言还发布了只针对自己的DOM标准。下面列出的语言都是基于XML的，每种语言的DOM标准都添加了与特定语言相关的新方法和新接口：

```
SVG(Scalable Vector Graphic，可伸缩矢量图)1.0；
```

```
MathML(Mathematical Markup Language,数学标记语言）1.0；
```

```
SMIL(Synchronized Multimedia Integration Language，同步多媒体集成语言)
```

还有一些语言也是开发了自己的DOM实现，例如Mozilla的XUL（XML User Interface Language，XML用户界面语言）。但是，只有上面列出的几种语言是W3C的推荐标准。

目前，支持DOM已经成为浏览器开发商的首要目标，主流浏览器每次发布新版本都会改进对DOM的支持。

:::
