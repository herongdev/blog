---
title: "1. What C Is and Why It Still Matters"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 1. What C Is and Why It Still Matters"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 1
sidebarWeight: 1
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/001-What C Is and Why It Still Matters"
alternateZh: "/posts/c教程/zh-CN/01-入门/001-What C Is and Why It Still Matters"
---
[中文版本](/posts/c教程/zh-CN/01-入门/001-What C Is and Why It Still Matters)

C is the language that sits closest to the machine while still feeling human to write. It’s not the newest or the easiest, but it’s one of the most powerful. Every modern operating system, compiler, and database has a core written in C, from Linux and Git to Python’s interpreter and even parts of your browser.

Learning C gives you something no other language can: an understanding of how computers actually work. You’ll see how memory is managed, how data moves, how the CPU runs your code, and how everything you write turns into tiny instructions that the machine understands.

C teaches discipline. There’s no garbage collector or safety net. You decide when to allocate memory, when to free it, and what happens when you forget. You learn precision and control, the same skills that make great programmers in any language.

#### Tiny Code

```
#include <stdio.h>
int main(void) {
    printf("Hello, C World!\n");
    return 0;
}
```

Run this and you’ve done what every C programmer starts with, printing your first line of text to the screen. It’s small, but it carries the spirit of C: direct, explicit, and clear.

#### Why It Matters

C is the foundation of all systems programming. When you understand it, higher-level languages make more sense. You’ll see why compilers work the way they do, why memory errors happen, and how performance decisions ripple through an entire program.

Even if you never write production C code, the mindset it builds, careful reasoning, attention to detail, respect for the machine, will shape how you write code in any language.

#### Try It Yourself

Install a C compiler like`gcc` or`clang`.

Save the code above into a file named`hello.c`.

Compile it:

```
gcc hello.c -o hello
```

Run it:

```
./hello
```

Modify the message and try printing more lines. You’ve just built your first C program.
