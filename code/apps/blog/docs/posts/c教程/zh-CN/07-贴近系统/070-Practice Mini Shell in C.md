---
title: "70. 练习：C 语言的迷你 Shell"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 70. 练习：C 语言的迷你 Shell"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "70"
sidebarWeight: "70"
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/070-Practice Mini Shell in C"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C)

#### 跟练交付物

- 已具备状态：完成第 061-069 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/070-mini-shell`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/070-mini-shell && cd ~/c-course-labs/070-mini-shell`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\070-mini-shell"; Set-Location "$HOME\c-course-labs\070-mini-shell"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录`pwd` / `echo` / 一条管道或重定向命令的运行记录。
- 本章边界：本章做一个可观察的 Shell 原型；暂不要求 job control、完整脚本语言或生产级安全沙箱。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

是时候将您迄今为止学到的所有内容（系统调用、进程创建、管道、重定向和信号处理）整合到一个有凝聚力的项目中了。

在本节中，您将构建一个最小的交互式 shell，就像`bash`或者`zsh`，但精简到必需品。它将运行命令、处理输入/输出重定向，甚至支持管道。

#### 第 1 步：您将构建什么

您的迷你外壳将：

1. 显示如下提示`$`
2. 读取用户输入（例如，`ls -l`,`cat file.txt`)
3. 将其解析为命令和参数
4. 使用创建一个新进程`fork()`
5. 使用请求的命令替换过程映像`execvp()`
6.等待孩子说完

可选扩展：

- 优雅地处理信号 (Ctrl+C)
- 将输出重定向到文件（`>`重定向）
- 使用管道链接命令（`|`)

#### 步骤 2. 核心循环骨架

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#define MAX 1024
int main(void) {
    char input[MAX];
    while (1) {
        printf("$ ");
        fflush(stdout);
        if (!fgets(input, sizeof(input), stdin))
            break;
        // Remove newline
        input[strcspn(input, "\n")] = 0;
        // Exit command
        if (strcmp(input, "exit") == 0)
            break;
        // Tokenize input
        char *args[64];
        int i = 0;
        char *token = strtok(input, " ");
        while (token) {
            args[i++] = token;
            token = strtok(NULL, " ");
        }
        args[i] = NULL;
        // Fork and execute
        pid_t pid = fork();
        if (pid == 0) {
            execvp(args[0], args);
            perror("execvp");
            exit(1);
        } else if (pid > 0) {
            wait(NULL);
        } else {
            perror("fork");
        }
    }
    printf("Goodbye!\n");
    return 0;
}
```

编译并运行：

```
gcc mini_shell.c -o mini_shell
./mini_shell
```

尝试命令：

```
$ ls
$ pwd
$ echo hello world
$ exit
```

#### 步骤 3. 优雅地处理错误

如果输入错误的命令：

```
$ xyz
```

输出：

```
execvp: No such file or directory
```

发生这种情况是因为程序处理`execvp()`正确失败`perror()`，正如您在第 69 节中学到的那样。

#### 步骤 4. 添加信号处理

让我们让 Ctrl+C 停止正在运行的命令，但不终止 shell 本身。

```
#include <signal.h>
void sigint_handler(int sig) {
    printf("\nType 'exit' to quit.\n$ ");
    fflush(stdout);
}
int main(void) {
    signal(SIGINT, sigint_handler);
    ...
}
```

现在，shell 在等待输入时会忽略 Ctrl+C，而不是终止。

#### 步骤 5. 支持输出重定向

我们将添加`>`重定向如：

```
$ echo Hello > out.txt
```

在之前添加此内容`execvp()`把孩子叫进来：

```
#include <fcntl.h>
for (int j = 0; args[j]; j++) {
    if (strcmp(args[j], ">") == 0) {
        args[j] = NULL;
        int fd = open(args[j + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
        dup2(fd, STDOUT_FILENO);
        close(fd);
        break;
    }
}
```

现在`stdout`命令的内容将转到文件而不是屏幕。

#### 步骤 6. 支持输入重定向

同样，对于`<`重定向：

```
$ cat < in.txt
```

添加：

```
if (strcmp(args[j], "<") == 0) {
    args[j] = NULL;
    int fd = open(args[j + 1], O_RDONLY);
    dup2(fd, STDIN_FILENO);
    close(fd);
    break;
}
```

#### 步骤 7. 添加管道支撑

处理如下命令：

```
$ ls | wc -l
```

我们创建两个通过管道连接的进程。

```
int pipefd[2];
pipe(pipefd);
pid_t p1 = fork();
if (p1 == 0) {
    dup2(pipefd[1], STDOUT_FILENO);
    close(pipefd[0]);
    execlp("ls", "ls", NULL);
}
pid_t p2 = fork();
if (p2 == 0) {
    dup2(pipefd[0], STDIN_FILENO);
    close(pipefd[1]);
    execlp("wc", "wc", "-l", NULL);
}
close(pipefd[0]);
close(pipefd[1]);
wait(NULL);
wait(NULL);
```

这与您在第 64 节中看到的模式相同，`ls | wc -l`.

#### 步骤 8. 组合所有功能

现在你的外壳：

- 解析用户输入
- 产生子进程
- 处理 I/O 重定向
- 支持Ctrl+C中断
- 运行简单的管道

只需大约 150 行代码，您就拥有了一个可用的 Unix shell 原型。

#### 步骤 9. 小代码：完整的迷你 Shell

这是干净、最小的版本：

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <signal.h>
void sigint_handler(int sig) {
    printf("\n$ ");
    fflush(stdout);
}
int main(void) {
    signal(SIGINT, sigint_handler);
    char input[1024];
    while (1) {
        printf("$ ");
        fflush(stdout);
        if (!fgets(input, sizeof(input), stdin)) break;
        input[strcspn(input, "\n")] = 0;
        if (strcmp(input, "exit") == 0) break;
        char *args[64];
        int i = 0;
        char *token = strtok(input, " ");
        while (token) {
            args[i++] = token;
            token = strtok(NULL, " ");
        }
        args[i] = NULL;
        pid_t pid = fork();
        if (pid == 0) {
            for (int j = 0; args[j]; j++) {
                if (strcmp(args[j], ">") == 0) {
                    int fd = open(args[j + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
                    dup2(fd, STDOUT_FILENO);
                    close(fd);
                    args[j] = NULL;
                } else if (strcmp(args[j], "<") == 0) {
                    int fd = open(args[j + 1], O_RDONLY);
                    dup2(fd, STDIN_FILENO);
                    close(fd);
                    args[j] = NULL;
                }
            }
            execvp(args[0], args);
            perror("execvp");
            exit(1);
        } else if (pid > 0) {
            wait(NULL);
        }
    }
    printf("Exiting shell.\n");
    return 0;
}
```

尝试一下，这是一个真正的交互式 shell。

#### 第 10 步：为什么它很重要

本练习结合了您在第 7 章中学到的所有内容：

- 系统调用（`fork`,`exec`,`wait`,`pipe`,`dup2`)
- 信号（`SIGINT`)
- 文件描述符和重定向
- 错误处理`errno`
- 环境继承

您刚刚构建了一个为每个 Unix shell 提供支持的核心的简化版本，从`bash`到`zsh`到`fish`.

#### 自己尝试一下

1.添加对管道的支持（`|`）通过链接多个命令。
2. 实现后台进程`&`.
3.添加`cd`和`pwd`作为内置命令。
4. 在每个命令后显示退出代码。
5. 处理多个空格和带引号的参数。

接下来，我们将进入第 8 章：调试、测试和分析，从 gdb 开始，它是您理解和修复 C 程序最强大的盟友。
