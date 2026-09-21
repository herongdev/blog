---
title: "46. 使用 errno 和 perror 进行错误检查"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 46. 使用 errno 和 perror 进行错误检查"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 46
sidebarWeight: 46
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/046-Error Checking with errno and perror"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/046-Error Checking with errno and perror"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/046-Error Checking with errno and perror)

即使写得最好的 C 程序也可能会遇到错误、文件丢失、权限问题、被零除或内存分配失败。与某些引发异常的语言不同，C 使用返回值和名为的全局变量手动报告错误`errno`.

了解如何使用`errno`,`perror()`， 和`strerror()`对于编写能够优雅且信息丰富地失败的健壮的生产级 C 程序至关重要。

#### errno 背后的想法

`errno`是一个全局整数（在`<errno.h>`）每当库函数失败时存储错误代码。

- 成功后，大多数功能都会离开`errno`不变。
- 一旦失败，他们通常会设置`errno`并返回一个错误值（通常`NULL`,`-1`， 或者`0`取决于功能）。
- 必须先检查返回值，然后才应该检查`errno`.

例子：

```
#include <stdio.h>
#include <errno.h>
int main(void) {
    FILE *fp = fopen("missing.txt", "r");
    if (!fp) {
        printf("Error code: %d\n", errno);
        perror("fopen failed");
    }
    return 0;
}
```

输出：

```
Error code: 2
fopen failed: No such file or directory
```

#### 常见错误代码

|代码|名称 |意义|
| --- | --- | --- |
| 2 |`ENOENT`|没有这样的文件或目录 |
| 13 |`EACCES`|权限被拒绝 |
| 12 |`ENOMEM`|内存不够|
| 22 |`EINVAL`|无效参数 |
| 17 |`EEXIST`|文件已存在 |
| 5 |`EIO`|输入/输出错误 |
| 111 |`ECONNREFUSED`|连接被拒绝（网络）|

包括`<errno.h>`使用这些符号名称：

```
if (errno == ENOENT) printf("File missing.\n");
```

#### 使用 perror()

`perror()`打印一条人类可读的错误消息`stderr`，基于当前值`errno`.

```
perror("File open error");
```

例子：

```
#include <stdio.h>
#include <errno.h>
int main(void) {
    FILE *f = fopen("ghost.txt", "r");
    if (!f)
        perror("Unable to open file");
    return 0;
}
```

输出：

```
Unable to open file: No such file or directory
```

#### 使用 strerror()

如果您想在自己的格式化输出中使用错误消息，请使用`strerror()`从`<string.h>`:

```
#include <stdio.h>
#include <string.h>
#include <errno.h>
int main(void) {
    FILE *f = fopen("/root/secret.txt", "r");
    if (!f)
        printf("Error (%d): %s\n", errno, strerror(errno));
    return 0;
}
```

输出：

```
Error (13): Permission denied
```

#### 小代码：强大的文件阅读器

这是一个简单的文件读取器，可以在每一步检查错误：

```
#include <stdio.h>
#include <string.h>
#include <errno.h>
int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return 1;
    }
    FILE *fp = fopen(argv[1], "r");
    if (!fp) {
        fprintf(stderr, "Error opening %s: %s\n", argv[1], strerror(errno));
        return 1;
    }
    char buf[128];
    while (fgets(buf, sizeof(buf), fp))
        printf("%s", buf);
    if (ferror(fp)) {
        fprintf(stderr, "Error reading file: %s\n", strerror(errno));
    }
    fclose(fp);
    return 0;
}
```

用法：

```
./readfile poem.txt
```

如果文件丢失：

```
Error opening poem.txt: No such file or directory
```

#### 清除并重置errno

某些功能可以设置`errno`即使他们后来成功了。为了安全起见，您可以在调用之前清除它：

```
#include <errno.h>
errno = 0;
FILE *f = fopen("file.txt", "r");
if (!f) perror("fopen");
```

这可确保您不会读取先前操作中遗留的错误。

#### 检查其他系统错误

`errno`不限于文件 I/O，它适用于许多系统调用和库函数：

```
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
int main(void) {
    FILE *f = fopen("/dev/full", "w"); // special Linux device that fails on write
    if (f) {
        if (fputc('A', f) == EOF)
            perror("Write failed");
        fclose(f);
    }
    return 0;
}
```

输出：

```
Write failed: No space left on device
```

#### 为什么它很重要

`errno`及其助手（`perror`,`strerror`）让你的程序在出现问题时能够自我解释。这对于以下方面至关重要：

- 必须报告特定错误原因的系统工具
- 调试生产代码
- 编写可移植、可维护的程序

优秀的 C 开发人员绝不会“默默地失败”。

#### 自己尝试一下

1. 打开一个不存在的文件，然后创建它并重试。
2. 使用以下命令模拟读取错误`ferror()`读取关闭的文件后。
3. 尝试写入目录（`fopen("/tmp", "w")`）并检查`errno`.
4. 使用循环打印所有已知的错误代码和消息`strerror()`.
5. 编写一个小的“safe_open”函数来包装`fopen`与错误报告。

掌握错误处理后，您现在知道如何使 C 程序既丰富又可靠。接下来，您将探索命令行参数（`argc`,`argv`），构建灵活的、可编写脚本的工具来动态处理用户输入的门户。
