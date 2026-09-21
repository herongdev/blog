---
title: "9. Setting Up a Minimal Project Structure"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 9. Setting Up a Minimal Project Structure"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 9
sidebarWeight: 9
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/009-Setting Up a Minimal Project Structure"
alternateZh: "/posts/c教程/zh-CN/01-入门/009-Setting Up a Minimal Project Structure"
---
[中文版本](/posts/c教程/zh-CN/01-入门/009-Setting Up a Minimal Project Structure)

As your C programs grow, you’ll quickly outgrow the single-file “hello.c” style. Real projects are made of multiple source files, headers, and sometimes libraries. A clear folder structure keeps your work clean, easy to build, and easy to maintain. In this section, you’ll create a small, organized layout, the same structure used by professionals.

#### Tiny Code

Here’s a minimal project layout:

```
my_project/
├── include/
│   └── greet.h
├── src/
│   └── greet.c
├── main.c
└── Makefile
```

include/greet.h

```
#ifndef GREET_H
#define GREET_H
void greet(const char *name);
#endif
```

src/greet.c

```
#include <stdio.h>
#include "greet.h"
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

main.c

```
#include "greet.h"
int main(void) {
    greet("C Learner");
    return 0;
}
```

Makefile

```
CC = gcc
CFLAGS = -Wall -Iinclude
SRC = main.c src/greet.c
OUT = my_program
$(OUT): $(SRC)
    $(CC) $(CFLAGS) $(SRC) -o $(OUT)
clean:
    rm -f $(OUT)
```

Now build and run:

```
make
./my_program
```

Output:

```
Hello, C Learner!
```

#### Understanding the Structure

`include/` Holds header files (`.h`), declarations of functions, constants, and types. You include these in`.c` files using quotes:

```
#include "greet.h"
```

`src/` Contains source files (`.c`) that implement functions declared in headers.

`main.c` The entry point of your program, this file usually just calls functions from`src/`.

`Makefile` Defines how to build the program. You can run`make` instead of typing long`gcc` commands.

Output binary The compiled executable (here`my_program`) stays in the project’s root for convenience.

#### Why It Matters

A clear structure helps you:

- Keep code modular and reusable
- Separate interface (`.h`) from implementation (`.c`)
- Make compilation faster and easier to manage
- Avoid name clashes in large projects
- Scale from one file to dozens without confusion

Even small C utilities benefit from structure, you’ll thank yourself later when you revisit your code.

#### Try It Yourself

Create the directories and files shown above.

Type each file carefully and run`make`.

Modify`greet.c` to print a personalized message, e.g.

```
printf("Welcome back, %s!\n", name);
```

then rebuild.

Add another pair of files,`src/farewell.c` and`include/farewell.h`, with a goodbye function, and call it from`main.c`.

Run`make clean` to delete the binary and rebuild fresh.

This small structure is the seed of every serious C project. Once you can organize your files this way, you’re ready to grow into larger systems, libraries, tools, and applications that others can use and build upon.
