---
title: "56. Linking Multiple Files"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Compilation and Build"
description: "The Little Book of C — 56. Linking Multiple Files"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 56
sidebarWeight: 56
lang: "en-US"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/056-Linking Multiple Files"
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/056-Linking Multiple Files"
---
[中文版本](/posts/c教程/zh-CN/06-编译与构建/056-Linking Multiple Files)

When a program grows beyond one`.c` file, the compiler must combine them into a single executable. This process, linking, is what joins all your functions, variables, and library references into one binary.

You’ve already seen snippets of it with:

```
gcc main.o math.o -o app
```

But now we’ll go deeper into how linking works and what happens when things go wrong.

#### Step 1. The Two Compilation Phases

Every C build has two main phases:

Compilation – each`.c` file becomes a`.o`(object file).

```
gcc -c main.c -o main.o
gcc -c math.c -o math.o
```

Each`.o` file contains machine code and symbol tables (lists of what it defines and what it needs).

Linking – the linker (`ld`) merges all`.o` files and libraries into an executable:

```
gcc main.o math.o -o app
```

If any symbol is missing (like an undefined function), the linker fails.

#### Step 2. What Are Symbols?

Symbols are names the compiler uses to track functions and global variables. There are two kinds:

- Defined symbols – functions or variables provided by this file.
- Undefined symbols – things it needs from another file.

Example:

math.c

```
int add(int a, int b) { return a + b; }
```

main.c

```
#include <stdio.h>
int add(int, int);
int main(void) {
    printf("%d\n", add(2, 3));
    return 0;
}
```

Compile and link:

```
gcc -c main.c
gcc -c math.c
gcc main.o math.o -o app
```

Run:

```
5
```

If you forget to link`math.o`:

```
gcc main.o -o app
```

You’ll get:

```
undefined reference to `add'
```

#### Step 3. Using Header Files for Declarations

Each`.c` file should declare (not define) external functions in a header:

math.h

```
#ifndef MATH_H
#define MATH_H
int add(int a, int b);
#endif
```

Then include it in both`main.c` and`math.c`:

```
#include "math.h"
```

This ensures consistency between the declaration and definition.

#### Step 4. Linking Object Files and Libraries

You can link any number of`.o` files:

```
gcc main.o math.o util.o io.o -o app
```

You can also link with libraries:

```
gcc main.o -lm -o app
```

(`-lm` links the math library that provides functions like`sqrt`,`sin`, etc.)

The`-l` flag searches`/usr/lib` and`/lib` by default.

Custom library example:

```
gcc main.o -L. -lmyutils -o app
```

Here,`-L.` adds the current directory to the library search path, and`-lmyutils` links`libmyutils.a` or`libmyutils.so`.

#### Step 5. The Order of Linking Matters

The linker reads from left to right. If a symbol is used before its definition appears, it might fail.

Example:

```
gcc -lm main.o -o app    # ❌ wrong order
gcc main.o -lm -o app    # ✅ correct
```

Always list libraries after the object files that need them.

#### Step 6. Splitting and Linking a Multi-File Project

```
project/
├── main.c
├── math.c
├── io.c
├── math.h
├── io.h
└── Makefile
```

Makefile

```
CC = gcc
CFLAGS = -Wall -std=c99
OBJ = main.o math.o io.o
TARGET = app
$(TARGET): $(OBJ)
    $(CC) $(OBJ) -o $(TARGET)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJ) $(TARGET)
```

Now, just run:

```
make
./app
```

The Makefile takes care of compiling and linking everything in order.

#### Tiny Code: Building a Small Modular Program

math.c

```
#include "math.h"
int square(int x) { return x * x; }
int cube(int x) { return x * x * x; }
```

math.h

```
#ifndef MATH_H
#define MATH_H
int square(int x);
int cube(int x);
#endif
```

main.c

```
#include <stdio.h>
#include "math.h"
int main(void) {
    printf("square(3) = %d\n", square(3));
    printf("cube(2) = %d\n", cube(2));
    return 0;
}
```

Build manually:

```
gcc -c math.c -o math.o
gcc -c main.c -o main.o
gcc main.o math.o -o app
./app
```

Output:

```
square(3) = 9
cube(2) = 8
```

#### Step 7. Static vs Dynamic Linking

| Type | File | Description |
| --- | --- | --- |
| Static | `.a` | Code is copied into the executable |
| Dynamic | `.so` | Code is shared at runtime via system libraries |

Static linking:

```
gcc main.o -L. -lmath -static -o app
```

Dynamic linking (default):

```
gcc main.o -L. -lmath -o app
```

Dynamic executables are smaller and share libraries across programs.

#### Step 8. Inspecting Linked Binaries

To see which symbols are defined or missing:

```
nm main.o | head
```

Or for a full binary:

```
objdump -t app | less
ldd app
```

`ldd` shows which shared libraries the program depends on.

#### Step 9. Common Linking Errors

| Error | Meaning | Fix |
| --- | --- | --- |
| `undefined reference to ` | Missing`.o` or library | Add all object files or correct`-l` flags |
| `multiple definition of ` | Same function defined in multiple files | Use`extern` in declarations |
| `cannot find -lfoo` | Missing library file | Check`-L` paths or install dev package |
| `relocation truncated` | Mismatched architectures | Ensure all files are built for same target |

#### Step 10. Inline vs External Linking

Inline functions defined as`static inline` in headers do not require linking, each`.c` file gets its own copy. But normal functions in`.c` files must be linked exactly once.

#### Why It Matters

Linking is where your program becomes whole. It teaches you:

- How`.o` and`.h` files interact
- How libraries integrate with your binaries
- How to debug missing symbols and multiple definitions
- How modular design affects build architecture

Understanding the linker is essential for building scalable, multi-file systems, from small utilities to entire kernels.

#### Try It Yourself

1. Create a program with 3`.c` files and 3`.h` files.
2. Intentionally omit one object file and observe the linker error.
3. Use`nm` to inspect which functions each`.o` defines and references.
4. Build a static library (`ar rcs libutils.a util.o`) and link it manually.
5. Use`ldd` to list shared libraries your compiled program depends on.

Next, you’ll learn how to create and use static and shared libraries, the modular building blocks that every serious C project relies on for reusability and scalability.
