---
title: "EPSILON"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "在 JavaScript 中，EPSILON 这个常量名通常表示一个​ ​ 极小的正数 ​ ​（如 1e 9，即 0.000000001），主要用于处理​ ​ 浮点数精度问题 ​ ​。以下是它的核心意义和常见用途： 1. ​​ 解决浮点数比较问题 ​​ JavaScript 使用。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/变量和常量/常见常量/EPSILON.md"
---
::: v-pre

# EPSILON

> 本节目标：理解“EPSILON”的核心思路，并能把它用于实际开发或面试表达。
在 JavaScript 中，EPSILON 这个常量名通常表示一个​**​****极小的正数****​**​（如 1e-9，即 0.000000001），主要用于处理​**​****浮点数精度问题****​**​。以下是它的核心意义和常见用途：

**1.** **​​****解决浮点数比较问题****​​**
JavaScript 使用 IEEE 754 双精度浮点数，可能导致如下经典问题：
console.log(0.1 + 0.2 === 0.3); // false（实际结果为 0.30000000000000004）
通过 EPSILON 可以安全比较浮点数：
function floatEqual(a, b, epsilon = EPSILON) \{ return Math.abs(a - b) \< epsilon;\}console.log(floatEqual(0.1 + 0.2, 0.3)); // true

**2.** **​​****避免除以零的错误****​​**
在数学计算中，用 EPSILON 防止分母为零：
function safeDivide(a, b) \{ return a / (b + EPSILON); // 避免 b=0 时 Infinity\}

**3.** **​​****图形计算/游戏开发****​​**
在需要高精度计算的场景（如向量运算、碰撞检测）中，EPSILON 用于：
// 判断点是否在直线上function isPointOnLine(point, line) \{ return Math.abs(distance(point, line)) \< EPSILON;\}

**4.** **​​****与 JavaScript 原生 Number.EPSILON 的区别****​​**

- 你定义的 EPSILON = 1e-9 是自定义的阈值，适用于大多数业务场景。
- JS 原生的 Number.EPSILON（≈ 2.22e-16）表示​**​****最小可表示差值****​**​，通常用于更严格的数值计算。

**5.** **​​****其他常见用途****​​**

- ​**​****动画/插值****​**​：判断动画是否到达目标位置。 if (Math.abs(currentPos - targetPos) \< EPSILON) stopAnimation();
- ​**​****机器学习****​**​：梯度下降等算法中的收敛判断。

**最佳实践**

- ​**​****命名建议****​**​：如果用途明确，可命名更具体（如 POSITION_EPSILON、ANGLE_EPSILON）。
- ​**​****值的选择****​**​：1e-9 对大多数场景足够小，但物理仿真可能需要更小（如 1e-12）。

总之，EPSILON 是处理浮点数精度问题的“安全阀”，平衡了计算精度与性能。
 \> 来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/daff0653-38c5-4fb1-aa6d-eda6e62a38d4](https://yuanbao.tencent.com/chat/naQivTmsDa/daff0653-38c5-4fb1-aa6d-eda6e62a38d4)\>

:::
