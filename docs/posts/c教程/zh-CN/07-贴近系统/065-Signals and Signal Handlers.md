---
title: "65. 信号和信号处理程序"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 65. 信号和信号处理程序"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 65
sidebarWeight: 65
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/065-Signals and Signal Handlers"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers)

当您按下 Ctrl+C 并且程序停止时，这不是魔法，而是一个信号。信号是操作系统如何告诉您的进程发生了一些重要的事情。

它们是来自内核或其他进程的异步轻量级消息。您的 C 程序可以捕获、忽略或处理它们，从而使您可以完全控制关闭、中断和错误。

#### 步骤 1. 什么是信号？

信号是发送到进程以通知其事件的整数代码。

|信号|意义|默认操作 |
| --- | --- | --- |
|`SIGINT`|中断 (Ctrl+C) |终止 |
|`SIGTERM`|终止请求 |终止 |
|`SIGKILL`|强行击杀（抓不到）|立即终止 |
|`SIGSEGV`|无效的内存访问 |核心转储|
|`SIGCHLD`|子进程退出 |忽略或处理 |
|`SIGALRM`|计时器到期 |终止 |
|`SIGUSR1`,`SIGUSR2`|用户定义 |终止（除非处理）|

您可以列出所有信号：

```
kill -l
```

输出示例：

```
1) SIGHUP  2) SIGINT  3) SIGQUIT  9) SIGKILL  15) SIGTERM  ...
```

#### 步骤 2. 发送信号

任何进程都可以使用以下命令向另一个进程发送信号`kill()`系统调用。

```
#include <signal.h>
#include <unistd.h>
#include <stdio.h>
int main(void) {
    pid_t pid = getpid();
    printf("My PID: %d\n", pid);
    pause();  // wait for signal
}
```

在一个终端中运行此命令：

```
./signal_wait
```

然后在另一个：

```
kill -SIGUSR1 <pid>
```

该程序将从中唤醒`pause()`并终止（SIGUSR1 的默认行为）。

#### 步骤 3. 安装信号处理程序

您可以通过安装处理程序函数来覆盖默认操作。

```
#include <signal.h>
#include <stdio.h>
#include <unistd.h>
void handle_sigint(int sig) {
    printf("\nCaught signal %d (SIGINT). Exiting gracefully.\n", sig);
    _exit(0);
}
int main(void) {
    signal(SIGINT, handle_sigint);
    while (1) {
        printf("Running... Press Ctrl+C to stop.\n");
        sleep(1);
    }
}
```

编译并运行：

```
gcc sigint_demo.c -o sigint_demo
./sigint_demo
```

输出：

```
Running... Press Ctrl+C to stop.
Running... Press Ctrl+C to stop.
^C
Caught signal 2 (SIGINT). Exiting gracefully.
```

#### 步骤 4. 使用 sigaction()（现代 API）

`signal()`简单但跨系统不一致。推荐的现代界面是`sigaction()`.

```
#include <signal.h>
#include <stdio.h>
#include <unistd.h>
void handler(int sig) {
    write(STDOUT_FILENO, "Caught signal\n", 14);
}
int main(void) {
    struct sigaction sa = {0};
    sa.sa_handler = handler;
    sigaction(SIGUSR1, &sa, NULL);
    printf("PID: %d\n", getpid());
    while (1) pause();
}
```

发送信号：

```
kill -SIGUSR1 <pid>
```

输出：

```
Caught signal
```

不像`signal()`，这个版本是可靠且可重入安全的（您只能调用异步安全函数，例如`write()`内部处理程序）。

#### 步骤 5. 忽略并重置信号

您可以忽略信号：

```
signal(SIGINT, SIG_IGN);
```

或者重置为默认行为：

```
signal(SIGINT, SIG_DFL);
```

如果您不希望 Ctrl+C 中断代码的某些部分，这会很有用。

#### 步骤 6. 向其他进程发送信号

示例：父母向其孩子发出信号。

```
#include <signal.h>
#include <unistd.h>
#include <stdio.h>
void child_handler(int sig) {
    printf("Child got signal %d\n", sig);
}
int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        signal(SIGUSR1, child_handler);
        while (1) pause();
    } else {
        sleep(1);
        printf("Parent sending SIGUSR1\n");
        kill(pid, SIGUSR1);
        sleep(1);
        kill(pid, SIGTERM);
    }
}
```

输出：

```
Parent sending SIGUSR1
Child got signal 10
```

#### 步骤 7. 阻塞和解除阻塞信号

有时您想延迟信号处理。您可以使用`sigprocmask()`暂时阻止信号。

```
#include <signal.h>
#include <stdio.h>
#include <unistd.h>
int main(void) {
    sigset_t set;
    sigemptyset(&set);
    sigaddset(&set, SIGINT);
    sigprocmask(SIG_BLOCK, &set, NULL);
    printf("SIGINT blocked for 5 seconds...\n");
    sleep(5);
    printf("Unblocking now.\n");
    sigprocmask(SIG_UNBLOCK, &set, NULL);
    while (1) pause();
}
```

在块期间按 Ctrl+C，没有任何反应。一旦解除阻塞，它就会正常终止。

#### 步骤 8.带有alarm()和SIGALRM的定时器

您可以设置一个计时器，在延迟后发送信号。

```
#include <unistd.h>
#include <signal.h>
#include <stdio.h>
void handler(int sig) {
    printf("Timer expired!\n");
}
int main(void) {
    signal(SIGALRM, handler);
    alarm(3);  // after 3 seconds, send SIGALRM
    printf("Waiting...\n");
    pause();
}
```

输出：

```
Waiting...
Timer expired!
```

#### 步骤 9. 退出时清理

信号可让您实现优雅的清理（例如，关闭文件、删除临时文件）。

```
#include <signal.h>
#include <stdio.h>
#include <unistd.h>
void cleanup(int sig) {
    printf("\nCleaning up before exit...\n");
    unlink("tempfile.tmp");
    _exit(0);
}
int main(void) {
    signal(SIGINT, cleanup);
    open("tempfile.tmp", O_CREAT | O_WRONLY, 0644);
    while (1) {
        printf("Running... (Ctrl+C to exit)\n");
        sleep(1);
    }
}
```

现在按 Ctrl+C 可以安全地删除临时文件。

#### 小代码：优雅关闭服务器

```
#include <signal.h>
#include <stdio.h>
#include <unistd.h>
volatile sig_atomic_t running = 1;
void stop(int sig) {
    running = 0;
}
int main(void) {
    signal(SIGINT, stop);
    printf("Server running. Press Ctrl+C to stop.\n");
    while (running) {
        printf("Handling request...\n");
        sleep(1);
    }
    printf("Server shutting down cleanly.\n");
}
```

#### 第 10 步：为什么它很重要

信号对于以下方面至关重要：

- 优雅终止（Ctrl+C）
- 超时和警报
- 子进程监控（`SIGCHLD`)
- 错误处理（分段错误）
- 守护进程和服务器控制

每个现实世界的 Unix 程序，从编辑器到 Web 服务器，都依赖于正确的信号处理来保证稳定性。

#### 自己尝试一下

1. 编写一个程序，忽略 SIGINT 5 秒钟，然后恢复默认行为。
2. 捕获 SIGTERM 并打印“Termination requests”。
3. 让父进程每秒向其子进程发送 SIGUSR1。
4. 使用`alarm()`实现用户输入超时。
5. 在 shell 中添加一个信号处理程序，以便在退出前清理子进程。

接下来，您将学习程序如何直接共享和映射内存，使用`mmap()`，一个为数据库、共享内存和文件支持的数据结构提供支持的系统调用。
