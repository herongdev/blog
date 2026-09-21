---
title: "44. Working with stdin, stdout, and stderr"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 44. Working with stdin, stdout, and stderr"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 44
sidebarWeight: 44
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/044-Working with stdin, stdout, and stderr"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/044-Working with stdin, stdout, and stderr"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/044-Working with stdin, stdout, and stderr)

Every C program automatically starts with three open streams connected to your environment, the keyboard, the terminal screen, and the error console. They are the standard I/O streams that make your programs flexible and scriptable.

Understanding these three streams is crucial for writing tools that can interact with files, pipes, and other programs, the essence of Unix-style design.

#### The Three Standard Streams

| Stream | Purpose | Typical Device | Example Use |
| --- | --- | --- | --- |
| `stdin` | Standard Input | Keyboard (or file via`<`) | `scanf`,`fgets` |
| `stdout` | Standard Output | Screen (or file via`>`) | `printf`,`puts`,`fprintf(stdout, …)` |
| `stderr` | Standard Error | Screen (separate from stdout) | `fprintf(stderr, …)` |

These are all of type`FILE *`. You can treat them like normal file pointers, reading, writing, or redirecting them.

#### Basic Example

```
#include <stdio.h>
int main(void) {
    char name[50];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    fprintf(stdout, "Hello, %s", name);
    fprintf(stderr, "Note: This is an example error message.\n");
    return 0;
}
```

Output:

```
Enter your name: Alice
Hello, Alice
Note: This is an example error message.
```

#### Redirection in the Shell

You can redirect each stream separately:

```
./program < input.txt > output.txt 2> errors.log
```

- `<` replaces`stdin`(read input from file)
- `>` replaces`stdout`(write normal output to file)
- `2>` replaces`stderr`(write errors to file)

You can also combine them:

```
./program > all_output.txt 2>&1
```

This merges both output and error streams into one file.

#### Reading from stdin

You can build programs that process input dynamically, one line at a time:

```
#include <stdio.h>
int main(void) {
    char line[100];
    printf("Enter text (Ctrl+D to stop):\n");
    while (fgets(line, sizeof(line), stdin))
        printf("You said: %s", line);
    return 0;
}
```

Now your program behaves like a Unix filter, it can read from a file, a pipe, or a keyboard input interchangeably.

Example:

```
echo "hello" | ./program
```

Output:

```
You said: hello
```

#### Writing to stdout and stderr

`stdout` is for normal program output, while`stderr` is for error messages or logs.

```
#include <stdio.h>
int main(void) {
    fprintf(stdout, "Everything is fine.\n");
    fprintf(stderr, "Warning: something might be wrong.\n");
    return 0;
}
```

You can suppress normal output but keep errors:

```
./program > /dev/null
```

Output:

```
Warning: something might be wrong.
```

#### Tiny Code: Word Counter Using stdin/stdout

This small program mimics a simplified version of the Unix`wc` command.

```
#include <stdio.h>
#include <ctype.h>
int main(void) {
    int ch, words = 0, in_word = 0;
    while ((ch = getchar()) != EOF) {
        if (isspace(ch))
            in_word = 0;
        else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    printf("Word count: %d\n", words);
    return 0;
}
```

Try:

```
echo "C is small but powerful" | ./wordcount
```

Output:

```
Word count: 4
```

#### Mixing stdout and stderr

Sometimes you need to log progress to`stderr` while outputting results to`stdout`. That way, logs don’t pollute the actual data.

```
#include <stdio.h>
int main(void) {
    for (int i = 0; i < 3; i++) {
        fprintf(stderr, "Processing item %d...\n", i + 1);
        fprintf(stdout, "Item %d processed\n", i + 1);
    }
    return 0;
}
```

Redirect logs separately:

```
./program > result.txt 2> log.txt
```

#### Flushing Buffers

Output streams are buffered, data isn’t written until the buffer is full or flushed. To ensure output appears immediately:

```
fflush(stdout);  // flush output buffer
```

This is useful for interactive programs.

#### Why It Matters

These three streams give your program flexibility:

- Work interactively (keyboard/screen)
- Work in batch (file input/output)
- Chain with other tools using pipes

They are the foundation of the Unix philosophy: small programs that do one thing well and can be composed together.

#### Try It Yourself

1. Write a program that reads from stdin and prints only lines containing a given keyword.
2. Print errors to stderr if no keyword is provided.
3. Redirect input and output from files using`<` and`>`.
4. Add progress messages to stderr and redirect them to a separate log.
5. Combine everything into a small “filter” tool that processes text from pipelines.

With`stdin`,`stdout`, and`stderr`, your C programs become tools that fit seamlessly into real workflows, able to interact with files, other programs, and users alike. Next, you’ll explore buffered I/O, understanding how the C library optimizes performance through read and write buffers using`fgets`,`fputs`, and more.
