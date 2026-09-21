---
title: "一道常被人轻视的前端JS面试题"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试与手写"
description: "\\ 来自 \\<https://github.com/CavsZhouyou/Front End Interview Notebook/blob/master/JavaScript/JavaScript.md\\。"
sidebarWeight: 25
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面试题/一道常被人轻视的前端JS面试题.md"
---
::: v-pre

# 一道常被人轻视的前端JS面试题

> 本节目标：理解“一道常被人轻视的前端JS面试题”的核心思路，并能把它用于实际开发或面试表达。
```
function Foo() {
    getName = function () { alert(1); };
    return this;
}
Foo.getName = function () { alert(2); };
Foo.prototype.getName = function () { alert(3); };
var getName = function () { alert(4); };
function getName() { alert(5); }
//请写出以下输出结果：
Foo.getName();                // 2
getName();                    // 4
Foo().getName();              // 1
getName();                    // 1
new Foo.getName();            // 2
new Foo().getName();          // 3
new new Foo().getName();      // 3
```

```
详细资料可以参考： ==《前端程序员经常忽视的一个 JavaScript 面试题》== ==《一道考察运算符优先级的 JavaScript 面试题》====《一道常被人轻视的前端 JS 面试题》==
```
 \> 来自 \<[https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md)\>

:::
