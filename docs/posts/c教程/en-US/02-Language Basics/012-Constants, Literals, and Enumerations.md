---
title: "12. Constants, Literals, and Enumerations"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Language Basics"
description: "The Little Book of C — 12. Constants, Literals, and Enumerations"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 12
sidebarWeight: 12
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/012-Constants, Literals, and Enumerations"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/012-Constants, Literals, and Enumerations"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/012-Constants, Literals, and Enumerations)

C programs often rely on values that never change, numbers, characters, or named constants used throughout your code. Instead of sprinkling magic numbers everywhere, you can give them meaningful names and keep your program readable, safe, and easy to maintain.

#### Tiny Code

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

Output:

```
Pi: 3.14
Days in a week: 7
Direction EAST has value: 1
```

#### Constants in C

Preprocessor constants (`#define`) These are replaced before compilation. Think of them as text substitutions, not variables.

```
#define MAX_USERS 100
printf("Max users: %d\n", MAX_USERS);
```

- No memory is used.
- No type checking, the compiler just replaces the text.

Constant variables (`const`) These are real variables stored in memory but cannot be modified after initialization.

```
const double SPEED_OF_LIGHT = 299792458.0;
```

- Type safe.
- Preferred for constants in modern C code.

Literals These are fixed values written directly in your code:

```
42          // integer literal
3.14        // floating-point literal
'A'         // character literal
"Hello"     // string literal
0xFF        // hexadecimal literal (255)
075         // octal literal (61)
```

#### Enumerations

An enum (short for enumeration) defines a set of named integer constants. They make your code self-documenting and prevent mistakes with raw numbers.

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

You can also assign custom values:

```
enum Month {
    JAN = 1, FEB, MAR, APR, MAY, JUN,
    JUL, AUG, SEP, OCT, NOV, DEC
};
```

Now`JAN` starts at 1, and each value increments automatically.

#### Why It Matters

Constants and enums make your code clearer and safer:

- You can change one definition instead of many numbers.
- The compiler can enforce that constants are not modified.
- Enumerations group related values into a meaningful set.

Without them, large programs become fragile and full of unexplained numbers, a maintenance nightmare.

Good C programmers use constants to express intent, not just values.

#### Try It Yourself

Replace every numeric literal in your old programs with a`#define` or`const`. Example:

```
#define MAX_SCORE 100
const float TAX_RATE = 0.08;
```

Create an`enum` for days of the week, and print`MONDAY` and`FRIDAY`.

Assign custom values in your enum (e.g. start with`SUNDAY = 1`).

Experiment: try changing`const int x = 5; x = 10;`, notice the compiler stops you from modifying it.

Use`printf` to print literal values in different formats:

```
printf("%d %x %o\n", 255, 255, 255); // decimal, hex, octal
```

Constants are how you make your C programs speak clearly. They turn numbers into ideas, and that’s what transforms code from working to understandable.
