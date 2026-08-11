---
title: "switch"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "Selecting from many options with Switch Statements 如果你有非常多的选项需要选择，可以使用 switch 语句。根据不同的参数值会匹配上不同的 case 分支，语句会从第一个匹配的 case 分支开始执行，直到碰到 break 就。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/流程控制/流程控制语句/switch.md"
---
::: v-pre

# switch

> 本节目标：理解“switch”的核心思路，并能把它用于实际开发或面试表达。
`Selecting from many options with Switch Statements`
如果你有非常多的选项需要选择，可以使用`switch`语句。根据不同的参数值会匹配上不同的`case`分支，语句会从第一个匹配的`case`分支开始执行，直到碰到`break`就结束。
这是一个伪代码案例：

```
switch (num) {
case value1:
statement1;
break;
case value2:
statement2;
break;
...
case valueN:
statementN;
break;
}
```
 测试

```
case
```

值使用严格相等运算符进行比较，`break`关键字告诉`javascript`停止执行语句。如果没有`break`关键字，下一个语句会继续执行。
任务
写一个测试

```
 val
```

的`switch`语句，并且根据下面的条件来设置不同的`answer`：

```
1 - "alpha"
2 - "beta"
3 - "gamma"
4 - "delta"
```

`Adding a default option in Switch statements`
在

```
switch
```

语句中你可能无法用`case`来指定所有情况，这时你可以添加`default`语句。当再也找不到`case`匹配的时候`default`语句会执行，非常类似于`if/else`组合中的`else`语句。
`default`语句应该是最后一个`case`。

```
switch (num) {
case value1:
statement1;
break;
case value2:
statement2;
break;
...
default:
defaultStatement;
}
```
 任务
写一个根据下面的条件来设置`answer`的`switch`语句：

```
"a" - "apple"
"b" - "bird"
"c" - "cat"
default - "stuff"
Multiple Identical Options in Switch Statements
```
 如果`switch`语句中的`case`分支的

```
break
```

语句漏掉了，后面的

```
 case
```

语句会一直执行直到遇到`break`。如果你有多个输入值和输出值一样，可以试试下面的`switch`语句：

```
switch(val) {
case 1:
case 2:
case 3:
result = "1, 2, or 3";
break;
case 4:
result = "4 alone";
}
```
 分支`1`、`2`、`3`将会产生相同的输出结果。
任务
写一个根据下面的范围来设置

```
answer
```

的`switch`语句：

```
1-3 - "Low"
4-6 - "Mid"
7-9 - "High"
```
 **提示**
你需要为每一个包含数字的范围准备一个`answer`语句。
`Replacing If Else Chains with Switch`
如果你有多个选项需要选择，

```
switch
```

语句写起来会比多个串联的

```
if/if else
```

语句容易些，譬如

```
:
if (val === 1) {
answer = "a";
} else if (val === 2) {
answer = "b";
} else {
answer = "c";
}
```
 可以被下面替代：

```
switch (val) {
case 1:
answer = "a";
break;
case 2:
answer = "b";
break;
default:
answer = "c";
}
```
 任务
把串联的

```
 if/if else
```

语句改成

```
 switch
```

语句。
`Returning Boolean Values from Functions`
你可能会回想起

```
Comparison with the Equality Operator
```

，所有的比较操作符返回的都是一个`boolean`值，要么是

```
 true
```

要么是

```
false
```

。
使用

```
 if/else
```

语句来做比较然后返回`true`或`false`已经成为大家的共识

```
:
function isEqual(a,b) {
if (a === b) {
return true;
} else {
return false;
}
}
```
 因为

```
===
```

总是返回

```
 true
```

或

```
 false
```

，所以我们可以直接返回比较的结果：

```
function isEqual(a,b) {
return a === b;
}
```
 任务
移除`isLess`函数的`if/else`语句但不影响函数的功能。

:::
