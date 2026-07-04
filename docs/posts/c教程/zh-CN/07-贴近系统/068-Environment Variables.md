---
title: "68. 环境变量"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 68. 环境变量"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 68
sidebarWeight: 68
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/068-Environment Variables"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/068-Environment Variables"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/068-Environment Variables)

Unix 中的每个程序都会继承一组称为环境变量的键值对。它们存储有关您的 shell、系统配置和运行时行为的信息，例如您的用户名、主目录和编译器路径。

C 使您能够完全控制直接读取、修改和定义这些变量。

#### 步骤 1. 什么是环境变量？

环境变量是以下形式的字符串：

```
KEY=VALUE
```

您可以在 shell 中查看它们：

```
printenv
```

常见示例：

```
HOME=/home/user
PATH=/usr/local/bin:/usr/bin:/bin
USER=alice
LANG=en_US.UTF-8
SHELL=/bin/bash
```

当您运行每个程序时，这些值将传递给每个程序。

#### 步骤 2. 在 C 中访问环境变量

可以使用标准库函数`getenv()`读取变量。

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    const char *path = getenv("PATH");
    if (path)
        printf("PATH = %s\n", path);
    else
        printf("PATH not found.\n");
}
```

输出示例：

```
PATH = /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

如果变量不存在，`getenv()`回报`NULL`.

#### 步骤3.设置环境变量

要定义或更改程序内的变量，请使用`setenv()`.

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    setenv("GREETING", "Hello from C!", 1);
    printf("%s\n", getenv("GREETING"));
}
```

`setenv(name, value, overwrite)`

-`overwrite = 0`：不要覆盖现有变量。
-`overwrite = 1`: 如果存在则替换它。

输出：

```
Hello from C!
```

#### 步骤 4. 删除环境变量

使用`unsetenv()`删除变量。

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    setenv("TEMPVAR", "temporary", 1);
    printf("Before unset: %s\n", getenv("TEMPVAR"));
    unsetenv("TEMPVAR");
    printf("After unset: %s\n", getenv("TEMPVAR"));
}
```

输出：

```
Before unset: temporary
After unset: (null)
```

#### 步骤 5. 访问所有环境变量

这`environ`全局变量使您可以访问整个环境列表。

```
#include <stdio.h>
extern char **environ;
int main(void) {
    for (char **env = environ; *env != NULL; env++) {
        printf("%s\n", *env);
    }
}
```

这将打印进程中当前活动的所有环境变量。

#### 步骤 6. 将环境变量传递给子进程

当你使用`fork()`和`exec()`，环境变量由子进程自动继承。

```
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    setenv("HELLO", "world", 1);
    execlp("printenv", "printenv", "HELLO", NULL);
    perror("execlp");
}
```

输出：

```
world
```

您还可以使用提供自定义环境列表`execle()`或者`execve()`.

#### 步骤 7. 新程序的自定义环境

```
#include <unistd.h>
#include <stdio.h>
int main(void) {
    char *newenv[] = { "MODE=debug", "VERSION=1.0", NULL };
    execle("/usr/bin/env", "env", NULL, newenv);
    perror("execle");
}
```

输出：

```
MODE=debug
VERSION=1.0
```

新进程只存在这两个变量，其他所有变量都被丢弃。

#### 步骤 8. 为什么环境变量很重要

它们是 Unix 设计理念的关键部分：

- 程序应该可以配置而无需重新编译。
- 环境变量提供全局、进程级配置。

例如：

-`PATH`控制搜索可执行文件的位置。
-`HOME`定义用户目录。
-`LANG`定义区域设置。
-`LD_LIBRARY_PATH`控制动态链接。

#### 步骤 9. 安全注意事项

环境变量是自动继承的，因此如果不小心处理它们可能会带来安全风险：

- 避免信任环境变量进行身份验证。
- 始终验证`PATH`,`HOME`， 和`TMPDIR`.
- 使用`unsetenv()`对于敏感上下文（例如 setuid 程序）。

#### 小代码：带有路径查找的迷你 Shell

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    const char *path = getenv("PATH");
    if (!path) path = "(none)";
    printf("Current PATH:\n%s\n", path);
    setenv("PATH", "/usr/local/bin:/usr/bin", 1);
    printf("\nUpdated PATH:\n%s\n", getenv("PATH"));
}
```

输出：

```
当前路径：
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

更新的路径：
/usr/local/bin:/usr/bin
```

#### 第 10 步：为什么它很重要

环境变量为您的程序提供上下文：

- 它们告诉您文件、库和配置的位置。
- 它们让您动态控制运行时行为。
- 它们对于系统工具、shell、守护进程和测试至关重要。

了解如何读取和修改它们是掌握 C 语言 Unix 编程的关键。

#### 自己尝试一下

1. 按字母顺序打印所有环境变量。
2. 实现你自己的`env`C 中的命令。
3.编写程序修改`PATH`并启动另一个程序。
4. 创建继承修改变量的子进程。
5. 结合`setenv()`,`execle()`， 和`getenv()`模拟沙盒运行。

接下来，您将了解错误处理和返回代码，这是每个 Unix 进程用来告诉系统它是成功还是失败的不可见信号。
