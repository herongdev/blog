---
title: "Function类型"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "函数名称 Firefox、Safar、Chrome和Opera都给函数定义了一个非标准的 name 属性，这个属性的值永远等于跟在function关键字后面的标识符，即函数名。 //只在Firefox、Safari、Chrome 和 Opera有效 alert(functlonN。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-函数/(5m)Function类型/(5m)Function类型.md"
---
::: v-pre

# Function类型

> 本节目标：理解“Function类型”的核心思路，并能把它用于实际开发或面试表达。
```
函数对任何语言来说都是一个核心的概念。
```

```
**声明函数**
```

```
使用function关键字来声明，
```

```
后跟函数名，
```

```
参数，
```

```
函数体。
```

```
如：
function sayHi(name, message) {
  alert("Hello " + name + "," + message);
}
```

**函数名称**
Firefox、Safar、Chrome和Opera都给函数定义了一个非标准的 name 属性，这个属性的值永远等于跟在function关键字后面的标识符，即函数名。
//只在Firefox、Safari、Chrome 和 Opera有效
alert(functlonName.name);//"functionNamet

```
**调用函数**
```

```
通过函数名；
```

```
后面加上一对圆括号来调用；
```

```
圆括号中的参数可有可无，如果有多个，用逗号隔开。
```

```
如：
sayHi("Nicholas", "how are you today?");
**函数返回值**
```

```
函数通过return语句；
```

```
后跟要返回的值来实现返回值；
```

```
return语句如果后面没有返回值，则函数将返回undefined。
```

```
不使用return返回返回值的函数，实际返回undefined。
```

函数会在执行完return语句之后停止并立即退出。所以return语句之后的任何代码不会执行。

```
**函数声明提升**
函数声明提升（function declaration hoisting)意思是在执往代码之前会先读取函数声明。这就意味着可以把函数声明放在调用它的语句后面。
sayHi();
function sayHi() {
    console.log('Hi!')
}
```

```
**严格模式对函数有一些限制：**
```

```
不能把函数命名为eval或arguments；
```

```
不能把参数命名为eval或arguments；
```

```
不能出现两个命名参数同名的情况。
```

```
如果发生以上情况，就会导致语法错误，代码无法执行。
```

:::
