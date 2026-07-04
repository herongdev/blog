---
title: "7. 常见错误和警告"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 7. 常见错误和警告"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 7
sidebarWeight: 7
alternateZh: "/posts/c教程/zh-CN/01-入门/007-Common Errors and Warnings"
alternateEn: "/posts/c教程/en-US/01-Getting Started/007-Common Errors and Warnings"
---

[English version](/posts/c教程/en-US/01-Getting Started/007-Common Errors and Warnings)

没有一个 C 程序员能够避免错误。事实上，编译器的消息是你最好的老师。每个警告或错误都是编译器表达“这里有些东西还没有意义”的方式。尽早学习阅读并修复它们将为您节省数小时的时间，并使调试成为您过程中自然的一部分。

#### 小代码

让我们看几个例子：

```
#include <stdio.h>
int main(void) {
    int a = 5
    printf("The value of a is %d\n", a);
    return 0;
}
```

尝试编译它：

```
gcc error_demo.c -o error_demo
```

输出：

```
error_demo.c: In function ‘main':
error_demo.c:4:13: error: expected ‘;' before ‘printf'
```

这意味着编译器发现缺少分号。该消息甚至会告诉您在哪里（`line 4`）以及为什么（`expected ';' before 'printf'`).

通过添加缺少的分号来修复它：

```
int a = 5;
```

然后再次编译，输出干净就说明成功了。

#### 常见错误类型

语法错误 这些是最容易修复的。你违反了语法规则。示例：缺失`;`, 不匹配的大括号`{}`，或不正确的括号。

类型错误 您使用变量或函数的方式与它们的类型不匹配。例子：

```
int x = "hello"; // error: assigning string to int
```

未声明的标识符您正在使用编译器尚未见过的变量或函数。例子：

```
printf("Value: %d\n", number); // error: ‘number' undeclared
```

链接器错误 编译成功，但链接失败，因为缺少某些内容。例子：

```
undefined reference to `greet'
```

这意味着编译器看到了声明，但找不到实际的函数定义。

警告警告不会停止编译，但它们通常指出潜在的错误。例子：

```
warning: variable ‘x' set but not used
```

始终注意警告、干净的构建（`no warnings`）是质量代码的标志。

#### 为什么它很重要

每个程序员都会犯错误。重要的是你能多快地理解编译器所说的内容。在 C 语言中，错误消息通常是精确而诚实的，它们准确地告诉您发生了什么问题。通过学习解释它们，你正在训练自己用逻辑而不是运气进行调试。

良好习惯：

- 经常编译，不要等到写了 100 行才测试。
- 使用`-Wall -Wextra`启用所有有用的警告。
- 从上到下阅读错误，第一个错误通常会导致其余错误。
- 修复警告，即使代码仍在运行。

#### 自己尝试一下

忘记返回类型：

```
main() {
    printf("No return type!\n");
}
```

编译：

```
gcc -Wall test.c
```

你会得到：

```
warning: return type defaults to ‘int'
```

使用未声明的变量：

```
#include <stdio.h>
int main(void) {
    printf("%d\n", x);
    return 0;
}
```

这将产生：

```
error: ‘x' undeclared
```

修复每一个错误，直到你的程序编译干净且没有任何警告为止。

错误不是失败，它们是编译器引导您理解的方式。你修复的错误越多，你就越能更好地使用机器的语言。
