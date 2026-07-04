---
title: "19. Static vs Dynamic Linking of Code Units"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Language Basics"
description: "The Little Book of C — 19. Static vs Dynamic Linking of Code Units"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 19
sidebarWeight: 19
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/019-Static vs Dynamic Linking of Code Units"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/019-Static vs Dynamic Linking of Code Units"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/019-Static vs Dynamic Linking of Code Units)

When your program grows beyond a single file, you begin linking multiple code units together, functions and data that live in different files. This linking step decides how your program combines and shares code. There are two main ways to do it in C: static linking and dynamic linking. Understanding both is essential for building real-world software.

#### The Big Picture

When you compile a C program:

Each`.c` file becomes an object file (`.o`).

The linker combines all object files and libraries into one executable.

Depending on how you link, that executable may contain:

- All required code inside (static linking), or
- References to shared libraries on the system (dynamic linking).

#### Static Linking

Static linking copies all the necessary library code directly into your program at build time.

Example command:

```
gcc main.c mathutils.c -o app_static
```

Everything from`mathutils.c` gets embedded inside`app_static`.

Pros:

- No external dependencies at runtime
- Faster startup (everything is self-contained)
- Easier deployment

Cons:

- Larger executable file
- Updating a library means recompiling the program

#### Dynamic Linking

Dynamic linking (or shared linking) links your program to shared libraries (`.so` on Linux,`.dll` on Windows) at runtime instead of embedding them.

Example:

```
gcc main.c -o app_dynamic -lm
```

Here,`-lm` tells the linker to use the shared math library (`libm.so`).

Your program keeps the library separate, loading it when executed.

Pros:

- Smaller executables
- Libraries can be updated independently
- Multiple programs share the same library in memory

Cons:

- Requires the correct library to be available at runtime
- Slightly slower startup

#### Tiny Code

Let’s demonstrate static vs dynamic linking using a simple math utility.

mathutils.c

```
#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int multiply(int a, int b) {
    return a * b;
}
```

mathutils.h

```
#ifndef MATHUTILS_H
#define MATHUTILS_H
int add(int a, int b);
int multiply(int a, int b);
#endif
```

main.c

```
#include <stdio.h>
#include "mathutils.h"
int main(void) {
    int x = 4, y = 5;
    printf("Add: %d\n", add(x, y));
    printf("Multiply: %d\n", multiply(x, y));
    return 0;
}
```

Static Linking Build:

```
gcc main.c mathutils.c -o static_app
./static_app
```

Output:

```
Add: 9
Multiply: 20
```

Dynamic Linking Build (using shared library):

```
gcc -c -fPIC mathutils.c -o mathutils.o
gcc -shared -o libmathutils.so mathutils.o
gcc main.c -L. -lmathutils -o dynamic_app
export LD_LIBRARY_PATH=.
./dynamic_app
```

Output:

```
Add: 9
Multiply: 20
```

Now your executable depends on the shared`libmathutils.so`, the same library could be used by many other programs.

#### Why It Matters

Linking determines how your software connects and shares code. It affects:

- Performance and memory usage
- Deployment and portability
- How easily your program updates when libraries change

Static linking is great for small, standalone tools. Dynamic linking is better for large systems, shared components, or when you rely on system libraries (like`libc`,`libm`,`pthread`).

Understanding linking makes you a systems thinker, you’ll know how the pieces of your program fit together at the binary level.

#### Try It Yourself

1. Create`mathutils.c` and`mathutils.h` as above.
2. Compile statically and dynamically; compare file sizes using`ls -lh`.
3. Move`libmathutils.so` out of the directory and run`./dynamic_app`, notice the missing library error.
4. Add`export LD_LIBRARY_PATH=.` and run again.
5. Modify`multiply()` to print a message, recompile only the shared library and see the change take effect instantly.

Static vs dynamic linking is where your C programs move from “source code” to real-world software, how your logic becomes part of an executable that lives, loads, and runs on any machine.
