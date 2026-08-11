---
title: "如何封装一个 javascript 的类型判断函数"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "\\ 来自 \\<https://github.com/CavsZhouyou/Front End Interview Notebook/blob/master/JavaScript/JavaScript.md\\。"
sidebarWeight: 27
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/经典方法/如何封装一个 javascript 的类型判断函数.md"
---
::: v-pre

# 如何封装一个 javascript 的类型判断函数

> 本节目标：理解“如何封装一个 javascript 的类型判断函数”的核心思路，并能把它用于实际开发或面试表达。
```
function getType(value) {
    // 判断数据是 null 的情况
    if (value === null) {
        return value + "";
    }
    // 判断数据是引用类型的情况
    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value),
            type = valueClass.split(" ")[1].split("");
        type.pop();
        return type.join("").toLowerCase();
    } else {
        // 判断数据是基本数据类型的情况和函数的情况
        return typeof value;
    }
}
```

```
详细资料可以参考： ==《JavaScript 专题之类型判断(上)》==
```
 \> 来自 \<[https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md)\>

:::
