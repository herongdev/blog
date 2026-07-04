---
title: "64. 管道和重定向"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 64. 管道和重定向"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 64
sidebarWeight: 64
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/064-Pipes and Redirection"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/064-Pipes and Redirection"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/064-Pipes and Redirection)

现在您可以使用文件描述符进行读写，您可以连接两个进程，使一个进程的输出成为另一个进程的输入，就像`ls | grep c`在一个壳里。

这种魔力是通过管道发生的，管道是 Unix 最简单、最优雅的进程间通信 (IPC) 机制之一。

#### 步骤 1. 什么是管道？

管道是两个文件描述符之间的单向数据通道，一个用于读取，一个用于写入。

在外壳中：

```
ls | grep main
```

相当于：

- 过程A（`ls`) 写入管道。
- 过程B（`grep`) 从管道中读取。

在 C 中，您可以使用以下命令执行相同的操作`pipe()`和`fork()`.

#### 步骤 2. 创建管道

```
#include <unistd.h>
#include <stdio.h>
int main(void) {
    int fds[2];
    if (pipe(fds) == -1) {
        perror("pipe failed");
        return 1;
    }
    printf("Read end: %d, Write end: %d\n", fds[0], fds[1]);
    return 0;
}
```

编译并运行：

```
gcc pipe_demo.c -o pipe_demo
./pipe_demo
```

输出示例：

```
Read end: 3, Write end: 4
```

您现在有两个连接的文件描述符：

-`fds[0]`: 读完
-`fds[1]`: 写结束

无论你写什么`fds[1]`可以从中读取`fds[0]`.

#### 步骤 3. 通过管道写入和读取

```
#include <unistd.h>
#include <string.h>
#include <stdio.h>
int main(void) {
    int fds[2];
    pipe(fds);
    const char msg[] = "hello through pipe";
    write(fds[1], msg, strlen(msg));
    char buf[64];
    ssize_t n = read(fds[0], buf, sizeof(buf) - 1);
    buf[n] = '\0';
    printf("Received: %s\n", buf);
    close(fds[0]);
    close(fds[1]);
}
```

输出：

```
Received: hello through pipe
```

您刚刚通过内存在两个文件描述符之间进行通信，没有文件，没有网络。

#### 步骤 4. 父级和子级之间的管道

这就是它的强大之处：管道可以连接进程。

```
#include <unistd.h>
#include <stdio.h>
#include <string.h>
int main(void) {
    int fds[2];
    pipe(fds);
    pid_t pid = fork();
    if (pid == 0) {
        // Child
        close(fds[1]); // close write end
        char buf[64];
        ssize_t n = read(fds[0], buf, sizeof(buf) - 1);
        buf[n] = '\0';
        printf("Child got: %s\n", buf);
    } else {
        // Parent
        close(fds[0]); // close read end
        const char msg[] = "Hi from parent!";
        write(fds[1], msg, strlen(msg));
        close(fds[1]);
    }
}
```

输出：

```
Child got: Hi from parent!
```

父进程写入，子进程读取，两个进程之间的干净数据通道。

#### 步骤 5. 将 STDIN/STDOUT 重定向到管道

您可以使用`dup2()`将管道直接连接到标准输入/输出。

示例：将父级的写入端连接到子级的标准输入。

```
#include <unistd.h>
#include <stdio.h>
int main(void) {
    int fds[2];
    pipe(fds);
    pid_t pid = fork();
    if (pid == 0) {
        dup2(fds[0], STDIN_FILENO);
        close(fds[1]);
        execlp("wc", "wc", "-w", NULL);
    } else {
        close(fds[0]);
        write(fds[1], "Hello from parent\nThis is a pipe test\n", 39);
        close(fds[1]);
    }
}
```

输出：

```
6
```

发生的情况如下：

- 父级将数据写入管道。
- 孩子的标准输入连接到该管道。
-`wc -w`计算收到的字数。

这正是 shell 实现管道的方式，例如`echo "hi" | wc -w`.

#### 步骤 6. 链接多个命令

您可以通过创建多个管道并将它们串联起来来链接多个命令。

概念示例：

```
cat file.txt | grep "error" | wc -l
```

每个进程都从前一个管道读取数据并写入下一个管道，这是 shell 的基本设计。

您可以通过以下方式在 C 中实现相同的概念：

1. 在每个进程对之间创建管道。
2. 为每个命令创建一个新进程。
3. 通过重定向其 stdin/stdout`dup2()`.

#### 步骤 7. 命名管道 (FIFO)

管道通常仅存在于相关进程之间。要在不相关的程序之间共享数据，可以使用命名管道 (FIFO)。

创建一个：

```
mkfifo mypipe
```

然后在一个终端中：

```
cat > mypipe
```

在另一篇文章中：

```
cat < mypipe
```

数据像文件一样流经命名管道。

在C中：

```
#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>
int main(void) {
    mkfifo("mypipe", 0666);
    int fd = open("mypipe", O_WRONLY);
    write(fd, "Hello FIFO\n", 11);
    close(fd);
}
```

#### 步骤 8. 错误处理和 EOF

如果管道的所有写入端都关闭，`read()`回报`0`，表示EOF。

```
int fds[2];
pipe(fds);
close(fds[1]); // no writers
char buf[10];
ssize_t n = read(fds[0], buf, 10); // n == 0 => EOF
```

如果你尝试在所有读者都离开后写作，你会得到`SIGPIPE`.

#### 小代码：最小的 Shell 管道

```
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    int fds[2];
    pipe(fds);
    if (fork() == 0) {
        dup2(fds[1], STDOUT_FILENO);
        close(fds[0]);
        execlp("ls", "ls", NULL);
    }
    if (fork() == 0) {
        dup2(fds[0], STDIN_FILENO);
        close(fds[1]);
        execlp("wc", "wc", "-l", NULL);
    }
    close(fds[0]);
    close(fds[1]);
    wait(NULL);
    wait(NULL);
}
```

跑步：

```
gcc pipe_chain.c -o pipe_chain
./pipe_chain
```

输出：

```
(number of files in directory)
```

你刚刚重新创建了`ls | wc -l`在C.

#### 步骤 9. 结合重定向和文件

您可以以相同的方式将 stdout 或 stderr 重定向到文件：

```
int fd = open("output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
dup2(fd, STDOUT_FILENO);
close(fd);
execlp("ls", "ls", NULL);
```

现在的输出为`ls`去`output.txt`.

#### 第 10 步：为什么它很重要

管道和重定向是 Unix 哲学的核心：

- 程序把一件事做好。
- 通过文本流进行通信。
- 通过链接简单的工具来组成复杂的工作流程。

了解如何实现管道使您能够：

- 构建你自己的外壳
- 动态连接进程
- 安全地实现进程间通信

#### 自己尝试一下

1. 重新创建`ls | grep c`使用两个`fork()`电话和一根管道。
2. 构建`cat file | wc -l`.
3. 实现一个“tee”程序，将输出复制到标准输出和文件。
4. 创建一个命名管道并从一个进程向其写入，从另一个进程读取。
5. 扩展外壳以支持任意长度的管道。

接下来，您将探索如何使用信号和信号处理程序相互处理信号和中断，这是处理中断、超时和优雅终止的关键概念。
