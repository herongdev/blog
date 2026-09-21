---
title: "16. 功能及参数"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 16. 功能及参数"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 16
sidebarWeight: 16
alternateZh: "/posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters"
alternateEn: "/posts/c教程/en-US/02-Language Basics/016-Functions and Parameters"
---

[English version](/posts/c教程/en-US/02-Language Basics/016-Functions and Parameters)

函数是您将程序分解为更小、可重用的部分的方法。每个函数执行一项特定任务，您可以在需要时调用它，传入数据（参数），并获取一些内容（返回值）。函数使您的代码组织有序、可测试且更易于理解。

#### 函数的结构

C 中的函数有四个主要部分：

```
return_type function_name(parameter_list) {
    // body of the function
    return value;
}
```

例子：

```
int add(int a, int b) {
    return a + b;
}
```

这里：

-`int`是返回类型
-`add`是名字
-`(int a, int b)`是参数
-`return a + b;`将结果发送回调用者

#### 声明和定义函数

在 C 语言中，必须在使用函数之前声明它。该声明告诉编译器会发生什么。

```
int add(int a, int b); // declaration (prototype)
int main(void) {
    int result = add(3, 4);
    printf("Result: %d\n", result);
    return 0;
}
int add(int a, int b) { // definition
    return a + b;
}
```

输出：

```
Result: 7
```

#### 传递参数

当您调用函数时，参数按值传递，并创建每个值的副本。更改函数内部的参数不会影响原始变量。

```
void change(int x) {
    x = 10;
}
int main(void) {
    int a = 5;
    change(a);
    printf("%d\n", a); // still 5
    return 0;
}
```

如果你想修改原始变量，请使用指针（你将在第 3 章中探讨这一点）：

```
void change(int *x) {
    *x = 10;
}
```

#### 返回值

函数可以使用返回值`return`。返回值的类型必须与函数声明的返回类型匹配。

```
double average(double a, double b) {
    return (a + b) / 2.0;
}
```

如果不返回任何内容，请使用`void`:

```
void greet(void) {
    printf("Hello!\n");
}
```

#### 小代码

这是一个结合了多个函数和参数的完整程序：

```
#include <stdio.h>
// function declarations
int add(int a, int b);
int subtract(int a, int b);
double divide(double a, double b);
void greet(const char *name);
// main function
int main(void) {
    greet("C Learner");
    int sum = add(10, 5);
    int diff = subtract(10, 5);
    double quotient = divide(10.0, 5.0);
    printf("Sum: %d\n", sum);
    printf("Difference: %d\n", diff);
    printf("Quotient: %.2f\n", quotient);
    return 0;
}
// function definitions
int add(int a, int b) {
    return a + b;
}
int subtract(int a, int b) {
    return a - b;
}
double divide(double a, double b) {
    if (b == 0) {
        printf("Error: division by zero!\n");
        return 0.0;
    }
    return a / b;
}
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

编译并运行：

```
gcc functions_demo.c -o functions_demo
./functions_demo
```

输出：

```
Hello, C Learner!
Sum: 15
Difference: 5
Quotient: 2.00
```

#### 为什么它很重要

函数是每个程序的构建块。他们让你：

- 将大问题分解为更小的步骤
- 重用代码而不是重写它
- 独立测试每个部分
- 使程序更易于阅读和维护

在 C 中，您将使用函数来完成所有事情，从算术助手到内存分配器、系统调用和模块化库。

#### 自己尝试一下

1. 编写一个返回两个数字中较大者的函数。
2. 创建一个`void`打印欢迎消息的功能。
3.添加一个`multiply()`函数并从中调用它`main()`.
4. 修改程序以从用户输入中读取数字并将其作为参数传递。
5. 通过删除顶部的声明进行实验，查看出现的编译器错误，然后修复它。

函数是 C 程序的增长方式。每个都是一个小工具，它们组合在一起就成为完整的系统。
