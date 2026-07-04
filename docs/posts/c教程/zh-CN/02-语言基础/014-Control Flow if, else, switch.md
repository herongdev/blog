---
title: "14. 控制流程：if、else、switch"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 14. 控制流程：if、else、switch"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "14"
sidebarWeight: "14"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/014-Control Flow if, else, switch"
alternateEn: "/posts/c教程/en-US/02-Language Basics/014-Control Flow if, else, switch"
---

[English version](/posts/c教程/en-US/02-Language Basics/014-Control Flow if, else, switch)

当程序可以决定时，当它们可以根据数据或条件选择一条路径或另一条路径时，程序就会变得强大。在 C 语言中，控制流语句为您提供了这种能力。它们决定您的程序如何在代码的不同部分中移动。

#### 小代码

```
#include <stdio.h>
int main(void) {
    int temperature = 30;
    if (temperature > 35) {
        printf("It's too hot!\n");
    } else if (temperature > 25) {
        printf("It's warm.\n");
    } else {
        printf("It's cool.\n");
    }
    return 0;
}
```

输出：

```
It's warm.
```

这就是在 C 中表达逻辑的方式：通过检查条件并仅执行匹配的代码。

#### if 和 else 结构

基本模式如下所示：

```
if (condition) {
    // do something if true
} else if (another_condition) {
    // do something else
} else {
    // default action
}
```

每个`if`或者`else if`检查必须评估为的条件`true`（非零）或`false`（零）。

例子：

```
int score = 85;
if (score >= 90)
    printf("Grade: A\n");
else if (score >= 80)
    printf("Grade: B\n");
else
    printf("Grade: C or below\n");
```

#### 比较和布尔逻辑

C没有内置的`bool`输入较旧的标准，但从 C99 开始，您可以包含它：

```
#include <stdbool.h>
bool is_ready = true;
if (is_ready) printf("Let's go!\n");
```

在幕后，`true`只是`1`和`false`是`0`.

#### 嵌套 if 语句

您可以嵌套决策以实现更复杂的逻辑：

```
if (x > 0) {
    if (x % 2 == 0)
        printf("Positive even number\n");
    else
        printf("Positive odd number\n");
}
```

请注意，过多的嵌套会使代码更难阅读。当逻辑变得复杂时，考虑重新组织或使用`switch`陈述。

#### switch 语句

`switch`是一种针对多个固定值测试一个变量的简洁方法。

```
#include <stdio.h>
int main(void) {
    int day = 3;
    switch (day) {
        case 1:
            printf("Monday\n");
            break;
        case 2:
            printf("Tuesday\n");
            break;
        case 3:
            printf("Wednesday\n");
            break;
        default:
            printf("Another day\n");
    }
    return 0;
}
```

输出：

```
Wednesday
```

每个`case`标签标记了一个潜在的分支。`break`阻止开关“掉入”下一个案例。

您可以对多个案例进行分组：

```
switch (ch) {
    case 'a':
    case 'A':
        printf("Letter A detected\n");
        break;
}
```

#### 三元运算符

为了快速做出决定，您可以使用条件运算符：

```
int age = 20;
printf("%s\n", (age >= 18) ? "Adult" : "Minor");
```

这相当于：

```
if (age >= 18)
    printf("Adult\n");
else
    printf("Minor\n");
```

#### 为什么它很重要

控制流为您的程序提供智能。您的代码不是直接运行，而是对输入、条件和数据做出反应。 C 的分支语句简单但灵活，它们是从排序算法到操作系统调度程序的所有内容的构建块。

当您了解如何控制执行时，您可以精确地塑造程序的逻辑。

#### 自己尝试一下

编写一个程序：

- 从用户处读取一个整数。
- 打印它是正数、负数还是零。

扩展一下：

- 如果是正数，则打印它是偶数还是奇数。

使用一个`switch`陈述：

- 询问数字 1-7。
- 打印匹配的星期几。

尝试更换你的`if`在有意义的情况下使用三元运算符的语句。

控制流是你在代码中思考的方式，它是你教你的程序像你一样做出决策的方式。
