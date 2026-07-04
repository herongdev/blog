---
title: "4. Anatomy of a C Program"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 4. Anatomy of a C Program"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 4
sidebarWeight: 4
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/004-Anatomy of a C Program"
alternateZh: "/posts/c教程/zh-CN/01-入门/004-Anatomy of a C Program"
---
[中文版本](/posts/c教程/zh-CN/01-入门/004-Anatomy of a C Program)

Now that your first program runs, let’s open it up and look inside. Every C program follows a clear structure, a set of rules that tells both you and the compiler what each part means. Understanding this structure early will help you read, write, and debug code with confidence.

#### Tiny Code

Here’s the same program, with comments explaining each piece:

```
#include <stdio.h>      // 1. Preprocessor directive
// 2. Function definition
int main(void) {        // main: entry point of every C program
    printf("Hello, C!\n");  // 3. Statement: prints a message
    return 0;           // 4. Return statement: signals success
}
```

#### The Four Main Parts

Preprocessor Directives Lines that begin with`#` are handled before the code is even compiled. They include or define things that your program depends on. Example:

```
#include <stdio.h>
#define PI 3.14159
```

Functions Every C program is made of functions. The function`main()` is special, it’s where your program starts. You can define more functions to organize your code.

Statements Each instruction inside a function ends with a semicolon. These are the steps your program takes, one by one.

Comments Comments are ignored by the compiler but read by humans. Use them to explain why your code does something, not just what it does.

```
// This is a single-line comment
/* This is a multi-line comment */
```

#### Why It Matters

C is a structured language. Every function, statement, and declaration lives inside a clear boundary. Unlike scripting languages, there’s no automatic setup or hidden runtime, everything you see is everything that runs.

Learning the anatomy of a C program gives you a mental map:

- You know where execution begins (`main`).
- You know where code lives (inside functions).
- You know where libraries come from (via includes).

Once this map becomes natural, reading even large C programs starts to feel easy and logical.

#### Try It Yourself

Create a file`structure.c` with this content:

```
#include <stdio.h>
void greet(void) {
    printf("Welcome to C programming!\n");
}
int main(void) {
    greet();
    return 0;
}
```

Compile and run it:

```
gcc structure.c -o structure
./structure
```

Add another function, maybe`void bye(void)` that prints a goodbye message, and call it after`greet()`.

Try removing`return 0;`, notice how the program still runs, but adding it makes your intent clear.

Every C program you’ll ever write follows this basic shape. Once you can recognize these parts, you can start building programs that are longer, smarter, and closer to the system.
