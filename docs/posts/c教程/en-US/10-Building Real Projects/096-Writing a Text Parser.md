---
title: "96. Writing a Text Parser"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Building Real Projects"
description: "The Little Book of C — 96. Writing a Text Parser"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 96
sidebarWeight: 96
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser)

Time to turn raw text into structure. In this section you will write a tiny expression parser that converts strings like`3 + 4*2 - (1 + 5)` into an AST (abstract syntax tree). We will build a simple tokenizer, a recursive descent parser with precedence, and a pretty printer to check the result. In the next section you can add an evaluator to run it.

#### Step 1. Goal and scope

We will parse integer arithmetic with these features:

- Integers:`0`,`42`,`1234`
- Operators:`+`,`-`,`*`,`/`
- Parentheses:`( ... )`
- Whitespace ignored

Output: an AST you can traverse or evaluate later.

#### Step 2. Grammar (informal)

We will use the classic precedence rules:

```
expr   -> term (('+' | '-') term)*
term   -> factor (('*' | '/') factor)*
factor -> INT | '(' expr ')'
```

Parsing follows these functions in order:`parse_expr`,`parse_term`,`parse_factor`.

#### Step 3. Tokens

We first scan characters into tokens:

- `TOK_INT` with a numeric value
- `TOK_PLUS`,`TOK_MINUS`,`TOK_STAR`,`TOK_SLASH`
- `TOK_LPAREN`,`TOK_RPAREN`
- `TOK_EOF` to mark the end

#### Step 4. AST nodes

Use a compact node type:

```
typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV } NodeKind;
typedef struct Node {
    NodeKind kind;
    struct Node *left, *right;  // for binary ops
    long value;                  // for integers
} Node;
```

Binary nodes use`left` and`right`. Integer nodes use`value`.

#### Step 5. A tiny arena for nodes

Allocating nodes frequently with`malloc` is noisy. Use a tiny arena so each node is just a bump allocation and everything frees at once when you are done.

#### Step 6. Error handling strategy

Keep it simple:

- If an unexpected token appears, print a message with the position.
- Stop parsing and return`NULL`.
- The pretty printer will only run if the tree is not`NULL`.

#### Step 7. Pretty printing the AST

To verify parsing, print with minimal parentheses:

- For binary nodes, print`(left op right)`.
- For integers, print the number. This is enough to confirm shape and precedence.

#### Step 8. Tiny Code: self contained lexer + parser + printer

