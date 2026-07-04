---
title: "16. Functions and Parameters"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Language Basics"
description: "The Little Book of C — 16. Functions and Parameters"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 16
sidebarWeight: 16
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/016-Functions and Parameters"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/016-Functions and Parameters)

Functions are how you break a program into smaller, reusable pieces. Each function performs one specific task, you call it when needed, pass in data (parameters), and get something back (a return value). Functions make your code organized, testable, and easier to understand.

#### The Structure of a Function

A function in C has four main parts:

```
return_type function_name(parameter_list) {
    // body of the function
    return value;
}
```

Example:

```
int add(int a, int b) {
    return a + b;
}
```

Here:

- `int` is the return type
- `add` is the name
- `(int a, int b)` are parameters
- `return a + b;` sends a result back to the caller

#### Declaring and Defining Functions

In C, you must declare a function before using it. The declaration tells the compiler what to expect.

```
int add(int a, int b); // declaration (prototype)
int main(void) {
    int result = add(3, 4);
    printf("Result: %d\n", result);
    return 0;
}
int add(int a, int b) { // definition
    return a + b;
}
```

Output:

```
Result: 7
```

#### Passing Parameters

When you call a function, the arguments are passed by value, a copy of each value is made. Changing parameters inside the function does not affect the original variables.

```
void change(int x) {
    x = 10;
}
int main(void) {
    int a = 5;
    change(a);
    printf("%d\n", a); // still 5
    return 0;
}
```

If you want to modify the original variable, use pointers (you’ll explore this in Chapter 3):

```
void change(int *x) {
    *x = 10;
}
```

#### Return Values

A function can return a value using`return`. The type of the returned value must match the function’s declared return type.

```
double average(double a, double b) {
    return (a + b) / 2.0;
}
```

To return nothing, use`void`:

```
void greet(void) {
    printf("Hello!\n");
}
```

#### Tiny Code

Here’s a complete program that combines multiple functions and parameters:

```
#include <stdio.h>
// function declarations
int add(int a, int b);
int subtract(int a, int b);
double divide(double a, double b);
void greet(const char *name);
// main function
int main(void) {
    greet("C Learner");
    int sum = add(10, 5);
    int diff = subtract(10, 5);
    double quotient = divide(10.0, 5.0);
    printf("Sum: %d\n", sum);
    printf("Difference: %d\n", diff);
    printf("Quotient: %.2f\n", quotient);
    return 0;
}
// function definitions
int add(int a, int b) {
    return a + b;
}
int subtract(int a, int b) {
    return a - b;
}
double divide(double a, double b) {
    if (b == 0) {
        printf("Error: division by zero!\n");
        return 0.0;
    }
    return a / b;
}
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

Compile and run:

```
gcc functions_demo.c -o functions_demo
./functions_demo
```

Output:

```
Hello, C Learner!
Sum: 15
Difference: 5
Quotient: 2.00
```

#### Why It Matters

Functions are the building blocks of every program. They let you:

- Break large problems into smaller steps
- Reuse code instead of rewriting it
- Test each part independently
- Make programs easier to read and maintain

In C, you’ll use functions for everything, from arithmetic helpers to memory allocators, system calls, and modular libraries.

#### Try It Yourself

1. Write a function that returns the larger of two numbers.
2. Create a`void` function that prints a welcome message.
3. Add a`multiply()` function and call it from`main()`.
4. Modify the program to read numbers from user input and pass them as parameters.
5. Experiment by removing the declaration at the top, see what compiler error appears, then fix it.

Functions are how C programs grow. Each one is a small tool, and together, they become complete systems.
