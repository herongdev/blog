---
title: "toFixed() 的精度问题"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "$tofixed (num, n) var symbol if (num \\< 0) // 符号为负 symbol num var num2 (Math.round(num Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, (n。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/经典方法/toFixed() 的精度问题.md"
---
::: v-pre

# toFixed() 的精度问题

> 本节目标：理解“toFixed() 的精度问题”的核心思路，并能把它用于实际开发或面试表达。
`$tofixed` `(num,` `n)`

```
{
```

    `var` `symbol` `=`

```
1
```

    `if` `(num` `\<` `0)`

```
{
```

        `//` ==符号为负==``        `symbol` `=`

```
-1
```

        `num` `*=`

```
-1
```

```
}
```

    `var` `num2` `=` `(Math.round(num` `*` `Math.pow(10,` `n))` ``    `/` `Math.pow(10,` `n)` `+` `Math.pow(10,` `-(n` `+`

```
1)))
```

    `.toString().slice(0,`

```
-1)
```

    `return` `parseFloat(num2` `*`

```
symbol).toFixed(n)}
```

需求：对浮点数进行四舍五入精度获取。
问题：直接使用`Number.toFixed()`会出现异常的舍入情况。
原因：计算机浮点数存储是二进制，`js`的`Number.toFixed()`实际的精度确认规则是四舍六入五成双，逢四下舍，逢六入一，逢五时，根据浏览器内核计算结果也不尽相同。
具体原理这里不做详细描述，各位看官可自行查阅相关资料。
解决方法：重新`Number.toFixed()`方法。
实现原理：将浮点数转化为整数，保留所需位数，再转为浮点数。
实现代码：

```
 1 Number.prototype.toFixed = function (length) { 2     var s = this + ''; 3     var len = length || 0; 4     var result = s; 5     var arr = s.split('.'); 6  7     //
```

整数

```
 8     if (arr.length < 2) { 9         if (len > 0) {10             result += '.';11             for (var i = 1; i <= len; i++) {12                 result += '0';13             }14         }15         return result;16     }17 18     //
```

小数

```
19     var first = arr[0];20     var second = arr[1];21 22     //
```

小数点位数等于

```
length23     if (second.length == len) {24         return result;25     }26 27     //
```

小数点位数小于

```
length28     if (second.length < len) {29         for (var k = 1; k <= len - second.length; k++) {30             result += '0';31         }32         return result;33     }34 35     //
```

小数点位数大于

```
length36     result = first + second.substr(0, len + 1);37     var last = Math.floor((result * 1 + 5) / 10);38     result = (last / Math.pow(10, len)).toFixed(len);39     return result;40 };
```

备注：解决方案有很多种，这只是个人的理解，仅供参考。
 \> 来自

```
 <https://www.cnblogs.com/ygjoe/p/8708820.html>
```

:::