```
// file: expr_parser.c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
/* ---------- tiny arena ---------- */
typedef struct {
    unsigned char *base;
    size_t cap, off;
} Arena;
static Arena *arena_new(size_t cap) {
    Arena *a = malloc(sizeof(*a));
    if (!a) return NULL;
    a->base = malloc(cap);
    if (!a->base) { free(a); return NULL; }
    a->cap = cap; a->off = 0;
    return a;
}
static void *arena_alloc(Arena *a, size_t n, size_t align) {
    size_t p = (a->off + (align - 1)) & ~(align - 1);
    if (p + n > a->cap) return NULL;
    void *ptr = a->base + p; a->off = p + n; return ptr;
}
static void arena_free(Arena *a) { if (!a) return; free(a->base); free(a); }
/* ---------- tokens ---------- */
typedef enum {
    TOK_INT, TOK_PLUS, TOK_MINUS, TOK_STAR, TOK_SLASH,
    TOK_LPAREN, TOK_RPAREN, TOK_EOF, TOK_ERR
} TokKind;
typedef struct {
    TokKind kind;
    long    ival;
    const char *start;  // for error messages
    const char *end;
} Token;
typedef struct {
    const char *src;
    const char *cur;
    Token       look;   // one-token lookahead
} Lexer;
static void skip_ws(Lexer *L) {
    while (isspace((unsigned char)*L->cur)) L->cur++;
}
static Token make(Lexer *L, TokKind k, const char *s, const char *e, long v) {
    Token t = {k, v, s, e};
    return t;
}
static Token next_token_raw(Lexer *L) {
    skip_ws(L);
    const char *s = L->cur;
    if (*L->cur == 0) return make(L, TOK_EOF, s, s, 0);
    char c = *L->cur++;
    switch (c) {
        case '+': return make(L, TOK_PLUS,   s, L->cur, 0);
        case '-': return make(L, TOK_MINUS,  s, L->cur, 0);
        case '*': return make(L, TOK_STAR,   s, L->cur, 0);
        case '/': return make(L, TOK_SLASH,  s, L->cur, 0);
        case '(': return make(L, TOK_LPAREN, s, L->cur, 0);
        case ')': return make(L, TOK_RPAREN, s, L->cur, 0);
        default:
            if (isdigit((unsigned char)c)) {
                long v = c - '0';
                const char *p = L->cur;
                while (isdigit((unsigned char)*p)) {
                    v = v * 10 + (*p - '0');
                    p++;
                }
                Token t = make(L, TOK_INT, s, p, v);
                L->cur = p;
                return t;
            }
            return make(L, TOK_ERR, s, L->cur, 0);
    }
}
static void lexer_init(Lexer *L, const char *src) {
    L->src = src; L->cur = src; L->look = next_token_raw(L);
}
static Token peek(Lexer *L) { return L->look; }
static Token take(Lexer *L) { Token t = L->look; L->look = next_token_raw(L); return t; }
/* ---------- AST ---------- */
typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV } NodeKind;
typedef struct Node {
    NodeKind kind;
    struct Node *l, *r;
    long value;
} Node;
static Node *node_new_int(Arena *A, long v) {
    Node *n = arena_alloc(A, sizeof(*n), _Alignof(Node));
    if (!n) return NULL;
    n->kind = N_INT; n->l = n->r = NULL; n->value = v; return n;
}
static Node *node_new_bin(Arena *A, NodeKind k, Node *l, Node *r) {
    Node *n = arena_alloc(A, sizeof(*n), _Alignof(Node));
    if (!n) return NULL;
    n->kind = k; n->l = l; n->r = r; n->value = 0; return n;
}
/* ---------- parser: expr -> term -> factor ---------- */
typedef struct { Lexer *L; Arena *A; int ok; } Parser;
static void fail(Parser *P, const char *msg, Token t) {
    P->ok = 0;
    size_t pos = (size_t)(t.start - P->L->src);
    fprintf(stderr, "Parse error at pos %zu: %s\n", pos, msg);
}
static Node *parse_expr(Parser *P); // forward
static Node *parse_factor(Parser *P) {
    Token t = peek(P->L);
    if (t.kind == TOK_INT) { take(P->L); return node_new_int(P->A, t.ival); }
    if (t.kind == TOK_LPAREN) {
        take(P->L);
        Node *inside = parse_expr(P);
        if (!P->ok) return NULL;
        if (peek(P->L).kind != TOK_RPAREN) { fail(P, "expected ')'", peek(P->L)); return NULL; }
        take(P->L);
        return inside;
    }
    fail(P, "expected number or '('", t);
    return NULL;
}
static Node *parse_term(Parser *P) {
    Node *n = parse_factor(P);
    while (P->ok) {
        TokKind k = peek(P->L).kind;
        if (k != TOK_STAR && k != TOK_SLASH) break;
        take(P->L);
        Node *r = parse_factor(P);
        if (!r) return NULL;
        n = node_new_bin(P->A, k == TOK_STAR ? N_MUL : N_DIV, n, r);
        if (!n) { P->ok = 0; return NULL; }
    }
    return n;
}
static Node *parse_expr(Parser *P) {
    Node *n = parse_term(P);
    while (P->ok) {
        TokKind k = peek(P->L).kind;
        if (k != TOK_PLUS && k != TOK_MINUS) break;
        take(P->L);
        Node *r = parse_term(P);
        if (!r) return NULL;
        n = node_new_bin(P->A, k == TOK_PLUS ? N_ADD : N_SUB, n, r);
        if (!n) { P->ok = 0; return NULL; }
    }
    return n;
}
/* ---------- printer ---------- */
static void print_ast(Node *n) {
    if (!n) return;
    switch (n->kind) {
        case N_INT: printf("%ld", n->value); break;
        case N_ADD: printf("("); print_ast(n->l); printf(" + "); print_ast(n->r); printf(")"); break;
        case N_SUB: printf("("); print_ast(n->l); printf(" - "); print_ast(n->r); printf(")"); break;
        case N_MUL: printf("("); print_ast(n->l); printf(" * "); print_ast(n->r); printf(")"); break;
        case N_DIV: printf("("); print_ast(n->l); printf(" / "); print_ast(n->r); printf(")"); break;
    }
}
/* ---------- main for quick testing ---------- */
int main(int argc, char **argv) {
    const char *src = (argc > 1) ? argv[1] : "3 + 4*2 - (1 + 5)";
    Lexer L; lexer_init(&L, src);
    Arena *A = arena_new(1 << 16);
    if (!A) { fprintf(stderr, "arena alloc failed\n"); return 1; }
    Parser P = { .L = &L, .A = A, .ok = 1 };
    Node *root = parse_expr(&P);
    if (P.ok && peek(&L).kind == TOK_EOF && root) {
        print_ast(root);
        printf("\n");
    } else {
        fprintf(stderr, "Failed to parse input.\n");
    }
    arena_free(A);
    return P.ok ? 0 : 1;
}
```

Build and run:

```
gcc -std=c23 -O2 -Wall -Wextra expr_parser.c -o expr_parser
./expr_parser "3 + 4*2 - (1 + 5)"
```

Example output:

```
((3 + (4 * 2)) - (1 + 5))
```

This shows correct precedence and grouping.

#### Step 9. How to extend it

- Add unary`+` and unary`-` in`parse_factor`.
- Support integers in hex and underscores like`1_000`.
- Add power operator`^` with higher precedence.
- Record source spans on each node for better error messages.
- Swap the pretty printer for a JSON dump of the AST.

#### Step 10. Why this matters

Parsing transforms bytes into meaning. With a tokenizer, a clean grammar, and a small AST, you can build:

- Expression evaluators
- Config file readers
- Query languages
- Full interpreters

In the next section you will use this AST to build a tiny interpreter that evaluates expressions at runtime.
