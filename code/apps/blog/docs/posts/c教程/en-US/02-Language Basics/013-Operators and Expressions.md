---
title: "13. Operators and Expressions"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Language Basics"
description: "The Little Book of C — 13. Operators and Expressions"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 13
sidebarWeight: 13
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/013-Operators and Expressions"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/013-Operators and Expressions"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/013-Operators and Expressions)

Operators are the building blocks of computation in C. They let you perform arithmetic, compare values, manipulate bits, and combine logic, all in concise expressions. Once you understand how operators work and how they interact through precedence and associativity, you can write clear, efficient code that behaves exactly as you expect.

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

Output:

```
a + b = 13
a - b = 7
a * b = 30
a / b = 3
a % b = 1
a after += 5: 15
```

#### Arithmetic Operators

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `4 + 3` | 7 |
| `-` | Subtraction | `10 - 6` | 4 |
| `*` | Multiplication | `2 * 5` | 10 |
| `/` | Division | `7 / 2` | 3 (integer division) |
| `%` | Modulo (remainder) | `7 % 2` | 1 |

Tip: If you use floating-point numbers (`float`,`double`), division produces decimals.

#### Relational and Logical Operators

| Type | Operator | Example | Meaning |
| --- | --- | --- | --- |
| Relational | `==` | `a == b` | Equal |
| `!=` | `a != b` | Not equal |
| `<`,`>`,`<=`,`>=` | `a < b` | Comparison |
| Logical | `&&` | `a && b` | Logical AND |
| `| |` | `a | | b` | Logical OR |
| `!` | `!a` | Logical NOT |

Example:

```
int age = 20;
if (age >= 18 && age <= 60)
    printf("Adult\n");
```

#### Increment and Decrement

```
int x = 5;
printf("%d\n", ++x); // prefix: increments, then uses value (6)
printf("%d\n", x++); // postfix: uses value, then increments (6)
printf("%d\n", x);   // final value is 7
```

#### Assignment and Compound Operators

| Operator | Meaning | Example |
| --- | --- | --- |
| `=` | Assignment | `x = 10` |
| `+=` | Add and assign | `x += 2` |
| `-=` | Subtract and assign | `x -= 3` |
| `*=` | Multiply and assign | `x *= 4` |
| `/=` | Divide and assign | `x /= 5` |
| `%=` | Modulo and assign | `x %= 6` |

These save typing and make intent clearer.

#### Bitwise Operators

C gives you direct access to bits, useful for systems, embedded, or optimization tasks.

| Operator | Meaning | Example |
| --- | --- | --- |
| `&` | AND | `a & b` |
| `|` | OR | `a | b` |
| `^` | XOR | `a ^ b` |
| `~` | NOT | `~a` |
| `<<` | Left shift | `a << 1` |
| `>>` | Right shift | `a >> 2` |

Example:

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

`*` has higher precedence than`+`, so it runs first.

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

#### Try It Yourself

Write a small program that takes two integers and prints their:

- Sum
- Difference
- Product
- Quotient
- Remainder

Modify it to print results as floating-point values.

Use logical operators to test if both numbers are positive.

Try combining bitwise operations:

```
printf("%d\n", 5 & 3);  // AND
printf("%d\n", 5 | 3);  // OR
printf("%d\n", 5 ^ 3);  // XOR
```

Experiment with parentheses and operator order until you can predict every result.

Operators are where C’s simplicity meets its power, a small set of symbols that give you total control over computation, logic, and even raw bits.
