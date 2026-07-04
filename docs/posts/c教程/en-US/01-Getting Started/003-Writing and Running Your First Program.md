---
title: "3. Writing and Running Your First Program"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 3. Writing and Running Your First Program"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 3
sidebarWeight: 3
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/003-Writing and Running Your First Program"
alternateZh: "/posts/c教程/zh-CN/01-入门/003-Writing and Running Your First Program"
---
[中文版本](/posts/c教程/zh-CN/01-入门/003-Writing and Running Your First Program)

Now that your compiler is ready, it’s time to write your first real C program. This is where the magic happens, you’ll write plain text, compile it into machine instructions, and watch your computer follow your commands exactly.

C doesn’t hide what’s happening under the hood. Every step, writing, compiling, linking, running, is visible and under your control.

#### Tiny Code

Create a new file named`hello.c` and type this code:

```
#include <stdio.h>
int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```

Then, compile and run it:

```
gcc hello.c -o hello
./hello
```

You should see:

```
Hello, world!
```

#### Breaking It Down

`#include <stdio.h>` This tells the compiler to use the Standard Input/Output library, which provides the`printf` function.

`int main(void)` Every C program starts with a`main` function. It’s the entry point, where execution begins.

`printf("Hello, world!\n");` This prints text to the screen. The`\n` means “newline,” so the next output starts on a new line.

`return 0;` When`main` returns 0, it tells the operating system that your program finished successfully.

#### Why It Matters

Your “Hello, world” may look simple, but it represents an entire process:

1. The compiler translates your text (`hello.c`) into object code (`hello.o`).
2. The linker combines that code with standard libraries.
3. The executable (`hello`) is pure machine instructions.
4. The operating system loads and runs it.

Understanding this flow is what makes C special, it’s not just about writing code, but about knowing how code becomes software.

#### Try It Yourself

Change the message to`"Hello, C learner!"` and recompile.

Add another line:

```
printf("This is my first C program.\n");
```

Try leaving out the semicolon, what error does the compiler show?

Try removing`#include <stdio.h>`, what happens then?

Experiment and break things. Every error teaches you how C thinks.

You’ve just written and run your first C program, a direct conversation between you and the machine. From here, every new piece of code builds on this simple moment of control and understanding.
