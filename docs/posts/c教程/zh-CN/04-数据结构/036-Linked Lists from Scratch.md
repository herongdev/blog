---
title: "36. 从头开始的链接列表"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 36. 从头开始的链接列表"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 36
sidebarWeight: 36
alternateZh: "/posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch"
---

[English version](/posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch)

现在您已经了解了如何对数据进行分组`struct`，是时候让它变得动态了。链表是 C 语言中最基本的数据结构之一，完全由指针和结构体构建。它教你内存、指针和迭代是如何工作的。

#### 什么是链表？

链表是节点的集合，其中每个节点存储：

1. 数据（您选择的任何类型），以及
2. 指向下一个节点的指针。

与数组不同，链表的大小不固定，您可以随时添加或删除节点，而无需重新分配大块内存。

#### 基本节点结构

```
struct Node {
    int value;
    struct Node *next;
};
```

这定义了一个“节点”，它保存一个整数和一个指向列表中下一个节点的指针。如果`next`是`NULL`，这是列表的末尾。

#### 创建和遍历链表

让我们构建一个简单的三节点列表：

```
#include <stdio.h>
#include <stdlib.h>
struct Node {
    int value;
    struct Node *next;
};
int main(void) {
    // Create three nodes dynamically
    struct Node *a = malloc(sizeof(struct Node));
    struct Node *b = malloc(sizeof(struct Node));
    struct Node *c = malloc(sizeof(struct Node));
    a->value = 10; a->next = b;
    b->value = 20; b->next = c;
    c->value = 30; c->next = NULL;
    // Traverse and print
    struct Node *current = a;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }
    printf("\n");
    // Free memory
    free(a); free(b); free(c);
    return 0;
}
```

输出：

```
10 20 30
```

#### 小代码：构建、插入、删除

让我们使其可重用，为常见操作定义辅助函数。

```
#include <stdio.h>
#include <stdlib.h>
typedef struct Node {
    int value;
    struct Node *next;
} Node;
Node* create_node(int value) {
    Node *n = malloc(sizeof(Node));
    n->value = value;
    n->next = NULL;
    return n;
}
void append(Node **head, int value) {
    Node *new_node = create_node(value);
    if (*head == NULL) {
        *head = new_node;
        return;
    }
    Node *cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = new_node;
}
void print_list(const Node *head) {
    for (const Node *p = head; p != NULL; p = p->next)
        printf("%d -> ", p->value);
    printf("NULL\n");
}
void delete_list(Node *head) {
    while (head) {
        Node *next = head->next;
        free(head);
        head = next;
    }
}
int main(void) {
    Node *head = NULL;
    append(&head, 5);
    append(&head, 10);
    append(&head, 15);
    printf("Linked list contents:\n");
    print_list(head);
    delete_list(head);
    return 0;
}
```

输出：

```
Linked list contents:
5 -> 10 -> 15 -> NULL
```

#### 为什么使用链表？

- 动态大小：根据需要轻松增大或缩小。
- 高效的插入和删除：无需像数组中那样移动元素。
- 非常适合学习内存处理：您可以直接分配和释放每个节点。

但他们也有权衡：

- 随机访问速度较慢（必须从头部开始遍历）。
- 由于指针字段，内存使用量略高。

#### 您稍后会遇到的变体

|类型 |描述 |
| --- | --- |
|单链表|每个节点都指向下一个节点（如上所示）。 |
|双向链表 |每个节点有`prev`和`next`指针。 |
|循环链表|最后一个节点链接回第一个节点。 |
|哨兵名单|使用虚拟头/尾节点来简化逻辑。 |

#### 为什么它很重要

链接列表是手动内存管理的窗口，您可以处理创建、遍历和清理。它们用于：

- 内核（例如，Linux`list_head`)
- 编译器（符号表、令牌流）
- 动态容器（队列、分配器）

你不仅仅是在学习数据结构，你还在学习如何用指针来思考。

#### 自己尝试一下

1. 实现一个功能`int length(Node *head)`计算节点的数量。
2. 写`insert_front()`和`insert_after()`功能。
3. 实施`find()`返回指向具有给定值的节点的指针的函数。
4. 修改`delete_list()`函数打印哪个节点正在被释放。
5. 扩展结构体以包含`char name[20]`并打印名称和值。

您现在已经完全从头开始构建了计算机科学中最重要的动态结构之一。接下来，您将在此基础上创建堆栈和队列，这是系统编程中最常见和最有用的两种数据抽象。
