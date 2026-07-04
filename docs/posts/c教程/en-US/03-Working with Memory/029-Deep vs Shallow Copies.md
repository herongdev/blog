---
title: "29. Deep vs Shallow Copies"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working with Memory"
description: "The Little Book of C — 29. Deep vs Shallow Copies"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 29
sidebarWeight: 29
lang: "en-US"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies"
alternateZh: "/posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies"
---
[中文版本](/posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies)

When you assign one variable to another in C, you’re often copying addresses, not actual data. This distinction between shallow copies and deep copies becomes critical when working with pointers, arrays, and dynamically allocated structures. Understanding it helps you prevent memory corruption, double frees, and mysterious bugs.

#### The Core Idea

- A shallow copy duplicates only the pointer, both variables refer to the same memory.
- A deep copy duplicates the data itself, each variable owns its own independent memory.

#### Simple Analogy

Think of shallow vs deep copy like two houses:

- Shallow copy: You hand someone your house key. You both open the same door.
- Deep copy: You build a new house that looks identical, but is separate.

#### Shallow Copy Example

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void) {
    char *original = malloc(10);
    strcpy(original, "Hello");
    // Shallow copy
    char *copy = original;
    printf("Before change: %s | %s\n", original, copy);
    copy[0] = 'J'; // modify one
    printf("After change: %s | %s\n", original, copy);
    free(original);
    // free(copy); // ❌ would cause double free error!
    return 0;
}
```

Output:

```
Before change: Hello | Hello
After change: Jello | Jello
```

Explanation:

- `copy` points to the same memory as`original`.
- Changing one changes both.
- You must only`free()` it once, freeing both is a bug.

#### Deep Copy Example

A deep copy allocates new memory and copies the data over.

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void) {
    char *original = malloc(10);
    strcpy(original, "Hello");
    // Deep copy
    char *copy = malloc(strlen(original) + 1);
    strcpy(copy, original);
    printf("Before change: %s | %s\n", original, copy);
    copy[0] = 'J';
    printf("After change: %s | %s\n", original, copy);
    free(original);
    free(copy); // ✅ both safely freed
    return 0;
}
```

Output:

```
Before change: Hello | Hello
After change: Hello | Jello
```

Now the two strings are completely independent, a true deep copy.

#### Shallow vs Deep in Structs

Consider this structure:

```
typedef struct {
    char *name;
} Person;
```

If you assign one`Person` to another:

```
Person a, b;
a.name = malloc(20);
strcpy(a.name, "Alice");
b = a; // shallow copy
b.name[0] = 'M'; // modifies a.name too!
```

Both`a` and`b` point to the same memory. To make a deep copy:

```
b.name = malloc(strlen(a.name) + 1);
strcpy(b.name, a.name);
```

Now they’re independent.

#### Tiny Code

Here’s a full program demonstrating both copies with structs:

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    char *name;
    int age;
} Person;
void print_person(const char *label, Person p) {
    printf("%s: name=%s age=%d\n", label, p.name, p.age);
}
int main(void) {
    Person p1;
    p1.name = malloc(20);
    strcpy(p1.name, "Alice");
    p1.age = 25;
    // Shallow copy
    Person p2 = p1;
    print_person("Before", p1);
    p2.name[0] = 'M'; // modifies same memory
    print_person("After shallow copy", p1);
    // Deep copy
    Person p3;
    p3.name = malloc(strlen(p1.name) + 1);
    strcpy(p3.name, p1.name);
    p3.age = p1.age;
    p3.name[0] = 'C'; // independent copy
    print_person("After deep copy", p1);
    print_person("Deep copy result", p3);
    free(p1.name);
    free(p3.name); // ✅ safe
    return 0;
}
```

Output:

```
Before: name=Alice age=25
After shallow copy: name=Mlice age=25
After deep copy: name=Mlice age=25
Deep copy result: name=Clice age=25
```

#### Why It Matters

Shallow and deep copies determine ownership of memory:

- If two variables share the same pointer (shallow), freeing one invalidates the other.
- Deep copies isolate data, preventing interference but using more memory.

Getting this wrong leads to:

- Double free or dangling pointer errors
- Memory leaks
- Corrupted data in complex structures

Understanding these concepts is crucial for:

- Managing dynamic arrays and linked lists
- Designing APIs that safely return or duplicate data
- Writing custom copy constructors for structs

#### Try It Yourself

1. Create a struct with dynamically allocated fields (e.g.,`name`,`address`) and write two copy functions:`copy_shallow()` and`copy_deep()`.
2. Modify one copy and observe the difference.
3. Call`free()` in the wrong order and note what happens.
4. Use Valgrind to verify that deep copies are properly freed.
5. Extend the concept to an array of structs, implement deep copy for each element.

When you understand deep vs shallow copies, you control how memory ownership moves in your program, a foundation for safe, modular, and leak-free C design.
