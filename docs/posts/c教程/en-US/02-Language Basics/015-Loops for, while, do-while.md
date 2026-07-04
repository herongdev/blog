---
title: "15. Loops: for, while, do-while"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Language Basics]"
description: "The Little Book of C — 15. Loops: for, while, do-while"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "15"
sidebarWeight: "15"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while)

Sometimes you need your program to repeat something, a calculation, a print statement, or a check, again and again. Instead of copying the same line of code many times, you use loops. Loops make your program efficient, compact, and able to handle dynamic data of any size.

#### The for Loop

A`for` loop repeats a block of code a fixed number of times.

```
for (initialization; condition; update) {
    // repeated statements
}
```

Example:

```
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
```

Explanation:

- Initialization runs once at the start (`int i = 0`)
- Condition is checked before every loop (`i < 10`)
- Update runs after each iteration (`i++`)
- The loop stops when the condition becomes false

#### The while Loop

The`while` loop repeats while a condition remains true.

```
int n = 5;
while (n > 0) {
    printf("n = %d\n", n);
    n--;
}
```

This loop executes as long as`n` is greater than zero.

#### The do-while Loop

The`do-while` loop guarantees at least one execution, because the condition is checked after the body.

```
int i = 0;
do {
    printf("Running once! i = %d\n", i);
    i++;
} while (i < 1);
```

It’s useful for input validation or repeating tasks until the user chooses to stop.

#### Breaking and Continuing

Sometimes you want to skip or stop partway through a loop.

```
for (int i = 1; i <= 10; i++) {
    if (i == 5) continue;   // skip this iteration
    if (i == 8) break;      // stop the loop
    printf("%d ", i);
}
```

Output:

```
1 2 3 4 6 7
```

#### Nested Loops

You can place one loop inside another to handle grids, tables, or multiple dimensions.

```
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        printf("i=%d, j=%d\n", i, j);
    }
}
```

Output:

```
i=1, j=1
i=1, j=2
i=2, j=1
i=2, j=2
i=3, j=1
i=3, j=2
```

#### Tiny Code

Here’s a complete program that demonstrates all three types of loops and control flow features:

```
#include <stdio.h>
int main(void) {
    // for loop
    printf("for loop:\n");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n\n");
    // while loop
    printf("while loop:\n");
    int n = 3;
    while (n > 0) {
        printf("n = %d\n", n);
        n--;
    }
    printf("\n");
    // do-while loop
    printf("do-while loop:\n");
    int x = 0;
    do {
        printf("x = %d\n", x);
        x++;
    } while (x < 1);
    printf("\n");
    // break and continue
    printf("break and continue demo:\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) continue; // skip 5
        if (i == 8) break;    // stop at 8
        printf("%d ", i);
    }
    printf("\n");
    // nested loop
    printf("\nnested loops:\n");
    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("(%d,%d) ", i, j);
        }
        printf("\n");
    }
    return 0;
}
```

Compile and run:

```
gcc loops_demo.c -o loops_demo
./loops_demo
```

You’ll see all types of loops in action.

#### Why It Matters

Loops are the engine of repetition in every C program. They make it possible to:

- Process arrays, files, and lists of data
- Run algorithms that iterate until a condition is met
- Automate repetitive tasks efficiently

In C, loops are close to how the CPU itself operates, each iteration is a direct cycle of logic and computation. By mastering them, you control how your program moves, stops, and repeats, the heartbeat of every algorithm.

#### Try It Yourself

Write a`for` loop that prints numbers 1 through 100.

Add an`if` inside it to print only even numbers.

Write a`while` loop that counts down from 10 to 1.

Create a nested loop that prints a 3×3 multiplication table.

Try an infinite loop safely:

```
while (1) {
    printf("Press Ctrl+C to stop\n");
    break; // or add a condition to exit
}
```

Once you’re comfortable with loops, you can build patterns, algorithms, and data processors, all by controlling how many times code repeats and under what conditions.
