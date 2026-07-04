---
title: "63. 文件描述符和打开/读/写"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 63. 文件描述符和打开/读/写"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 63
sidebarWeight: 63
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/063-File Descriptors and openreadwrite"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/063-File Descriptors and openreadwrite"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/063-File Descriptors and openreadwrite)

现在您可以创建和管理进程了，让我们探讨一下这些进程如何通过文件描述符与文件、设备甚至彼此之间进行通信。

文件描述符 (FD) 是 Unix 和 C 中最简单但最强大的抽象之一。一切，文件、管道、套接字、终端，都由一个小整数句柄表示。一旦了解了如何打开、读取、写入和关闭文件描述符，您就可以与 Unix 机器上的任何 I/O 系统进行交互。

#### 步骤 1. 什么是文件描述符？

文件描述符是一个整数，用于标识进程中的打开资源。默认情况下，每个进程都以三个打开描述符开始：

| FD |符号名称|描述 |
| --- | --- | --- |
| 0 |`STDIN_FILENO`|标准输入（键盘）|
| 1 |`STDOUT_FILENO`|标准输出（屏幕）|
| 2 |`STDERR_FILENO`|标准错误（屏幕）|

每次打开文件、套接字或管道时，内核都会为您提供最低的未使用 FD。

#### 步骤 2. 使用 open() 打开文件

可以直接使用系统调用层打开文件，而不用`fopen()`来自工作室。

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

编译并运行：

```
gcc open_demo.c -o open_demo
./open_demo
```

输出示例：

```
File descriptor: 3
```

#### 步骤 3. 从文件中读取

`read(fd, buffer, size)`将原始字节读入内存缓冲区。

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

输出：

```
Read 12 bytes: Hello world
```

#### 步骤 4. 写入文件

`write(fd, buffer, size)`将原始字节从内存写入文件描述符。

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

这会覆盖`out.txt`与您的留言。标志：

-`O_WRONLY`→ 只写
-`O_CREAT`→ 如果不存在则创建
-`O_TRUNC`→ 截断（清除）现有内容

最后的论点`0644`设置 Unix 权限：

- 所有者可以读/写，
- 团体/其他人可以阅读。

#### 步骤 5. 追加和非阻塞模式

您可以使用按位或组合标志：

```
int fd = open("log.txt", O_WRONLY | O_CREAT | O_APPEND, 0644);
```

`O_APPEND`每次写入之前将文件偏移量移至末尾，非常适合日志。

您还可以以非阻塞方式打开文件：

```
int fd = open("pipe", O_RDONLY | O_NONBLOCK);
```

对于套接字或命名管道上的 I/O 很有用。

#### 步骤 6. 复制描述符

您可以使用复制 FD`dup()`或者`dup2()`。这就是重定向的工作原理（`>`在贝壳中）。

例子：

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

后`dup2`，打印到标准输出的所有内容都会转到`output.txt`.

运行并检查：

```
./redir_demo
cat output.txt
```

输出：

```
This goes into output.txt!
```

#### 步骤 7. 偏移量和 lseek()

您可以使用以下命令在文件内移动`lseek(fd, offset, whence)`.

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

`whence`可以是：

-`SEEK_SET`（从开始）
-`SEEK_CUR`（从当前）
-`SEEK_END`（从末尾开始）

#### 步骤 8. 错误检查和返回值

所有系统调用都会返回：

- 非负值→成功
-`-1`→ 错误（检查`errno`)

例子：

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

输出：

```
Error: No such file or directory
```

#### 小代码：使用系统调用复制文件

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

编译并运行：

```
gcc copy.c -o copy
./copy
```

现在`copy.txt`与`source.txt`，使用纯系统调用。

#### 步骤 9. 从 STDIN 读取并写入 STDOUT

您可以使用`read(0, ...)`和`write(1, ...)`直接用于控制台 I/O。

```
#include <unistd.h>
int main(void) {
    char buf[64];
    ssize_t n = read(STDIN_FILENO, buf, sizeof(buf));
    write(STDOUT_FILENO, buf, n);
}
```

跑步：

```
./echo_demo
hello world
```

输出：

```
hello world
```

这是每个 shell 命令的本质。

#### 第 10 步：为什么它很重要

文件描述符统一了所有内容的 I/O：

- 常规文件
- 管道和插座
- 设备和终端

它们可以让您准确控制数据如何流入和流出您的程序，这是系统工具、服务器和操作系统级编程的基础。

一旦理解了这些原语，您就可以构建自己的工具版本，例如`cat`,`tee`，甚至是简单的贝壳。

#### 自己尝试一下

1.写一个迷你`cat`克隆使用`read()`和`write()`.
2. 使用`dup2()`将 stdout 和 stderr 重定向到文件。
3.使用添加错误消息`perror()`并处理`EINTR`.
4. 使用`lseek()`在打印之前跳过文件的前 N ​​个字节。
5. 实现一个简单的文件追加器`O_APPEND`.

接下来，您将使用这些文件描述符来使进程进行通信、构建管道和重定向，这与 shell 用于连接命令的机制相同`ls | grep`.
