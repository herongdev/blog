---
title: "40. 实践：构建小型图书馆系统"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 40. 实践：构建小型图书馆系统"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "40"
sidebarWeight: "40"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System"
---

[English version](/posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System)

#### 跟练交付物

- 已具备状态：完成第 031-039 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/040-library`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/040-library && cd ~/c-course-labs/040-library`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\040-library"; Set-Location "$HOME\c-course-labs\040-library"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录新增、查询、借阅或删除操作的终端输出，以及结构设计说明。
- 本章边界：本章关注结构体、链表和业务操作；暂不要求把数据持久化到磁盘，文件存储会在第 50 课和第 100 课继续练。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

现在，您已经学习了每个构建块、结构、指针、动态内存、链表、枚举，甚至带有函数指针的对象样式设计。是时候将它们组合成一个真正的迷你项目：小型图书馆系统。这将是一个完整的、可运行的 C 程序，可以使用您迄今为止学到的所有内容来管理书籍、作者和借阅记录。

#### 目标

实施一个最小系统，可以：

1.动态存储图书记录
2.添加新书
3.按书名搜索书籍
4.借还书
5.正确清理所有内存

我们将使用：

-`struct`对于数据模型
-`enum`用于状态跟踪
- 用于存储的链表
-`typedef`和函数指针以便清晰起见

#### 数据结构

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef enum {
    AVAILABLE,
    BORROWED
} BookStatus;
typedef struct Book {
    char *title;
    char *author;
    int year;
    BookStatus status;
    struct Book *next;
} Book;
typedef struct {
    Book *head;
} Library;
```

每本书都是链表中的一个节点。库拥有头指针。

#### 核心功能

```
Book* create_book(const char *title, const char *author, int year) {
    Book *b = malloc(sizeof(Book));
    b->title = strdup(title);
    b->author = strdup(author);
    b->year = year;
    b->status = AVAILABLE;
    b->next = NULL;
    return b;
}
void add_book(Library *lib, Book *b) {
    b->next = lib->head;
    lib->head = b;
}
Book* find_book(Library *lib, const char *title) {
    for (Book *cur = lib->head; cur != NULL; cur = cur->next)
        if (strcmp(cur->title, title) == 0)
            return cur;
    return NULL;
}
void borrow_book(Library *lib, const char *title) {
    Book *b = find_book(lib, title);
    if (!b) {
        printf("Book not found: %s\n", title);
        return;
    }
    if (b->status == BORROWED)
        printf("Book already borrowed: %s\n", b->title);
    else {
        b->status = BORROWED;
        printf("You borrowed: %s\n", b->title);
    }
}
void return_book(Library *lib, const char *title) {
    Book *b = find_book(lib, title);
    if (!b) {
        printf("Book not found: %s\n", title);
        return;
    }
    if (b->status == AVAILABLE)
        printf("Book already returned: %s\n", b->title);
    else {
        b->status = AVAILABLE;
        printf("You returned: %s\n", b->title);
    }
}
void list_books(const Library *lib) {
    printf("\n--- Library Catalog ---\n");
    for (const Book *b = lib->head; b != NULL; b = b->next)
        printf("%-20s | %-15s | %d | %s\n",
               b->title, b->author, b->year,
               b->status == AVAILABLE ? "Available" : "Borrowed");
    printf("------------------------\n\n");
}
void free_library(Library *lib) {
    Book *cur = lib->head;
    while (cur) {
        Book *next = cur->next;
        free(cur->title);
        free(cur->author);
        free(cur);
        cur = next;
    }
    lib->head = NULL;
}
```

#### 小代码，完整程序

```
int main(void) {
    Library lib = {NULL};
    add_book(&lib, create_book("The C Programming Language", "Kernighan & Ritchie", 1988));
    add_book(&lib, create_book("Clean Code", "Robert C. Martin", 2008));
    add_book(&lib, create_book("Algorithms in C", "Sedgewick", 1998));
    list_books(&lib);
    borrow_book(&lib, "Clean Code");
    borrow_book(&lib, "Clean Code");  // test duplicate borrow
    return_book(&lib, "Clean Code");
    borrow_book(&lib, "Algorithms in C");
    list_books(&lib);
    free_library(&lib);
    return 0;
}
```

编译并运行：

```
gcc library_system.c -o library_system
./library_system
```

输出：

```
--- 图书馆目录 ---
C 语言的算法 |塞奇威克 | 1998 |可用的
干净的代码 |罗伯特·C·马丁 | 罗伯特·C·马丁2008 |可用的
C 编程语言 |克尼根和里奇 | 1988 |可用的
------------------------

您借用了：干净的代码
已借书：《干净的代码》
您返回了：干净的代码
您借用了：C 语言算法

--- 图书馆目录 ---
C 语言的算法 |塞奇威克 | 1998 |借来的
干净的代码 |罗伯特·C·马丁 | 罗伯特·C·马丁2008 |可用的
C 编程语言 |克尼根和里奇 | 1988 |可用的
------------------------
```

#### 你刚刚练习了什么

您已经合并了本章中的所有内容：

|概念|您如何使用它 |
| --- | --- |
|结构|为了`Book`和`Library`型号 |
|枚举 |为了`BookStatus`|
|动态内存|`malloc`,`free`,`strdup`|
|链接列表 |动态藏书|
|指针|在函数之间传递引用 |
|封装|每个功能都隐藏了内部细节 |

#### 为什么它很重要

这个“微型库”是系统编程的缩影：您正在管理内存、定义抽象并构建具有明确数据所有权的动态系统。从这里，您可以扩展到数据库、缓存或内存中键值存储，所有这些都基于相同的原理构建。

#### 自己尝试一下

1.添加`id`和`genre`字段到`Book`.
2. 实施`remove_book(title)`安全删除节点。
3.添加命令接口（从stdin读取）以供交互使用。
4. 使用以下命令保存库并将其加载到文件中`fwrite`和`fread`.
5. 编写一个函数来计算已借书和可用书的数量。

您已经完成了第 4 章：构建数据，这是理解 C 如何组织世界的核心。接下来，您将从内存结构转向输入、输出和文件，学习如何通过第 5 章中的标准 I/O 库与外界交互。
