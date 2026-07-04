---
title: "7. Common Errors and Warnings"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Getting Started"
description: "The Little Book of C — 7. Common Errors and Warnings"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 7
sidebarWeight: 7
lang: "en-US"
alternateEn: "/posts/c教程/en-US/01-Getting Started/007-Common Errors and Warnings"
alternateZh: "/posts/c教程/zh-CN/01-入门/007-Common Errors and Warnings"
---
[中文版本](/posts/c教程/zh-CN/01-入门/007-Common Errors and Warnings)

No C programmer avoids errors. In fact, the compiler’s messages are your best teachers. Each warning or error is the compiler’s way of saying, “Something here doesn’t make sense yet.” Learning to read and fix them early will save you hours later and make debugging a natural part of your process.

#### Tiny Code

Let’s look at a few examples:

```
#include <stdio.h>
int main(void) {
    int a = 5
    printf("The value of a is %d\n", a);
    return 0;
}
```

Try compiling it:

```
gcc error_demo.c -o error_demo
```

Output:

```
error_demo.c: In function ‘main':
error_demo.c:4:13: error: expected ‘;' before ‘printf'
```

This means the compiler found a missing semicolon. The message even tells you where (`line 4`) and why (`expected ';' before 'printf'`).

Fix it by adding the missing semicolon:

```
int a = 5;
```

Then compile again, clean output means success.

#### Common Types of Errors

Syntax Errors These are the easiest to fix. You’ve broken a grammar rule. Example: missing`;`, mismatched braces`{}`, or incorrect parentheses.

Type Errors You’re using variables or functions in a way that doesn’t match their type. Example:

```
int x = "hello"; // error: assigning string to int
```

Undeclared Identifiers You’re using a variable or function that the compiler hasn’t seen yet. Example:

```
printf("Value: %d\n", number); // error: ‘number' undeclared
```

Linker Errors Compilation succeeds, but linking fails because something is missing. Example:

```
undefined reference to `greet'
```

This means the compiler saw a declaration but couldn’t find the actual function definition.

Warnings Warnings don’t stop compilation, but they often point to potential bugs. Example:

```
warning: variable ‘x' set but not used
```

Always pay attention to warnings, clean builds (`no warnings`) are a mark of quality code.

#### Why It Matters

Every programmer makes mistakes. What matters is how fast you can understand what the compiler is saying. In C, error messages are usually precise and honest, they tell you exactly what broke. By learning to interpret them, you’re training yourself to debug with logic, not luck.

Good habits:

- Compile often, don’t wait to write 100 lines before testing.
- Use`-Wall -Wextra` to enable all useful warnings.
- Read errors top to bottom, the first one often causes the rest.
- Fix warnings even if the code still runs.

#### Try It Yourself

Forgetting a return type:

```
main() {
    printf("No return type!\n");
}
```

Compile with:

```
gcc -Wall test.c
```

You’ll get:

```
warning: return type defaults to ‘int'
```

Using an undeclared variable:

```
#include <stdio.h>
int main(void) {
    printf("%d\n", x);
    return 0;
}
```

This will produce:

```
error: ‘x' undeclared
```

Fix each one until your program compiles cleanly with no warnings.

Errors are not failures, they’re the compiler’s way of guiding you toward understanding. The more errors you fix, the better you become at speaking the language of the machine.
