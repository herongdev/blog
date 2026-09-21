---
title: "Math 对象的扩展"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "Math.sign() Math.sign方法用来判断一个数到底是正数、负数、还是零。 对于非数值，会先将其转换为数值。 它会返回五种值。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/基本数据类型-数字/Math 对象的扩展.md"
---
::: v-pre

# Math 对象的扩展

> 本节目标：理解“Math 对象的扩展”的核心思路，并能把它用于实际开发或面试表达。
```
ES6 在 Math 对象上新增了 17 个与数学相关的方法。
```

```
所有这些方法都是静态方法
```

```
**Math.trunc()**
Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1) // 4Math.trunc(4.9) // 4Math.trunc(-4.1) // -4Math.trunc(-4.9) // -4Math.trunc(-0.1234) // -0
对于非数值，Math.trunc内部使用Number方法将其先转为数值。
Math.trunc('123.456') // 123Math.trunc(true) //1Math.trunc(false) // 0Math.trunc(null) // 0
对于空值和无法截取整数的值，返回NaN。
Math.trunc(NaN);      // NaNMath.trunc('foo');    // NaNMath.trunc();         // NaNMath.trunc(undefined) // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.trunc = Math.trunc || function(x) {  return x < 0 ? Math.ceil(x) : Math.floor(x);};
```

Math.sign()
Math.sign方法用来判断一个数到底是正数、负数、还是零。
对于非数值，会先将其转换为数值。
它会返回五种值。

```
参数为正数，返回+1；
```

```
参数为负数，返回-1；
```

```
参数为 0，返回0；
```

```
参数为-0，返回-0;
```

```
其他值，返回NaN。
```

```
Math.sign(-5) // -1Math.sign(5) // +1Math.sign(0) // +0Math.sign(-0) // -0Math.sign(NaN) // NaN
如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN。
Math.sign('')  // 0Math.sign(true)  // +1Math.sign(false)  // 0Math.sign(null)  // 0Math.sign('9')  // +1Math.sign('foo')  // NaNMath.sign()  // NaNMath.sign(undefined)  // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.sign = Math.sign || function(x) {  x = +x; // convert to a number  if (x === 0 || isNaN(x)) {    return x;  }  return x > 0 ? 1 : -1;};
```

```
Math.cbrt()
Math.cbrt()方法用于计算一个数的立方根。
Math.cbrt(-1) // -1Math.cbrt(0)  // 0Math.cbrt(1)  // 1Math.cbrt(2)  // 1.2599210498948732
对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值。
Math.cbrt('8') // 2Math.cbrt('hello') // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.cbrt = Math.cbrt || function(x) {  var y = Math.pow(Math.abs(x), 1/3);  return x < 0 ? -y : y;};
**Math.clz32()**
Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
Math.clz32(0) // 32Math.clz32(1) // 31Math.clz32(1000) // 22Math.clz32(0b01000000000000000000000000000000) // 1Math.clz32(0b00100000000000000000000000000000) // 2
上面代码中，0 的二进制形式全为 0，所以有 32 个前导 0；1 的二进制形式是0b1，只占 1 位，所以 32 位之中有 31 个前导 0；1000 的二进制形式是0b1111101000，一共有 10 位，所以 32 位之中有 22 个前导 0。
clz32这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。
左移运算符（<<）与Math.clz32方法直接相关。
Math.clz32(0) // 32Math.clz32(1) // 31Math.clz32(1 << 1) // 30Math.clz32(1 << 2) // 29Math.clz32(1 << 29) // 2
对于小数，Math.clz32方法只考虑整数部分。
Math.clz32(3.2) // 30Math.clz32(3.9) // 30
对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算。
Math.clz32() // 32Math.clz32(NaN) // 32Math.clz32(Infinity) // 32Math.clz32(null) // 32Math.clz32('foo') // 32Math.clz32([]) // 32Math.clz32({}) // 32Math.clz32(true) // 31
**Math.imul()**
Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
Math.imul(2, 4)   // 8Math.imul(-1, 8)  // -8Math.imul(-2, -2) // 4
如果只考虑最后 32 位，大多数情况下，Math.imul(a, b)与a * b的结果是相同的，即该方法等同于(a * b)|0的效果（超过 32 位的部分溢出）。之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。
(0x7fffffff * 0x7fffffff)|0 // 0
上面这个乘法算式，返回结果为 0。但是由于这两个二进制数的最低位都是 1，所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是 1。这个错误就是因为它们的乘积超过了 2 的 53 次方，JavaScript 无法保存额外的精度，就把低位的值都变成了 0。Math.imul方法可以返回正确的值 1。
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

```
Math.fround()
Math.fround方法返回一个数的32位单精度浮点数形式。
对于32位单精度格式来说，数值精度是24个二进制位（1 位隐藏位与 23 位有效位），所以对于 -224 至 224 之间的整数（不含两个端点），返回结果与参数本身一致。
Math.fround(0)   // 0Math.fround(1)   // 1Math.fround(2 ** 24 - 1)   // 16777215
如果参数的绝对值大于 224，返回的结果便开始丢失精度。
Math.fround(2 ** 24)       // 16777216Math.fround(2 ** 24 + 1)   // 16777216
Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）。
// 未丢失有效精度Math.fround(1.125) // 1.125Math.fround(7.25)  // 7.25
// 丢失精度Math.fround(0.3)   // 0.30000001192092896Math.fround(0.7)   // 0.699999988079071Math.fround(1.0000000123) // 1
对于 NaN 和 Infinity，此方法返回原值。对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数。
Math.fround(NaN)      // NaNMath.fround(Infinity) // Infinity
Math.fround('5')      // 5Math.fround(true)     // 1Math.fround(null)     // 0Math.fround([])       // 0Math.fround({})       // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.fround = Math.fround || function (x) {  return new Float32Array([x])[0];};
```

```
Math.hypot()
Math.hypot方法返回所有参数的平方和的平方根。
Math.hypot(3, 4);        // 5Math.hypot(3, 4, 5);     // 7.0710678118654755Math.hypot();            // 0Math.hypot(NaN);         // NaNMath.hypot(3, 4, 'foo'); // NaNMath.hypot(3, 4, '5');   // 7.0710678118654755Math.hypot(-3);          // 3
上面代码中，3 的平方加上 4 的平方，等于 5 的平方。
如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。
```

:::
