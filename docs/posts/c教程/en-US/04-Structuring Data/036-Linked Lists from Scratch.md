---
title: "36. Linked Lists from Scratch"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Structuring Data"
description: "The Little Book of C — 36. Linked Lists from Scratch"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 36
sidebarWeight: 36
lang: "en-US"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/036-Linked Lists from Scratch"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch"
---
[中文版本](/posts/c教程/zh-CN/04-数据结构/036-Linked Lists from Scratch)

Now that you understand how to group data with`struct`, it’s time to make it dynamic. A linked list is one of the most fundamental data structures in C, built entirely with pointers and structs. It teaches you how memory, pointers, and iteration really work.

#### What Is a Linked List?

A linked list is a collection of nodes, where each node stores:

1. Data (of any type you choose), and
2. A pointer to the next node.

Unlike arrays, linked lists aren’t fixed in size, you can add or remove nodes anytime without reallocating large blocks of memory.

#### Basic Node Structure

```
struct Node {
    int value;
    struct Node *next;
};
```

This defines a “node” that holds an integer and a pointer to the next node in the list. If`next` is`NULL`, it’s the end of the list.

#### Creating and Traversing a Linked List

Let’s build a simple three-node list:

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

Output:

```
10 20 30
```

#### Tiny Code: Build, Insert, Delete

Let’s make it reusable, define helper functions for common operations.

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

Output:

```
Linked list contents:
5 -> 10 -> 15 -> NULL
```

#### Why Use Linked Lists?

- Dynamic size: Easily grow or shrink as needed.
- Efficient insertions and deletions: No need to shift elements as in arrays.
- Great for learning memory handling: You directly allocate and free each node.

But they also have trade-offs:

- Slower random access (must traverse from the head).
- Slightly higher memory usage due to pointer fields.

#### Variants You’ll Meet Later

| Type | Description |
| --- | --- |
| Singly Linked List | Each node points to the next one (like above). |
| Doubly Linked List | Each node has`prev` and`next` pointers. |
| Circular Linked List | The last node links back to the first. |
| Sentinel List | Uses dummy head/tail nodes to simplify logic. |

#### Why It Matters

Linked lists are a window into manual memory management, you handle creation, traversal, and cleanup. They’re used in:

- Kernels (e.g., Linux`list_head`)
- Compilers (symbol tables, token streams)
- Dynamic containers (queues, allocators)

You’re not just learning a data structure, you’re learning how to think in pointers.

#### Try It Yourself

1. Implement a function`int length(Node *head)` that counts the number of nodes.
2. Write`insert_front()` and`insert_after()` functions.
3. Implement a`find()` function that returns a pointer to a node with a given value.
4. Modify the`delete_list()` function to print which node is being freed.
5. Extend the struct to include a`char name[20]` and print both the name and value.

You’ve now built one of the most essential dynamic structures in computer science, entirely from scratch. Next, you’ll build on this foundation to create stacks and queues, two of the most common and useful data abstractions in systems programming.
