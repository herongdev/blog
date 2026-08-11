---
title: "console.log输出字体颜色"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "在正常模式下，一般只能向 console 控制台输出简单的文字信息。但为了把信息输出得更优雅更便于阅读，除了 cosole.log() 方法外还可以调用 cosole.warn() 来输出警告信息 在输出信息前面会有一个带感叹号的黄色三角警告符号。似乎比一般的 console 信。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/BOM/console.log输出字体颜色.md"
---
::: v-pre

# console.log输出字体颜色

> 本节目标：理解“console.log输出字体颜色”的核心思路，并能把它用于实际开发或面试表达。
在正常模式下，一般只能向`console` 控制台输出简单的文字信息。但为了把信息输出得更优雅更便于阅读，除了`cosole.log()`方法外还可以调用 `cosole.warn()` 来输出警告信息``在输出信息前面会有一个带感叹号的黄色三角警告符号。似乎比一般的`console`信息要友好得多了。虽然图标是黄色的，但输出的文字仍然是黑色。``另外经常用到的是输出错误信息。可以通过调用`console.erro()` 来实现。``信息前面会出现一个带叉的红色圆形图标。``这个效果要比警告信息更友好了，字体颜色成红色了。``要更牛叉莫过于对文字应用样式。而现在这一特性已经在谷歌浏览器里实现了。``在`Chrome`的开发者工具里，`console` 可以加样式，可以显示缤纷的颜色，甚至图片。简直爽翻了。``具体来说，是可以对输出到`console`控制台的文字进行`CSS`控制。``格式如下：

```
console.log()    //
```

打印日志

```
console.debug()  //
```

打印调试

```
console.error()  //
```

打印错误

```
console.info()   //
```

打印信息

```
console.warn()   //
```

打印警告

```
console.assert() //
```

打印断言

```
console.clear()  //
```

清空

```
%c
```

表示`css`样式

```
console.log('%cHello', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: underline;');%d
```

表示数字

```
console.log('%d', 123);%i
```

表示整型数字

```
console.log('%i', 123);%o
```

表示`DOM`元素

```
console.log('%o', document.body);%O
```

表示`javascript`对象

```
console.log('%O', new Date());
```
 \> 来自

```
 <http://t.zoukankan.com/enumx-p-12308528.html>
```

:::
