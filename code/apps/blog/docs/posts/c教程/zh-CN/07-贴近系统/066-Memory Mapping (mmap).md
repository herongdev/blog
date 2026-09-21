---
title: "66. 内存映射（mmap）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 66. 内存映射（mmap）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 66
sidebarWeight: 66
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/066-Memory Mapping (mmap)"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/066-Memory Mapping (mmap)"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/066-Memory Mapping (mmap))

在前面的部分中，您学习了如何使用读取和写入文件`read()`和`write()`。这些系统调用在文件和 RAM 中的用户空间缓冲区之间移动数据。

但是，如果您可以将文件直接映射到内存中，然后将其视为进程地址空间的一部分呢？

这正是内存映射（通过`mmap`）确实如此，它更快、更灵活，并且构成了数据库、共享内存系统甚至虚拟内存本身的支柱。

#### 步骤 1. 什么是 mmap？

`mmap()`将文件或设备映射到内存中，以便您可以直接访问它，就像 RAM 中的数组一样。

```
#include <sys/mman.h>
void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);
```

|参数|描述 |
| --- | --- |
|`addr`| Hint for mapping address (usually`NULL`) |
|`length`| Number of bytes to map |
|`prot`|保护：`PROT_READ`,`PROT_WRITE`等|
|`flags`|类型：`MAP_PRIVATE`,`MAP_SHARED`等|
|`fd`|要映射的文件描述符 |
|`offset`|文件中的起始偏移量（必须是页面大小的倍数）|

#### 步骤 2. 简单文件映射示例

让我们将文件映射到内存并打印其内容。

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

编译并运行：

```
gcc mmap_read.c -o mmap_read
./mmap_read
```

这个直接打印文件内容，没有循环，没有`read()`来电。

#### 第三步：阅读与写作

如果要通过内存修改文件，则必须以读写方式打开它并使用`PROT_WRITE`.

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

打开`memo.txt`，您将立即看到书面文字。

-`MAP_SHARED`：更改被写回文件。
-`MAP_PRIVATE`：写入时复制（更改仅对此进程可见）。

#### 步骤 4. 匿名映射

您可以创建不与任何文件绑定的内存，纯粹在 RAM 中。

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

输出：

```
arr[0] = 1234
```

匿名映射通常用于动态内存区域或进程之间的共享内存。

#### 步骤 5. 进程之间共享内存

您可以使用`MAP_SHARED`和`fork()`让父进程和子进程共享相同的映射内存。

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

输出：

```
Child: shared = 1
Parent: shared = 1
```

两个进程看到相同的内存，不需要管道或套接字。

#### 步骤 6. 内存保护

使用`PROT_*`控制访问的标志：

-`PROT_READ`→ 允许读取
-`PROT_WRITE`→ 允许写入
-`PROT_EXEC`→ 可执行文件
-`PROT_NONE`→ 无法访问

您可以稍后更改权限：

```
mprotect(ptr, len, PROT_READ);
```

这可以帮助您模拟“只读”数据区域或有意测试分段错误。

#### 步骤 7. 页面大小和对齐方式

内存以页为单位进行映射（通常为 4096 字节）。 You can get your system’s page size:

```
#include <unistd.h>
#include <stdio.h>
int main(void) {
    printf("Page size: %ld bytes\n", sysconf(_SC_PAGESIZE));
}
```

偏移量为`mmap`必须与页面大小对齐。

#### 步骤 8. 取消映射和同步

当您完成映射区域后，请始终调用：

```
munmap(addr, length);
```

如果您修改了数据：

```
msync(addr, length, MS_SYNC);
```

这可确保更改被写回磁盘。

#### 步骤 9. 使用 mmap 提高性能

优于`read()`和`write()`:

- 避免内核和用户空间之间的额外数据复制。
- 操作系统仅加载您触摸的页面（延迟加载）。
- 有效地随机访问大文件。

数据库、编辑器和浏览器（如 SQLite、Vim、Chrome）严重依赖`mmap`为了性能。

#### 小代码：计算大文件中的行数

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

在多 GB 文件上运行它，它的执行速度会非常快。

#### 第 10 步：为什么它很重要

`mmap`打开内存驱动文件访问的新世界：

- 由操作系统用来加载可执行文件、共享库和页面。
- 为数据库、编译器和搜索引擎提供支持。
- 启用进程之间的共享内存。
- 减少大文件的 I/O 开销。

它是文件和内存之间的桥梁，统一了 C 和 Unix 中的两个关键抽象。

#### 自己尝试一下

1.编写一个文件并使用以下命令就地修改它`mmap`.
2. 在父进程和子进程之间创建共享内存`MAP_SHARED`.
3. 测量之间的性能差异`read()`和`mmap`.
4. 使用与页面大小对齐的偏移量仅映射文件的一部分。
5. 实现一个小型内存键值存储`mmap`.

接下来，您将探索如何在 C 中使用时间和时钟、检索系统时间戳、测量持续时间以及精确实现计时器。
