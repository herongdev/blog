---
title: "69. 错误处理和返回代码"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 69. 错误处理和返回代码"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 69
sidebarWeight: 69
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/069-Error Handling and Return Codes"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/069-Error Handling and Return Codes"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/069-Error Handling and Return Codes)

每个 C 程序，从最小的脚本到 Linux 内核本身，都依赖于错误代码和返回值来传达成功或失败。与高级语言不同，C 没有例外，只有清晰、明确的状态代码和`errno`.

掌握这些模式将使您的程序健壮、可预测且专业。

#### 步骤 1. 退出代码和 main()

每个进程都会向操作系统返回一个整数退出代码。按照惯例：

-`0`→ 成功
- 非零 → 失败或特定错误

```
#include <stdio.h>
int main(void) {
    printf("Everything OK!\n");
    return 0; // exit success
}
```

在你的 shell 中检查它：

```
./program
echo $?
```

输出：

```
Everything OK!
0
```

如果返回非零值：

```
return 1;
```

然后`$?`将`1`，意味着失败。

#### 步骤 2. 使用 EXIT_SUCCESS 和 EXIT_FAILURE

使用标准宏代替硬编码数字`<stdlib.h>`:

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    printf("Failed to open file.\n");
    return EXIT_FAILURE;
}
```

这些提高了可移植性和可读性。

#### 步骤 3. 全局错误号

当库或系统调用失败时，它通常会设置一个名为的全局变量`errno`。它声明于`<errno.h>`.

```
#include <errno.h>
#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
int main(void) {
    int fd = open("nonexistent.txt", O_RDONLY);
    if (fd == -1) {
        printf("Error opening file: %s\n", strerror(errno));
    }
}
```

输出：

```
Error opening file: No such file or directory
```

`errno`存储一个整数代码，但是`strerror()`将其转换为可读的消息。

#### 步骤 4. 常见 errno 值

|代码|宏|意义|
| --- | --- | --- |
| 2 |`ENOENT`|没有这样的文件或目录 |
| 13 |`EACCES`|权限被拒绝 |
| 12 |`ENOMEM`|内存不足 |
| 22 |`EINVAL`|无效参数 |
| 9 |`EBADF`|错误的文件描述符 |
| 11 |`EAGAIN`|资源暂时不可用 |

您可以直接检查它们：

```
if (errno == EACCES) { ... }
```

#### 步骤 5. perror() 函数

打印错误消息的更简单方法是`perror()`，它会自动使用当前`errno`.

```
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
int main(void) {
    int fd = open("nothing.txt", O_RDONLY);
    if (fd == -1) {
        perror("open");
    }
}
```

输出：

```
open: No such file or directory
```

#### 步骤 6. 返回有意义的代码

好的 C 程序将内部错误转换为有意义的退出代码。

示例：文件复制程序

```
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s src dest\n", argv[0]);
        return 1;
    }
    FILE *src = fopen(argv[1], "r");
    if (!src) {
        perror("fopen src");
        return 2;
    }
    FILE *dst = fopen(argv[2], "w");
    if (!dst) {
        perror("fopen dst");
        fclose(src);
        return 3;
    }
    fclose(src);
    fclose(dst);
    return 0;
}
```

现在，每个退出代码代表一种特定类型的故障。

#### 步骤 7. 重置并检查 errno

一些系统调用设置`errno`只有当他们失败时。因此，如果您打算稍后检查它，请务必在使用前重置它：

```
#include <errno.h>
errno = 0;
if (some_syscall() == -1) {
    perror("syscall failed");
}
```

#### 步骤 8. 自定义错误处理助手

您可以创建自己的函数来简化错误处理。

```
#include <stdio.h>
#include <stdlib.h>
void die(const char *msg) {
    perror(msg);
    exit(EXIT_FAILURE);
}
int main(void) {
    FILE *f = fopen("no.txt", "r");
    if (!f) die("fopen");
}
```

输出：

```
fopen: No such file or directory
```

这种模式出现在整个 Unix 实用程序中。

#### 步骤 9. 处理部分故障

并非所有错误都应该中止您的程序。有时您应该记录、重试或忽略。

```
FILE *f = fopen("optional.conf", "r");
if (!f) {
    fprintf(stderr, "Warning: config file missing, using defaults.\n");
}
```

这种优雅的降级是很好的设计。

#### 步骤 10. 小代码：安全文件阅读器

```
#include <stdio.h>
#include <errno.h>
#include <string.h>
int main(void) {
    FILE *f = fopen("data.txt", "r");
    if (!f) {
        fprintf(stderr, "Error: %s\n", strerror(errno));
        return EXIT_FAILURE;
    }
    char buf[64];
    while (fgets(buf, sizeof(buf), f))
        printf("%s", buf);
    fclose(f);
    return EXIT_SUCCESS;
}
```

输出（如果缺少文件）：

```
Error: No such file or directory
```

#### 为什么它很重要

错误处理将玩具程序与真实软件分开：

- 每个系统调用都可能失败，请做好准备。
- 始终检查返回值。
- 始终报告失败的原因。

按照惯例：

- 返回`0`关于成功。
- 对于可恢复或致命错误返回非零值。
- 打印消息至`stderr`， 不是`stdout`.

#### 自己尝试一下

1. 打开一个不存在的文件并打印完整的文件`errno`价值。
2. 构建一个小型实用程序，为特定问题返回特定代码。
3. 使用`perror()`与`strerror()`并比较他们的输出。
4. 添加一个`die()`帮助你之前的练习。
5. 编写一个安全包装器，在以下情况下重试系统调用：`errno == EAGAIN`.

接下来，您将在练习 70：用 C 语言构建 Mini Shell 中将所有这些内容放在一起，其中您将处理进程、管道和信号以创建您自己的工作 Unix shell 原型。
