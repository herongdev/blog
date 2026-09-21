---
title: "14. Control Flow: if, else, switch"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Language Basics]"
description: "The Little Book of C — 14. Control Flow: if, else, switch"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "14"
sidebarWeight: "14"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/014-Control Flow if, else, switch"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/014-Control Flow if, else, switch"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/014-Control Flow if, else, switch)

Programs become powerful when they can decide, when they can choose one path or another depending on data or conditions. In C, control flow statements give you that power. They determine how your program moves through different parts of your code.

#### Tiny Code

```
#include <stdio.h>
int main(void) {
    int temperature = 30;
    if (temperature > 35) {
        printf("It's too hot!\n");
    } else if (temperature > 25) {
        printf("It's warm.\n");
    } else {
        printf("It's cool.\n");
    }
    return 0;
}
```

Output:

```
It's warm.
```

This is how you express logic in C: by checking conditions and executing only the code that matches.

#### The if and else Structure

The basic pattern looks like this:

```
if (condition) {
    // do something if true
} else if (another_condition) {
    // do something else
} else {
    // default action
}
```

Each`if` or`else if` checks a condition that must evaluate to`true`(non-zero) or`false`(zero).

Example:

```
int score = 85;
if (score >= 90)
    printf("Grade: A\n");
else if (score >= 80)
    printf("Grade: B\n");
else
    printf("Grade: C or below\n");
```

#### Comparison and Boolean Logic

C doesn’t have a built-in`bool` type in older standards, but since C99, you can include it:

```
#include <stdbool.h>
bool is_ready = true;
if (is_ready) printf("Let's go!\n");
```

Behind the scenes,`true` is just`1` and`false` is`0`.

#### Nested if Statements

You can nest decisions for more complex logic:

```
if (x > 0) {
    if (x % 2 == 0)
        printf("Positive even number\n");
    else
        printf("Positive odd number\n");
}
```

Just be careful, too much nesting makes code harder to read. When logic gets complex, consider reorganizing or using a`switch` statement.

#### The switch Statement

`switch` is a clean way to test one variable against several fixed values.

```
#include <stdio.h>
int main(void) {
    int day = 3;
    switch (day) {
        case 1:
            printf("Monday\n");
            break;
        case 2:
            printf("Tuesday\n");
            break;
        case 3:
            printf("Wednesday\n");
            break;
        default:
            printf("Another day\n");
    }
    return 0;
}
```

Output:

```
Wednesday
```

Each`case` label marks a potential branch.`break` stops the switch from “falling through” into the next case.

You can group multiple cases:

```
switch (ch) {
    case 'a':
    case 'A':
        printf("Letter A detected\n");
        break;
}
```

#### The Ternary Operator

For quick decisions, you can use the conditional operator:

```
int age = 20;
printf("%s\n", (age >= 18) ? "Adult" : "Minor");
```

This is equivalent to:

```
if (age >= 18)
    printf("Adult\n");
else
    printf("Minor\n");
```

#### Why It Matters

Control flow gives your programs intelligence. Instead of running straight through, your code reacts to input, conditions, and data. C’s branching statements are simple but flexible, they’re the building blocks of everything from sorting algorithms to operating system schedulers.

When you understand how to control execution, you can shape your program’s logic precisely.

#### Try It Yourself

Write a program that:

- Reads an integer from the user.
- Prints whether it’s positive, negative, or zero.

Extend it:

- If it’s positive, print whether it’s even or odd.

Use a`switch` statement:

- Ask for a number 1–7.
- Print the day of the week that matches.

Try replacing your`if` statements with a ternary operator where it makes sense.

Control flow is how you think in code, it’s how you teach your program to make decisions just like you do.
