---
title: "18. 返回值和函数签名"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 18. 返回值和函数签名"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 18
sidebarWeight: 18
alternateZh: "/posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures"
alternateEn: "/posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures"
---

[English version](/posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures)

函数不仅执行任务，而且经常将结果传达给调用者。他们通过返回值来做到这一点。每个 C 函数都有一个签名，一个定义其返回类型、名称和参数的声明。熟悉签名和返回值可以帮助您编写干净、可预测和模块化的程序。

#### 函数签名解释

函数签名如下所示：

```
return_type function_name(parameter_list);
```

它告诉编译器：

1. 函数返回什么样的值（`int`,`double`,`void`， ETC。）
2. 函数叫什么
3. 它需要什么参数及其类型

例子：

```
int max(int a, int b);
```

这说：“`max`是一个接受两个整数并返回一个整数的函数。”

#### 返回值

您使用`return`关键字从函数发送回值。

```
int add(int x, int y) {
    return x + y;
}
```

返回值的类型必须与函数声明的返回类型匹配。

如果函数不需要返回任何内容，请将其声明为`void`:

```
void greet(void) {
    printf("Hello!\n");
}
```

一个`void`函数仍然可以执行操作，只是不产生结果。

#### 多个返回点

如果满足某些条件，您可以提前返回。

```
int divide(int a, int b) {
    if (b == 0) {
        printf("Error: division by zero!\n");
        return 0;
    }
    return a / b;
}
```

这对于错误处理或输入验证很常见。

#### 返回不同的数据类型

您可以返回任何类型，而不仅仅是整数。

```
double average(double a, double b) {
    return (a + b) / 2.0;
}
char first_letter(const char *word) {
    return word[0];
}
_Bool is_even(int n) {
    return n % 2 == 0;
}
```

对于更复杂的数据，您稍后将学习如何返回指针或结构。

#### 小代码

这是一个完整的示例，显示了几种返回类型和签名：

```
#include <stdio.h>
#include <stdbool.h>
// function declarations
int add(int x, int y);
double divide(double a, double b);
bool is_even(int n);
void greet(const char *name);
int main(void) {
    greet("C Programmer");
    int sum = add(7, 3);
    double quotient = divide(10.0, 4.0);
    bool check = is_even(sum);
    printf("Sum: %d\n", sum);
    printf("Quotient: %.2f\n", quotient);
    printf("Is sum even? %s\n", check ? "Yes" : "No");
    return 0;
}
// function definitions
int add(int x, int y) {
    return x + y;
}
double divide(double a, double b) {
    if (b == 0.0) {
        printf("Cannot divide by zero.\n");
        return 0.0;
    }
    return a / b;
}
bool is_even(int n) {
    return n % 2 == 0;
}
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

编译并运行：

```
gcc return_demo.c -o return_demo
./return_demo
```

输出：

```
Hello, C Programmer!
Sum: 10
Quotient: 2.50
Is sum even? Yes
```

#### 为什么它很重要

返回值是函数通信的方式。通过设计清晰且有意义的签名：

- 您使您的代码可预测，每个函数都有明确的目的和输出。
- 编译器可以检查正确性，不匹配的类型会引发警告。
- 您可以组合函数，一个函数的返回成为另一个函数的输入。

在大型系统中，一致的签名和有意义的返回类型构成了良好 API 设计的支柱。

#### 自己尝试一下

1. 编写一个函数`max(a, b)`返回两个整数中较大的一个。
2. 编写函数`to_upper(char c)`返回字符的大写版本。
3.修改一个`divide()`返回的函数`-1`如果发生被零除。
4. 创建一个`sum_to_n(int n)`返回从 1 到所有数字的总和`n`.
5. 尝试使用`void`打印另一个函数调用结果的函数。

返回值赋予您的函数目的，它们将简单的操作转化为可重用的构建块，使您的程序具有表现力、模块化和活力。
