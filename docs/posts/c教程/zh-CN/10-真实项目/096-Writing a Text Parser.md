---
title: "96. 编写文本解析器"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 96. 编写文本解析器"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 96
sidebarWeight: 96
alternateZh: "/posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser)

是时候将原始文本转化为结构了。在本节中，您将编写一个小型表达式解析器，用于转换字符串，例如`3 + 4*2 - (1 + 5)`转化为 AST（抽象语法树）。我们将构建一个简单的分词器、一个具有优先级的递归下降解析器以及一个漂亮的打印机来检查结果。在下一部分中，您可以添加一个评估器来运行它。

#### 步骤 1. 目标和范围

我们将使用以下功能解析整数算术：

- 整数：`0`,`42`,`1234`
- 运营商：`+`,`-`,`*`,`/`
- 括号：`( ... )`
- 空白被忽略

输出：您可以稍后遍历或评估的 AST。

#### 步骤 2. 语法（非正式）

我们将使用经典的优先规则：

```
expr   -> term (('+' | '-') term)*
term   -> factor (('*' | '/') factor)*
factor -> INT | '(' expr ')'
```

解析按顺序遵循这些函数：`parse_expr`,`parse_term`,`parse_factor`.

#### 步骤 3. 代币

我们首先将字符扫描成标记：

-`TOK_INT`带有数值
-`TOK_PLUS`,`TOK_MINUS`,`TOK_STAR`,`TOK_SLASH`
-`TOK_LPAREN`,`TOK_RPAREN`
-`TOK_EOF`来标记结束

#### 步骤 4. AST 节点

使用紧凑节点类型：

```
typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV } NodeKind;
typedef struct Node {
    NodeKind kind;
    struct Node *left, *right;  // for binary ops
    long value;                  // for integers
} Node;
```

二进制节点使用`left`和`right`。整数节点使用`value`.

#### 第 5 步：节点的小舞台

频繁分配节点`malloc`很吵。使用一个小竞技场，这样每个节点都只是一个凹凸分配，当你完成后，所有的东西都会立即释放。

#### 步骤 6. 错误处理策略

保持简单：

- 如果出现意外标记，请打印一条包含该位置的消息。
- 停止解析并返回`NULL`.
- 漂亮的打印机只有在树不存在时才会运行`NULL`.

#### 步骤 7. 漂亮地打印 AST

要验证解析，请使用最少的括号进行打印：

- 对于二进制节点，打印`(left op right)`.
- 对于整数，打印数字。这足以确认形状和优先级。

#### 步骤 8. Tiny Code：自包含词法分析器 + 解析器 + 打印机

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

构建并运行：

```
gcc -std=c23 -O2 -Wall -Wextra expr_parser.c -o expr_parser
./expr_parser "3 + 4*2 - (1 + 5)"
```

输出示例：

```
((3 + (4 * 2)) - (1 + 5))
```

这显示了正确的优先级和分组。

#### 步骤 9. 如何扩展

- 添加一元`+`和一元`-`在`parse_factor`.
- 支持十六进制整数和下划线，例如`1_000`.
- 添加电源操作员`^`具有更高的优先级。
- 记录每个节点上的源跨度以获得更好的错误消息。
- 将漂亮的打印机替换为 AST 的 JSON 转储。

#### 第 10 步：为什么这很重要

解析将字节转换为含义。使用分词器、简洁的语法和小型 AST，您可以构建：

- 表达评估器
- 配置文件读取器
- 查询语言
- 全程口译员

在下一节中，您将使用此 AST 构建一个小型解释器，在运行时计算表达式。
