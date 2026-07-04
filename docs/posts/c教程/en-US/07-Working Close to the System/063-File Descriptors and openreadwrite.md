---
title: "63. File Descriptors and open/read/write"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working Close to the System"
description: "The Little Book of C — 63. File Descriptors and open/read/write"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 63
sidebarWeight: 63
lang: "en-US"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/063-File Descriptors and openreadwrite"
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/063-File Descriptors and openreadwrite"
---
[中文版本](/posts/c教程/zh-CN/07-贴近系统/063-File Descriptors and openreadwrite)

Now that you can create and manage processes, let’s explore how those processes communicate with files, devices, and even each other, through file descriptors.

File descriptors (FDs) are one of the simplest yet most powerful abstractions in Unix and C. Everything, files, pipes, sockets, terminals, is represented by a small integer handle. Once you understand how to open, read, write, and close file descriptors, you can interact with any I/O system on a Unix machine.

#### Step 1. What Is a File Descriptor?

A file descriptor is an integer that identifies an open resource in your process. Every process starts with three open descriptors by default:

| FD | Symbolic Name | Description |
| --- | --- | --- |
| 0 | `STDIN_FILENO` | Standard input (keyboard) |
| 1 | `STDOUT_FILENO` | Standard output (screen) |
| 2 | `STDERR_FILENO` | Standard error (screen) |

Each time you open a file, socket, or pipe, the kernel gives you the lowest unused FD.

#### Step 2. Opening Files with open()

You can open files directly using the system call layer, instead of`fopen()` from stdio.

```
#include <fcntl.h>     // open
#include <unistd.h>    // close, read, write
#include <stdio.h>     // perror
int main(void) {
    int fd = open("data.txt", O_RDONLY);
    if (fd == -1) {
        perror("open failed");
        return 1;
    }
    printf("File descriptor: %d\n", fd);
    close(fd);
}
```

Compile and run:

```
gcc open_demo.c -o open_demo
./open_demo
```

Output example:

```
File descriptor: 3
```

#### Step 3. Reading from a File

`read(fd, buffer, size)` reads raw bytes into a memory buffer.

```
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
int main(void) {
    int fd = open("data.txt", O_RDONLY);
    if (fd == -1) return 1;
    char buf[64];
    ssize_t n = read(fd, buf, sizeof(buf) - 1);
    if (n > 0) {
        buf[n] = '\0';
        printf("Read %zd bytes: %s\n", n, buf);
    }
    close(fd);
}
```

Output:

```
Read 12 bytes: Hello world
```

#### Step 4. Writing to a File

`write(fd, buffer, size)` writes raw bytes from memory to a file descriptor.

```
#include <fcntl.h>
#include <unistd.h>
#include <string.h>
int main(void) {
    int fd = open("out.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    const char msg[] = "Writing from C using write()\n";
    write(fd, msg, strlen(msg));
    close(fd);
}
```

This overwrites`out.txt` with your message. Flags:

- `O_WRONLY`→ write-only
- `O_CREAT`→ create if it doesn’t exist
- `O_TRUNC`→ truncate (clear) existing contents

The final argument`0644` sets Unix permissions:

- Owner can read/write,
- Group/others can read.

#### Step 5. Append and Non-blocking Modes

You can combine flags using bitwise OR:

```
int fd = open("log.txt", O_WRONLY | O_CREAT | O_APPEND, 0644);
```

`O_APPEND` moves the file offset to the end before every write, ideal for logs.

You can also open files as non-blocking:

```
int fd = open("pipe", O_RDONLY | O_NONBLOCK);
```

Useful for I/O on sockets or named pipes.

#### Step 6. Duplicating Descriptors

You can duplicate an FD using`dup()` or`dup2()`. This is how redirection works (`>` in shells).

Example:

```
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
int main(void) {
    int fd = open("output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    dup2(fd, STDOUT_FILENO);  // redirect stdout to file
    close(fd);
    printf("This goes into output.txt!\n");
}
```

After`dup2`, everything printed to stdout goes to`output.txt`.

Run and inspect:

```
./redir_demo
cat output.txt
```

Output:

```
This goes into output.txt!
```

#### Step 7. Offsets and lseek()

You can move around inside a file using`lseek(fd, offset, whence)`.

```
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
int main(void) {
    int fd = open("data.txt", O_RDONLY);
    lseek(fd, 5, SEEK_SET); // move to byte 5
    char buf[16];
    read(fd, buf, 10);
    buf[10] = '\0';
    printf("Chunk: %s\n", buf);
    close(fd);
}
```

`whence` can be:

- `SEEK_SET`(from start)
- `SEEK_CUR`(from current)
- `SEEK_END`(from end)

#### Step 8. Error Checking and Return Values

All system calls return:

- A nonnegative value → success
- `-1`→ error (check`errno`)

Example:

```
#include <errno.h>
#include <string.h>
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
int main(void) {
    int fd = open("missing.txt", O_RDONLY);
    if (fd == -1)
        fprintf(stderr, "Error: %s\n", strerror(errno));
}
```

Output:

```
Error: No such file or directory
```

#### Tiny Code: Copy File Using System Calls

```
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
int main(void) {
    int src = open("source.txt", O_RDONLY);
    int dst = open("copy.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (src == -1 || dst == -1) {
        perror("open failed");
        return 1;
    }
    char buf[256];
    ssize_t n;
    while ((n = read(src, buf, sizeof(buf))) > 0)
        write(dst, buf, n);
    close(src);
    close(dst);
    return 0;
}
```

Compile and run:

```
gcc copy.c -o copy
./copy
```

Now`copy.txt` is identical to`source.txt`, using pure syscalls.

#### Step 9. Reading from STDIN and Writing to STDOUT

You can use`read(0, ...)` and`write(1, ...)` directly for console I/O.

```
#include <unistd.h>
int main(void) {
    char buf[64];
    ssize_t n = read(STDIN_FILENO, buf, sizeof(buf));
    write(STDOUT_FILENO, buf, n);
}
```

Run:

```
./echo_demo
hello world
```

Output:

```
hello world
```

That’s the essence of every shell command.

#### Step 10. Why It Matters

File descriptors unify I/O across everything:

- Regular files
- Pipes and sockets
- Devices and terminals

They let you control exactly how data flows in and out of your program, a foundation for system tools, servers, and OS-level programming.

Once you understand these primitives, you can build your own versions of tools like`cat`,`tee`, and even simple shells.

#### Try It Yourself

1. Write a mini`cat` clone using`read()` and`write()`.
2. Use`dup2()` to redirect both stdout and stderr to a file.
3. Add error messages using`perror()` and handle`EINTR`.
4. Use`lseek()` to skip the first N bytes of a file before printing.
5. Implement a simple file appender with`O_APPEND`.

Next, you’ll use these file descriptors to make processes communicate, building pipes and redirection, the same mechanisms shells use to connect commands like`ls | grep`.
