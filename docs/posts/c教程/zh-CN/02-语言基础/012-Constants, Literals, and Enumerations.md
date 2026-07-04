---
title: "12. 常量、文字和枚举"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 12. 常量、文字和枚举"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 12
sidebarWeight: 12
alternateZh: "/posts/c教程/zh-CN/02-语言基础/012-Constants, Literals, and Enumerations"
alternateEn: "/posts/c教程/en-US/02-Language Basics/012-Constants, Literals, and Enumerations"
---

[English version](/posts/c教程/en-US/02-Language Basics/012-Constants, Literals, and Enumerations)

C 程序通常依赖于在整个代码中使用的永不改变的值、数字、字符或命名常量。您可以给它们赋予有意义的名称，并保持程序的可读性、安全性和易于维护性，而不是到处散布神奇的数字。

#### 小代码

```
#include <stdio.h>
#define PI 3.14159           // preprocessor constant
const int DAYS_IN_WEEK = 7;  // read-only variable
enum Direction { NORTH, EAST, SOUTH, WEST }; // enumerated constants
int main(void) {
    printf("Pi: %.2f\n", PI);
    printf("Days in a week: %d\n", DAYS_IN_WEEK);
    printf("Direction EAST has value: %d\n", EAST);
    return 0;
}
```

输出：

```
Pi: 3.14
Days in a week: 7
Direction EAST has value: 1
```

#### C 中的常量

预处理器常数 (`#define`) 这些在编译前被替换。将它们视为文本替换，而不是变量。

```
#define MAX_USERS 100
printf("Max users: %d\n", MAX_USERS);
```

- 不使用内存。
- 没有类型检查，编译器只是替换文本。

常量变量（`const`) 这些是存储在内存中的实际变量，但初始化后无法修改。

```
const double SPEED_OF_LIGHT = 299792458.0;
```

- 类型安全。
- 现代 C 代码中常量的首选。

文字 这些是直接写入代码中的固定值：

```
42          // integer literal
3.14        // floating-point literal
'A'         // character literal
"Hello"     // string literal
0xFF        // hexadecimal literal (255)
075         // octal literal (61)
```

#### 枚举

枚举（enumeration 的缩写）定义了一组命名整型常量。它们使您的代码自我记录并防止原始数字出现错误。

```
enum TrafficLight {
    RED,     // 0
    YELLOW,  // 1
    GREEN    // 2
};
int main(void) {
    enum TrafficLight signal = GREEN;
    if (signal == GREEN)
        printf("Go!\n");
    return 0;
}
```

您还可以分配自定义值：

```
enum Month {
    JAN = 1, FEB, MAR, APR, MAY, JUN,
    JUL, AUG, SEP, OCT, NOV, DEC
};
```

现在`JAN`从 1 开始，每个值自动递增。

#### 为什么它很重要

常量和枚举使您的代码更清晰、更安全：

- 您可以更改一个定义而不是多个数字。
- 编译器可以强制不修改常量。
- 枚举将相关值分组为有意义的集合。

Without them, large programs become fragile and full of unexplained numbers, a maintenance nightmare.

优秀的 C 程序员使用常量来表达意图，而不仅仅是值。

#### 自己尝试一下

将旧程序中的每个数字文字替换为`#define`或者`const`。例子：

```
#define MAX_SCORE 100
const float TAX_RATE = 0.08;
```

创建一个`enum`一周中的几天，并打印`MONDAY`和`FRIDAY`.

在枚举中分配自定义值（例如以`SUNDAY = 1`).

实验：尝试改变`const int x = 5; x = 10;`，请注意编译器会阻止您修改它。

使用`printf`以不同格式打印文字值：

```
printf("%d %x %o\n", 255, 255, 255); // decimal, hex, octal
```

常量是让 C 程序清晰表达的方式。他们将数字转化为想法，这就是将代码从可用变为可理解的原因。
