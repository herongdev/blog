---
title: "6. Compiling, Linking, and Executing"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 6. Compiling, Linking, and Executing"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 6
sidebarWeight: 6
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/006-Compiling, Linking, and Executing"
alternateZh: "/posts/c教程/zh-CN/01-入门/006-Compiling, Linking, and Executing"
---
[中文版本](/posts/c教程/zh-CN/01-入门/006-Compiling, Linking, and Executing)

When you press Enter to compile your C program, a lot happens behind the scenes. Your source code goes through several stages before it becomes a runnable executable. Understanding these steps is essential, it turns compilation errors from mysteries into simple, fixable clues.

#### Tiny Code

Let’s start with a familiar program:

```
#include <stdio.h>
int main(void) {
    printf("Learning the C build process!\n");
    return 0;
}
```

Now compile and run it step by step:

```
# Step 1: Compile to object file
gcc -c hello.c -o hello.o
# Step 2: Link object file into executable
gcc hello.o -o hello
# Step 3: Run the program
./hello
```

Output:

```
Learning the C build process!
```

#### The Four Stages of Building a C Program

Preprocessing The preprocessor handles all lines starting with`#`. It expands macros, includes headers, and prepares code for compilation. Command to inspect:

```
gcc -E hello.c | less
```

Compilation The compiler translates the preprocessed code into assembly language, and then into object code. Each source file (like`hello.c`) becomes an object file (`hello.o`). Command:

```
gcc -c hello.c
```

Linking The linker combines all object files and libraries into one final executable. For example,`printf` comes from the C standard library (`libc`), so the linker connects your code to it. Command:

```
gcc hello.o -o hello
```

Execution Once linked, your binary (`hello`) is loaded by the operating system and executed by the CPU. Command:

```
./hello
```

#### Why It Matters

C gives you control over every stage of this process. Most modern languages hide compilation or linking, but in C, these steps are transparent and configurable. When something goes wrong, a missing function, an undefined symbol, or a broken include, you’ll know exactly which stage to look at.

Mastering the build process also opens the door to deeper skills:

- Creating reusable libraries (`.a` or`.so` files)
- Understanding Makefiles and build automation
- Debugging with symbols and optimized builds
- Writing portable programs that compile cleanly anywhere

Every system programmer eventually learns to think like a compiler, and this is where that thinking begins.

#### Try It Yourself

Experiment with separate compilation:

Create two files:

main.c

```
#include <stdio.h>
void greet(void);
int main(void) {
    greet();
    return 0;
}
```

greet.c

```
#include <stdio.h>
void greet(void) {
    printf("Hello from another file!\n");
}
```

Then compile and link:

```
gcc -c main.c
gcc -c greet.c
gcc main.o greet.o -o greetprog
./greetprog
```

Try breaking it: Delete the`void greet(void);` line in`main.c` and recompile, see how the compiler warns you about an implicit declaration.

Observe the stages: Add flags like`-Wall -O2 -v` to see detailed messages from the compiler and linker.

Once you understand compilation and linking, you’ve unlocked one of the most powerful parts of C, the ability to control exactly how your software is built, combined, and executed.
