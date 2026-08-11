---
title: "get-or-create 逗号表达式"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "简明解释这句： (statsBySymbol.set(SYMBOL, initSymbolStats()), statsBySymbol.get(SYMBOL)!) 这是“逗号表达式” ：(expr1, expr2) 会 先执行 expr1，然后执行 expr2， 整句返回 ex。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/常用技巧/get-or-create 逗号表达式.md"
---
::: v-pre

# get-or-create 逗号表达式

> 本节目标：理解“get-or-create 逗号表达式”的核心思路，并能把它用于实际开发或面试表达。
简明解释这句：
(statsBySymbol.set(SYMBOL, initSymbolStats()), statsBySymbol.get(SYMBOL)!)

- **这是“逗号表达式”**：(expr1, expr2) 会**先执行** expr1，然后执行 expr2，**整句返回** expr2 的值。
- **左半句做副作用**：statsBySymbol.set(SYMBOL, initSymbolStats()) 把新值放进 Map（注意：Map.set 的返回值是**整个 Map 本身**，不是刚放进去的值）。
- **右半句取返回值**：statsBySymbol.get(SYMBOL)! 再把刚才放进去的那条取出来；末尾的 ! 是 TypeScript 的**非空断言**，告诉编译器“这里一定不是 undefined”（运行时不改变行为）。

通常它配合空值合并使用（只在缺值时才执行逗号表达式）：
// 若已存在，直接用；若不存在，左边为 undefined，才执行括号里的“set 再 get”const symbolStats = statsBySymbol.get(SYMBOL) ?? (statsBySymbol.set(SYMBOL, initSymbolStats()), statsBySymbol.get(SYMBOL)!)
**为什么要这样写**

- 一行里完成 “**不存在则创建并取回**” 的 get-or-create。
- 先 set 再 get 是因为 Map.set 不返回新值，只能再取一次。

**注意点**

- **可读性**：逗号表达式不常见，团队可能看不懂；等价的更直白写法是：const symbolStats = statsBySymbol.get(SYMBOL) ?? (() =\> \{ const v = initSymbolStats() statsBySymbol.set(SYMBOL, v) return v\})()
- **括号必不可少**：逗号表达式优先级最低，用 ?? 时必须用括号把它包起来，否则会被错误地拆分。
- **! 的前提**：只有在确定“刚 set 了，所以 get 一定有值”这种语境下使用 ! 才安全。
 \> 来自 \<[https://chatgpt.com/c/690c0630-98bc-832a-a8c5-c71c36bf4743](https://chatgpt.com/c/690c0630-98bc-832a-a8c5-c71c36bf4743)\>

:::
