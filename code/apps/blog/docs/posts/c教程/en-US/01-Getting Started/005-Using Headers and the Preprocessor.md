---
title: "5. Using Headers and the Preprocessor"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 5. Using Headers and the Preprocessor"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 5
sidebarWeight: 5
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/005-Using Headers and the Preprocessor"
alternateZh: "/posts/c教程/zh-CN/01-入门/005-Using Headers and the Preprocessor"
---
[中文版本](/posts/c教程/zh-CN/01-入门/005-Using Headers and the Preprocessor)

Every C program begins before it even starts running, with something called the preprocessor. Before the compiler turns your code into machine instructions, the preprocessor prepares it: it pulls in files, replaces macros, and sets up everything your program needs. This step is what makes`#include <stdio.h>` work, and it’s key to understanding how larger C projects are organized.

#### Tiny Code

```
#include <stdio.h>   // include the standard input/output header
#define PI 3.14159    // define a constant macro
int main(void) {
    printf("PI is approximately %.2f\n", PI);
    return 0;
}
```

When you compile this program, the preprocessor replaces`PI` with`3.14159` and includes the contents of the file`stdio.h` before the compiler even starts.

You can see the preprocessed result by running:

```
gcc -E program.c
```

It will output a much longer version of your code, showing all the lines that`stdio.h` added behind the scenes.

#### How Headers Work

Headers are declaration files. They tell the compiler what exists, like functions, constants, and types, without actually providing the code (the definitions). For example,`stdio.h` declares the function`printf()` so the compiler knows how to call it.

There are two main ways to include headers:

System headers:

```
#include <stdio.h>
```

The compiler looks for these in standard library directories.

User-defined headers:

```
#include "myutils.h"
```

The compiler looks for these in your project folder first.

This separation keeps large programs modular and readable.

#### Why It Matters

The preprocessor is like the “setup crew” for your program. It doesn’t run your code, it prepares it. By understanding headers and macros, you can:

- Split big programs into smaller, reusable parts.
- Define constants in one place instead of repeating values.
- Write portable code that compiles on different systems.
- Avoid subtle bugs caused by missing declarations.

When you write`#include <stdio.h>`, you’re tapping into decades of reliable, shared code, one of the greatest strengths of the C ecosystem.

#### Try It Yourself

Create two files:

mathutils.h

```
#ifndef MATHUTILS_H
#define MATHUTILS_H
#define SQUARE(x) ((x) * (x))
#endif
```

main.c

```
#include <stdio.h>
#include "mathutils.h"
int main(void) {
    int n = 5;
    printf("The square of %d is %d\n", n, SQUARE(n));
    return 0;
}
```

Compile and run:

```
gcc main.c -o main
./main
```

Try editing the macro in`mathutils.h` to add a`CUBE(x)` function, and use it in`main.c`.

Then run:

```
gcc -E main.c | less
```

to explore the preprocessed code and see how includes and macros expand.

Once you grasp headers and preprocessing, you’ll understand how large C codebases stay organized, and how a simple`#include` line can unlock an entire library of functionality.
