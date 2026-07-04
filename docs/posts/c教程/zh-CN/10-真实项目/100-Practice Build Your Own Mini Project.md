---
title: "100. 练习：构建自己的迷你项目"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 100. 练习：构建自己的迷你项目"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "100"
sidebarWeight: "100"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/100-Practice Build Your Own Mini Project"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/100-Practice Build Your Own Mini Project"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/100-Practice Build Your Own Mini Project)

#### 跟练交付物

- 已具备状态：完成第 001-099 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/100-tinynotes`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/100-tinynotes && cd ~/c-course-labs/100-tinynotes`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\100-tinynotes"; Set-Location "$HOME\c-course-labs\100-tinynotes"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录`add` / `list` / `clear` 输出、生成的数据文件、README、Makefile 和版本标签。
- 本章边界：本章把前面的能力收束成可交付工具；不要一开始就做数据库、加密、网络同步，先让最小版本稳定运行。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

您已经了解了 C 的所有基本层、语法、内存、数据结构、文件 I/O、编译、调试，甚至打包。现在，您将通过从头开始构建一个完整的迷你项目来将所有内容整合在一起。

最后一部分是一个综合：用纯 C 语言规划、设计、实现、测试和记录一个小型的、有用的系统。

#### 步骤 1. 选择您的项目范围

选择足够小的内容来完成但足够丰富的内容来触及多个主题。这里有三个不错的选择：

选项 A：微型笔记管理器

- 用于添加、列出和删除笔记的命令行工具
- 将数据存储在简单的二进制文件中
- 按 ID 索引笔记

选项 B：简单的 HTTP 服务器

- 提供目录中的静态文件
- 使用套接字（`socket`,`bind`,`listen`,`accept`)
- 将每个请求记录到文件中

选项 C：小型键值存储

- 带命令的命令行工具`put`,`get`,`list`,`delete`
- 用途`fopen`,`fread`， 和`fwrite`
- 可选：添加LevelDB或SQLite后端

#### 步骤 2. 规划您的结构

示例：Tiny Note Manager

```
tinynotes/
├── include/
│   └── tinynotes.h
├── src/
│   ├── main.c
│   ├── notes.c
│   └── util.c
├── data/
│   └── notes.bin
├── Makefile
├── README.md
└── LICENSE
```

#### 步骤 3. Tiny Code：最小工作版本

先用单文件做出最小可运行版本。`tinynotes.c` 现在同时拥有命令解析、文件读写和笔记结构；当这个版本稳定后，再按上面的目录结构拆成 `main.c`、`notes.c` 和 `tinynotes.h`。

```c
// file: tinynotes.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NOTE_LEN 256
#define DATA_FILE "notes.bin"

typedef struct {
    int id;
    char text[MAX_NOTE_LEN];
} Note;

/* Stops the program with the current system error when file work fails. */
static void die(const char *message) {
    perror(message);
    exit(EXIT_FAILURE);
}

/* Returns the byte size of the opened data file. */
static long current_file_size(FILE *f) {
    if (fseek(f, 0, SEEK_END) != 0) {
        die("seek");
    }

    long size = ftell(f);
    if (size < 0) {
        die("tell");
    }

    return size;
}

/* Appends one note to notes.bin and assigns the next sequential id. */
static void add_note(const char *msg) {
    FILE *f = fopen(DATA_FILE, "ab+");
    if (!f) {
        die("open");
    }

    Note n = {0};
    long size = current_file_size(f);

    n.id = (int)(size / sizeof(Note)) + 1;
    strncpy(n.text, msg, MAX_NOTE_LEN - 1);
    n.text[MAX_NOTE_LEN - 1] = '\0';

    if (fwrite(&n, sizeof(n), 1, f) != 1) {
        fclose(f);
        die("write");
    }

    if (fclose(f) != 0) {
        die("close");
    }

    printf("Added note %d: %s\n", n.id, n.text);
}

/* Reads notes.bin from the beginning and prints every stored note. */
static void list_notes(void) {
    FILE *f = fopen(DATA_FILE, "rb");
    if (!f) {
        puts("No notes yet.");
        return;
    }

    Note n;
    while (fread(&n, sizeof(n), 1, f) == 1) {
        printf("%d: %s\n", n.id, n.text);
    }

    if (ferror(f)) {
        fclose(f);
        die("read");
    }

    if (fclose(f) != 0) {
        die("close");
    }
}

/* Deletes the demo data file so the lab can be reset safely. */
static void clear_notes(void) {
    if (remove(DATA_FILE) == 0)
        puts("All notes deleted.");
    else
        puts("No notes to delete.");
}

/* Parses the command line and routes each command to the right operation. */
int main(int argc, char **argv) {
    if (argc < 2) {
        puts("Usage: tinynotes <add|list|clear> [message]");
        return EXIT_FAILURE;
    }

    if (strcmp(argv[1], "add") == 0 && argc >= 3) {
        add_note(argv[2]);
    } else if (strcmp(argv[1], "list") == 0) {
        list_notes();
    } else if (strcmp(argv[1], "clear") == 0) {
        clear_notes();
    } else {
        puts("Invalid command.");
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
```

