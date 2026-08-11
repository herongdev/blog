---
title: "export 命令"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "模块功能主要由两个命令构成： export 和 import 。 export 命令用于规定模块的对外接口， import 命令用于输入其他模块提供的功能。 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用 ex。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/Module 的语法/export 命令.md"
---
::: v-pre

# export 命令

> 本节目标：理解“export 命令”的核心思路，并能把它用于实际开发或面试表达。
模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。

一、单个导出变量：
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
上面代码是`profile.js`文件，保存了用户信息。`ES6` 将其视为一个模块，里面用`export`命令对外部输出了三个变量。

二、批量导出变量：
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

```
export {firstName, lastName, year};
上面代码在`export`命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在`var`语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。
```

三、导出函数或类（`class`）。
export function multiply(x, y) \{
  return x * y;
\};

上面代码对外输出一个函数`multiply`。

四、输出变量重命名：
可以使用`as`关键字重命名。
function v1() \{ ... \}
function v2() \{ ... \}
export \{
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
\};
重命名后，`v2`可以用不同的名字输出两次。

:::
