---
title: "11. Data Types and Variables"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Language Basics"
description: "The Little Book of C — 11. Data Types and Variables"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 11
sidebarWeight: 11
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/011-Data Types and Variables"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/011-Data Types and Variables"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/011-Data Types and Variables)

In C, everything begins with types. A type tells the compiler how much memory to reserve, how to interpret the bits stored there, and what operations are allowed. Understanding types is the foundation of writing safe and efficient C programs, it’s how you speak the computer’s native language precisely.

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

Output:

```
Age: 25
Height: 1.75
Initial: A
Weight: 68.4
```

#### Core Built-in Types

| Type | Size (Typical) | Description | Format Specifier |
| --- | --- | --- | --- |
| `char` | 1 byte | Single character | `%c` |
| `int` | 4 bytes | Whole number | `%d` |
| `float` | 4 bytes | Decimal number (single precision) | `%f` |
| `double` | 8 bytes | Decimal number (double precision) | `%lf` |
| `void` | – | No value or type | – |

Sizes may vary depending on system and compiler, but the relationships remain consistent.

You can also control how numbers behave using modifiers:

| Modifier | Example | Meaning |
| --- | --- | --- |
| `short` | `short int x;` | Smaller integer (often 2 bytes) |
| `long` | `long int y;` | Larger integer (often 8 bytes) |
| `unsigned` | `unsigned int z;` | Only non-negative values |

Example:

```
unsigned int score = 100;
long long big_number = 1234567890123LL;
```

#### Declaring and Initializing Variables

A variable is simply a named piece of memory. You declare it by specifying its type and name:

```
int count;       // declaration
count = 5;       // assignment
```

Or both together:

```
int count = 5;   // initialization
```

Multiple declarations:

```
int x = 1, y = 2, z = 3;
```

Variables must be declared before you use them, and their type cannot change.

#### Why It Matters

C is a statically typed language, meaning every variable’s type is known at compile time. This makes programs faster and safer, because the compiler can:

- Catch type mismatches early
- Optimize memory layout
- Predict storage and alignment

When you understand data types, you understand how your code maps directly to the machine’s memory.

C forces you to think carefully about what kind of data you’re working with, a skill that improves every program you write, in any language.

#### Try It Yourself

Create a program that stores and prints:

- Your age as an`int`
- Your height as a`float`
- Your name’s first letter as a`char`

Add two integers and print the result:

```
int a = 10, b = 20;
printf("Sum: %d\n", a + b);
```

Try using an`unsigned int` and print what happens if you assign a negative value.

Use`sizeof()` to inspect how big each type is on your system:

```
printf("Size of int: %zu bytes\n", sizeof(int));
```

Every number, character, and pointer in C starts here, in the precise world of types and variables. Once you’re fluent in these, memory layout, structs, and pointers will make perfect sense.
