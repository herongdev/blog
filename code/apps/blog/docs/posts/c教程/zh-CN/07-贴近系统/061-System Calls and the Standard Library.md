---
title: "61. 系统调用和标准库"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 61. 系统调用和标准库"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 61
sidebarWeight: 61
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/061-System Calls and the Standard Library"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/061-System Calls and the Standard Library"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/061-System Calls and the Standard Library)

当您编写涉及文件、进程或设备的 C 程序时，您是在与操作系统对话，而不是直接与硬件对话。这种通信是通过系统调用进行的。

系统调用是用户空间程序和操作系统内核之间的最低级接口。 C 的标准库 (libc) 是构建在这些调用之上的一层薄薄的包装器，使它们更易于使用且更可移植。

让我们探讨一下它是如何工作的，以及如何直接从 C 代码使用系统调用。

#### 步骤 1. 什么是系统调用？

系统调用 (syscall) 允许程序向操作系统内核请求服务，例如读取文件、创建进程或分配内存。

示例：

-`read()`,`write()`– 访问文件和设备
-`fork()`,`exec()`– 创建和管理流程
-`open()`,`close()`– 处理文件描述符
-`mmap()`– 将文件映射到内存中
-`socket()`– 网络通讯

当您调用系统函数时，控制权从用户空间传递到内核空间，然后再返回。

#### 步骤 2.libc 的作用

C 标准库（glibc、musl 等）提供了这些系统调用的包装器。

例子：

```
#include <stdio.h>
int main(void) {
    FILE *f = fopen("test.txt", "r");
    if (!f) {
        perror("fopen failed");
        return 1;
    }
    fclose(f);
}
```

在引擎盖下，`fopen()`最终打电话`open()`，定义在的系统调用`<fcntl.h>`。也可以直接调用。

#### 步骤3.直接调用系统调用

这是没有 stdio 助手的相同操作：

```
#include <fcntl.h>     // open
#include <unistd.h>    // read, write, close
#include <stdio.h>     // perror
int main(void) {
    int fd = open("test.txt", O_RDONLY);
    if (fd == -1) {
        perror("open failed");
        return 1;
    }
    char buf[128];
    ssize_t n = read(fd, buf, sizeof(buf) - 1);
    if (n >= 0) {
        buf[n] = '\0';
        write(STDOUT_FILENO, buf, n);
    }
    close(fd);
}
```

编译并运行：

```
gcc sysread.c -o sysread
./sysread
```

这将打印前 128 个字节`test.txt`直接使用系统调用，没有`fopen()`或者`printf()`涉及。

#### 小代码：最小系统调用示例

让我们甚至放弃 C 库并使用原始系统调用接口。

```
#include <unistd.h>
int main(void) {
    const char msg[] = "Hello via system call\n";
    write(1, msg, sizeof(msg) - 1);  // 1 = STDOUT
    _exit(0);
}
```

编译：

```
gcc -nostdlib -static syshello.c -o syshello
```

跑步：

```
Hello via system call
```

您只是直接执行系统调用，完全绕过标准库。

#### 步骤 4. 文件描述符

系统调用如`read()`和`write()`使用文件描述符，由操作系统管理的小整数句柄。

|描述符|意义|
| --- | --- |
| 0 |标准输入（`stdin`) |
| 1 |标准输出（`stdout`) |
| 2 |标准误（`stderr`) |

每个打开的文件、套接字或管道都有一个唯一的描述符。

例子：

```
write(1, "Output to stdout\n", 17);
write(2, "Output to stderr\n", 17);
```

#### 步骤 5. 检查系统调用

您可以使用以下方式观看程序的系统调用`strace`:

```
strace ./sysread
```

输出示例：

```
open("test.txt", O_RDONLY) = 3
read(3, "Hello World\n", 12) = 12
write(1, "Hello World\n", 12) = 12
close(3) = 0
```

这展示了真正的内核级操作，是一个很棒的调试和学习工具。

#### 步骤 6. 返回值和错误

系统调用通常返回：

- ≥ 0 → 成功（读取的字节数、进程 ID 等）
- -1 → 错误（与`errno`设置为错误代码）

例子：

```
#include <errno.h>
#include <string.h>
int fd = open("missing.txt", O_RDONLY);
if (fd == -1)
    fprintf(stderr, "Error: %s\n", strerror(errno));
```

常见错误代码：

|代码|意义|
| --- | --- |
|`ENOENT`|找不到文件 |
|`EACCES`|权限被拒绝 |
|`EBADF`|无效描述符 |
|`EINTR`|系统调用中断 |

#### 步骤 7. 混合系统调用和 stdio

您可以安全地组合两个层，只是不要将它们混合在同一个文件描述符上。

示例（安全）：

```
FILE *f = fopen("log.txt", "w");
write(STDOUT_FILENO, "Console log\n", 12);
fprintf(f, "File log\n");
fclose(f);
```

示例（不安全）：

```
FILE *f = fopen("data.txt", "w");
write(fileno(f), "mixed output\n", 13);  // may confuse buffering
```

#### 步骤 8. 系统调用包装器

Linux 内核提供了数百个系统调用。您可以通过以下方式拨打大部分电话：`<unistd.h>`，但对于罕见的，你可以使用`syscall()`:

```
#include <sys/syscall.h>
#include <unistd.h>
int main(void) {
    syscall(SYS_write, 1, "Hello syscall\n", 14);
    return 0;
}
```

#### 步骤 9. 查看可用的系统调用

检查您的平台的所有可用系统调用：

```
man 2 intro
```

或者

```
ausyscall --dump | head
```

您会看到如下列表：

```
read, write, open, close, stat, fork, execve, mmap, ...
```

#### 第 10 步：为什么它很重要

系统调用是 C 和类 Unix 系统中一切的基础。

它们使您的程序可以直接访问：

- 文件和设备
- 进程和信号
- 内存和网络
- 时间和环境

学习直接使用它们对于理解更高级别的抽象（例如`stdio`,`pthreads`，或套接字）已构建。

#### 自己尝试一下

1. 使用`strace`在`ls`或者`cat`看看系统调用如何驱动它们。
2. 更换一个`fopen()`/`fread()`与直接配对`open()`和`read()`来电。
3. 编写一个小型文件复制器，仅使用`open`,`read`,`write`， 和`close`.
4. 尝试无效的文件描述符并打印出来`errno`.
5. 构建一个版本`echo`仅使用原始系统调用。

接下来，您将更进一步：学习如何创建和管理流程`fork()`和`exec()`，Unix 多任务处理的核心。
