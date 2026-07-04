---
title: "2. Installing a C Compiler (gcc, clang, tinycc)"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 2. Installing a C Compiler (gcc, clang, tinycc)"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 2
sidebarWeight: 2
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/002-Installing a C Compiler (gcc, clang, tinycc)"
alternateZh: "/posts/c教程/zh-CN/01-入门/002-Installing a C Compiler (gcc, clang, tinycc)"
---
[中文版本](/posts/c教程/zh-CN/01-入门/002-Installing a C Compiler (gcc, clang, tinycc))

Before you can write and run C programs, you need a compiler. A compiler is a tool that translates your human-readable code into the machine instructions that your CPU understands. In C, this process is explicit, you see it, control it, and learn from it.

There are many compilers available, but three are most common:

- GCC (GNU Compiler Collection)**, The standard compiler on Linux and macOS, known for reliability and wide support.
- Clang, A modern compiler built for speed, cleaner diagnostics, and integration with tools like LLVM.
- TinyCC (tcc), A super-lightweight compiler that’s perfect for learning and quick testing.

#### Tiny Code

You can check if you already have a compiler installed by running one of these commands in your terminal:

```
gcc --version
clang --version
tcc --version
```

If you see a version number, you’re ready. If not, you’ll need to install one.

#### Installing on Different Systems

Linux (Debian/Ubuntu):

```
sudo apt update
sudo apt install build-essential
```

This installs GCC along with other useful tools like`make`.

macOS (with Xcode Command Line Tools):

```
xcode-select --install
```

This installs Clang and the developer toolchain.

Windows (via Mingw-w64):

1. Go to Mingw-w64.
2. Download and install it.
3. Add the compiler’s`bin` folder to your system PATH.
4. Open`cmd` or PowerShell and run`gcc --version` to confirm.

Or, if you prefer an all-in-one environment, install WSL (Windows Subsystem for Linux) and use the Linux commands above.

#### Why It Matters

Installing a compiler is your first step toward understanding how programs become executables. In C, there’s no hidden build system or automatic runtime, everything that happens between writing code and running it is visible. That clarity is part of what makes C such a powerful learning tool.

When you install your compiler, you’re also installing the ability to explore how software really works.

#### Try It Yourself

Open your terminal or command prompt.

Type`gcc --version` or`clang --version` to confirm installation.

Create a simple file named`test.c`:

```
int main(void) { return 0; }
```

Compile it:

```
gcc test.c -o test
```

Run it:

```
./test
```

If it runs with no output, that’s perfect, your compiler is ready. You’ve just built your very first executable program from source code.
