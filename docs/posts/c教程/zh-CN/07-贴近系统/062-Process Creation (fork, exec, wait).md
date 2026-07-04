---
title: "62. 进程创建（fork、exec、等待）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 62. 进程创建（fork、exec、等待）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 62
sidebarWeight: 62
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/062-Process Creation (fork, exec, wait)"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait)"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/062-Process Creation (fork, exec, wait))

类 Unix 系统中的每个程序都在进程内运行，进程是程序的运行实例，具有自己的内存、文件描述符和环境。当您输入时`ls`或者`cat`，shell 不只是“跳”到这些程序中。它创建一个新进程来运行它们。

在 C 中，您可以做完全相同的事情，创建新进程，运行其他程序并同步它们。

本节教您如何`fork()`,`exec()`， 和`wait()`过程控制的三个基本组成部分协同工作。

#### 步骤 1. 流程的想法

当您的程序启动时，它作为一个进程运行，其中：

- PID（进程ID），
- 自己的内存空间，
- 文件描述符（stdin、stdout、stderr）、
- 和环境变量。

你可以检查自己的PID：

```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    printf("My PID is %d\n", getpid());
    return 0;
}
```

编译并运行：

```
gcc pid.c -o pid
./pid
```

输出：

```
My PID is 5231
```

#### 步骤 2. 使用 fork() 创建新进程

`fork()`通过复制当前进程来创建一个新进程。

```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    pid_t pid = fork();
    if (pid < 0) {
        perror("fork failed");
        return 1;
    }
    if (pid == 0) {
        printf("Child process! PID = %d\n", getpid());
    } else {
        printf("Parent process! PID = %d, child PID = %d\n", getpid(), pid);
    }
    return 0;
}
```

编译并运行：

```
gcc fork_demo.c -o fork_demo
./fork_demo
```

输出示例：

```
Parent process! PID = 5231, child PID = 5232
Child process! PID = 5232
```

-`fork()`子进程中返回0
-`fork()`返回父进程中子进程的PID
- 两个进程从同一点继续执行

#### 步骤3.fork()后的独立内存

每个进程都会获取父进程内存的副本。更改子级中的变量不会影响父级。

```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    int counter = 0;
    pid_t pid = fork();
    if (pid == 0) {
        counter += 10;
        printf("Child counter: %d\n", counter);
    } else {
        counter += 1;
        printf("Parent counter: %d\n", counter);
    }
    return 0;
}
```

输出：

```
Parent counter: 1
Child counter: 10
```

每个进程都有自己的副本`counter`.

#### 步骤 4. 使用 exec() 替换进程映像

后`fork()`，孩子可以使用新程序替换自己`exec()`.

有多个版本：

-`execl(path, arg0, arg1, ..., NULL)`
-`execv(path, argv[])`
-`execlp(file, arg0, arg1, ..., NULL)`, 搜索`$PATH`
-`execvp(file, argv[])`, 最常用的

例子：

```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    printf("Before exec\n");
    execlp("ls", "ls", "-l", NULL);
    printf("This will not run if exec succeeds\n");
    return 0;
}
```

编译并运行：

```
gcc exec_demo.c -o exec_demo
./exec_demo
```

输出：

```
Before exec
(total listing from `ls`)
```

后`exec`，当前进程映像被替换，PID保持不变，但里面运行的程序发生了变化。

#### 步骤 5. 组合 fork() 和 exec()

这就是 shell 启动命令的方式。

```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        execlp("echo", "echo", "Hello from child", NULL);
        perror("exec failed");
    } else {
        printf("Parent is waiting...\n");
    }
    return 0;
}
```

输出：

```
Parent is waiting...
Hello from child
```

父分叉；孩子将自己替换为`echo`.

#### 步骤 6. 等待子进程（wait() 和 waitpid()）

父进程可以等待其子进程完成。

```
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child running\n");
        execlp("sleep", "sleep", "1", NULL);
    } else {
        printf("Parent waiting for child...\n");
        wait(NULL);
        printf("Child finished\n");
    }
    return 0;
}
```

编译并运行：

```
gcc wait_demo.c -o wait_demo
./wait_demo
```

输出：

```
Parent waiting for child...
Child running
Child finished
```

#### 步骤 7. 检查退出状态

您可以使用以下方式获取孩子的退出代码`waitpid()`.

```
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>
int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        _exit(42);  // child exits with status 42
    } else {
        int status;
        waitpid(pid, &status, 0);
        if (WIFEXITED(status))
            printf("Child exited with code %d\n", WEXITSTATUS(status));
    }
}
```

输出：

```
Child exited with code 42
```

#### 步骤 8. 多个孩子

您可以生成多个进程并等待它们全部：

```
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    for (int i = 0; i < 3; i++) {
        pid_t pid = fork();
        if (pid == 0) {
            printf("Child %d PID %d\n", i, getpid());
            _exit(0);
        }
    }
    for (int i = 0; i < 3; i++)
        wait(NULL);
    printf("All children done\n");
}
```

输出：

```
Child 0 PID 5321
Child 1 PID 5322
Child 2 PID 5323
All children done
```

#### 步骤 9. 孤儿进程和僵尸进程

如果家长不打电话`wait()`，子进程变成僵尸（已终止，但仍在进程表中）。如果父母在孩子之前终止，孩子就会成为孤儿并被收养`init`（PID 1）。

运行这个：

```
ps -l | grep Z
```

你会看到僵尸进程标有`Z`.

#### 小代码：最小的 Shell 启动器

```
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    char *argv[] = {"ls", "-1", NULL};
    pid_t pid = fork();
    if (pid == 0) {
        execvp(argv[0], argv);
        perror("exec failed");
    } else {
        wait(NULL);
        printf("Command finished\n");
    }
}
```

编译并运行：

```
gcc mini_shell.c -o mini_shell
./mini_shell
```

输出：

```
(file listing)
Command finished
```

#### 第 10 步：为什么它很重要

`fork()`,`exec()`， 和`wait()`形成了Unix的核心进程模型。每个命令行程序、守护进程和服务都在底层使用它们。

他们让你：

- 启动其他程序
- 建立并行工作人员
- 实现你自己的外壳
- 控制进程树和作业

一旦理解了这些，您就可以深入了解进程间通信，使您的进程通过管道和重定向进行通信。

#### 自己尝试一下

1. 编写一个程序，分叉两个子进程，其中一个运行`date`, 一个运行`whoami`.
2.修改为等待两个孩子都完成。
3. 创建一个程序，分叉一个子进程，但父进程立即退出（观察孤儿收养）。
4. 自己写`run(command)`函数使用`fork()`,`execvp()`， 和`waitpid()`.
5. 将所有这些组合到一个微型 shell 中，该 shell 接受命令并以交互方式执行它们。

接下来，您将在下一节中了解这些进程如何使用文件描述符、管道和重定向来通信和共享数据。
