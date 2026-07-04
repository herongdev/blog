---
title: "The Little Book of C Course Index"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "教程"
sidebarWeight: 0
description: "A hands-on C course path from first program to a small deliverable C project."
lang: "en-US"
alternateZh: "/posts/c教程/zh-CN/README"
alternateEn: "/posts/c教程/en-US/README"
---
[中文版本](/posts/c教程/zh-CN/README)


# The Little Book of C Course Index

> English course path, split into lessons for search, reading, and hands-on practice.

**出处：** [The Little Book of C](https://little-book-of.github.io/c/books/en-US/book.html) · Duc-Tam Nguyen · [GitHub](https://github.com/little-book-of/c)

**许可：** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)（非商业、署名、相同方式共享）

---

## What You Will Be Able To Deliver

If you know a little syntax but still get stuck on pointers, file organization, memory bugs, build steps, or turning C snippets into a usable tool, this path turns those weak spots into a sequence of runnable labs.

After lessons 001-100, you should have a C practice workspace that includes:

- `020-calculator/`: an interactive command-line calculator that proves you can organize functions, branches, loops, and input/output.
- `030-memory/`: a manual memory exercise that proves you can explain who allocates, who frees, and where leaks can happen.
- `040-library/`: a tiny library system that proves you can model real data with structs, lists, and enums.
- `050-log-tool/`: a log reader/writer that proves you can handle files, errors, and command-line arguments.
- `060-makefile-lab/`: a multi-file project with a Makefile that proves you can make builds repeatable.
- `070-mini-shell/`: a Mini Shell prototype that proves you can connect processes, pipes, redirection, and signals.
- `080-debug-lab/`: a repair log that proves you can use debugging, assertions, memory checks, and code review.
- `090-portable-threads/`: a portability lab that proves you can reason about platform differences, atomics, and compile-time choices.
- `100-tinynotes/`: a final small project with source code, README, Makefile, run output, test notes, and a version tag.

These artifacts map to common work tasks: maintaining C code, fixing memory problems, splitting modules, writing build scripts, investigating crashes, reading system APIs, and handing a small tool to another developer. They are portfolio and interview-review evidence, not a promise of employment.

## Fixed Practice Workspace

Keep generated binaries and data out of the blog source directory. Put all labs in `~/c-course-labs`.

macOS / Linux:

```bash
mkdir -p ~/c-course-labs
cd ~/c-course-labs
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\c-course-labs"
Set-Location "$HOME\c-course-labs"
```

Create one folder per practice lesson. For lesson 20:

macOS / Linux:

```bash
mkdir -p ~/c-course-labs/020-calculator
cd ~/c-course-labs/020-calculator
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\c-course-labs\020-calculator"
Set-Location "$HOME\c-course-labs\020-calculator"
```

At the end of each lab, record `evidence.md` in the current lab folder:

```md
# Evidence

- Input:
- Expected behavior:
- Actual behavior:
- Build command:
- Run command:
- Artifact path:
- Failure or surprise:
- Next improvement:
```

## Compiler Baseline

