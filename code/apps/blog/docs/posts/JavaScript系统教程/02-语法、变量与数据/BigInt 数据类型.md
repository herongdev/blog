---
title: "BigInt 数据类型"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "背景： JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。 数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/基本数据类型-数字/BigInt 数据类型.md"
---
::: v-pre

# BigInt 数据类型

> 本节目标：理解“BigInt 数据类型”的核心思路，并能把它用于实际开发或面试表达。
**背景：**
JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。

数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。

```
大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。
```

// 超过 53 个二进制位的数值，无法保持精度Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
// 超过 2 的 1024 次方的数值，无法表示Math.pow(2, 1024) // Infinity

```
[ES2020](https://github.com/tc39/proposal-bigint) 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。
```

```
只用来表示整数；
```

```
可以精确表示任何位数的整数；
```

```
BigInt与普通整数是两种值，它们之间并不相等。
```

```
typeof运算符对于 BigInt 类型的数据返回bigint。
```

// BigInt 与普通整数是两种值，它们之间并不相等。
42n === 42 // false
// typeof运算符对于 BigInt 类型的数据返回bigint。
typeof 123n // 'bigint'

```
表示方法：
```

```
为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。
```

```
进制：可以使用各种进制表示，同样要加上后缀n。
```

```
符号：BigInt可以使用负号（-），但是不能使用正号（+），因为会与 asm.js冲突。
```

```
const a = 2172141653n;const b = 15346349309n;
// BigInt 可以保持精度a * b // 33334444555566667777n
// 普通整数无法保持精度Number(a) * Number(b) // 33334444555566670000
```

```
// BigInt 的运算1n + 2n // 3n
```

```
// 各种进制
0b1101n // 二进制0o777n // 八进制0xFFn // 十六进制
```

// BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。
-42n // 正确+42n // 报错

```
JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。
let p = 1;for (let i = 1; i <= 70; i++) {  p *= i;}console.log(p); // 1.197857166996989e+100
现在支持大整数了，就可以算了，浏览器的开发者工具运行下面代码，就OK。
let p = 1n;for (let i = 1n; i <= 70n; i++) {  p *= i;}console.log(p); // 11978571...00000000n
```

:::
