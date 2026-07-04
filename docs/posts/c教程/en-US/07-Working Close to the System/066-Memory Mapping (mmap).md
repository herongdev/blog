---
title: "66. Memory Mapping (mmap)"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working Close to the System"
description: "The Little Book of C — 66. Memory Mapping (mmap)"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 66
sidebarWeight: 66
lang: "en-US"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/066-Memory Mapping (mmap)"
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/066-Memory Mapping (mmap)"
---
[中文版本](/posts/c教程/zh-CN/07-贴近系统/066-Memory Mapping (mmap))

In previous sections, you learned how to read and write files using`read()` and`write()`. Those system calls move data between files and user-space buffers in RAM.

But what if you could map a file directly into memory, and then treat it as part of your process’s address space?

That’s exactly what memory mapping (via`mmap`) does, it’s faster, more flexible, and forms the backbone of databases, shared memory systems, and even virtual memory itself.

#### Step 1. What Is mmap?

`mmap()` maps a file or device into memory so you can access it directly, as if it were an array in RAM.

```
#include <sys/mman.h>
void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);
```

| Parameter | Description |
| --- | --- |
| `addr` | Hint for mapping address (usually`NULL`) |
| `length` | Number of bytes to map |
| `prot` | Protection:`PROT_READ`,`PROT_WRITE`, etc. |
| `flags` | Type:`MAP_PRIVATE`,`MAP_SHARED`, etc. |
| `fd` | File descriptor to map |
| `offset` | Start offset in file (must be multiple of page size) |

#### Step 2. Simple File Mapping Example

Let’s map a file into memory and print its contents.

```
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
int main(void) {
    int fd = open("data.txt", O_RDONLY);
    if (fd == -1) { perror("open"); return 1; }
    struct stat st;
    fstat(fd, &st);
    char *data = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) { perror("mmap"); return 1; }
    write(STDOUT_FILENO, data, st.st_size);
    munmap(data, st.st_size);
    close(fd);
}
```

Compile and run:

```
gcc mmap_read.c -o mmap_read
./mmap_read
```

This directly prints the file contents, no loops, no`read()` calls.

#### Step 3. Reading vs. Writing

If you want to modify a file through memory, you must open it read-write and use`PROT_WRITE`.

```
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>
#include <sys/stat.h>
int main(void) {
    int fd = open("memo.txt", O_RDWR | O_CREAT, 0666);
    ftruncate(fd, 64); // ensure file has enough size
    char *map = mmap(NULL, 64, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (map == MAP_FAILED) return 1;
    strcpy(map, "Hello, memory-mapped file!");
    msync(map, 64, MS_SYNC);
    munmap(map, 64);
    close(fd);
}
```

Open`memo.txt`, you’ll see the written text instantly.

- `MAP_SHARED`: changes are written back to the file.
- `MAP_PRIVATE`: copy-on-write (changes visible only to this process).

#### Step 4. Anonymous Mappings

You can create memory that isn’t tied to any file, purely in RAM.

```
#include <sys/mman.h>
#include <unistd.h>
#include <stdio.h>
int main(void) {
    size_t len = 4096;
    int *arr = mmap(NULL, len, PROT_READ | PROT_WRITE,
                    MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    if (arr == MAP_FAILED) return 1;
    arr[0] = 1234;
    printf("arr[0] = %d\n", arr[0]);
    munmap(arr, len);
}
```

Output:

```
arr[0] = 1234
```

Anonymous mappings are commonly used for dynamic memory regions or shared memory between processes.

#### Step 5. Shared Memory Between Processes

You can use`MAP_SHARED` and`fork()` to let parent and child processes share the same mapped memory.

```
#include <sys/mman.h>
#include <unistd.h>
#include <stdio.h>
int main(void) {
    int *shared = mmap(NULL, sizeof(int),
                       PROT_READ | PROT_WRITE,
                       MAP_SHARED | MAP_ANONYMOUS,
                       -1, 0);
    *shared = 0;
    pid_t pid = fork();
    if (pid == 0) {
        (*shared)++;
        printf("Child: shared = %d\n", *shared);
    } else {
        sleep(1);
        printf("Parent: shared = %d\n", *shared);
    }
    munmap(shared, sizeof(int));
}
```

Output:

```
Child: shared = 1
Parent: shared = 1
```

Both processes see the same memory, no pipes or sockets needed.

#### Step 6. Memory Protections

Use`PROT_*` flags to control access:

- `PROT_READ`→ read allowed
- `PROT_WRITE`→ write allowed
- `PROT_EXEC`→ executable
- `PROT_NONE`→ no access

You can change permissions later:

```
mprotect(ptr, len, PROT_READ);
```

This helps you simulate “read-only” data regions or test segmentation faults intentionally.

#### Step 7. Page Size and Alignment

Memory is mapped in units of pages (usually 4096 bytes). You can get your system’s page size:

```
#include <unistd.h>
#include <stdio.h>
int main(void) {
    printf("Page size: %ld bytes\n", sysconf(_SC_PAGESIZE));
}
```

Offsets in`mmap` must be aligned to page size.

#### Step 8. Unmapping and Syncing

When you’re done with a mapped region, always call:

```
munmap(addr, length);
```

If you modified the data:

```
msync(addr, length, MS_SYNC);
```

This ensures changes are written back to disk.

#### Step 9. Using mmap for Performance

Advantages over`read()` and`write()`:

- Avoids extra data copies between kernel and user space.
- The OS loads only the pages you touch (lazy loading).
- Efficient for random access to large files.

Databases, editors, and browsers (like SQLite, Vim, Chrome) rely heavily on`mmap` for performance.

#### Tiny Code: Count Lines in a Large File

```
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
int main(void) {
    int fd = open("bigfile.txt", O_RDONLY);
    struct stat st;
    fstat(fd, &st);
    char *data = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    size_t lines = 0;
    for (size_t i = 0; i < st.st_size; i++)
        if (data[i] == '\n') lines++;
    printf("Lines: %zu\n", lines);
    munmap(data, st.st_size);
    close(fd);
}
```

Run it on a multi-GB file, it’ll perform incredibly fast.

#### Step 10. Why It Matters

`mmap` opens a new world of memory-driven file access:

- Used by OSes to load executables, shared libs, and pages.
- Powers databases, compilers, and search engines.
- Enables shared memory between processes.
- Reduces I/O overhead for large files.

It’s the bridge between files and memory, unifying two key abstractions in C and Unix.

#### Try It Yourself

1. Write a file and modify it in place using`mmap`.
2. Create shared memory between parent and child processes with`MAP_SHARED`.
3. Measure performance difference between`read()` and`mmap`.
4. Map only part of a file using an offset aligned to page size.
5. Implement a small in-memory key-value store backed by`mmap`.

Next, you’ll explore how to work with time and clocks in C, retrieving system timestamps, measuring durations, and implementing timers with precision.
