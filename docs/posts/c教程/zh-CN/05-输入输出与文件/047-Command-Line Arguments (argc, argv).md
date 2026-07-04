---
title: "47. 命令行参数（argc、argv）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 47. 命令行参数（argc、argv）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 47
sidebarWeight: 47
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/047-Command-Line Arguments (argc, argv)"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/047-Command-Line Arguments (argc, argv)"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/047-Command-Line Arguments (argc, argv))

每个C程序都可以直接从命令行接收输入，不`scanf`， 不`fgets`，只是运行可执行文件时传递的参数。这就是专业的 C 工具（例如`gcc`,`ls`， 和`grep`) 接收文件名、选项和标志。

#### 函数签名

你的`main`函数可以带两个参数：

```
int main(int argc, char *argv[])
```

|参数|意义|
| --- | --- |
|`argc`|参数计数（命令行参数的数量）|
|`argv`|参数向量（C 字符串数组，每个参数）|

`argv[0]`是程序名称本身，并且`argv[1]`接下来是用户提供的参数。

例子：

```
./hello world test
```

然后：

-`argc == 3`
-`argv[0] = "./hello"`
-`argv[1] = "world"`
-`argv[2] = "test"`

#### 小代码：打印命令行参数

```
#include <stdio.h>
int main(int argc, char *argv[]) {
    printf("Argument count: %d\n", argc);
    for (int i = 0; i < argc; i++)
        printf("argv[%d] = %s\n", i, argv[i]);
    return 0;
}
```

运行它：

```
./args foo bar 123
```

输出：

```
Argument count: 4
argv[0] = ./args
argv[1] = foo
argv[2] = bar
argv[3] = 123
```

#### 检查是否缺少参数

如果您的程序需要参数，请检查`argc`在访问它们之前。

```
#include <stdio.h>
int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return 1;
    }
    printf("Opening file: %s\n", argv[1]);
    return 0;
}
```

运行它：

```
./fileop
```

输出：

```
Usage: ./fileop <filename>
```

再次运行：

```
./fileop data.txt
```

输出：

```
Opening file: data.txt
```

#### 将字符串参数转换为数字

所有命令行参数都是字符串。要将它们用作数字，请使用以下命令进行转换：

-`atoi()`– 字符串转整数
-`atof()`– 浮动字符串
-`strtol()`/`strtod()`– 更安全、更灵活的替代方案

例子：

```
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <a> <b>\n", argv[0]);
        return 1;
    }
    int a = atoi(argv[1]);
    int b = atoi(argv[2]);
    printf("%d + %d = %d\n", a, b, a + b);
    return 0;
}
```

跑步：

```
./sum 10 25
```

输出：

```
10 + 25 = 35
```

#### 处理选项（标志）

您可以构建简单的命令行工具来手动处理选项：

```
#include <stdio.h>
#include <string.h>
int main(int argc, char *argv[]) {
    int verbose = 0;
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-v") == 0)
            verbose = 1;
    }
    if (verbose)
        printf("Verbose mode on\n");
    else
        printf("Run quietly\n");
    return 0;
}
```

跑步：

```
./tool -v
```

输出：

```
Verbose mode on
```

#### Tiny Code：迷你文件回显工具

该程序打印作为参数传递的文件的内容：

```
#include <stdio.h>
int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <file>\n", argv[0]);
        return 1;
    }
    FILE *fp = fopen(argv[1], "r");
    if (!fp) {
        perror("Error");
        return 1;
    }
    char buf[128];
    while (fgets(buf, sizeof(buf), fp))
        printf("%s", buf);
    fclose(fp);
    return 0;
}
```

跑步：

```
./echo mytext.txt
```

#### 为什么它很重要

`argc`和`argv`使您的 C 程序可编写脚本且可组合：

- 从命令行自动执行任务
- 与 shell 脚本或管道集成
- 处理多个输入文件
- 实施命令行标志和选项

每个现实世界的 C 实用程序，来自`ls`到`gcc`，取决于此模式。

#### 自己尝试一下

编写一个程序，获取整数列表并打印它们的总和。

添加一个`-r`标志来反转打印参数的顺序。

构建一个“问候”工具：

```
./greet Alice Bob Charlie
```

→`Hello, Alice! Hello, Bob! Hello, Charlie!`

编写一个“比较”工具来检查两个文件名是否相同。

结合`argc`和文件 I/O：将一个文件复制到另一个文件

```
./copy source.txt dest.txt
```

通过命令行参数，您的 C 程序可以从静态练习发展为灵活的实际工具。接下来，您将探索读取配置文件，这是一种让您的程序自动适应而无需重新编译的强大方法。
