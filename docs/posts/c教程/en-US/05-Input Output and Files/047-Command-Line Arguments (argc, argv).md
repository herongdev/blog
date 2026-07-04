---
title: "47. Command-Line Arguments (argc, argv)"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 47. Command-Line Arguments (argc, argv)"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 47
sidebarWeight: 47
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/047-Command-Line Arguments (argc, argv)"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/047-Command-Line Arguments (argc, argv)"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/047-Command-Line Arguments (argc, argv))

Every C program can receive input directly from the command line, no`scanf`, no`fgets`, just arguments passed when you run the executable. This is how professional C tools (like`gcc`,`ls`, and`grep`) receive filenames, options, and flags.

#### The Function Signature

Your`main` function can take two parameters:

```
int main(int argc, char *argv[])
```

| Parameter | Meaning |
| --- | --- |
| `argc` | Argument count (number of command-line arguments) |
| `argv` | Argument vector (array of C strings, each argument) |

`argv[0]` is the program name itself, and`argv[1]` onward are the user-provided arguments.

Example:

```
./hello world test
```

Then:

- `argc == 3`
- `argv[0] = "./hello"`
- `argv[1] = "world"`
- `argv[2] = "test"`

#### Tiny Code: Print Command-Line Arguments

```
#include <stdio.h>
int main(int argc, char *argv[]) {
    printf("Argument count: %d\n", argc);
    for (int i = 0; i < argc; i++)
        printf("argv[%d] = %s\n", i, argv[i]);
    return 0;
}
```

Run it:

```
./args foo bar 123
```

Output:

```
Argument count: 4
argv[0] = ./args
argv[1] = foo
argv[2] = bar
argv[3] = 123
```

#### Checking for Missing Arguments

If your program needs arguments, check`argc` before accessing them.

```
#include <stdio.h>
int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return 1;
    }
    printf("Opening file: %s\n", argv[1]);
    return 0;
}
```

Run it:

```
./fileop
```

Output:

```
Usage: ./fileop <filename>
```

Run again:

```
./fileop data.txt
```

Output:

```
Opening file: data.txt
```

#### Converting String Arguments to Numbers

All command-line arguments are strings. To use them as numbers, convert using:

- `atoi()`– string to int
- `atof()`– string to float
- `strtol()`/`strtod()`– safer and more flexible alternatives

Example:

```
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <a> <b>\n", argv[0]);
        return 1;
    }
    int a = atoi(argv[1]);
    int b = atoi(argv[2]);
    printf("%d + %d = %d\n", a, b, a + b);
    return 0;
}
```

Run:

```
./sum 10 25
```

Output:

```
10 + 25 = 35
```

#### Handling Options (Flags)

You can build simple command-line tools that handle options manually:

```
#include <stdio.h>
#include <string.h>
int main(int argc, char *argv[]) {
    int verbose = 0;
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-v") == 0)
            verbose = 1;
    }
    if (verbose)
        printf("Verbose mode on\n");
    else
        printf("Run quietly\n");
    return 0;
}
```

Run:

```
./tool -v
```

Output:

```
Verbose mode on
```

#### Tiny Code: Mini File Echo Tool

This program prints the content of a file passed as an argument:

```
#include <stdio.h>
int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <file>\n", argv[0]);
        return 1;
    }
    FILE *fp = fopen(argv[1], "r");
    if (!fp) {
        perror("Error");
        return 1;
    }
    char buf[128];
    while (fgets(buf, sizeof(buf), fp))
        printf("%s", buf);
    fclose(fp);
    return 0;
}
```

Run:

```
./echo mytext.txt
```

#### Why It Matters

`argc` and`argv` make your C programs scriptable and composable:

- Automate tasks from the command line
- Integrate with shell scripts or pipelines
- Process multiple input files
- Implement command-line flags and options

Every real-world C utility, from`ls` to`gcc`, depends on this pattern.

#### Try It Yourself

Write a program that takes a list of integers and prints their sum.

Add a`-r` flag to reverse the order of printed arguments.

Build a “greet” tool:

```
./greet Alice Bob Charlie
```

→`Hello, Alice! Hello, Bob! Hello, Charlie!`

Write a “compare” tool that checks if two file names are identical.

Combine`argc` and file I/O: copy one file to another with

```
./copy source.txt dest.txt
```

With command-line arguments, your C programs evolve from static exercises to flexible, real-world tools. Next, you’ll explore reading configuration files, a powerful way to let your programs adapt automatically without recompilation.
