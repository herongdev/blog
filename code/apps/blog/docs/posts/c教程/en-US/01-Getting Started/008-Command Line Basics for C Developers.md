---
title: "8. Command Line Basics for C Developers"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 8. Command Line Basics for C Developers"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 8
sidebarWeight: 8
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/008-Command Line Basics for C Developers"
alternateZh: "/posts/c教程/zh-CN/01-入门/008-Command Line Basics for C Developers"
---
[中文版本](/posts/c教程/zh-CN/01-入门/008-Command Line Basics for C Developers)

C was born in the Unix world, and the command line is its natural home. If you can move comfortably in the terminal, you’ll understand what your tools are doing, compiling, linking, and running programs directly. This section gives you the essential commands you’ll need to build and explore C projects like a real systems programmer.

#### Tiny Code

Let’s start with a quick refresher using a simple file`hello.c`:

```
#include <stdio.h>
int main(void) {
    printf("Hello from the terminal!\n");
    return 0;
}
```

To build and run it from the command line:

```
gcc hello.c -o hello
./hello
```

Output:

```
Hello from the terminal!
```

That’s the full cycle: write → compile → run. Now let’s look at the basic tools that make that process smoother.

#### Essential Command Line Tools

`ls`– List files in the current directory

```
ls
```

You’ll see files like`hello.c`,`hello.o`, or`hello`.

`pwd`– Print the current working directory

```
pwd
```

`cd`– Change directories

```
cd projects/c_programs
```

`cat`– Display file contents quickly

```
cat hello.c
```

`rm`– Remove files

```
rm hello
```

`clear`– Clear your terminal screen

```
clear
```

`man`– Read the manual for a command

```
man gcc
```

Press`q` to exit.

`echo`– Print a message or variable

```
echo "Compiling C!"
```

`touch`– Create a new empty file

```
touch main.c
```

`gcc`– Compile your C source code

```
gcc main.c -o main
```

#### Why It Matters

The command line isn’t just for building code, it teaches you how your tools actually work. In C, there’s no hidden environment running behind a button click. Each command you type does exactly one job, and understanding those jobs gives you full control.

- You see the build process directly.
- You control where outputs go.
- You can chain commands for automation.

This mindset, knowing what happens under the hood, is what makes C programmers comfortable working close to the machine.

#### Try It Yourself

Navigate and build manually:

```
mkdir myfirstc
cd myfirstc
touch hello.c
```

Add code with your favorite text editor (like`nano hello.c`), then compile and run.

Use compiler flags:

```
gcc -Wall -O2 hello.c -o hello
./hello
```

- `-Wall` enables warnings.
- `-O2` applies optimization.

Use output redirection:

```
./hello > output.txt
cat output.txt
```

Explore commands interactively:

```
man ls
man gcc
```

Read a few lines, knowing how to find help is as important as coding itself.

C and the command line grew up together. Once you get comfortable typing and compiling by hand, you’ll start to feel how programs, files, and processes fit together. That’s the real start of systems programming, not just writing code, but commanding the computer directly.
