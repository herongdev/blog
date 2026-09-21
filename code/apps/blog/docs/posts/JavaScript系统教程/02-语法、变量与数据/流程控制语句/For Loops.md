---
title: "For Loops"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "Iterate with JavaScript For Loops 一个条件语句只能执行一次代码，而一个循环语句可以多次执行代码。 JavaScript 中最常见的循环就是“ for 循环 ”。 for 循环中的三个表达式用分号隔开： for ([ 初始化 ]; [ 条件判断 ]。"
sidebarWeight: 81
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/流程控制/流程控制语句/For Loops.md"
---
::: v-pre

# For Loops

> 本节目标：理解“For Loops”的核心思路，并能把它用于实际开发或面试表达。
`Iterate with JavaScript For Loops`
一个条件语句只能执行一次代码，而一个循环语句可以多次执行代码。
`JavaScript` 中最常见的循环就是“`for`==循环==”。
`for`循环中的三个表达式用分号隔开：
`for ([`==初始化==`]; [`==条件判断==`]; [`==计数器==`])`
==初始化==语句只会在执行循环开始之前执行一次。它通常用于定义和设置你的循环变量。
==条件判断==语句会在每一轮循环的开始执行，只要条件判断为

```
 true
```

就会继续执行循环。当条件为

```
 false
```

的时候，循环将停止执行。这意味着，如果条件在一开始就为

```
 false
```

，这个循环将不会执行。
==计数器==是在每一轮循环结束时执行，通常用于递增或递减。
在下面的例子中，先初始化`i = 0`，条件

```
 i < 5
```

为真，进入第一次循环，执行大括号里的代码，第一次循环结束。递增`i`的值，条件判断，就这样依次执行下去，直到条件判断为假，整个循环结束。

```
var ourArray = [];
for (var i = 0; i < 5; i++) {
ourArray.push(i);
}
```
 最终

```
 ourArray
```

的值为

```
 [0,1,2,3,4].
```
 任务
使用

```
 for
```

循环把从 `1` 到 `5` 添加进

```
 myArray
```

中。
`for`循环就是`if`条件语句的进化版。

```
Iterate Odd Numbers With a For Loop
for
```

循环可以按照我们指定的顺序来迭代，通过更改我们的 ==计数器==，我们可以按照偶数顺序来迭代。
初始化

```
 i = 0
```

，当

```
 i < 10
```

的时候继续循环。

```
i += 2
```

让

```
 i
```

每次循环之后增加`2`。

```
var ourArray = [];
for (var i = 0; i < 10; i += 2) {
ourArray.push(i);
}
```
 循环结束后，

```
ourArray
```

的值为

```
 [0,2,4,6,8]
```

。
改变 ==计数器==，这样我们可以用奇数来数。
任务
写一个

```
 for
```

循环，把从`1`到`9`的奇数添加到

```
 myArray
```

。

```
Count Backwards With a For Loop
for
```

循环也可以逆向迭代，只要我们定义好合适的条件。
为了能够从后往前两两倒数，我们需要改变我们的 ==初始化==，==条件判断== 和 ==计数器==。
我们让

```
 i = 10
```

，并且当

```
 i > 0
```

的时候才继续循环。我们使用

```
 i-=2
```

来让

```
 i
```

每次循环递减 `2`。

```
var ourArray = [];
for (var i=10; i > 0; i-=2) {
ourArray.push(i);
}
```
 循环结束后，

```
ourArray
```

的值为

```
 [10,8,6,4,2]
```

。
让我们改变 ==初始化== 和 ==计数器==，这样我们就可以按照奇数从后往前两两倒着数。
**任务**
使用一个

```
 for
```

循环，把`9`到`1`的奇数添加进

```
 myArray
```

。
`Iterate Through an Array with a For Loop`
迭代输出一个数组的每个元素是 `JavaScript` 中的常见需求，

```
 for
```

循环可以做到这一点。
下面的代码将输出数组

```
 arr
```

的每个元素到控制台：

```
var arr = [10,9,8,7,6];
for (var i=0; i < arr.length; i++) {
console.log(arr[i]);
}
```
 记住数组的索引从零开始的，这意味着数组的最后一个元素的下标是：数组的长度 `- 1`。我们这个循环的 _条件_ 是

```
 i < arr.length
```

，当

```
 i
```

的值为 长度`-1` 的时候循环就停止了。
任务
声明并初始化一个变量

```
 total
```

为

```
 0
```

。使用

```
 for
```

循环，使得

```
 total
```

的值为

```
 myArr
```

的数组中的每个元素的值的总和。

`Nesting For Loops`
如果你有一个二维数组，可以使用相同的逻辑，先遍历外面的数组，再遍历里面的子数组。下面是一个例子：

```
var arr = [
[1,2], [3,4], [5,6]
];
for (var i=0; i < arr.length; i++) {
for (var j=0; j < arr[i].length; j++) {
console.log(arr[i][j]);
}
}
```
 一次输出

```
 arr
```

中的每个子元素。提示，对于内部循环，我们可以通过

```
 arr[i]
```

的

```
 .length
```

来获得子数组的长度，因为

```
 arr[i]
```

的本身就是一个数组。
任务
修改函数

```
 multiplyAll
```

，获得

```
 arr
```

内部数组的每个数字相乘的结果

```
 product
```

。

:::
