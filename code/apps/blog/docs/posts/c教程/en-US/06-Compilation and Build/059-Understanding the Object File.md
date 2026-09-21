---
title: "59. Understanding the Object File"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Compilation and Build"
description: "The Little Book of C — 59. Understanding the Object File"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 59
sidebarWeight: 59
lang: "en-US"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/059-Understanding the Object File"
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/059-Understanding the Object File"
---
[中文版本](/posts/c教程/zh-CN/06-编译与构建/059-Understanding the Object File)

By now, you’ve seen`.o` files appear in every build step, the intermediate products between source and executable. But what exactly is inside them?

Object files are the compiler’s way of packaging machine code, symbol tables, and metadata, ready for the linker to assemble into a final program. Understanding object files helps you debug linking errors, inspect performance, and even reverse-engineer compiled code.

#### Step 1. The Lifecycle Recap

The compilation pipeline looks like this:

```
source.c ──> preprocessor ──> compiler ──> assembler ──> linker
     |                           |             |          |
     |                        hello.s        hello.o     a.out
```

Your`.c` file becomes a`.o` file after assembly, but before linking.

Each`.o` is self-contained, it knows what it defines, what it needs, and where its code lives in memory.

#### Step 2. Object File Formats

Different operating systems use different binary formats:

| OS | Format | Typical Extension |
| --- | --- | --- |
| Linux | ELF (Executable and Linkable Format) | `.o`,`.so`, executable |
| macOS | Mach-O | `.o`,`.dylib` |
| Windows | COFF/PE | `.obj`,`.dll`,`.exe` |

On Linux, ELF dominates, so we’ll use it as our reference.

#### Step 3. Sections Inside an Object File

Run:

```
gcc -c main.c -o main.o
readelf -S main.o
```

You’ll see output like:

```
[ 1] .text     PROGBITS  code and functions
[ 2] .data     PROGBITS  initialized global variables
[ 3] .bss      NOBITS    uninitialized globals
[ 4] .rodata   PROGBITS  constants (e.g., string literals)
[ 5] .symtab   SYMTAB    symbol table
[ 6] .strtab   STRTAB    string table
[ 7] .rel.text RELA      relocation info
```

| Section | Contents |
| --- | --- |
| `.text` | Compiled machine code (functions) |
| `.data` | Global variables with initial values |
| `.bss` | Global variables without initial values |
| `.rodata` | Constants,`const` variables, string literals |
| `.symtab` | Symbol table: function and variable metadata |
| `.rel*` | Relocation info, how to connect this file to others |

#### Step 4. Inspecting Symbols

Every`.o` file contains symbols that describe its functions and variables. List them:

```
nm main.o
```

Output:

```
0000000000000000 T main
                 U printf
```

| Symbol | Meaning |
| --- | --- |
| `T` | Defined in the text (code) section |
| `U` | Undefined, must be provided by another file or library |
| `D` | Defined in data section |
| `B` | Defined in bss section |
| `R` | Defined in read-only data |
| `W` | Weak symbol (can be overridden) |

Here,`main` is defined,`printf` is undefined, meaning the linker must find it in the C standard library.

#### Tiny Code: Inspecting a Multi-File Example

math.c

```
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
```

main.c

```
#include <stdio.h>
int add(int, int);
int mul(int, int);
int main(void) {
    printf("%d\n", add(2, 3) * mul(1, 4));
    return 0;
}
```

Compile but don’t link:

```
gcc -c main.c
gcc -c math.c
```

Inspect:

```
nm main.o
```

```
U add
U mul
U printf
T main
```

`U` means undefined, the linker must resolve these.

Now inspect`math.o`:

```
T add
T mul
```

These are definitions that will satisfy the linker.

Link and inspect the result:

```
gcc main.o math.o -o app
nm app | grep add
```

Now you’ll see:

```
0000000000401136 T add
```

The linker relocated`add()` into its final address.

#### Step 5. Symbol Visibility

By default, every function and global variable has external linkage, visible to the linker.

Use`static` to limit visibility to the current file:

```
static int hidden_func(void) { return 42; }
```

Now`nm` will not list it as an exported symbol. This keeps your binary clean and prevents name collisions across files.

#### Step 6. Inspecting Relocations

Object files can’t know final addresses yet, so they store relocation entries: placeholders for addresses that the linker must fill later.

Check them:

```
readelf -r main.o
```

Output:

```
Relocation section '.rela.text':
0000000000000010 R_X86_64_PC32 printf-0x4
```

This tells the linker:

“When linking, replace this placeholder with the address of`printf()`.”

#### Step 7. Disassemble the Code

You can see the actual machine instructions:

```
objdump -d main.o
```

Output snippet:

```
0000000000000000 <main>:
   0: 55                    push   %rbp
   1: 48 89 e5              mov    %rsp,%rbp
   4: b8 00 00 00 00        mov    $0x0,%eax
```

Each instruction corresponds to compiled C code. This is how you verify optimizations, inspect inlining, or study generated assembly.

#### Step 8. Mixing Object Files

Because`.o` files contain clear symbol metadata, you can mix object files from different languages, for example, C and assembly.

sum.s

```
.globl sum
sum:
    addq %rsi, %rdi
    movq %rdi, %rax
    ret
```

Compile and link:

```
as sum.s -o sum.o
gcc main.c sum.o -o app
```

This is how C integrates cleanly with low-level code.

#### Step 9. Object File Size and Contents

Check file size:

```
size main.o
```

Output:

```
text    data     bss     dec     hex filename
45      4        0       49      31  main.o
```

- `text`→ code size
- `data`→ initialized global variables
- `bss`→ uninitialized variables

#### Step 10. Tiny Code: Investigate Everything

```
gcc -c hello.c -o hello.o
readelf -h hello.o          # ELF header
readelf -S hello.o          # Sections
readelf -s hello.o | head   # Symbol table
readelf -r hello.o          # Relocations
objdump -d hello.o | head   # Disassembly
```

You’ll get a complete low-level view of how your C code looks to the compiler.

#### Why It Matters

Understanding object files helps you:

- Debug linking errors and symbol conflicts
- Inspect compiler optimizations
- Integrate C with assembly
- Build static and shared libraries manually
- See what’s actually inside the binary

In systems programming, this insight separates code users from code engineers.

#### Try It Yourself

1. Create two`.o` files that depend on each other and inspect their undefined symbols.
2. Use`readelf -S` to compare`.text`,`.data`, and`.bss` for different programs.
3. Add a global variable and see how it appears in`.data` or`.bss`.
4. Mark a function as`static` and confirm it disappears from`nm` output.
5. Compile with`-O2` and observe changes in disassembly with`objdump -d`.

Next, you’ll complete Chapter 6 by building your own Makefile-based compilation pipeline from scratch, writing every stage explicitly to transform`.c` files into`.o`,`.a`, and`.so` artifacts just like a real compiler toolchain.
