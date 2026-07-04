---
title: "46. Error Checking with errno and perror"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 46. Error Checking with errno and perror"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 46
sidebarWeight: 46
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/046-Error Checking with errno and perror"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/046-Error Checking with errno and perror"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/046-Error Checking with errno and perror)

Even the best-written C programs can encounter errors, missing files, permission issues, division by zero, or failed memory allocations. Unlike some languages that throw exceptions, C reports errors manually using return values and a global variable named`errno`.

Understanding how to use`errno`,`perror()`, and`strerror()` is essential for writing robust, production-grade C programs that fail gracefully and informatively.

#### The Idea Behind errno

`errno` is a global integer (declared in`<errno.h>`) that stores an error code whenever a library function fails.

- On success, most functions leave`errno` unchanged.
- On failure, they typically set`errno` and return an error value (often`NULL`,`-1`, or`0` depending on the function).
- You must check the return value first, only then should you inspect`errno`.

Example:

```
#include <stdio.h>
#include <errno.h>
int main(void) {
    FILE *fp = fopen("missing.txt", "r");
    if (!fp) {
        printf("Error code: %d\n", errno);
        perror("fopen failed");
    }
    return 0;
}
```

Output:

```
Error code: 2
fopen failed: No such file or directory
```

#### Common errno Codes

| Code | Name | Meaning |
| --- | --- | --- |
| 2 | `ENOENT` | No such file or directory |
| 13 | `EACCES` | Permission denied |
| 12 | `ENOMEM` | Not enough memory |
| 22 | `EINVAL` | Invalid argument |
| 17 | `EEXIST` | File already exists |
| 5 | `EIO` | Input/output error |
| 111 | `ECONNREFUSED` | Connection refused (network) |

Include`<errno.h>` to use these symbolic names:

```
if (errno == ENOENT) printf("File missing.\n");
```

#### Using perror()

`perror()` prints a human-readable error message to`stderr`, based on the current value of`errno`.

```
perror("File open error");
```

Example:

```
#include <stdio.h>
#include <errno.h>
int main(void) {
    FILE *f = fopen("ghost.txt", "r");
    if (!f)
        perror("Unable to open file");
    return 0;
}
```

Output:

```
Unable to open file: No such file or directory
```

#### Using strerror()

If you want to use the error message in your own formatted output, use`strerror()` from`<string.h>`:

```
#include <stdio.h>
#include <string.h>
#include <errno.h>
int main(void) {
    FILE *f = fopen("/root/secret.txt", "r");
    if (!f)
        printf("Error (%d): %s\n", errno, strerror(errno));
    return 0;
}
```

Output:

```
Error (13): Permission denied
```

#### Tiny Code: Robust File Reader

Here’s a simple file reader that checks for errors at every step:

```
#include <stdio.h>
#include <string.h>
#include <errno.h>
int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return 1;
    }
    FILE *fp = fopen(argv[1], "r");
    if (!fp) {
        fprintf(stderr, "Error opening %s: %s\n", argv[1], strerror(errno));
        return 1;
    }
    char buf[128];
    while (fgets(buf, sizeof(buf), fp))
        printf("%s", buf);
    if (ferror(fp)) {
        fprintf(stderr, "Error reading file: %s\n", strerror(errno));
    }
    fclose(fp);
    return 0;
}
```

Usage:

```
./readfile poem.txt
```

If the file is missing:

```
Error opening poem.txt: No such file or directory
```

#### Clearing and Resetting errno

Some functions may set`errno` even if they succeed later. To be safe, you can clear it before a call:

```
#include <errno.h>
errno = 0;
FILE *f = fopen("file.txt", "r");
if (!f) perror("fopen");
```

This ensures you don’t read a leftover error from an earlier operation.

#### Checking Other System Errors

`errno` isn’t limited to file I/O, it applies to many system calls and library functions:

```
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
int main(void) {
    FILE *f = fopen("/dev/full", "w"); // special Linux device that fails on write
    if (f) {
        if (fputc('A', f) == EOF)
            perror("Write failed");
        fclose(f);
    }
    return 0;
}
```

Output:

```
Write failed: No space left on device
```

#### Why It Matters

`errno` and its helpers (`perror`,`strerror`) make your programs explain themselves when things go wrong. This is vital for:

- System tools that must report specific error causes
- Debugging production code
- Writing portable, maintainable programs

Good C developers never just “fail silently.”

#### Try It Yourself

1. Open a file that doesn’t exist, then create it and try again.
2. Simulate a read error by using`ferror()` after reading a closed file.
3. Try writing to a directory (`fopen("/tmp", "w")`) and inspect`errno`.
4. Print all known error codes and messages using a loop and`strerror()`.
5. Write a small “safe_open” function that wraps`fopen` with error reporting.

With error handling mastered, you now know how to make C programs both informative and reliable. Next, you’ll explore command-line arguments (`argc`,`argv`), the gateway to building flexible, scriptable tools that process user input dynamically.
