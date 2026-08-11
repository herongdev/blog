---
title: "if条件语句"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "语句用于在代码中做条件判断。关键字 告诉 JavaScript 在小括号中的条件为真的情况下去执行定义在大括号里面的代码。这种条件被称为 条件，因为他们只可能是 （真）或 （假）。 当条件的计算结果为 ，程序执行大括号内的语句。当布尔条件的计算结果为 ，大括号内的代码将不会执行。"
sidebarWeight: 83
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/流程控制/流程控制语句/if条件语句.md"
---
::: v-pre

# if条件语句

> 本节目标：理解“if条件语句”的核心思路，并能把它用于实际开发或面试表达。
```
虽然条件控制语句（如让语句）只在执行多条语句的情况下才要求使用代码块，但最佳实践是始终在控制语句中使用代码块，即使代码块中只有一条语句，例如：
if (test)
    alert(test); // 有效，容易出错
if (test) { // 推荐使用
    alert(test);
}
理由：
```

```
让编码意图更加清晰
```

```
降低修改代码时出错的几率。
```

```
Use Conditional Logic with If Statements
If
```

语句用于在代码中做条件判断。关键字

```
 if
```

告诉 `JavaScript` 在小括号中的条件为真的情况下去执行定义在大括号里面的代码。这种条件被称为

```
 Boolean
```

条件，因为他们只可能是

```
 true
```

（真）或

```
 false
```

（假）。
当条件的计算结果为

```
 true
```

，程序执行大括号内的语句。当布尔条件的计算结果为

```
 false
```

，大括号内的代码将不会执行。
**伪代码**
`if(`_条件为真_`){`
_语句被执行_
`}`
**示例**

```
function test (myCondition) {
if (myCondition) {
return "It was true";
}
return "It was false";
}
test(true); //
```

==返回==

```
 "It was true"
test(false); //
```

==返回== `"It was false"`
当

```
 test
```

被调用，并且传递进来的参数值为

```
 true
```

，

```
if
```

语句会计算

```
 myCondition
```

的结果，看它是真还是假。如果条件为

```
 true
```

，函数会返回

```
 "It was true"
```

。当

```
 test
```

被调用，并且传递进来的参数值为

```
 false
```

，`myCondition` _不_ 为

```
 true
```

，并且不执行大括号后面的语句，函数返回

```
 "It was false"
```

。
任务
在函数内部创建一个

```
 if
```

语句，如果该参数

```
 wasThatTrue
```

值为

```
 true
```

，返回

```
 "That was true"
```

，否则，并返回

```
 "That was false"
```

。

`Introducing Else Statements`
当`if`语句的条件为真，大括号里的代码执行，那如果条件为假呢？
正常情况下什么也不会发生。
写一个`else`语句，当条件为假时执行相应的代码。

```
if (num > 10) {
return "Bigger than 10";
} else {
return "10 or Less";
}
```
 任务
结合多个`if`语句为一个`if/else`语句
`Introducing Else If Statements`
如果你有多个条件语句，你可以通过`else if`语句把

```
 if
```

语句链起来。

```
if (num > 15) {
return "Bigger than 15";
} else if (num < 5) {
return "Smaller than 5";
} else {
return "Between 5 and 15";
}
```
 任务
使用`else if`实现同样的效果。

```
Logical Order in If Else Statements
if
```

、`else if`语句中代码的执行顺序是很重要的。
在条件判断语句中，代码的执行顺序是从上到下，所以你需要考虑清楚先执行哪一句，后执行哪一句。
这有两个例子。
第一个例子：

```
function foo(x) {
if (x < 1) {
return "Less than one";
} else if (x < 2) {
return "Less than two";
} else {
return "Greater than or equal to two";
}
}
```
 第二个例子更改了代码的执行顺序：

```
function bar(x) {
if (x < 2) {
return "Less than two";
} else if (x < 1) {
return "Less than one";
} else {
return "Greater than or equal to two";
}
}
```
 这两个函数看起来几乎一模一样，我们传一个值进去看看它们有什么区别。

```
foo(0) // "Less than one"
bar(0) // "Less than two"
```
 任务
更改函数的逻辑顺序以便通过所有的测试用例。

```
Chaining If Else Statements
if/else
```

语句串联在一起可以实现复杂的逻辑，这是多个

```
if/else if
```

语句串联在一起的伪代码：

```
if (condition1) {
statement1
} else if (condition2) {
statement2
} else if (condition3) {
statement3
. . .
} else {
statementN
}
```
 任务
把

```
if/else if
```

语句串联起来实现下面的逻辑：

```
num < 5 - return "Tiny"
num < 10 - return "Small"
num < 15 - return "Medium"
num < 20 - return "Large"
num >= 20 - return "Huge"
```

:::
