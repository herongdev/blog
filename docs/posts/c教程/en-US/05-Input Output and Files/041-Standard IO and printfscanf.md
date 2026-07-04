---
title: "41. Standard I/O and printf/scanf"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 41. Standard I/O and printf/scanf"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 41
sidebarWeight: 41
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/041-Standard IO and printfscanf"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/041-Standard IO and printfscanf"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/041-Standard IO and printfscanf)

Input and output are how your programs talk to the outside world. In C, almost everything goes through the Standard I/O library, defined in`<stdio.h>`. You’ve already met`printf()` in “Hello, C World”, now you’ll learn how all these functions fit together, how they work, and how to use them safely.

#### The Standard Streams

Every C program starts with three standard streams automatically open:

| Stream | Purpose | Example Function |
| --- | --- | --- |
| `stdin` | Standard input (keyboard, or redirected file) | `scanf()`,`fgets()` |
| `stdout` | Standard output (screen) | `printf()`,`puts()` |
| `stderr` | Standard error (screen, for diagnostics) | `fprintf(stderr, ...)` |

You can redirect these streams in the terminal:

```
./program < input.txt > output.txt 2> errors.log
```

#### Printing with printf()

`printf()` formats and prints data to`stdout`. Its power lies in format specifiers, which describe the type and layout of what to print.

| Type | Format | Example |
| --- | --- | --- |
| int | `%d` | `printf("%d", 42);` |
| float | `%f` | `printf("%.2f", 3.1415);` |
| char | `%c` | `printf("%c", 'A');` |
| string | `%s` | `printf("%s", "Hello");` |
| pointer | `%p` | `printf("%p", ptr);` |
| hexadecimal | `%x` | `printf("%x", 255);` |

You can control width, precision, and alignment:

```
printf("%-10s | %6.2f\n", "Price", 3.5);
```

Output:

```
Price      |   3.50
```

#### Tiny Code: Print Everything

```
#include <stdio.h>
int main(void) {
    int i = 42;
    float f = 3.1415;
    char c = 'C';
    char *s = "Hello, C!";
    printf("Integer: %d\n", i);
    printf("Float: %.2f\n", f);
    printf("Char: %c\n", c);
    printf("String: %s\n", s);
    printf("Pointer: %p\n", (void*)s);
    return 0;
}
```

Output:

```
Integer: 42
Float: 3.14
Char: C
String: Hello, C!
Pointer: 0x7ffeed001234
```

#### Reading with scanf()

`scanf()` reads formatted input from`stdin`. It’s like`printf()` in reverse, you tell it the format, and it fills your variables.

```
int age;
float height;
printf("Enter age and height: ");
scanf("%d %f", &age, &height);
printf("You are %d years old and %.1f meters tall.\n", age, height);
```

Input:

```
25 1.75
```

Output:

```
You are 25 years old and 1.8 meters tall.
```

Always use the`&` operator for non-array variables — it passes the memory address where the value should be stored.

#### Safer Input: fgets() and sscanf()

`scanf()` is risky for strings, it doesn’t prevent buffer overflow. Safer pattern: use`fgets()` to read a full line, then parse it.

```
char buf[100];
printf("Enter your name: ");
fgets(buf, sizeof(buf), stdin);
buf[strcspn(buf, "\n")] = '\0'; // remove newline
printf("Hello, %s!\n", buf);
```

#### Combining printf and scanf

You can build interactive console tools easily:

```
#include <stdio.h>
int main(void) {
    char name[50];
    int year;
    printf("Enter your name: ");
    scanf("%49s", name); // limit input to 49 chars + null
    printf("Enter your birth year: ");
    scanf("%d", &year);
    printf("Hi %s! You are about %d years old.\n", name, 2025 - year);
    return 0;
}
```

Output:

```
Enter your name: Alice
Enter your birth year: 2000
Hi Alice! You are about 25 years old.
```

#### Formatted Output to Files and Strings

You can redirect formatted output anywhere, not just the screen.

```
fprintf(stderr, "Error: invalid input.\n"); // print to stderr
char buffer[50];
sprintf(buffer, "Pi = %.3f", 3.14159); // print to string
puts(buffer);
```

Output:

```
Pi = 3.142
```

#### Why It Matters

`printf()` and`scanf()` are the workhorses of console I/O. They teach you:

- How data moves between memory and streams.
- How to control numeric precision and layout.
- How input and output interact with the terminal or files.

Every C system, from tiny microcontrollers to full operating systems, uses these same foundations.

#### Try It Yourself

1. Print a table of numbers with two columns: number and its square.
2. Read three integers using`scanf` and print their average.
3. Use`fgets` and`sscanf` to safely parse`"42 3.14"` into int and float.
4. Write a small quiz app: ask a question, read input, print “Correct” or “Try again”.
5. Experiment with printing to`stderr`, redirect errors to a file.

Mastering standard I/O is like mastering your program’s voice, it’s how your C code speaks and listens. Next, you’ll move deeper into file handling, learning how to open, read, and write files with file pointers in Section 42.
