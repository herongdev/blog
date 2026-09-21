---
title: "92. Building a Command-Line Tool"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Building Real Projects"
description: "The Little Book of C — 92. Building a Command-Line Tool"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 92
sidebarWeight: 92
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/092-Building a Command-Line Tool"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/092-Building a Command-Line Tool"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/092-Building a Command-Line Tool)

Command-line tools are where most C programmers begin building real software. They are fast, portable, and integrate naturally with Unix-like environments. In this section, you’ll build a small, self-contained CLI tool that processes input arguments, reads files, and outputs results, the same pattern used by tools like`grep`,`cat`, and`wc`.

#### Step 1. The Goal

We’ll build a simple command-line tool called linestat that:

- Counts lines, words, and characters in a text file (like a mini`wc`).
- Takes input from a file or standard input.
- Accepts flags like`-l`,`-w`,`-c`.
- Uses clean error handling and modular functions.

#### Step 2. Project Layout

```
linestat/
 ├── linestat.c
 ├── Makefile
 └── README.md
```

#### Step 3. Core Concepts

Command-line programs follow a few timeless patterns:

1. Read arguments with`argc` and`argv`.
2. Validate inputs before processing.
3. Open files safely with`fopen` or use`stdin`.
4. Process data line-by-line.
5. Report results clearly and consistently.

#### Step 4. Tiny Code: linestat.c

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
static void print_usage(const char *prog) {
    printf("Usage: %s [-l] [-w] [-c] [file]\n", prog);
    printf("Options:\n");
    printf("  -l   count lines\n");
    printf("  -w   count words\n");
    printf("  -c   count characters\n");
}
int main(int argc, char *argv[]) {
    int count_lines = 0, count_words = 0, count_chars = 0;
    const char *filename = NULL;
    // Parse arguments
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-l") == 0) count_lines = 1;
        else if (strcmp(argv[i], "-w") == 0) count_words = 1;
        else if (strcmp(argv[i], "-c") == 0) count_chars = 1;
        else if (argv[i][0] != '-') filename = argv[i];
        else {
            print_usage(argv[0]);
            return 1;
        }
    }
    FILE *fp = filename ? fopen(filename, "r") : stdin;
    if (!fp) {
        perror("Error opening file");
        return 1;
    }
    long lines = 0, words = 0, chars = 0;
    int in_word = 0;
    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        chars++;
        if (ch == '\n') lines++;
        if (ch == ' ' || ch == '\n' || ch == '\t') in_word = 0;
        else if (!in_word) { words++; in_word = 1; }
    }
    fclose(fp);
    if (!count_lines && !count_words && !count_chars) {
        count_lines = count_words = count_chars = 1; // Default all
    }
    if (count_lines) printf("Lines: %ld\n", lines);
    if (count_words) printf("Words: %ld\n", words);
    if (count_chars) printf("Chars: %ld\n", chars);
    return 0;
}
```

#### Step 5. Build and Run

Makefile

```
CC = gcc
CFLAGS = -std=c23 -O2 -Wall -Wextra
linestat: linestat.c
    $(CC) $(CFLAGS) linestat.c -o linestat
clean:
    rm -f linestat
```

Build it:

```
make
```

Run it:

```
./linestat -l -w -c example.txt
```

Or from a pipeline:

```
cat example.txt | ./linestat -w
```

Example output:

```
Lines: 12
Words: 85
Chars: 430
```

#### Step 6. Breaking Down the Code

- Argument Parsing: Loops through`argv` to detect flags.
- Input Handling: Reads from`stdin` when no file is given.
- Counting Logic: Tracks transitions between spaces and characters to count words.
- Graceful Exit: Uses`fclose` and`perror` for error reporting.
- Default Behavior: When no flags are passed, all counts are printed.

#### Step 7. Making It More Robust

You can extend this program easily:

Add`-q` for quiet mode (only print totals).

Add`--help` for extended usage info.

Use`getline()` for reading full lines (C POSIX).

Print counts side by side in a single line:

```
12  85  430  example.txt
```

#### Step 8. Cross-Platform Considerations

- Use`#ifdef _WIN32` to handle file paths and newline differences.
- Always open files in text mode:`fopen(filename, "r")`.
- Use`size_t` instead of`long` for portability.

#### Step 9. Why It Matters

Writing a CLI teaches key systems skills:

- Argument parsing and I/O
- File handling and error checking
- Performance thinking (streaming, buffering)
- Modular design for future features

Every developer who writes in C eventually writes a CLI, it’s how tools like Git, Curl, and GCC were born.

#### Step 10. Try It Yourself

1. Add a`-v` flag that shows program version.
2. Support reading multiple files.
3. Add timing (use`clock()` to measure runtime).
4. Print totals across all files.
5. Integrate your simplemath library to compute average words per line.

Next, you’ll move to 93. Tiny HTTP Server (Sockets and Threads), where your command-line skills evolve into network programming: accepting connections, handling requests, and serving content in pure C.