Use C17 as the main practice baseline to reduce cross-compiler differences:

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic -g main.c -o main
```

When a lesson explicitly demonstrates C23 or modern features, try:

```bash
gcc -std=c23 -Wall -Wextra -Wpedantic main.c -o main
```

If `-std=c23` is unavailable in your compiler, finish the main lab with `-std=c17` and record the difference in `evidence.md`. GCC documents `-std=c23` as the C23 selector, while Clang's C status page tracks C23 feature support piece by piece; this course therefore uses C17 for the stable path and C23 for compatibility checks.

- Source: [GCC language standards](https://gcc.gnu.org/onlinedocs/gcc/Standards.html)
- Source: [Clang C language status](https://clang.llvm.org/c_status.html)

## Learning Path

Follow the numbered files linearly. In each lesson, do three things: understand one idea, run one observable example, and record a risk or question. Each `Practice` lesson must leave a folder that you can rebuild later.

| Phase | Capability to prove | Evidence |
|---|---|---|
| 001-009 | Install the toolchain and turn source into an executable | `hello`, build command, and one intentional compiler error |
| 011-020 | Build an interactive program with functions, branches, and loops | `020-calculator/` plus normal and failure input records |
| 021-030 | Explain and verify memory ownership | `030-memory/` plus memory-check output or a manual ownership note |
| 031-040 | Model domain data with structs and lists | `040-library/`, operation output, and a structure design note |
| 041-050 | Read/write files and handle failure paths | `050-log-tool/`, input file, output file, and one error case |
| 051-060 | Build a multi-file project with Make | `060-makefile-lab/`, `make`, `make clean`, and incremental build notes |
| 061-070 | Build a system-facing interactive prototype | `070-mini-shell/`, command execution, pipe or redirection case |
| 071-080 | Find crashes, leaks, and logic bugs | `080-debug-lab/`, before/after output, and debug notes |
| 081-090 | Handle platform differences consciously | `090-portable-threads/` plus compiler or platform notes |
| 091-100 | Deliver a small C tool | `100-tinynotes/`, README, Makefile, test notes, and version tag |

## Boundaries

Minimum completion: every `Practice` lesson compiles and runs, and each `evidence.md` records input, output, failure, and next improvement.

Mature target: the final project has clear folders, module boundaries, error handling, a build script, README, test cases, debug notes, and one small version tag.

Out of scope for this course: large GUIs, kernel modules, production web servers, complex database engines, and full cross-platform release pipelines. Use those as upgrade projects after lesson 100.

## 01-Getting Started（9 篇）

- [1. What C Is and Why It Still Matters](./01-Getting Started/001-What C Is and Why It Still Matters.md)
- [2. Installing a C Compiler (gcc, clang, tinycc)](./01-Getting Started/002-Installing a C Compiler (gcc, clang, tinycc).md)
- [3. Writing and Running Your First Program](./01-Getting Started/003-Writing and Running Your First Program.md)
- [4. Anatomy of a C Program](./01-Getting Started/004-Anatomy of a C Program.md)
- [5. Using Headers and the Preprocessor](./01-Getting Started/005-Using Headers and the Preprocessor.md)
- [6. Compiling, Linking, and Executing](./01-Getting Started/006-Compiling, Linking, and Executing.md)
- [7. Common Errors and Warnings](./01-Getting Started/007-Common Errors and Warnings.md)
- [8. Command Line Basics for C Developers](./01-Getting Started/008-Command Line Basics for C Developers.md)
- [9. Setting Up a Minimal Project Structure](./01-Getting Started/009-Setting Up a Minimal Project Structure.md)

## 02-Language Basics（10 篇）

- [11. Data Types and Variables](./02-Language Basics/011-Data Types and Variables.md)
- [12. Constants, Literals, and Enumerations](./02-Language Basics/012-Constants, Literals, and Enumerations.md)
- [13. Operators and Expressions](./02-Language Basics/013-Operators and Expressions.md)
- [14. Control Flow: if, else, switch](./02-Language Basics/014-Control Flow if, else, switch.md)
- [15. Loops: for, while, do-while](./02-Language Basics/015-Loops for, while, do-while.md)
- [16. Functions and Parameters](./02-Language Basics/016-Functions and Parameters.md)
- [17. Scope and Lifetime of Variables](./02-Language Basics/017-Scope and Lifetime of Variables.md)
- [18. Return Values and Function Signatures](./02-Language Basics/018-Return Values and Function Signatures.md)
- [19. Static vs Dynamic Linking of Code Units](./02-Language Basics/019-Static vs Dynamic Linking of Code Units.md)
- [20. Practice: Build a Simple Calculator](./02-Language Basics/020-Practice Build a Simple Calculator.md)

## 03-Working with Memory（10 篇）

- [21. Understanding Memory Layout (Stack, Heap, Data, Code)](./03-Working with Memory/021-Understanding Memory Layout (Stack, Heap, Data, Code).md)
- [22. Pointers and Addresses](./03-Working with Memory/022-Pointers and Addresses.md)
- [23. Arrays and Pointer Arithmetic](./03-Working with Memory/023-Arrays and Pointer Arithmetic.md)
- [24. Strings as Character Arrays](./03-Working with Memory/024-Strings as Character Arrays.md)
- [25. Dynamic Memory Allocation (malloc, calloc, realloc, free)](./03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md)
- [26. Memory Leaks and Undefined Behavior](./03-Working with Memory/026-Memory Leaks and Undefined Behavior.md)
- [27. const and volatile Qualifiers](./03-Working with Memory/027-const and volatile Qualifiers.md)
- [28. Function Pointers and Callbacks](./03-Working with Memory/028-Function Pointers and Callbacks.md)
- [29. Deep vs Shallow Copies](./03-Working with Memory/029-Deep vs Shallow Copies.md)
- [30. Practice: Manual Memory Management](./03-Working with Memory/030-Practice Manual Memory Management.md)

## 04-Structuring Data（10 篇）

- [31. Structures and Nested Structures](./04-Structuring Data/031-Structures and Nested Structures.md)
- [32. Unions and Type Reuse](./04-Structuring Data/032-Unions and Type Reuse.md)
- [33. Typedef and Code Clarity](./04-Structuring Data/033-Typedef and Code Clarity.md)
- [34. Bitfields and Memory Packing](./04-Structuring Data/034-Bitfields and Memory Packing.md)
- [35. Enumerations Revisited](./04-Structuring Data/035-Enumerations Revisited.md)
- [36. Linked Lists from Scratch](./04-Structuring Data/036-Linked Lists from Scratch.md)
- [37. Stacks and Queues with Structs](./04-Structuring Data/037-Stacks and Queues with Structs.md)
- [38. Hash Tables and Function Pointers](./04-Structuring Data/038-Hash Tables and Function Pointers.md)
- [39. Minimal Object-Oriented Design in C](./04-Structuring Data/039-Minimal Object-Oriented Design in C.md)
- [40. Practice: Build a Tiny Library System](./04-Structuring Data/040-Practice Build a Tiny Library System.md)

## 05-Input Output and Files（10 篇）

- [41. Standard I/O and printf/scanf](./05-Input Output and Files/041-Standard IO and printfscanf.md)
- [42. File Pointers and fopen / fclose](./05-Input Output and Files/042-File Pointers and fopen fclose.md)
- [43. Reading and Writing Binary Files](./05-Input Output and Files/043-Reading and Writing Binary Files.md)
- [44. Working with stdin, stdout, and stderr](./05-Input Output and Files/044-Working with stdin, stdout, and stderr.md)
- [45. Buffered I/O with fgets and fputs](./05-Input Output and Files/045-Buffered IO with fgets and fputs.md)
- [46. Error Checking with errno and perror](./05-Input Output and Files/046-Error Checking with errno and perror.md)
- [47. Command-Line Arguments (argc, argv)](./05-Input Output and Files/047-Command-Line Arguments (argc, argv).md)
- [48. Reading Configuration Files](./05-Input Output and Files/048-Reading Configuration Files.md)
- [49. Serializing Structs to Disk](./05-Input Output and Files/049-Serializing Structs to Disk.md)
- [50. Practice: Build a Log Reader and Writer](./05-Input Output and Files/050-Practice Build a Log Reader and Writer.md)

## 06-Compilation and Build（10 篇）

- [51. From Source to Executable: The Compilation Pipeline](./06-Compilation and Build/051-From Source to Executable The Compilation Pipeline.md)
- [52. The Preprocessor and Macros](./06-Compilation and Build/052-The Preprocessor and Macros.md)
- [53. Conditional Compilation (#if, #ifdef, #ifndef)](./06-Compilation and Build/053-Conditional Compilation (%23if, %23ifdef, %23ifndef).md)
- [54. Inline Functions and Header Hygiene](./06-Compilation and Build/054-Inline Functions and Header Hygiene.md)
- [55. Makefiles and Build Automation](./06-Compilation and Build/055-Makefiles and Build Automation.md)
- [56. Linking Multiple Files](./06-Compilation and Build/056-Linking Multiple Files.md)
- [57. Static and Shared Libraries](./06-Compilation and Build/057-Static and Shared Libraries.md)
- [58. Compiler Flags and Optimization Levels](./06-Compilation and Build/058-Compiler Flags and Optimization Levels.md)
- [59. Understanding the Object File](./06-Compilation and Build/059-Understanding the Object File.md)
- [60. Practice: Write Your Own Makefile](./06-Compilation and Build/060-Practice Write Your Own Makefile.md)

## 07-Working Close to the System（10 篇）

- [61. System Calls and the Standard Library](./07-Working Close to the System/061-System Calls and the Standard Library.md)
- [62. Process Creation (fork, exec, wait)](./07-Working Close to the System/062-Process Creation (fork, exec, wait).md)
- [63. File Descriptors and open/read/write](./07-Working Close to the System/063-File Descriptors and openreadwrite.md)
- [64. Pipes and Redirection](./07-Working Close to the System/064-Pipes and Redirection.md)
- [65. Signals and Signal Handlers](./07-Working Close to the System/065-Signals and Signal Handlers.md)
- [66. Memory Mapping (mmap)](./07-Working Close to the System/066-Memory Mapping (mmap).md)
- [67. Time and Clock APIs](./07-Working Close to the System/067-Time and Clock APIs.md)
- [68. Environment Variables](./07-Working Close to the System/068-Environment Variables.md)
- [69. Error Handling and Return Codes](./07-Working Close to the System/069-Error Handling and Return Codes.md)
- [70. Practice: Mini Shell in C](./07-Working Close to the System/070-Practice Mini Shell in C.md)

## 08-Debugging Testing Profiling（10 篇）

- [71. Debugging with gdb](./08-Debugging Testing Profiling/071-Debugging with gdb.md)
- [72. Using Valgrind for Memory Checking](./08-Debugging Testing Profiling/072-Using Valgrind for Memory Checking.md)
- [73. Assertions and Defensive Programming](./08-Debugging Testing Profiling/073-Assertions and Defensive Programming.md)
- [74. Unit Testing in C](./08-Debugging Testing Profiling/074-Unit Testing in C.md)
- [75. Logging Systems](./08-Debugging Testing Profiling/075-Logging Systems.md)
- [76. Profiling with gprof](./08-Debugging Testing Profiling/076-Profiling with gprof.md)
- [77. Common Undefined Behaviors](./08-Debugging Testing Profiling/077-Common Undefined Behaviors.md)
- [78. Crash Analysis and Core Dumps](./08-Debugging Testing Profiling/078-Crash Analysis and Core Dumps.md)
- [79. Code Review Checklist for C Projects](./08-Debugging Testing Profiling/079-Code Review Checklist for C Projects.md)
- [80. Practice: Fix Memory and Logic Bugs](./08-Debugging Testing Profiling/080-Practice Fix Memory and Logic Bugs.md)

## 09-Portable and Modern C（10 篇）

- [81. The C Standard Timeline (C89 to C23)](./09-Portable and Modern C/081-The C Standard Timeline (C89 to C23).md)
- [82. Portability and Endianness](./09-Portable and Modern C/082-Portability and Endianness.md)
- [83. Inline Assembly and Hardware Access](./09-Portable and Modern C/083-Inline Assembly and Hardware Access.md)
- [84. Cross-Compilation](./09-Portable and Modern C/084-Cross-Compilation.md)
- [85. Threading with pthreads](./09-Portable and Modern C/085-Threading with pthreads.md)
- [86. Atomic Operations and Memory Models](./09-Portable and Modern C/086-Atomic Operations and Memory Models.md)
- [87. Using C with Other Languages (FFI)](./09-Portable and Modern C/087-Using C with Other Languages (FFI).md)
- [88. Safer Alternatives (Bounds Checking, _Static_assert, and Modern C Safety Tools)](./09-Portable and Modern C/088-Safer Alternatives (Bounds Checking, _Static_assert, and Modern C Safety Tools).md)
- [89. Modern Style: Clean and Readable C](./09-Portable and Modern C/089-Modern Style Clean and Readable C.md)
- [90. Practice: Portable Multithreaded Program](./09-Portable and Modern C/090-Practice Portable Multithreaded Program.md)

## 10-Building Real Projects（10 篇）

- [91. Designing Small C Libraries](./10-Building Real Projects/091-Designing Small C Libraries.md)
- [92. Building a Command-Line Tool](./10-Building Real Projects/092-Building a Command-Line Tool.md)
- [93. Tiny HTTP Server (Sockets and Threads)](./10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads).md)
- [94. Simple Key-Value Store](./10-Building Real Projects/094-Simple Key-Value Store.md)
- [95. Implementing a Custom Allocator](./10-Building Real Projects/095-Implementing a Custom Allocator.md)
- [96. Writing a Text Parser](./10-Building Real Projects/096-Writing a Text Parser.md)
- [97. Tiny Interpreter for an Expression Language](./10-Building Real Projects/097-Tiny Interpreter for an Expression Language.md)
- [98. Interfacing with SQLite or LevelDB](./10-Building Real Projects/098-Interfacing with SQLite or LevelDB.md)
- [99. Packaging, Versioning, and Documentation](./10-Building Real Projects/099-Packaging, Versioning, and Documentation.md)
- [100. Practice: Build Your Own Mini Project](./10-Building Real Projects/100-Practice Build Your Own Mini Project.md)

## 11-Epilogue（4 篇）

- [Epilogue. The Spirit of C](./11-Epilogue/Epilogue-The Spirit of C.md)
- [The Path Beyond](./11-Epilogue/The Path Beyond.md)
- [A Note from the Author](./11-Epilogue/A Note from the Author.md)
- [Final Exercise](./11-Epilogue/Final Exercise.md)

*共 103 篇*
