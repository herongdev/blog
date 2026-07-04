---
title: "13. 运算符和表达式"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 13. 运算符和表达式"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 13
sidebarWeight: 13
alternateZh: "/posts/c教程/zh-CN/02-语言基础/013-Operators and Expressions"
alternateEn: "/posts/c教程/en-US/02-Language Basics/013-Operators and Expressions"
---

[English version](/posts/c教程/en-US/02-Language Basics/013-Operators and Expressions)

运算符是 C 中计算的构建块。它们使您可以用简洁的表达式执行算术、比较值、操作位和组合逻辑。一旦您了解了运算符的工作原理以及它们如何通过优先级和关联性进行交互，您就可以编写出清晰、高效的代码，其行为完全符合您的预期。

#### Tiny Code

```
#include <stdio.h>
int main(void) {
    int a = 10, b = 3;
    printf("a + b = %d\n", a + b);   // addition
    printf("a - b = %d\n", a - b);   // subtraction
    printf("a * b = %d\n", a * b);   // multiplication
    printf("a / b = %d\n", a / b);   // integer division
    printf("a %% b = %d\n", a % b);  // remainder (modulo)
    a += 5; // same as a = a + 5
    printf("a after += 5: %d\n", a);
    return 0;
}
```

输出：

```
a + b = 13
a - b = 7
a * b = 30
a / b = 3
a % b = 1
a after += 5: 15
```

#### 算术运算符

|操作员|意义|示例|结果 |
| --- | --- | --- | --- |
|`+`|加法|`4 + 3`| 7 |
|`-`|减法|`10 - 6`| 4 |
|`*`|乘法|`2 * 5`| 10 |
|`/`|事业部|`7 / 2`| 3（整数除法）|
|`%`|模（余数）|`7 % 2`| 1 |

提示：如果您使用浮点数（`float`,`double`)，除法产生小数。

#### 关系运算符和逻辑运算符

|类型 |操作员|示例|意义|
| --- | --- | --- | --- |
|关系 |`==`|`a == b`|平等|
|`!=`|`a != b`|不等于|
|`<`,`>`,`<=`,`>=`|`a < b`|比较|
|逻辑 |`&&`|`a && b`|逻辑与 |
|`| |`|`a | | b`|逻辑或 |
|`!`|`!a`|逻辑非 |

例子：

```
int age = 20;
if (age >= 18 && age <= 60)
    printf("Adult\n");
```

#### 递增和递减

```
int x = 5;
printf("%d\n", ++x); // prefix: increments, then uses value (6)
printf("%d\n", x++); // postfix: uses value, then increments (6)
printf("%d\n", x);   // final value is 7
```

#### 赋值和复合运算符

|操作员|意义|示例|
| --- | --- | --- |
|`=`|作业 |`x = 10`|
|`+=`|添加和分配 |`x += 2`|
|`-=`|减法和赋值 |`x -= 3`|
|`*=`|乘法和赋值|`x *= 4`|
|`/=`|划分和分配|`x /= 5`|
|`%=`|取模并赋值 |`x %= 6`|

这些可以节省打字并使意图更清晰。

#### 按位运算符

C gives you direct access to bits, useful for systems, embedded, or optimization tasks.

|操作员|意义|示例|
| --- | --- | --- |
|`&`| AND |`a & b`|
|`|`| OR |`a | b`|
|`^`| XOR |`a ^ b`|
|`~`| NOT |`~a`|
|`<<`| Left shift |`a << 1`|
|`>>`| Right shift |`a >> 2`|

例子：

```
int mask = 0b0010;
int num = 0b1011;
int result = num & mask;  // checks if the 2nd bit is set
```

#### Precedence and Associativity

When you write complex expressions, C follows operator precedence rules. For example:

```
int result = 2 + 3 * 4; // result is 14, not 20
```

`*`has higher precedence than`+`, so it runs first.

Use parentheses to make intentions clear:

```
int result = (2 + 3) * 4; // result is 20
```

#### Why It Matters

Operators are where logic meets the machine. They translate mathematical ideas and control decisions into instructions the CPU executes directly. Understanding how expressions are built and evaluated helps you:

- Write compact, efficient code
- Avoid precedence mistakes
- Control exactly what your program computes

In low-level work (like bitwise operations or embedded systems), operator mastery is essential.

#### 自己尝试一下

Write a small program that takes two integers and prints their:

- 总和
- 差异
- 产品
- 商数
- 余数

Modify it to print results as floating-point values.

使用逻辑运算符来测试两个数字是否为正数。

Try combining bitwise operations:

```
printf("%d\n", 5 & 3);  // AND
printf("%d\n", 5 | 3);  // OR
printf("%d\n", 5 ^ 3);  // XOR
```

Experiment with parentheses and operator order until you can predict every result.

运算符是 C 的简单性与强大功能的结合，是一小组符号，可让您完全控制计算、逻辑甚至原始位。
