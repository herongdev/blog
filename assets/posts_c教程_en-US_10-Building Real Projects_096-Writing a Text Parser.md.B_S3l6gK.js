import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"96. Writing a Text Parser","description":"The Little Book of C — 96. Writing a Text Parser","frontmatter":{"title":"96. Writing a Text Parser","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Building Real Projects"],"description":"The Little Book of C — 96. Writing a Text Parser","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":96,"sidebarWeight":96,"lang":"en-US","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser","alternateZh":"/posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser"},"headers":[],"relativePath":"posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser.md","filePath":"posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser.md"};function i(l,n,r,c,o,d){return a(),e("div",null,[...n[0]||(n[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser)</p><p>Time to turn raw text into structure. In this section you will write a tiny expression parser that converts strings like<code>3 + 4*2 - (1 + 5)</code> into an AST (abstract syntax tree). We will build a simple tokenizer, a recursive descent parser with precedence, and a pretty printer to check the result. In the next section you can add an evaluator to run it.</p><h4 id="step-1-goal-and-scope" tabindex="-1">Step 1. Goal and scope <a class="header-anchor" href="#step-1-goal-and-scope" aria-label="Permalink to &quot;Step 1. Goal and scope&quot;">​</a></h4><p>We will parse integer arithmetic with these features:</p><ul><li>Integers:<code>0</code>,<code>42</code>,<code>1234</code></li><li>Operators:<code>+</code>,<code>-</code>,<code>*</code>,<code>/</code></li><li>Parentheses:<code>( ... )</code></li><li>Whitespace ignored</li></ul><p>Output: an AST you can traverse or evaluate later.</p><h4 id="step-2-grammar-informal" tabindex="-1">Step 2. Grammar (informal) <a class="header-anchor" href="#step-2-grammar-informal" aria-label="Permalink to &quot;Step 2. Grammar (informal)&quot;">​</a></h4><p>We will use the classic precedence rules:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>expr   -&gt; term ((&#39;+&#39; | &#39;-&#39;) term)*</span></span>
<span class="line"><span>term   -&gt; factor ((&#39;*&#39; | &#39;/&#39;) factor)*</span></span>
<span class="line"><span>factor -&gt; INT | &#39;(&#39; expr &#39;)&#39;</span></span></code></pre></div><p>Parsing follows these functions in order:<code>parse_expr</code>,<code>parse_term</code>,<code>parse_factor</code>.</p><h4 id="step-3-tokens" tabindex="-1">Step 3. Tokens <a class="header-anchor" href="#step-3-tokens" aria-label="Permalink to &quot;Step 3. Tokens&quot;">​</a></h4><p>We first scan characters into tokens:</p><ul><li><code>TOK_INT</code> with a numeric value</li><li><code>TOK_PLUS</code>,<code>TOK_MINUS</code>,<code>TOK_STAR</code>,<code>TOK_SLASH</code></li><li><code>TOK_LPAREN</code>,<code>TOK_RPAREN</code></li><li><code>TOK_EOF</code> to mark the end</li></ul><h4 id="step-4-ast-nodes" tabindex="-1">Step 4. AST nodes <a class="header-anchor" href="#step-4-ast-nodes" aria-label="Permalink to &quot;Step 4. AST nodes&quot;">​</a></h4><p>Use a compact node type:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV } NodeKind;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    NodeKind kind;</span></span>
<span class="line"><span>    struct Node *left, *right;  // for binary ops</span></span>
<span class="line"><span>    long value;                  // for integers</span></span>
<span class="line"><span>} Node;</span></span></code></pre></div><p>Binary nodes use<code>left</code> and<code>right</code>. Integer nodes use<code>value</code>.</p><h4 id="step-5-a-tiny-arena-for-nodes" tabindex="-1">Step 5. A tiny arena for nodes <a class="header-anchor" href="#step-5-a-tiny-arena-for-nodes" aria-label="Permalink to &quot;Step 5. A tiny arena for nodes&quot;">​</a></h4><p>Allocating nodes frequently with<code>malloc</code> is noisy. Use a tiny arena so each node is just a bump allocation and everything frees at once when you are done.</p><h4 id="step-6-error-handling-strategy" tabindex="-1">Step 6. Error handling strategy <a class="header-anchor" href="#step-6-error-handling-strategy" aria-label="Permalink to &quot;Step 6. Error handling strategy&quot;">​</a></h4><p>Keep it simple:</p><ul><li>If an unexpected token appears, print a message with the position.</li><li>Stop parsing and return<code>NULL</code>.</li><li>The pretty printer will only run if the tree is not<code>NULL</code>.</li></ul><h4 id="step-7-pretty-printing-the-ast" tabindex="-1">Step 7. Pretty printing the AST <a class="header-anchor" href="#step-7-pretty-printing-the-ast" aria-label="Permalink to &quot;Step 7. Pretty printing the AST&quot;">​</a></h4><p>To verify parsing, print with minimal parentheses:</p><ul><li>For binary nodes, print<code>(left op right)</code>.</li><li>For integers, print the number. This is enough to confirm shape and precedence.</li></ul><h4 id="step-8-tiny-code-self-contained-lexer-parser-printer" tabindex="-1">Step 8. Tiny Code: self contained lexer + parser + printer <a class="header-anchor" href="#step-8-tiny-code-self-contained-lexer-parser-printer" aria-label="Permalink to &quot;Step 8. Tiny Code: self contained lexer + parser + printer&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: expr_parser.c</span></span>
<span class="line"><span>#define _POSIX_C_SOURCE 200809L</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;ctype.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>/* ---------- tiny arena ---------- */</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    unsigned char *base;</span></span>
<span class="line"><span>    size_t cap, off;</span></span>
<span class="line"><span>} Arena;</span></span>
<span class="line"><span>static Arena *arena_new(size_t cap) {</span></span>
<span class="line"><span>    Arena *a = malloc(sizeof(*a));</span></span>
<span class="line"><span>    if (!a) return NULL;</span></span>
<span class="line"><span>    a-&gt;base = malloc(cap);</span></span>
<span class="line"><span>    if (!a-&gt;base) { free(a); return NULL; }</span></span>
<span class="line"><span>    a-&gt;cap = cap; a-&gt;off = 0;</span></span>
<span class="line"><span>    return a;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static void *arena_alloc(Arena *a, size_t n, size_t align) {</span></span>
<span class="line"><span>    size_t p = (a-&gt;off + (align - 1)) &amp; ~(align - 1);</span></span>
<span class="line"><span>    if (p + n &gt; a-&gt;cap) return NULL;</span></span>
<span class="line"><span>    void *ptr = a-&gt;base + p; a-&gt;off = p + n; return ptr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static void arena_free(Arena *a) { if (!a) return; free(a-&gt;base); free(a); }</span></span>
<span class="line"><span>/* ---------- tokens ---------- */</span></span>
<span class="line"><span>typedef enum {</span></span>
<span class="line"><span>    TOK_INT, TOK_PLUS, TOK_MINUS, TOK_STAR, TOK_SLASH,</span></span>
<span class="line"><span>    TOK_LPAREN, TOK_RPAREN, TOK_EOF, TOK_ERR</span></span>
<span class="line"><span>} TokKind;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    TokKind kind;</span></span>
<span class="line"><span>    long    ival;</span></span>
<span class="line"><span>    const char *start;  // for error messages</span></span>
<span class="line"><span>    const char *end;</span></span>
<span class="line"><span>} Token;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    const char *src;</span></span>
<span class="line"><span>    const char *cur;</span></span>
<span class="line"><span>    Token       look;   // one-token lookahead</span></span>
<span class="line"><span>} Lexer;</span></span>
<span class="line"><span>static void skip_ws(Lexer *L) {</span></span>
<span class="line"><span>    while (isspace((unsigned char)*L-&gt;cur)) L-&gt;cur++;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Token make(Lexer *L, TokKind k, const char *s, const char *e, long v) {</span></span>
<span class="line"><span>    Token t = {k, v, s, e};</span></span>
<span class="line"><span>    return t;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Token next_token_raw(Lexer *L) {</span></span>
<span class="line"><span>    skip_ws(L);</span></span>
<span class="line"><span>    const char *s = L-&gt;cur;</span></span>
<span class="line"><span>    if (*L-&gt;cur == 0) return make(L, TOK_EOF, s, s, 0);</span></span>
<span class="line"><span>    char c = *L-&gt;cur++;</span></span>
<span class="line"><span>    switch (c) {</span></span>
<span class="line"><span>        case &#39;+&#39;: return make(L, TOK_PLUS,   s, L-&gt;cur, 0);</span></span>
<span class="line"><span>        case &#39;-&#39;: return make(L, TOK_MINUS,  s, L-&gt;cur, 0);</span></span>
<span class="line"><span>        case &#39;*&#39;: return make(L, TOK_STAR,   s, L-&gt;cur, 0);</span></span>
<span class="line"><span>        case &#39;/&#39;: return make(L, TOK_SLASH,  s, L-&gt;cur, 0);</span></span>
<span class="line"><span>        case &#39;(&#39;: return make(L, TOK_LPAREN, s, L-&gt;cur, 0);</span></span>
<span class="line"><span>        case &#39;)&#39;: return make(L, TOK_RPAREN, s, L-&gt;cur, 0);</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            if (isdigit((unsigned char)c)) {</span></span>
<span class="line"><span>                long v = c - &#39;0&#39;;</span></span>
<span class="line"><span>                const char *p = L-&gt;cur;</span></span>
<span class="line"><span>                while (isdigit((unsigned char)*p)) {</span></span>
<span class="line"><span>                    v = v * 10 + (*p - &#39;0&#39;);</span></span>
<span class="line"><span>                    p++;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                Token t = make(L, TOK_INT, s, p, v);</span></span>
<span class="line"><span>                L-&gt;cur = p;</span></span>
<span class="line"><span>                return t;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return make(L, TOK_ERR, s, L-&gt;cur, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static void lexer_init(Lexer *L, const char *src) {</span></span>
<span class="line"><span>    L-&gt;src = src; L-&gt;cur = src; L-&gt;look = next_token_raw(L);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Token peek(Lexer *L) { return L-&gt;look; }</span></span>
<span class="line"><span>static Token take(Lexer *L) { Token t = L-&gt;look; L-&gt;look = next_token_raw(L); return t; }</span></span>
<span class="line"><span>/* ---------- AST ---------- */</span></span>
<span class="line"><span>typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV } NodeKind;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    NodeKind kind;</span></span>
<span class="line"><span>    struct Node *l, *r;</span></span>
<span class="line"><span>    long value;</span></span>
<span class="line"><span>} Node;</span></span>
<span class="line"><span>static Node *node_new_int(Arena *A, long v) {</span></span>
<span class="line"><span>    Node *n = arena_alloc(A, sizeof(*n), _Alignof(Node));</span></span>
<span class="line"><span>    if (!n) return NULL;</span></span>
<span class="line"><span>    n-&gt;kind = N_INT; n-&gt;l = n-&gt;r = NULL; n-&gt;value = v; return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Node *node_new_bin(Arena *A, NodeKind k, Node *l, Node *r) {</span></span>
<span class="line"><span>    Node *n = arena_alloc(A, sizeof(*n), _Alignof(Node));</span></span>
<span class="line"><span>    if (!n) return NULL;</span></span>
<span class="line"><span>    n-&gt;kind = k; n-&gt;l = l; n-&gt;r = r; n-&gt;value = 0; return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* ---------- parser: expr -&gt; term -&gt; factor ---------- */</span></span>
<span class="line"><span>typedef struct { Lexer *L; Arena *A; int ok; } Parser;</span></span>
<span class="line"><span>static void fail(Parser *P, const char *msg, Token t) {</span></span>
<span class="line"><span>    P-&gt;ok = 0;</span></span>
<span class="line"><span>    size_t pos = (size_t)(t.start - P-&gt;L-&gt;src);</span></span>
<span class="line"><span>    fprintf(stderr, &quot;Parse error at pos %zu: %s\\n&quot;, pos, msg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Node *parse_expr(Parser *P); // forward</span></span>
<span class="line"><span>static Node *parse_factor(Parser *P) {</span></span>
<span class="line"><span>    Token t = peek(P-&gt;L);</span></span>
<span class="line"><span>    if (t.kind == TOK_INT) { take(P-&gt;L); return node_new_int(P-&gt;A, t.ival); }</span></span>
<span class="line"><span>    if (t.kind == TOK_LPAREN) {</span></span>
<span class="line"><span>        take(P-&gt;L);</span></span>
<span class="line"><span>        Node *inside = parse_expr(P);</span></span>
<span class="line"><span>        if (!P-&gt;ok) return NULL;</span></span>
<span class="line"><span>        if (peek(P-&gt;L).kind != TOK_RPAREN) { fail(P, &quot;expected &#39;)&#39;&quot;, peek(P-&gt;L)); return NULL; }</span></span>
<span class="line"><span>        take(P-&gt;L);</span></span>
<span class="line"><span>        return inside;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fail(P, &quot;expected number or &#39;(&#39;&quot;, t);</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Node *parse_term(Parser *P) {</span></span>
<span class="line"><span>    Node *n = parse_factor(P);</span></span>
<span class="line"><span>    while (P-&gt;ok) {</span></span>
<span class="line"><span>        TokKind k = peek(P-&gt;L).kind;</span></span>
<span class="line"><span>        if (k != TOK_STAR &amp;&amp; k != TOK_SLASH) break;</span></span>
<span class="line"><span>        take(P-&gt;L);</span></span>
<span class="line"><span>        Node *r = parse_factor(P);</span></span>
<span class="line"><span>        if (!r) return NULL;</span></span>
<span class="line"><span>        n = node_new_bin(P-&gt;A, k == TOK_STAR ? N_MUL : N_DIV, n, r);</span></span>
<span class="line"><span>        if (!n) { P-&gt;ok = 0; return NULL; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Node *parse_expr(Parser *P) {</span></span>
<span class="line"><span>    Node *n = parse_term(P);</span></span>
<span class="line"><span>    while (P-&gt;ok) {</span></span>
<span class="line"><span>        TokKind k = peek(P-&gt;L).kind;</span></span>
<span class="line"><span>        if (k != TOK_PLUS &amp;&amp; k != TOK_MINUS) break;</span></span>
<span class="line"><span>        take(P-&gt;L);</span></span>
<span class="line"><span>        Node *r = parse_term(P);</span></span>
<span class="line"><span>        if (!r) return NULL;</span></span>
<span class="line"><span>        n = node_new_bin(P-&gt;A, k == TOK_PLUS ? N_ADD : N_SUB, n, r);</span></span>
<span class="line"><span>        if (!n) { P-&gt;ok = 0; return NULL; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* ---------- printer ---------- */</span></span>
<span class="line"><span>static void print_ast(Node *n) {</span></span>
<span class="line"><span>    if (!n) return;</span></span>
<span class="line"><span>    switch (n-&gt;kind) {</span></span>
<span class="line"><span>        case N_INT: printf(&quot;%ld&quot;, n-&gt;value); break;</span></span>
<span class="line"><span>        case N_ADD: printf(&quot;(&quot;); print_ast(n-&gt;l); printf(&quot; + &quot;); print_ast(n-&gt;r); printf(&quot;)&quot;); break;</span></span>
<span class="line"><span>        case N_SUB: printf(&quot;(&quot;); print_ast(n-&gt;l); printf(&quot; - &quot;); print_ast(n-&gt;r); printf(&quot;)&quot;); break;</span></span>
<span class="line"><span>        case N_MUL: printf(&quot;(&quot;); print_ast(n-&gt;l); printf(&quot; * &quot;); print_ast(n-&gt;r); printf(&quot;)&quot;); break;</span></span>
<span class="line"><span>        case N_DIV: printf(&quot;(&quot;); print_ast(n-&gt;l); printf(&quot; / &quot;); print_ast(n-&gt;r); printf(&quot;)&quot;); break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* ---------- main for quick testing ---------- */</span></span>
<span class="line"><span>int main(int argc, char **argv) {</span></span>
<span class="line"><span>    const char *src = (argc &gt; 1) ? argv[1] : &quot;3 + 4*2 - (1 + 5)&quot;;</span></span>
<span class="line"><span>    Lexer L; lexer_init(&amp;L, src);</span></span>
<span class="line"><span>    Arena *A = arena_new(1 &lt;&lt; 16);</span></span>
<span class="line"><span>    if (!A) { fprintf(stderr, &quot;arena alloc failed\\n&quot;); return 1; }</span></span>
<span class="line"><span>    Parser P = { .L = &amp;L, .A = A, .ok = 1 };</span></span>
<span class="line"><span>    Node *root = parse_expr(&amp;P);</span></span>
<span class="line"><span>    if (P.ok &amp;&amp; peek(&amp;L).kind == TOK_EOF &amp;&amp; root) {</span></span>
<span class="line"><span>        print_ast(root);</span></span>
<span class="line"><span>        printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Failed to parse input.\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    arena_free(A);</span></span>
<span class="line"><span>    return P.ok ? 0 : 1;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Build and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 -Wall -Wextra expr_parser.c -o expr_parser</span></span>
<span class="line"><span>./expr_parser &quot;3 + 4*2 - (1 + 5)&quot;</span></span></code></pre></div><p>Example output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>((3 + (4 * 2)) - (1 + 5))</span></span></code></pre></div><p>This shows correct precedence and grouping.</p><h4 id="step-9-how-to-extend-it" tabindex="-1">Step 9. How to extend it <a class="header-anchor" href="#step-9-how-to-extend-it" aria-label="Permalink to &quot;Step 9. How to extend it&quot;">​</a></h4><ul><li>Add unary<code>+</code> and unary<code>-</code> in<code>parse_factor</code>.</li><li>Support integers in hex and underscores like<code>1_000</code>.</li><li>Add power operator<code>^</code> with higher precedence.</li><li>Record source spans on each node for better error messages.</li><li>Swap the pretty printer for a JSON dump of the AST.</li></ul><h4 id="step-10-why-this-matters" tabindex="-1">Step 10. Why this matters <a class="header-anchor" href="#step-10-why-this-matters" aria-label="Permalink to &quot;Step 10. Why this matters&quot;">​</a></h4><p>Parsing transforms bytes into meaning. With a tokenizer, a clean grammar, and a small AST, you can build:</p><ul><li>Expression evaluators</li><li>Config file readers</li><li>Query languages</li><li>Full interpreters</li></ul><p>In the next section you will use this AST to build a tiny interpreter that evaluates expressions at runtime.</p>`,38)])])}const h=s(t,[["render",i]]);export{g as __pageData,h as default};
