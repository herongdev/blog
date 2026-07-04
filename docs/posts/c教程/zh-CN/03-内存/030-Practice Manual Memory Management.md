---
title: "30. 练习：手动内存管理"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 30. 练习：手动内存管理"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "30"
sidebarWeight: "30"
alternateZh: "/posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management"
---

[English version](/posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management)

#### 跟练交付物

- 已具备状态：完成第 021-029 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/030-memory`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/030-memory && cd ~/c-course-labs/030-memory`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\030-memory"; Set-Location "$HOME\c-course-labs\030-memory"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录程序输出、一次释放路径说明，以及 Valgrind 或 AddressSanitizer 记录。
- 本章边界：本章练习所有权和释放路径；暂不要求实现通用分配器，自定义分配器会在第 95 课再做。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

现在您已经了解了内存的工作原理、堆栈与堆、分配、释放、泄漏、深拷贝与浅拷贝，是时候练习手动控制内存了。这个练习联系在一起`malloc`,`free`真实的、可运行的程序中的指针和结构管理。

您将构建一个存储和操作动态分配记录的小型系统，这是对数据库或对象系统如何管理 C 内存的小型模拟。

#### 目标

创建一个简单的“学生记录管理器”，可以：

- 为每个学生的姓名动态分配内存。
- 存储和打印学生数据。
- 最后干净地释放所有分配的内存。

#### 小代码

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    char *name;
    int age;
    float gpa;
} Student;
Student *create_student(const char *name, int age, float gpa) {
    Student *s = malloc(sizeof(Student));
    if (!s) {
        printf("Memory allocation failed for Student.\n");
        exit(1);
    }
    s->name = malloc(strlen(name) + 1);
    if (!s->name) {
        printf("Memory allocation failed for name.\n");
        free(s);
        exit(1);
    }
    strcpy(s->name, name);
    s->age = age;
    s->gpa = gpa;
    return s;
}
void print_student(const Student *s) {
    printf("Name: %-10s | Age: %d | GPA: %.2f\n", s->name, s->age, s->gpa);
}
void free_student(Student *s) {
    free(s->name);
    free(s);
}
int main(void) {
    printf("=== Manual Memory Management Demo ===\n");
    // Create three students dynamically
    Student *a = create_student("Alice", 20, 3.8f);
    Student *b = create_student("Bob", 22, 3.4f);
    Student *c = create_student("Carol", 19, 3.9f);
    // Print their details
    print_student(a);
    print_student(b);
    print_student(c);
    // Modify dynamically allocated memory
    char new_name[] = "Bobby";
    b->name = realloc(b->name, strlen(new_name) + 1);
    strcpy(b->name, new_name);
    b->gpa = 3.6f;
    printf("\nAfter update:\n");
    print_student(b);
    // Free memory
    free_student(a);
    free_student(b);
    free_student(c);
    printf("\nAll memory released.\n");
    return 0;
}
```

编译并运行：

```
gcc manual_memory.c -o manual_memory
./manual_memory
```

输出：

```
=== 手动内存管理演示 ===
姓名： 爱丽丝 |年龄：20 |平均绩点：3.80
姓名： 鲍勃 |年龄：22 |平均绩点：3.40
姓名：卡罗尔 |年龄：19 |平均绩点：3.90

更新后：
姓名： 鲍比 |年龄：22 |平均绩点：3.60

所有内存都释放了。
```

#### 它是如何运作的

动态分配：每个`Student`和它的`name`字段是在堆上创建的`malloc()`。您可以准确控制它们何时存在以及何时销毁它们。

所有权：

- 该程序拥有每个学生的记忆。
- 每个`create_student()`调用稍后必须匹配`free_student()`.

内存安全：

- 每一个`malloc`检查结果。
- 释放的内存在退出前正确释放。

#### 扩展示例

尝试以下修改：

动态的学生队伍

```
Student **students = malloc(3 * sizeof(Student *));
students[0] = create_student("Ava", 21, 3.7f);
students[1] = create_student("Ben", 20, 3.5f);
students[2] = create_student("Cleo", 23, 3.9f);
```

遍历它们并打印所有详细信息，然后释放每一项。

重新分配（增长列表） 使用`realloc()`动态添加更多学生时增加阵列的容量。

深拷贝功能实现：

```
Student *copy_student(const Student *src);
```

它通过为结构及其名称分配新内存来执行深层复制。

泄漏检测 运行您的程序`valgrind ./manual_memory`，确认所有内存都已释放干净。

#### 为什么它很重要

这个小例子反映了真实的 C 系统所做的事情：

- Allocate complex data on demand.
- Manage lifetime explicitly.
- 正确清理。

从操作系统到数据库和编译器的一切都取决于这个学科。 Once you can manage small dynamic structures like this confidently, you’re ready to build larger systems safely, from allocators to object pools to file caches.

#### 自己尝试一下

1. 添加一个新字段（`major`）并动态处理它。
2. 添加成绩数组并计算平均值。
3. 使用以下命令将静态列​​表转换为动态可调整大小的数组`realloc`.
4. 故意省略`free()`调用，然后使用 Valgrind 检测泄漏。
5. 写一个`destroy_all()`安全地释放一批学生的功能。

您现在已经完成了第 3 章：使用内存。您了解数据在 C 中如何存在、移动和消失，并且您已经练习完全控制它。从这里，您将学习如何使用优雅地构建数据`struct`,`union`，以及第 4 章中的现实世界数据抽象。
