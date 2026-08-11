---
title: "Number静态方法"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "二、 Number.isNaN() 作用：用来检查一个值是否为NaN。如果参数类型不是NaN，Number.isNaN一律返回false。 Number.isNaN(NaN) // trueNumber.isNaN(15) // falseNumber.isNaN('15') /。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/基本数据类型-数字/Number静态方法.md"
---
::: v-pre

# Number静态方法

> 本节目标：理解“Number静态方法”的核心思路，并能把它用于实际开发或面试表达。
```
主要用来判断一个参数是否是：
```

```
有限数:finite
```

```
不是数据:NaN
```

```
是整数:Integer
```

```
将字符串转数值
```

```
**一、****Number.isFinite**
作用：用来检查一个数值是否为有限的（finite），即不是Infinity。如果参数类型不是数值，Number.isFinite一律返回false。
Number.isFinite(15); // trueNumber.isFinite(0.8); // trueNumber.isFinite(Infinity); // falseNumber.isFinite(-Infinity); // false
```

**二、****Number.isNaN()**
作用：用来检查一个值是否为NaN。如果参数类型不是NaN，Number.isNaN一律返回false。
Number.isNaN(NaN) // trueNumber.isNaN(15) // falseNumber.isNaN('15') // falseNumber.isNaN(true) // falseNumber.isNaN(9/NaN) // trueNumber.isNaN('true' / 0) // trueNumber.isNaN('true' / 'true') // true

```
**Number.isFinite****、****Number.isNaN()**与传统的全局方法isFinite()和isNaN()的区别：
```

```
传统方法先调用Number()将非数值的值转为数值，再进行判断。
```

**三、****parseInt()****和****parseFloat()**
ES6 将这两个全局方法移植到Number对象上面，行为完全保持不变。
// ES5的写法parseInt('12.34') // 12parseFloat('123.45#') // 123.45
// ES6的写法Number.parseInt('12.34') // 12Number.parseFloat('123.45#') // 123.45
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // trueNumber.parseFloat === parseFloat // true

```
**四、****Number.isInteger()**
作用：用来判断一个数值是否为整数。
Number.isInteger(25) // trueNumber.isInteger(25.1) // false
**注意：**
```

JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

```
Number.isInteger(25) // trueNumber.isInteger(25.0) // true
```

```
如果参数不是数值，Number.isInteger返回false。
```

```
Number.isInteger() // falseNumber.isInteger(null) // falseNumber.isInteger('15') // falseNumber.isInteger(true) // false
```

```
对超出精度数值的判断可能出错
```

由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。
Number.isInteger(3.0000000000000002) // true
上面代码中，Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。

类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。

```
Number.isInteger(5E-324) // falseNumber.isInteger(5E-325) // true
上面代码中，5E-325由于值太小，会被自动转为0，因此返回true。
```

总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。

```
**五、****Number.isSafeInteger()**
作用：用来判断一个整数是否落在这个范围之内。
Number.isSafeInteger('a') // falseNumber.isSafeInteger(null) // falseNumber.isSafeInteger(NaN) // falseNumber.isSafeInteger(Infinity) // falseNumber.isSafeInteger(-Infinity) // false
Number.isSafeInteger(3) // trueNumber.isSafeInteger(1.2) // falseNumber.isSafeInteger(9007199254740990) // trueNumber.isSafeInteger(9007199254740992) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // falseNumber.isSafeInteger(Number.MIN_SAFE_INTEGER) // trueNumber.isSafeInteger(Number.MAX_SAFE_INTEGER) // trueNumber.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。
Number.isSafeInteger = function (n) {  return (typeof n === 'number' &&    Math.round(n) === n &&    Number.MIN_SAFE_INTEGER <= n &&    n <= Number.MAX_SAFE_INTEGER);}
实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。
Number.isSafeInteger(9007199254740993)// falseNumber.isSafeInteger(990)// trueNumber.isSafeInteger(9007199254740993 - 990)// true9007199254740993 - 990// 返回结果 9007199254740002// 正确答案应该是 9007199254740003
上面代码中，9007199254740993不是一个安全整数，但是Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。
9007199254740993 === 9007199254740992// true
所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。
function trusty (left, right, result) {  if (    Number.isSafeInteger(left) &&    Number.isSafeInteger(right) &&    Number.isSafeInteger(result)  ) {    return result;  }  throw new RangeError('Operation cannot be trusted!');}
trusty(9007199254740993, 990, 9007199254740993 - 990)// RangeError: Operation cannot be trusted!
trusty(1, 2, 3)// 3
```

:::
