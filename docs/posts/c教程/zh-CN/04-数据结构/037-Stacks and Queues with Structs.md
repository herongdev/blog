---
title: "37. 具有结构的堆栈和队列"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 37. 具有结构的堆栈和队列"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 37
sidebarWeight: 37
alternateZh: "/posts/c教程/zh-CN/04-数据结构/037-Stacks and Queues with Structs"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs"
---

[English version](/posts/c教程/en-US/04-Structuring Data/037-Stacks and Queues with Structs)

您已经学习了如何构建链表，现在您将使用该基础来创建两种经典的数据结构：堆栈（LIFO，后进先出）和队列（FIFO，先进先出）。两者对于现实世界的程序都是必不可少的，从解析表达式到管理任务和内核调度。

#### 1. 堆栈

堆栈就像一堆盘子。您添加到顶部（推送），并从顶部删除（弹出）。

运营：

-`push(x)`→ 将项目添加到顶部
-`pop()`→ 删除顶部项目
-`peek()`→ 查看顶部的项目而不将其移除

#### 使用链表实现堆栈

每个堆栈节点保存数据和指向下一个节点的指针。

```
#include <stdio.h>
#include <stdlib.h>
typedef struct Node {
    int value;
    struct Node *next;
} Node;
typedef struct {
    Node *top;
} Stack;
Stack* create_stack(void) {
    Stack *s = malloc(sizeof(Stack));
    s->top = NULL;
    return s;
}
void push(Stack *s, int value) {
    Node *n = malloc(sizeof(Node));
    n->value = value;
    n->next = s->top;
    s->top = n;
}
int pop(Stack *s) {
    if (!s->top) {
        printf("Stack underflow!\n");
        return -1;
    }
    Node *temp = s->top;
    int val = temp->value;
    s->top = temp->next;
    free(temp);
    return val;
}
int peek(const Stack *s) {
    return s->top ? s->top->value : -1;
}
void free_stack(Stack *s) {
    while (s->top) pop(s);
    free(s);
}
int main(void) {
    Stack *s = create_stack();
    push(s, 10);
    push(s, 20);
    push(s, 30);
    printf("Top: %d\n", peek(s));
    printf("Popped: %d\n", pop(s));
    printf("Popped: %d\n", pop(s));
    printf("Top now: %d\n", peek(s));
    free_stack(s);
    return 0;
}
```

输出：

```
Top: 30
Popped: 30
Popped: 20
Top now: 10
```

#### 为什么使用堆栈？

堆栈用于：

- 函数调用（调用堆栈）
- 撤消/重做系统
- 解析表达式（例如，评估`(2 + 3) * 4`)
- 图中的深度优先搜索（DFS）

#### 2. 队列

队列就像商店里的队伍。您添加到后面（入队），并从前面删除（出队）。

运营：

-`enqueue(x)`→ 添加到末尾
-`dequeue()`→ 从前面拆下

#### 使用链表实现队列

```
#include <stdio.h>
#include <stdlib.h>
typedef struct Node {
    int value;
    struct Node *next;
} Node;
typedef struct {
    Node *front;
    Node *rear;
} Queue;
Queue* create_queue(void) {
    Queue *q = malloc(sizeof(Queue));
    q->front = q->rear = NULL;
    return q;
}
void enqueue(Queue *q, int value) {
    Node *n = malloc(sizeof(Node));
    n->value = value;
    n->next = NULL;
    if (q->rear == NULL) {
        q->front = q->rear = n;
        return;
    }
    q->rear->next = n;
    q->rear = n;
}
int dequeue(Queue *q) {
    if (q->front == NULL) {
        printf("Queue underflow!\n");
        return -1;
    }
    Node *temp = q->front;
    int val = temp->value;
    q->front = temp->next;
    if (q->front == NULL)
        q->rear = NULL;
    free(temp);
    return val;
}
void print_queue(const Queue *q) {
    for (Node *p = q->front; p != NULL; p = p->next)
        printf("%d ", p->value);
    printf("\n");
}
void free_queue(Queue *q) {
    while (q->front) dequeue(q);
    free(q);
}
int main(void) {
    Queue *q = create_queue();
    enqueue(q, 1);
    enqueue(q, 2);
    enqueue(q, 3);
    printf("Queue: ");
    print_queue(q);
    printf("Dequeued: %d\n", dequeue(q));
    printf("Dequeued: %d\n", dequeue(q));
    printf("Remaining: ");
    print_queue(q);
    free_queue(q);
    return 0;
}
```

输出：

```
Queue: 1 2 3 
Dequeued: 1
Dequeued: 2
Remaining: 3
```

#### 堆栈与队列总结

|特色 |堆栈|队列|
| --- | --- | --- |
|访问订单 | LIFO（后进先出）| FIFO（先进先出）|
|主要业务|推/弹出|入队/出队 |
|用于 |递归、解析、回溯 |任务调度、缓冲|
|示例|撤消系统 |打印机工作 |

#### 小代码练习：双队列堆栈

这是一个最小的片段，可让您在堆栈和队列模式之间切换：

```
typedef enum { STACK_MODE, QUEUE_MODE } Mode;
```

您可以使用相同的链表逻辑，但更改是否在头部（堆栈）或尾部（队列）添加新节点。

#### 为什么它很重要

堆栈和队列行为是每个主要系统抽象的基础：

- CPU调度
- IO缓冲
- 事件循环
- 表达式解析
- 递归算法

用原始 C 语言构建它们可以巩固您对基于指针的数据结构和内存所有权的理解。

#### 自己尝试一下

1. 实施`is_empty()`对于堆栈和队列。
2. 扩展队列以处理字符串而不是整数。
3.添加功能`reverse_queue()`使用堆栈。
4. 实现一个具有固定最大大小的“有界队列”。
5. 编写一个小程序，使用队列模拟顾客到达。

堆栈和队列是内存和时间的控制流原语。接下来，您将它们与散列和函数指针结合起来构建您自己的散列表，这是 C 中高效查找和符号表的基础。
