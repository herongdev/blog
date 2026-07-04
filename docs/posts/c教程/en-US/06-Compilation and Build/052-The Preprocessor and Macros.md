---
title: "52. The Preprocessor and Macros"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Compilation and Build"
description: "The Little Book of C — 52. The Preprocessor and Macros"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 52
sidebarWeight: 52
lang: "en-US"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/052-The Preprocessor and Macros"
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/052-The Preprocessor and Macros"
---
[中文版本](/posts/c教程/zh-CN/06-编译与构建/052-The Preprocessor and Macros)

Before your C code is ever compiled, it passes through a powerful text-handling stage called the preprocessor. This is where headers are included, macros are expanded, and conditional compilation happens.

The preprocessor doesn’t “understand” C, it performs text substitution and file inclusion, preparing your code for the compiler.

#### Step 1. What the Preprocessor Does

Every line that starts with`#` is a preprocessor directive. Common ones include:

| Directive | Purpose |
| --- | --- |
| `#include` | Insert contents of a header file |
| `#define` | Define a macro or constant |
| `#undef` | Remove a macro definition |
| `#if`,`#ifdef`,`#ifndef` | Conditional compilation |
| `#else`,`#elif`,`#endif` | Branch logic for the preprocessor |
| `#error` | Stop compilation with a message |
| `#pragma` | Compiler-specific instruction |

#### Tiny Code: See It in Action

Create`macro.c`:

```
#include <stdio.h>
#define PI 3.14159
#define CIRCLE_AREA(r) (PI * (r) * (r))
#define SQUARE(x) ((x) * (x))
int main(void) {
    printf("PI = %.2f\n", PI);
    printf("Area of circle (r=2): %.2f\n", CIRCLE_AREA(2));
    printf("Square of 5: %d\n", SQUARE(5));
    return 0;
}
```

Compile and run:

```
gcc macro.c -o macro
./macro
```

Output:

```
PI = 3.14
Area of circle (r=2): 12.57
Square of 5: 25
```

#### Step 2. Expanding Macros

You can inspect the preprocessor output before compilation:

```
gcc -E macro.c -o macro.i
```

Open`macro.i`, you’ll see all`#include` files expanded and macros replaced with their values.

This is a great way to debug macro behavior or check how large standard headers expand.

#### Step 3. Function-Like Macros

Macros can look like functions, but they are expanded inline, meaning no call overhead, but also no type safety.

```
#define ADD(a, b) ((a) + (b))
```

Usage:

```
printf("%d\n", ADD(2, 3));  // becomes ((2) + (3))
```

Be careful with missing parentheses:

```
#define BAD_ADD(a, b) a + b
printf("%d\n", 2 * BAD_ADD(3, 4)); // expands to 2 * 3 + 4 → 10, not 14
```

Always wrap parameters and entire expressions in parentheses.

#### Step 4. Stringizing and Token Pasting

Macros can manipulate text using special operators.

Stringizing (`#`) turns an argument into a string literal:

```
#define PRINT_EXPR(expr) printf(#expr " = %d\n", expr)
```

Usage:

```
int x = 5, y = 10;
PRINT_EXPR(x + y);  // prints: x + y = 15
```

Token Pasting (`##`) concatenates tokens:

```
#define MAKE_VAR(name, num) name##num
int MAKE_VAR(counter, 1) = 42;  // becomes int counter1 = 42;
```

#### Step 5. Conditional Compilation

You can include or exclude code based on conditions:

```
#define DEBUG 1
#if DEBUG
    #define LOG(msg) printf("DEBUG: %s\n", msg)
#else
    #define LOG(msg)
#endif
```

Usage:

```
int main(void) {
    LOG("Starting program");
    printf("Running main logic\n");
    return 0;
}
```

Compile with or without`-DDEBUG=1`:

```
gcc -DDEBUG=1 log.c -o log
```

You can also use:

```
#ifdef DEBUG
#ifndef RELEASE
```

#### Step 6. Header Guards

Prevent multiple inclusions of the same header file by using preprocessor guards:

```
#ifndef MY_HEADER_H
#define MY_HEADER_H
void greet(void);
#endif
```

If`MY_HEADER_H` is already defined, the contents are skipped. This prevents duplicate definitions across multiple includes.

#### Step 7. Built-in Macros

The compiler defines a few handy macros automatically:

| Macro | Expands To |
| --- | --- |
| `__FILE__` | current filename |
| `__LINE__` | current line number |
| `__DATE__` | compilation date |
| `__TIME__` | compilation time |
| `__func__` | current function name (C99+) |

Example:

```
printf("Error at %s:%d in %s()\n", __FILE__, __LINE__, __func__);
```

Output:

```
Error at macro.c:10 in main()
```

#### Tiny Code: Debug Macro

```
#define DEBUG_PRINT(fmt, ...) \
    fprintf(stderr, "[%s:%d] " fmt "\n", __FILE__, __LINE__, __VA_ARGS__)
int main(void) {
    int x = 10;
    DEBUG_PRINT("x = %d", x);
    return 0;
}
```

Output:

```
[macro.c:5] x = 10
```

This is how logging frameworks are implemented in C using macros.

#### Step 8. Undefining and Redefining

You can remove a macro with`#undef`:

```
#undef PI
#define PI 3.14
```

This is often used in large projects to avoid macro name collisions between libraries.

#### Why It Matters

The preprocessor gives C flexibility and power at compile time, enabling:

- Cross-platform builds (conditional compilation)
- Debug logging systems
- Inline performance optimizations
- Simplified configuration management

It’s also a double-edged sword, overusing macros can make code hard to debug and maintain. Modern C favors inline functions for most use cases (see Section 54), but macros remain indispensable for low-level systems work.

#### Try It Yourself

1. Write a macro that swaps two variables without a temporary.
2. Implement a`LOG(level, msg)` macro that prints messages only if`level >= MIN_LOG_LEVEL`.
3. Use`__DATE__` and`__TIME__` to print build information.
4. Add header guards to all your`.h` files and test multiple inclusions.
5. Try`gcc -E` on different programs to understand how preprocessing changes the source.

In the next section, you’ll go deeper into conditional compilation, controlling which parts of your program are built based on platform, features, or debugging needs.
