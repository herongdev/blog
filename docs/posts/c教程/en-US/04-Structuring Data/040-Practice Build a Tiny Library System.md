---
title: "40. Practice: Build a Tiny Library System"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Structuring Data]"
description: "The Little Book of C — 40. Practice: Build a Tiny Library System"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "40"
sidebarWeight: "40"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System"
---
[中文版本](/posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System)

#### Follow-Along Deliverable

- Assumed state: lessons 031-039 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/040-library`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/040-library && cd ~/c-course-labs/040-library`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\040-library"; Set-Location "$HOME\c-course-labs\040-library"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record add, search, borrow, or delete output plus a structure design note.
- Boundary for this lab: This lab focuses on structs, lists, and domain operations. Disk persistence returns in lessons 50 and 100.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

You’ve now learned every building block, structs, pointers, dynamic memory, linked lists, enums, and even object-style design with function pointers. It’s time to combine them into a real mini-project: a Tiny Library System. This will be a full, runnable C program that manages books, authors, and borrowing records using everything you’ve learned so far.

#### Goal

Implement a minimal system that can:

1. Store book records dynamically
2. Add new books
3. Search books by title
4. Borrow and return books
5. Clean up all memory correctly

We’ll use:

- `struct` for data models
- `enum` for status tracking
- linked lists for storage
- `typedef` and function pointers for clarity

#### Data Structures

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

Each book is one node in a linked list. The library owns the head pointer.

#### Core Functions

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

#### Tiny Code, Full Program

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

Compile and run:

```
gcc library_system.c -o library_system
./library_system
```

Output:

```
--- Library Catalog ---
Algorithms in C      | Sedgewick       | 1998 | Available
Clean Code           | Robert C. Martin | 2008 | Available
The C Programming Language | Kernighan & Ritchie | 1988 | Available
------------------------

You borrowed: Clean Code
Book already borrowed: Clean Code
You returned: Clean Code
You borrowed: Algorithms in C

--- Library Catalog ---
Algorithms in C      | Sedgewick       | 1998 | Borrowed
Clean Code           | Robert C. Martin | 2008 | Available
The C Programming Language | Kernighan & Ritchie | 1988 | Available
------------------------
```

#### What You Just Practiced

You’ve combined everything from this chapter:

| Concept | How You Used It |
| --- | --- |
| Structs | For`Book` and`Library` models |
| Enums | For`BookStatus` |
| Dynamic memory | `malloc`,`free`,`strdup` |
| Linked lists | Dynamic collection of books |
| Pointers | Passing references between functions |
| Encapsulation | Each function hides internal details |

#### Why It Matters

This “tiny library” is a microcosm of systems programming: you’re managing memory, defining abstractions, and building a dynamic system with clear data ownership. From here, you can scale to databases, caches, or in-memory key-value stores, all built on the same principles.

#### Try It Yourself

1. Add`id` and`genre` fields to`Book`.
2. Implement`remove_book(title)` to delete a node safely.
3. Add a command interface (read from stdin) for interactive use.
4. Save and load the library to a file using`fwrite` and`fread`.
5. Write a function to count how many books are borrowed vs available.

You’ve completed Chapter 4: Structuring Data, the heart of understanding how C organizes the world. Next, you’ll move from in-memory structures to input, output, and files, learning how to interact with the outside world through the standard I/O library in Chapter 5.
