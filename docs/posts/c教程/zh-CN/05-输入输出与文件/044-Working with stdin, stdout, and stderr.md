---
title: "44. 使用 stdin、stdout 和 stderr"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 44. 使用 stdin、stdout 和 stderr"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 44
sidebarWeight: 44
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/044-Working with stdin, stdout, and stderr"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/044-Working with stdin, stdout, and stderr"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/044-Working with stdin, stdout, and stderr)

每个 C 程序都会自动启动并连接到您的环境、键盘、终端屏幕和错误控制台的三个开放流。它们是标准 I/O 流，使您的程序灵活且可编写脚本。

理解这三个流对于编写可以与文件、管道和其他程序交互的工具至关重要，这也是 Unix 风格设计的本质。

#### 三种标准流

|流 |目的|典型器件|使用示例 |
| --- | --- | --- | --- |
|`stdin`|标准输入|键盘（或通过文件`<`) |`scanf`,`fgets`|
|`stdout`|标准输出|屏幕（或文件通过`>`) |`printf`,`puts`,`fprintf(stdout, …)`|
|`stderr`|标准错误|屏幕（与标准输出分开）|`fprintf(stderr, …)`|

这些都是类型`FILE *`。您可以将它们视为普通文件指针，读取、写入或重定向它们。

#### 基本示例

```
#include <stdio.h>
int main(void) {
    char name[50];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    fprintf(stdout, "Hello, %s", name);
    fprintf(stderr, "Note: This is an example error message.\n");
    return 0;
}
```

输出：

```
Enter your name: Alice
Hello, Alice
Note: This is an example error message.
```

#### Shell 中的重定向

您可以分别重定向每个流：

```
./program < input.txt > output.txt 2> errors.log
```

-`<`取代`stdin`（从文件读取输入）
-`>`取代`stdout`（将正常输出写入文件）
-`2>`取代`stderr`（将错误写入文件）

您还可以将它们组合起来：

```
./program > all_output.txt 2>&1
```

这会将输出流和错误流合并到一个文件中。

#### 从标准输入读取

您可以构建动态处理输入的程序，一次一行：

```
#include <stdio.h>
int main(void) {
    char line[100];
    printf("Enter text (Ctrl+D to stop):\n");
    while (fgets(line, sizeof(line), stdin))
        printf("You said: %s", line);
    return 0;
}
```

现在你的程序的行为就像一个 Unix 过滤器，它可以交替地从文件、管道或键盘输入中读取。

例子：

```
echo "hello" | ./program
```

输出：

```
You said: hello
```

#### 写入 stdout 和 stderr

`stdout`用于正常程序输出，而`stderr`用于错误消息或日志。

```
#include <stdio.h>
int main(void) {
    fprintf(stdout, "Everything is fine.\n");
    fprintf(stderr, "Warning: something might be wrong.\n");
    return 0;
}
```

您可以抑制正常输出但保留错误：

```
./program > /dev/null
```

输出：

```
Warning: something might be wrong.
```

#### 小代码：使用 stdin/stdout 的字计数器

这个小程序模仿了 Unix 的简化版本`wc`命令。

```
#include <stdio.h>
#include <ctype.h>
int main(void) {
    int ch, words = 0, in_word = 0;
    while ((ch = getchar()) != EOF) {
        if (isspace(ch))
            in_word = 0;
        else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    printf("Word count: %d\n", words);
    return 0;
}
```

尝试：

```
echo "C is small but powerful" | ./wordcount
```

输出：

```
Word count: 4
```

#### 混合标准输出和标准错误

有时您需要将进度记录到`stderr`同时将结果输出到`stdout`。这样，日志就不会污染实际数据。

```
#include <stdio.h>
int main(void) {
    for (int i = 0; i < 3; i++) {
        fprintf(stderr, "Processing item %d...\n", i + 1);
        fprintf(stdout, "Item %d processed\n", i + 1);
    }
    return 0;
}
```

单独重定向日志：

```
./program > result.txt 2> log.txt
```

#### 冲洗缓冲器

输出流被缓冲，直到缓冲区已满或刷新时才会写入数据。为了确保输出立即出现：

```
fflush(stdout);  // flush output buffer
```

这对于交互式程序很有用。

#### 为什么它很重要

这三个流为您的程序提供了灵活性：

- 交互式工作（键盘/屏幕）
- 批量工作（文件输入/输出）
- 使用管道与其他工具连锁

它们是 Unix 哲学的基础：做好一件事并且可以组合在一起的小程序。

#### 自己尝试一下

1. 编写一个从 stdin 读取并仅打印包含给定关键字的行的程序。
2. 如果未提供关键字，则将错误打印到 stderr。
3. 使用重定向文件的输入和输出`<`和`>`.
4. 将进度消息添加到 stderr 并将其重定向到单独的日志。
5. 将所有内容组合成一个小型“过滤器”工具，用于处理来自管道的文本。

和`stdin`,`stdout`， 和`stderr`，您的 C 程序成为无缝融入实际工作流程的工具，能够与文件、其他程序和用户等进行交互。接下来，您将探索缓冲 I/O，了解 C 库如何使用读取和写入缓冲区来优化性能`fgets`,`fputs`，等等。
