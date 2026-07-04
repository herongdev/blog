---
title: "11. 数据类型和变量"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 11. 数据类型和变量"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 11
sidebarWeight: 11
alternateZh: "/posts/c教程/zh-CN/02-语言基础/011-Data Types and Variables"
alternateEn: "/posts/c教程/en-US/02-Language Basics/011-Data Types and Variables"
---

[English version](/posts/c教程/en-US/02-Language Basics/011-Data Types and Variables)

在 C 中，一切都从类型开始。类型告诉编译器要保留多少内存、如何解释存储在那里的位以及允许进行哪些操作。理解类型是编写安全高效的 C 程序的基础，它是您如何准确地说计算机的母语的基础。

#### Tiny Code

```
#include <stdio.h>
int main(void) {
    int age = 25;              // integer
    float height = 1.75;       // floating-point number
    char initial = 'A';        // single character
    double weight = 68.4;      // double-precision number
    printf("Age: %d\n", age);
    printf("Height: %.2f\n", height);
    printf("Initial: %c\n", initial);
    printf("Weight: %.1lf\n", weight);
    return 0;
}
```

输出：

```
Age: 25
Height: 1.75
Initial: A
Weight: 68.4
```

#### 核心内置类型

|类型 |尺寸（典型）|描述 |格式说明符 |
| --- | --- | --- | --- |
|`char`| 1 字节 |单个字符|`%c`|
|`int`| 4 字节 |整数 |`%d`|
|`float`| 4 字节 |十进制数（单精度）|`%f`|
|`double`| 8 字节 |十进制数（双精度）|`%lf`|
|`void`| – |无值或类型 | – |

大小可能会根据系统和编译器的不同而有所不同，但关系保持一致。

您还可以使用修饰符控制数字的行为方式：

|修改器|示例|意义|
| --- | --- | --- |
|`short`|`short int x;`|较小的整数（通常为 2 个字节）|
|`long`|`long int y;`|更大的整数（通常是 8 个字节）|
|`unsigned`|`unsigned int z;`|仅非负值 |

例子：

```
unsigned int score = 100;
long long big_number = 1234567890123LL;
```

#### 声明和初始化变量

变量只是一段命名的内存。您可以通过指定其类型和名称来声明它：

```
int count;       // declaration
count = 5;       // assignment
```

或者两者一起：

```
int count = 5;   // initialization
```

多重声明：

```
int x = 1, y = 2, z = 3;
```

变量必须在使用之前声明，并且它们的类型不能改变。

#### 为什么它很重要

C 是一种静态类型语言，这意味着每个变量的类型在编译时都是已知的。这使得程序更快、更安全，因为编译器可以：

- 及早发现类型不匹配
- 优化内存布局
- 预测存储和对齐

当您了解数据类型时，您就会了解代码如何直接映射到机器的内存。

C 迫使你仔细思考你正在使用什么类型的数据，这项技能可以改进你用任何语言编写的每个程序。

#### 自己尝试一下

创建一个存储和打印的程序：

- 您的年龄`int`
- 您的身高`float`
- 你名字的第一个字母`char`

将两个整数相加并打印结果：

```
int a = 10, b = 20;
printf("Sum: %d\n", a + b);
```

尝试使用`unsigned int`并打印如果分配负值会发生什么。

使用`sizeof()`检查每种类型在系统上的大小：

```
printf("Size of int: %zu bytes\n", sizeof(int));
```

C 中的每个数字、字符和指针都从这里开始，在类型和变量的精确世界中。一旦你熟练掌握了这些，内存布局、结构和指针就会变得非常有意义。
