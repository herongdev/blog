---
title: "BigInt 对象"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "JavaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt。 BigInt(123) // 123nBigInt('123') // 123nBigInt(false) //。"
sidebarWeight: 57
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/Boolean/BigInt 对象.md"
---
::: v-pre

# BigInt 对象

> 本节目标：理解“BigInt 对象”的核心思路，并能把它用于实际开发或面试表达。
JavaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt。
BigInt(123) // 123nBigInt('123') // 123nBigInt(false) // 0nBigInt(true) // 1n

```
**参数要求**
```

```
无需new操作符；
```

```
必须有参数；
```

```
而且参数必须可以正常转为数值
```

```
参数如果是小数，也会报错
```

下面的用法都会报错。
new BigInt() // TypeErrorBigInt(undefined) //TypeError==BigInt====(====null====)== ==// TypeError==BigInt('123n') // SyntaxErrorBigInt('abc') // SyntaxError
注意：字符串123n无法解析成 Number 类型，所以会报错。
// 参数如果是小数，也会报错。
BigInt(1.5) // RangeErrorBigInt('1.5') // SyntaxError

```
**实例方法**
BigInt 对象继承了 Object 对象的两个实例方法。
```

```
BigInt.prototype.toString()
```

```
BigInt.prototype.valueOf()
```

```
它还继承了 Number 对象的一个实例方法。
```

```
BigInt.prototype.toLocaleString()
```

```
**三个静态方法**
```

```
BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。
```

```
BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。
```

```
BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt。
```

```
const max = 2n ** (64n - 1n) - 1n;
BigInt.asIntN(64, max)// 9223372036854775807nBigInt.asIntN(64, max + 1n)// -9223372036854775808nBigInt.asUintN(64, max + 1n)// 9223372036854775808n
上面代码中，max是64位带符号的 BigInt 所能表示的最大值。如果对这个值加1n，BigInt.asIntN()将会返回一个负值，因为这时新增的一位将被解释为符号位。而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果。
如果BigInt.asIntN()和BigInt.asUintN()指定的位数，小于数值本身的位数，那么头部的位将被舍弃。
const max = 2n ** (64n - 1n) - 1n;
BigInt.asIntN(32, max) // -1nBigInt.asUintN(32, max) // 4294967295n
上面代码中，max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。
下面是BigInt.parseInt()的例子。
// Number.parseInt() 与 BigInt.parseInt() 的对比Number.parseInt('9007199254740993', 10)// 9007199254740992BigInt.parseInt('9007199254740993', 10)// 9007199254740993n
上面代码中，由于有效数字超出了最大限度，Number.parseInt方法返回的结果是不精确的，而BigInt.parseInt方法正确返回了对应的 BigInt。
```

对于二进制数组，BigInt 新增了两个类型BigUint64Array和BigInt64Array，这两种数据类型返回的都是64位 BigInt。DataView对象的实例方法DataView.prototype.getBigInt64()和DataView.prototype.getBigUint64()，返回的也是 BigInt。

:::