构建它：

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic -g tinynotes.c -o tinynotes
```

尝试一下：

```
./tinynotes add "Learn C deeply"
./tinynotes add "Write clear code"
./tinynotes list
```

输出：

```
Added note 1: Learn C deeply
Added note 2: Write clear code
1: Learn C deeply
2: Write clear code
```

#### 调用链和数据流

```text
命令行参数
-> main()
-> add_note() / list_notes() / clear_notes()
-> notes.bin
-> 终端输出
```

`main()` 只负责识别命令和分派操作；`add_note()` 负责追加记录并生成下一个 ID；`list_notes()` 负责顺序读取文件；`clear_notes()` 只负责重置数据文件。`notes.bin` 是这个版本唯一的持久化工件，完成练习后把它和运行输出一起写进 `evidence.md`。

#### 第 4 步：扩展它

添加这些小改进：

-`tinynotes delete `按索引删除注释
- 商店创建时间（`time_t`)
- 保存到用户特定的目录（`~/.tinynotes/`)
- 在写入之前使用 XOR 或 AES 加密笔记（可选）
- 添加 JSON 导出使用`fprintf`

#### 步骤 5. 打包

添加生成文件：

```
CC=gcc
CFLAGS=-std=c17 -O2 -Wall -Wextra -Wpedantic
TARGET=tinynotes
all:
    $(CC) $(CFLAGS) tinynotes.c -o $(TARGET)
install:
    cp $(TARGET) /usr/local/bin/
clean:
    rm -f $(TARGET)
```

安装：

```
sudo make install
```

现在您可以输入`tinynotes list`来自任何地方。

#### 第 6 步：记录下来

自述文件.md

```
# tinynotes
A simple command-line note manager written in C.
## Build
make
sudo make install
## Usage
tinynotes add "hello world"
tinynotes list
tinynotes clear
```

#### 验收清单

- `gcc -std=c17 -Wall -Wextra -Wpedantic -g tinynotes.c -o tinynotes` 没有警告。
- `./tinynotes list` 在没有数据时输出 `No notes yet.`。
- 连续运行两次 `add` 后，`list` 能看到 ID 递增。
- `./tinynotes clear` 会删除 `notes.bin`，再次 `list` 回到空状态。
- `evidence.md` 记录输入、期望行为、实际行为、生成的 `notes.bin`、一次错误输入和下一步改进。

#### 步骤 7. 版本和许可证

标记您的版本：

```
git tag -a v0.1.0 -m "first public release"
```

添加`LICENSE`（麻省理工学院、阿帕奇或 GPL）。如果您希望其他人使用或贡献，请将其发布在 GitHub 上。

#### 第 8 步：为什么这很重要

这就是小程序如何成长为工具的过程：

- 真实文件I/O
- 错误处理
- 构建自动化
- 文档和版本控制

C 使您能够构建精确、快速且最小的软件。现在您已经了解了从编译器到系统调用的每一层。

#### 步骤 9. 亲自尝试一下

1.用SQLite或LevelDB替换文件存储
2. 添加`search`和`sort`
3. 构建一个通过套接字同步笔记的网络版本
4. 添加带有断言的单元测试套件
5. 将您的项目打包为`.deb`或者`.tar.gz`

#### 步骤 10. 恭喜

您已读到《C 小书》的结尾。

你开始于`printf("Hello, World");`并完成了完整工作系统的构建、打包和记录。

您现在已经具备了探索的基础：

- 操作系统
- 编译器和解释器
- 嵌入式系统
- 数据库和网络

C 不仅仅是一种语言。它是计算的基础。您现在可以像系统工程师一样流利地讲它。

你已经读到了最后一页，即《C 小书》安静的尾声。

让我们以 C 程序开始的方式结束这一旅程：清晰、有目的和好奇心。
