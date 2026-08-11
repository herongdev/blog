---
title: "模块具有 单例（Singleton）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "模块化与工程化"
description: "在 ​ ​ ES6 模块（ES Module） ​ ​ 中，模块的代码（包括变量声明和函数定义）​ ​ 只会执行一次 ​ ​，无论被导入（import）多少次。模块具有 ​ ​ 单例（Singleton） ​ ​ 特性，即模块的代码在首次加载时执行，后续导入会直接使用缓存的结果。"
sidebarWeight: 53
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/12-模块化编程/模块具有 ​​单例（Singleton）.md"
---
::: v-pre

# 模块具有 单例（Singleton）

> 本节目标：理解“模块具有 单例（Singleton）”的核心思路，并能把它用于实际开发或面试表达。
在 ​**​****ES6 模块（ES Module）****​**​ 中，模块的代码（包括变量声明和函数定义）​**​****只会执行一次****​**​，无论被导入（import）多少次。模块具有 ​**​****单例（Singleton）****​**​ 特性，即模块的代码在首次加载时执行，后续导入会直接使用缓存的结果。

**​​****1. 变量声明：只初始化一次****​​**
**​​****示例****​​**
// module.jslet count = 0;export const increment = () =\> \{ count++; return count;\};
// main.jsimport \{ increment \} from './module.js';
console.log(increment()); // 1console.log(increment()); // 2

- ​**​****count 变量只初始化一次****​**​，即使多次调用 increment()，它仍然会基于同一个 count 进行递增。

**​​****2. 函数调用：只执行一次（如果不在模块顶层）****​​**
**​​****示例（函数定义 vs. 立即执行）****​​**
// module.jsexport const getRandom = () =\> Math.random(); // 每次调用都会执行
export const randomValue = Math.random(); // 只在模块加载时计算一次
// main.jsimport \{ getRandom, randomValue \} from './module.js';
console.log(getRandom()); // 每次调用返回不同的随机数console.log(getRandom()); // 不同值
console.log(randomValue); // 始终相同（模块加载时计算的值）console.log(randomValue); // 同上

- ​**​****getRandom()****​**​ 是函数声明，每次调用都会重新计算。
- ​**​****randomValue****​**​ 是模块顶层变量，只在模块加载时计算一次，后续导入直接使用缓存值。

**​​****3. 模块的顶层代码只执行一次****​​**
**​​****示例****​​**
// module.jsconsole.log("Module initialized!"); // 只会在第一次导入时执行
export const data = \{ key: "value" \};
// main.jsimport './module.js'; // 打印 "Module initialized!"import './module.js'; // 不会再次执行，直接使用缓存

- ​**​****模块的顶层代码（如 console.log）在首次导入时执行****​**​，后续导入不会重复执行。

**​​****4. 循环引用时，模块仍然只执行一次****​​**
**​​****示例****​​**
// a.jsimport \{ b \} from './b.js';console.log("a.js loaded");export const a = "A";
// b.jsimport \{ a \} from './a.js';console.log("b.js loaded");export const b = "B";
// main.jsimport './a.js';
​**​****输出：****​**​
b.js loadeda.js loaded

- 即使 a.js 和 b.js 互相引用，​**​****每个模块仍然只执行一次****​**​，不会导致无限循环。

**​​****总结****​​**

|   |   |
|---|---|
|**情况**|**是否只执行一次？**|
|​**​****模块顶层变量（const, let, var）****​**​|✅ 是|
|​**​****模块顶层函数声明（function）****​**​|✅ 是（但调用时会执行）|
|​**​****模块顶层立即执行的代码（如 console.log）****​**​|✅ 是|
|​**​****模块内函数调用（如 getRandom()）****​**​|❌ 否（每次调用都会执行）|
|​**​****动态导入（import()）****​**​|✅ 是（相同模块只加载一次）|

**​​****关键结论****​​**

- ​**​****ES6 模块是单例的****​**​，模块代码（变量、函数定义、顶层逻辑）​**​****只会在第一次导入时执行****​**​。
- ​**​****后续导入直接使用缓存****​**​，不会重复执行。
- ​**​****函数调用（如 getRandom()）仍然可以多次执行****​**​，但函数本身只定义一次。

这种机制确保了模块的高效性和一致性，适用于全局状态管理（如 Redux、Vuex 等）。
 \> 来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/0e52abee-e866-4015-963e-de1ed20ae8a2](https://yuanbao.tencent.com/chat/naQivTmsDa/0e52abee-e866-4015-963e-de1ed20ae8a2)\>

:::
