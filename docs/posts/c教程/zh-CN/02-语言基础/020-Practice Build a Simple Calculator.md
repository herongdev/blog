---
title: "20. 练习：构建一个简单的计算器"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 20. 练习：构建一个简单的计算器"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "20"
sidebarWeight: "20"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/020-Practice Build a Simple Calculator"
alternateEn: "/posts/c教程/en-US/02-Language Basics/020-Practice Build a Simple Calculator"
---

[English version](/posts/c教程/en-US/02-Language Basics/020-Practice Build a Simple Calculator)

#### 跟练交付物

- 已具备状态：完成第 011-019 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/020-calculator`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/020-calculator && cd ~/c-course-labs/020-calculator`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\020-calculator"; Set-Location "$HOME\c-course-labs\020-calculator"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录正常加法、除零错误和 `q` 退出三段交互记录。
- 本章边界：计算器主线只要求单文件可运行；把函数拆成 `.h` / `.c` 是加分项，完整构建自动化会在第 60 课集中处理。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

现在您已经了解了函数、变量、循环、控制流和链接，是时候将所有内容整合在一起了。您将构建一个简单的计算器，使用干净的模块化代码执行基本算术。这个小项目将强化第 11 章到第 19 章的所有内容：数据类型、运算符、控制流和可重用函数。

#### 项目概况

您将编写一个计算器：

- 提示用户输入两个号码和一个运算符
- 执行相应的操作（+、-、*、/）
- 安全地处理除零
- 重复直到用户选择退出

您将使用多个函数和一个干净的主循环来构建它。

#### 小代码

先创建 `calculator.c`。这个文件同时拥有交互循环和四个算术函数；等你学到多文件构建后，再把算术函数拆到 `mathutils.c` / `mathutils.h`。

```c
#include <stdio.h>
#include <stdbool.h>

double add(double a, double b);
double subtract(double a, double b);
double multiply(double a, double b);
double divide(double a, double b);
void print_menu(void);

/* Owns the interactive calculator loop and dispatches each operation. */
int main(void) {
    double num1, num2, result;
    char op;
    bool running = true;

    printf("=== Simple C Calculator ===\n");

    while (running) {
        print_menu();
        printf("Enter an operator (+, -, *, /) or q to quit: ");
        scanf(" %c", &op);

        if (op == 'q' || op == 'Q') {
            running = false;
            printf("Goodbye!\n");
            break;
        }

        printf("Enter first number: ");
        scanf("%lf", &num1);
        printf("Enter second number: ");
        scanf("%lf", &num2);

        switch (op) {
            case '+':
                result = add(num1, num2);
                printf("Result: %.2f\n", result);
                break;
            case '-':
                result = subtract(num1, num2);
                printf("Result: %.2f\n", result);
                break;
            case '*':
                result = multiply(num1, num2);
                printf("Result: %.2f\n", result);
                break;
            case '/':
                if (num2 == 0) {
                    printf("Error: Division by zero!\n");
                } else {
                    result = divide(num1, num2);
                    printf("Result: %.2f\n", result);
                }
                break;
            default:
                printf("Unknown operator: %c\n", op);
        }
        printf("\n");
    }

    return 0;
}

/* Returns the sum of two numbers. */
double add(double a, double b) {
    return a + b;
}

/* Returns the left number minus the right number. */
double subtract(double a, double b) {
    return a - b;
}

/* Returns the product of two numbers. */
double multiply(double a, double b) {
    return a * b;
}

/* Returns the quotient; the caller checks division by zero first. */
double divide(double a, double b) {
    return a / b;
}

/* Prints the available commands before each input turn. */
void print_menu(void) {
    printf("\nChoose an operation:\n");
    printf("  +  Addition\n");
    printf("  -  Subtraction\n");
    printf("  *  Multiplication\n");
    printf("  /  Division\n");
    printf("  q  Quit\n\n");
}
```

编译并运行：

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic -g calculator.c -o calculator
./calculator
```

Windows PowerShell 运行可执行文件时使用：

```powershell
.\calculator.exe
```

#### 调用链和数据流

这段程序的读取顺序是：

```text
main()
-> print_menu()
-> scanf 读取运算符
-> scanf 读取两个数字
-> switch 选择 add/subtract/multiply/divide
-> printf 输出结果或错误
```

`main()` 负责交互流程；四个算术函数只负责计算，不读取输入、不打印输出。这样拆分后，你可以单独检查“流程是否正确”和“计算是否正确”。除零检查放在调用 `divide()` 之前，因为 `divide()` 只表达正常除法，错误路径由交互层处理。

会话示例：

```
=== 简单的 C 计算器 ===
选择操作：
+ 加法
- 减法
* 乘法
/  分配
退出

输入运算符（+、-、*、/）或 q 退出：+
输入第一个数字：5
输入第二个数字：3
结果：8.00

输入运算符（+、-、*、/）或 q 退出：/
输入第一个数字：10
输入第二个数字：0
错误：除以零！

输入运算符（+、-、*、/）或 q 退出：q
再见！
```

#### 为什么它很重要

这个简单的项目几乎结合了您在第 2 章中学到的所有内容：

- 表示数字的数据类型
- 用于执行计算的运算符
- 决策控制流程
- 循环重复交互
- 模块化设计的功能

您现在已经超越了语法，您已经构建了一个可以与真实用户交互的有效、可重用的 C 程序。

#### 自己尝试一下

添加新操作员`%`求模（整数余数）。

创建单独的文件：

-`calculator.c`为了`main()`
-`mathutils.c`和`mathutils.h`对于算术函数然后使用以下命令进行编译：

```
gcc calculator.c mathutils.c -o calculator
```

扩展计算器以记住最后的结果，并在用户输入单个操作数时重用它。

添加输入验证（例如，检查是否`scanf`实际上读取的是一个数字）。

对于挑战，实施权力（`^`) 或平方根 (`sqrt`） 使用`<math.h>`.

该计算器标志着您的语言基础知识之旅的结束，从变量和控制流到完整的交互式程序。在下一章中，您将深入了解内存：C 如何存储、管理数据并让您直接控制它。
