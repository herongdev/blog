---
title: "100. Practice: Build Your Own Mini Project"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Building Real Projects]"
description: "The Little Book of C — 100. Practice: Build Your Own Mini Project"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "100"
sidebarWeight: "100"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/100-Practice Build Your Own Mini Project"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/100-Practice Build Your Own Mini Project"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/100-Practice Build Your Own Mini Project)

#### Follow-Along Deliverable

- Assumed state: lessons 001-099 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/100-tinynotes`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/100-tinynotes && cd ~/c-course-labs/100-tinynotes`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\100-tinynotes"; Set-Location "$HOME\c-course-labs\100-tinynotes"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record `add`, `list`, and `clear` output, generated data file, README, Makefile, and version tag.
- Boundary for this lab: This lab turns the course into a deliverable tool. Do not start with databases, encryption, or network sync; stabilize the minimum version first.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

You’ve walked through all the essential layers of C, syntax, memory, data structures, file I/O, compilation, debugging, and even packaging. Now you’ll bring it all together by building a complete mini project from scratch.

This final section is a synthesis: plan, design, implement, test, and document a small, useful system in pure C.

#### Step 1. Choose your project scope

Pick something small enough to finish but rich enough to touch multiple topics. Here are three good options:

Option A: A Tiny Note Manager

- Command line tool to add, list, and delete notes
- Stores data in a simple binary file
- Indexes notes by ID

Option B: A Simple HTTP Server

- Serves static files from a directory
- Uses sockets (`socket`,`bind`,`listen`,`accept`)
- Logs each request to a file

Option C: A Tiny Key-Value Store

- Command line tool with commands`put`,`get`,`list`,`delete`
- Uses`fopen`,`fread`, and`fwrite`
- Optional: add LevelDB or SQLite backend

#### Step 2. Plan your structure

Example: for the Tiny Note Manager

```
tinynotes/
├── include/
│   └── tinynotes.h
├── src/
│   ├── main.c
│   ├── notes.c
│   └── util.c
├── data/
│   └── notes.bin
├── Makefile
├── README.md
└── LICENSE
```

#### Step 3. Tiny Code: minimal working version

Build the minimum runnable version as one file first. `tinynotes.c` owns command parsing, file I/O, and the note structure for now; after this version is stable, split it into `main.c`, `notes.c`, and `tinynotes.h` using the structure above.

```c
// file: tinynotes.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NOTE_LEN 256
#define DATA_FILE "notes.bin"

typedef struct {
    int id;
    char text[MAX_NOTE_LEN];
} Note;

/* Stops the program with the current system error when file work fails. */
static void die(const char *message) {
    perror(message);
    exit(EXIT_FAILURE);
}

/* Returns the byte size of the opened data file. */
static long current_file_size(FILE *f) {
    if (fseek(f, 0, SEEK_END) != 0) {
        die("seek");
    }

    long size = ftell(f);
    if (size < 0) {
        die("tell");
    }

    return size;
}

/* Appends one note to notes.bin and assigns the next sequential id. */
static void add_note(const char *msg) {
    FILE *f = fopen(DATA_FILE, "ab+");
    if (!f) {
        die("open");
    }

    Note n = {0};
    long size = current_file_size(f);

    n.id = (int)(size / sizeof(Note)) + 1;
    strncpy(n.text, msg, MAX_NOTE_LEN - 1);
    n.text[MAX_NOTE_LEN - 1] = '\0';

    if (fwrite(&n, sizeof(n), 1, f) != 1) {
        fclose(f);
        die("write");
    }

    if (fclose(f) != 0) {
        die("close");
    }

    printf("Added note %d: %s\n", n.id, n.text);
}

/* Reads notes.bin from the beginning and prints every stored note. */
static void list_notes(void) {
    FILE *f = fopen(DATA_FILE, "rb");
    if (!f) {
        puts("No notes yet.");
        return;
    }

    Note n;
    while (fread(&n, sizeof(n), 1, f) == 1) {
        printf("%d: %s\n", n.id, n.text);
    }

    if (ferror(f)) {
        fclose(f);
        die("read");
    }

    if (fclose(f) != 0) {
        die("close");
    }
}

/* Deletes the demo data file so the lab can be reset safely. */
static void clear_notes(void) {
    if (remove(DATA_FILE) == 0)
        puts("All notes deleted.");
    else
        puts("No notes to delete.");
}

/* Parses the command line and routes each command to the right operation. */
int main(int argc, char **argv) {
    if (argc < 2) {
        puts("Usage: tinynotes <add|list|clear> [message]");
        return EXIT_FAILURE;
    }

    if (strcmp(argv[1], "add") == 0 && argc >= 3) {
        add_note(argv[2]);
    } else if (strcmp(argv[1], "list") == 0) {
        list_notes();
    } else if (strcmp(argv[1], "clear") == 0) {
        clear_notes();
    } else {
        puts("Invalid command.");
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
```

