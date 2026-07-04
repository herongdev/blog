---
title: "20. Practice: Build a Simple Calculator"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Language Basics]"
description: "The Little Book of C — 20. Practice: Build a Simple Calculator"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "20"
sidebarWeight: "20"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/020-Practice Build a Simple Calculator"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/020-Practice Build a Simple Calculator"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/020-Practice Build a Simple Calculator)

#### Follow-Along Deliverable

- Assumed state: lessons 011-019 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/020-calculator`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/020-calculator && cd ~/c-course-labs/020-calculator`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\020-calculator"; Set-Location "$HOME\c-course-labs\020-calculator"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record normal addition, divide-by-zero handling, and `q` exit transcript.
- Boundary for this lab: The main path only requires one runnable file. Splitting functions into `.h` / `.c` files is an extension; repeatable builds are handled in lesson 60.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

Now that you’ve learned about functions, variables, loops, control flow, and linking, it’s time to bring everything together. You’ll build a simple calculator that performs basic arithmetic using clean modular code. This small project will reinforce everything from Chapters 11–19, data types, operators, control flow, and reusable functions.

#### Project Overview

You’ll write a calculator that:

- Prompts the user for two numbers and an operator
- Performs the corresponding operation (+, -, *, /)
- Handles division by zero safely
- Repeats until the user chooses to quit

You’ll structure it using multiple functions and a clean main loop.

#### Tiny Code

Create `calculator.c` first. This file owns both the interaction loop and the four arithmetic functions; after you learn multi-file builds, you can split the arithmetic functions into `mathutils.c` / `mathutils.h`.

```c
#include <stdio.h>
#include <stdbool.h>

double add(double a, double b);
double subtract(double a, double b);
double multiply(double a, double b);
double divide(double a, double b);
void print_menu(void);

/* Owns the interactive calculator loop and dispatches each operation. */
int main(void) {
    double num1, num2, result;
    char op;
    bool running = true;

    printf("=== Simple C Calculator ===\n");

    while (running) {
        print_menu();
        printf("Enter an operator (+, -, *, /) or q to quit: ");
        scanf(" %c", &op);

        if (op == 'q' || op == 'Q') {
            running = false;
            printf("Goodbye!\n");
            break;
        }

        printf("Enter first number: ");
        scanf("%lf", &num1);
        printf("Enter second number: ");
        scanf("%lf", &num2);

        switch (op) {
            case '+':
                result = add(num1, num2);
                printf("Result: %.2f\n", result);
                break;
            case '-':
                result = subtract(num1, num2);
                printf("Result: %.2f\n", result);
                break;
            case '*':
                result = multiply(num1, num2);
                printf("Result: %.2f\n", result);
                break;
            case '/':
                if (num2 == 0) {
                    printf("Error: Division by zero!\n");
                } else {
                    result = divide(num1, num2);
                    printf("Result: %.2f\n", result);
                }
                break;
            default:
                printf("Unknown operator: %c\n", op);
        }
        printf("\n");
    }

    return 0;
}

/* Returns the sum of two numbers. */
double add(double a, double b) {
    return a + b;
}

/* Returns the left number minus the right number. */
double subtract(double a, double b) {
    return a - b;
}

/* Returns the product of two numbers. */
double multiply(double a, double b) {
    return a * b;
}

/* Returns the quotient; the caller checks division by zero first. */
double divide(double a, double b) {
    return a / b;
}

/* Prints the available commands before each input turn. */
void print_menu(void) {
    printf("\nChoose an operation:\n");
    printf("  +  Addition\n");
    printf("  -  Subtraction\n");
    printf("  *  Multiplication\n");
    printf("  /  Division\n");
    printf("  q  Quit\n\n");
}
```

Compile and run:

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic -g calculator.c -o calculator
./calculator
```

On Windows PowerShell, run the executable with:

```powershell
.\calculator.exe
```

#### Call Chain and Data Flow

Read the program in this order:

```text
main()
-> print_menu()
-> scanf reads the operator
-> scanf reads two numbers
-> switch selects add/subtract/multiply/divide
-> printf prints the result or error
```

`main()` owns the interaction flow. The four arithmetic functions only calculate; they do not read input or print output. This lets you inspect the user flow and calculation logic separately. The divide-by-zero check happens before `divide()` because `divide()` represents the normal arithmetic operation, while the interaction layer owns the error path.

Example session:

```
=== Simple C Calculator ===
Choose an operation:
  +  Addition
  -  Subtraction
  *  Multiplication
  /  Division
  q  Quit

Enter an operator (+, -, *, /) or q to quit: +
Enter first number: 5
Enter second number: 3
Result: 8.00

Enter an operator (+, -, *, /) or q to quit: /
Enter first number: 10
Enter second number: 0
Error: Division by zero!

Enter an operator (+, -, *, /) or q to quit: q
Goodbye!
```

#### Why It Matters

This simple project combines nearly everything you’ve learned in Chapter 2:

- Data types for representing numbers
- Operators for performing calculations
- Control flow for making decisions
- Loops for repeated interaction
- Functions for modular design

You’ve now moved beyond syntax, you’ve built a working, reusable C program that interacts with real users.

#### Try It Yourself

Add a new operator`%` for modulo (integer remainder).

Create separate files:

- `calculator.c` for`main()`
- `mathutils.c` and`mathutils.h` for the arithmetic functions Then compile using:

```
gcc calculator.c mathutils.c -o calculator
```

Extend the calculator to remember the last result and reuse it if the user enters a single operand.

Add input validation (e.g., check if`scanf` actually reads a number).

For a challenge, implement power (`^`) or square root (`sqrt`) using`<math.h>`.

This calculator marks the end of your Language Basics journey, from variables and control flow to full, interactive programs. In the next chapter, you’ll dive into memory: how C stores your data, manages it, and lets you control it directly.
