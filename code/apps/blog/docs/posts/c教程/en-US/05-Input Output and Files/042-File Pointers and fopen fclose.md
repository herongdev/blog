---
title: "42. File Pointers and fopen / fclose"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 42. File Pointers and fopen / fclose"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 42
sidebarWeight: 42
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/042-File Pointers and fopen fclose"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/042-File Pointers and fopen fclose"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/042-File Pointers and fopen fclose)

Files let your C programs remember things beyond runtime. Unlike standard input and output, which disappear when the program ends, files provide persistent storage, you can read and write data between runs.

This section introduces the key file-handling API in C:`fopen()`,`fclose()`,`fprintf()`,`fscanf()`, and their relatives.

#### The Big Picture

File I/O in C uses a`FILE *` pointer to represent an open file. You don’t manipulate the disk directly, instead, you read and write through a buffered file stream managed by the runtime.

```
FILE *fp = fopen("data.txt", "r");
```

This returns a pointer to a`FILE` object if successful, or`NULL` if the file can’t be opened.

#### File Modes

When opening a file, you specify a mode, what you intend to do with it.

| Mode | Meaning | Behavior |
| --- | --- | --- |
| `"r"` | read | Fails if file doesn’t exist |
| `"w"` | write | Creates new or truncates existing |
| `"a"` | append | Opens or creates; writes go to end |
| `"r+"` | read/write | Must exist |
| `"w+"` | read/write | Truncates if exists |
| `"a+"` | read/write | Appends; reading starts at beginning |

#### Tiny Code: Write and Read a File

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("example.txt", "w");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    fprintf(fp, "Hello, file world!\n");
    fprintf(fp, "C makes you closer to the machine.\n");
    fclose(fp);
    fp = fopen("example.txt", "r");
    if (!fp) {
        perror("Failed to reopen file");
        return 1;
    }
    char line[100];
    printf("--- File Content ---\n");
    while (fgets(line, sizeof(line), fp))
        printf("%s", line);
    fclose(fp);
    return 0;
}
```

Output:

```
--- File Content ---
Hello, file world!
C makes you closer to the machine.
```

#### How It Works

1. `fopen()` creates a connection to a file.
2. `fprintf()` writes formatted text, just like`printf()` but to a file stream.
3. `fclose()` flushes buffers and closes the file.
4. Reopen with`"r"` mode to read what you wrote.

You can also mix with`fscanf()` to read formatted data.

#### Checking for Errors

Always check file operations for errors. Use`if (!fp)` after`fopen()`, and use`perror()` to print the reason.

```
FILE *f = fopen("missing.txt", "r");
if (!f) {
    perror("Error opening file");
}
```

Example output:

```
Error opening file: No such file or directory
```

#### Reading Formatted Data with fscanf

You can parse text files using`fscanf()`, just like`scanf()`:

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("numbers.txt", "r");
    if (!fp) return 1;
    int a, b;
    while (fscanf(fp, "%d %d", &a, &b) == 2)
        printf("%d + %d = %d\n", a, b, a + b);
    fclose(fp);
    return 0;
}
```

If`numbers.txt` contains:

```
2 3
10 15
7 9
```

Output:

```
2 + 3 = 5
10 + 15 = 25
7 + 9 = 16
```

#### File Position and Rewinding

You can move around a file using:

```
fseek(fp, 0, SEEK_SET);  // go to beginning
fseek(fp, 0, SEEK_END);  // go to end
rewind(fp);              // reset to start
```

To know where you are:

```
long pos = ftell(fp);
printf("Current position: %ld\n", pos);
```

#### Writing Binary Data

Text files are human-readable; binary files store raw bytes. You’ll use`fwrite()` and`fread()` for that (covered more in the next section).

Example:

```
int numbers[] = {1, 2, 3, 4};
fwrite(numbers, sizeof(int), 4, fp);
```

#### Why It Matters

File I/O is the bridge between your C program and the real world:

- Configuration and log files
- Database storage
- Caches and serialization
- Operating system utilities (copy, move, grep, etc.)

It teaches resource management, always`fopen()` and`fclose()` in pairs, check errors, and handle failures gracefully.

#### Try It Yourself

1. Write a program that asks for your name and saves it to`user.txt`.
2. Append a timestamp each time the program runs.
3. Read all lines and count how many times your program has been executed.
4. Modify the example to reverse all lines read from a file.
5. Handle missing files gracefully using`perror()`.

You now know how to open, read, and write text files safely. Next, you’ll go deeper into binary files, where data moves in raw bytes, perfect for storing structs and arrays efficiently.