Build it:

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic -g tinynotes.c -o tinynotes
```

Try it:

```
./tinynotes add "Learn C deeply"
./tinynotes add "Write clear code"
./tinynotes list
```

Output:

```
Added note 1: Learn C deeply
Added note 2: Write clear code
1: Learn C deeply
2: Write clear code
```

#### Call Chain and Data Flow

```text
command-line arguments
-> main()
-> add_note() / list_notes() / clear_notes()
-> notes.bin
-> terminal output
```

`main()` only recognizes commands and dispatches operations. `add_note()` appends a record and creates the next ID. `list_notes()` reads the file sequentially. `clear_notes()` only resets the data file. `notes.bin` is the only persistence artifact in this version; record it and the terminal transcript in `evidence.md`.

#### Step 4. Extend it

Add these small improvements:

- `tinynotes delete ` to remove a note by index
- Store creation time (`time_t`)
- Save to a user-specific directory (`~/.tinynotes/`)
- Encrypt notes with XOR or AES before writing (optional)
- Add JSON export using`fprintf`

#### Step 5. Package it

Add a Makefile:

```
CC=gcc
CFLAGS=-std=c17 -O2 -Wall -Wextra -Wpedantic
TARGET=tinynotes
all:
    $(CC) $(CFLAGS) tinynotes.c -o $(TARGET)
install:
    cp $(TARGET) /usr/local/bin/
clean:
    rm -f $(TARGET)
```

Install:

```
sudo make install
```

Now you can type`tinynotes list` from anywhere.

#### Step 6. Document it

README.md

```
# tinynotes
A simple command-line note manager written in C.
## Build
make
sudo make install
## Usage
tinynotes add "hello world"
tinynotes list
tinynotes clear
```

#### Acceptance Checklist

- `gcc -std=c17 -Wall -Wextra -Wpedantic -g tinynotes.c -o tinynotes` finishes with no warnings.
- `./tinynotes list` prints `No notes yet.` when no data file exists.
- After two `add` commands, `list` shows increasing IDs.
- `./tinynotes clear` deletes `notes.bin`, and `list` returns to the empty state.
- `evidence.md` records input, expected behavior, actual behavior, generated `notes.bin`, one invalid command, and the next improvement.

#### Step 7. Version and license

Tag your release:

```
git tag -a v0.1.0 -m "first public release"
```

Add`LICENSE`(MIT, Apache, or GPL). Publish it on GitHub if you want others to use or contribute.

#### Step 8. Why this matters

This is how small programs grow into tools:

- Real file I/O
- Error handling
- Build automation
- Documentation and versioning

C gives you the power to build precise, fast, and minimal software. You now know every layer—from compiler to system call.

#### Step 9. Try it yourself

1. Replace file storage with SQLite or LevelDB
2. Add`search` and`sort`
3. Build a networked version that syncs notes over sockets
4. Add a unit test suite with assertions
5. Package your project as a`.deb` or`.tar.gz`

#### Step 10. Congratulations

You’ve reached the end of The Little Book of C.

You started from`printf("Hello, World");` and finished with building, packaging, and documenting full working systems.

You now have the foundation to explore:

- Operating Systems
- Compilers and Interpreters
- Embedded Systems
- Databases and Networking

C is not just a language. It is the foundation of computing. You now speak it fluently, like a systems engineer.

You’ve reached the final page, the quiet epilogue of The Little Book of C.

Let’s close this journey the same way C programs begin: with clarity, purpose, and curiosity.
