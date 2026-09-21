---
title: "45. Buffered I/O with fgets and fputs"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 45. Buffered I/O with fgets and fputs"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 45
sidebarWeight: 45
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/045-Buffered IO with fgets and fputs"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/045-Buffered IO with fgets and fputs"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/045-Buffered IO with fgets and fputs)

When your program reads and writes data, it doesn’t always go directly to disk or the terminal, instead, it uses buffers. Buffers are small chunks of memory that temporarily hold data, improving performance by reducing how often the system has to perform slow I/O operations.

C’s Standard I/O library (`<stdio.h>`) handles this automatically for you. In this section, you’ll learn how buffering works and how to use`fgets`,`fputs`, and related functions to manage it effectively.

#### What Is Buffered I/O?

Instead of reading or writing one character at a time, the C library:

- Fills a buffer (for input) or
- Collects a batch of characters (for output)

When the buffer is full or flushed, data moves between your program and the file or terminal.

This is why sometimes`printf()` output doesn’t appear immediately, it’s waiting in a buffer until a newline or flush occurs.

#### Input: fgets()

`fgets()` reads a full line from a stream (including spaces) and stores it in a string.

```
char *fgets(char *str, int size, FILE *stream);
```

- `str`: where to store the line
- `size`: maximum number of characters to read (including`\0`)
- `stream`: where to read from (e.g.`stdin` or a file pointer)

Example:

```
#include <stdio.h>
int main(void) {
    char line[100];
    printf("Enter a sentence: ");
    if (fgets(line, sizeof(line), stdin))
        printf("You said: %s", line);
    return 0;
}
```

Input:

```
C is beautiful.
```

Output:

```
You said: C is beautiful.
```

If the input exceeds the buffer,`fgets` stops reading after`size - 1` characters to prevent overflow, and automatically null-terminates the string.

#### Output: fputs()

`fputs()` writes a string to a stream.

```
int fputs(const char *str, FILE *stream);
```

Example:

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("output.txt", "w");
    if (!fp) {
        perror("Open failed");
        return 1;
    }
    fputs("Buffered I/O makes C fast.\n", fp);
    fputs("fgets and fputs are line-based tools.\n", fp);
    fclose(fp);
    printf("Wrote to output.txt\n");
    return 0;
}
```

Output file:

```
Buffered I/O makes C fast.
fgets and fputs are line-based tools.
```

#### Why fgets Is Safer Than scanf("%s", …)

- `fgets()` respects buffer boundaries
- It reads spaces and tabs correctly
- It prevents undefined behavior from overflows

Avoid this:

```
scanf("%s", buffer); // stops at first space and may overflow
```

Prefer this:

```
fgets(buffer, sizeof(buffer), stdin);
```

#### Writing to stdout or stderr with fputs

`fputs()` works on any output stream, not just files.

```
fputs("Message to screen.\n", stdout);
fputs("Error to stderr!\n", stderr);
```

You can even redirect these in the shell:

```
./program > result.txt 2> error.log
```

#### Reading Files Line by Line

Here’s how to read a file safely using`fgets()`:

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("poem.txt", "r");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    char line[200];
    while (fgets(line, sizeof(line), fp))
        printf("%s", line);
    fclose(fp);
    return 0;
}
```

#### Tiny Code: Copy a File

A minimal file copier using`fgets` and`fputs`:

```
#include <stdio.h>
int main(void) {
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("copy.txt", "w");
    if (!in || !out) {
        perror("File error");
        return 1;
    }
    char buf[256];
    while (fgets(buf, sizeof(buf), in))
        fputs(buf, out);
    fclose(in);
    fclose(out);
    printf("Copied successfully.\n");
    return 0;
}
```

#### Buffer Flushing

Sometimes you need to manually flush output:

```
fflush(stdout);
```

This is useful for interactive programs that must show messages immediately.

To disable buffering entirely (e.g., for logging):

```
setbuf(stdout, NULL);
```

#### Why It Matters

Buffered I/O balances speed and safety:

- `fgets` protects against overflow
- `fputs` ensures efficient output
- Buffering minimizes slow disk and console calls

It’s what makes C both low-level and performant without forcing you to manage every byte yourself.

#### Try It Yourself

1. Write a program that reads lines from stdin and writes them to a new file.
2. Count how many lines you read before EOF.
3. Print each line with line numbers using`fgets` and`printf`.
4. Experiment with buffer sizes, try 16 vs 256 bytes and note the performance difference.
5. Flush output after every line for an interactive logging program.

`fgets` and`fputs` give you a safe, line-based foundation for file and console I/O. Next, you’ll learn how to handle errors correctly using`errno`,`perror`, and`strerror`, essential tools for writing reliable system programs in C.
