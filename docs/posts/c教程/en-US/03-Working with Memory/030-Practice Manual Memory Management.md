---
title: "30. Practice: Manual Memory Management"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Working with Memory]"
description: "The Little Book of C — 30. Practice: Manual Memory Management"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "30"
sidebarWeight: "30"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management"
alternateZh: "/posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management"
---
[中文版本](/posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management)

#### Follow-Along Deliverable

- Assumed state: lessons 021-029 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/030-memory`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/030-memory && cd ~/c-course-labs/030-memory`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\030-memory"; Set-Location "$HOME\c-course-labs\030-memory"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record program output, one ownership note, and a Valgrind or AddressSanitizer record.
- Boundary for this lab: This lab focuses on ownership and release paths. A general-purpose allocator is out of scope until lesson 95.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

Now that you’ve learned how memory works, stack vs heap, allocation, freeing, leaks, deep vs shallow copies, it’s time to practice controlling memory manually. This exercise ties together`malloc`,`free`, pointers, and struct management in a real, runnable program.

You’ll build a small system that stores and manipulates dynamically allocated records, a tiny simulation of how databases or object systems manage memory in C.

#### Goal

Create a simple “student record manager” that can:

- Dynamically allocate memory for each student’s name.
- Store and print student data.
- Free all allocated memory cleanly at the end.

#### Tiny Code

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

Compile and run:

```
gcc manual_memory.c -o manual_memory
./manual_memory
```

Output:

```
=== Manual Memory Management Demo ===
Name: Alice      | Age: 20 | GPA: 3.80
Name: Bob        | Age: 22 | GPA: 3.40
Name: Carol      | Age: 19 | GPA: 3.90

After update:
Name: Bobby      | Age: 22 | GPA: 3.60

All memory released.
```

#### How It Works

Dynamic Allocation: Each`Student` and its`name` field are created on the heap with`malloc()`. You control exactly when they exist and when to destroy them.

Ownership:

- The program owns each student’s memory.
- Each`create_student()` call must later be matched by`free_student()`.

Memory Safety:

- Every`malloc` result is checked.
- Freed memory is properly released before exit.

#### Expanding the Example

Try these modifications:

Dynamic Array of Students

```
Student **students = malloc(3 * sizeof(Student *));
students[0] = create_student("Ava", 21, 3.7f);
students[1] = create_student("Ben", 20, 3.5f);
students[2] = create_student("Cleo", 23, 3.9f);
```

Iterate through them and print all details, then free each one.

Reallocation (grow list) Use`realloc()` to increase your array’s capacity when adding more students dynamically.

Deep Copy Function Implement:

```
Student *copy_student(const Student *src);
```

which performs a deep copy by allocating new memory for both the struct and its name.

Leak Detection Run your program with`valgrind ./manual_memory`, confirm that all memory is freed cleanly.

#### Why It Matters

This small example mirrors what real C systems do:

- Allocate complex data on demand.
- Manage lifetime explicitly.
- Clean up correctly.

Everything from operating systems to databases and compilers depends on this discipline. Once you can manage small dynamic structures like this confidently, you’re ready to build larger systems safely, from allocators to object pools to file caches.

#### Try It Yourself

1. Add a new field (`major`) and handle it dynamically.
2. Add an array of grades and compute averages.
3. Convert your static list into a dynamically resizable array using`realloc`.
4. Intentionally omit a`free()` call, then detect the leak with Valgrind.
5. Write a`destroy_all()` function that frees an array of students safely.

You’ve now completed Chapter 3: Working with Memory. You understand how data lives, moves, and disappears in C, and you’ve practiced taking full control over it. From here, you’ll learn how to structure that data elegantly using`struct`,`union`, and real-world data abstractions in Chapter 4.
