import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"96. 编写文本解析器","description":"The Little Book of C 中文版 — 96. 编写文本解析器","frontmatter":{"title":"96. 编写文本解析器","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 96. 编写文本解析器","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":96,"sidebarWeight":96,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser.md","filePath":"posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/10-真实项目/096-Writing a Text Parser.md"};function t(i,n,c,r,o,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/096-Writing a Text Parser)</p><p>是时候将原始文本转化为结构了。在本节中，您将编写一个小型表达式解析器，用于转换字符串，例如<code>3 + 4*2 - (1 + 5)</code>转化为 AST（抽象语法树）。我们将构建一个简单的分词器、一个具有优先级的递归下降解析器以及一个漂亮的打印机来检查结果。在下一部分中，您可以添加一个评估器来运行它。</p><h4 id="步骤-1-目标和范围" tabindex="-1">步骤 1. 目标和范围 <a class="header-anchor" href="#步骤-1-目标和范围" aria-label="Permalink to &quot;步骤 1. 目标和范围&quot;">​</a></h4><p>我们将使用以下功能解析整数算术：</p><ul><li>整数：<code>0</code>,<code>42</code>,<code>1234</code></li><li>运营商：<code>+</code>,<code>-</code>,<code>*</code>,<code>/</code></li><li>括号：<code>( ... )</code></li><li>空白被忽略</li></ul><p>输出：您可以稍后遍历或评估的 AST。</p><h4 id="步骤-2-语法-非正式" tabindex="-1">步骤 2. 语法（非正式） <a class="header-anchor" href="#步骤-2-语法-非正式" aria-label="Permalink to &quot;步骤 2. 语法（非正式）&quot;">​</a></h4><p>我们将使用经典的优先规则：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>expr   -&gt; term ((&#39;+&#39; | &#39;-&#39;) term)*</span></span>
<span class="line"><span>term   -&gt; factor ((&#39;*&#39; | &#39;/&#39;) factor)*</span></span>
<span class="line"><span>factor -&gt; INT | &#39;(&#39; expr &#39;)&#39;</span></span></code></pre></div><p>解析按顺序遵循这些函数：<code>parse_expr</code>,<code>parse_term</code>,<code>parse_factor</code>.</p><h4 id="步骤-3-代币" tabindex="-1">步骤 3. 代币 <a class="header-anchor" href="#步骤-3-代币" aria-label="Permalink to &quot;步骤 3. 代币&quot;">​</a></h4><p>我们首先将字符扫描成标记：</p><p>-<code>TOK_INT</code>带有数值 -<code>TOK_PLUS</code>,<code>TOK_MINUS</code>,<code>TOK_STAR</code>,<code>TOK_SLASH</code> -<code>TOK_LPAREN</code>,<code>TOK_RPAREN</code> -<code>TOK_EOF</code>来标记结束</p><h4 id="步骤-4-ast-节点" tabindex="-1">步骤 4. AST 节点 <a class="header-anchor" href="#步骤-4-ast-节点" aria-label="Permalink to &quot;步骤 4. AST 节点&quot;">​</a></h4><p>使用紧凑节点类型：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV } NodeKind;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    NodeKind kind;</span></span>
<span class="line"><span>    struct Node *left, *right;  // for binary ops</span></span>
<span class="line"><span>    long value;                  // for integers</span></span>
<span class="line"><span>} Node;</span></span></code></pre></div><p>二进制节点使用<code>left</code>和<code>right</code>。整数节点使用<code>value</code>.</p><h4 id="第-5-步-节点的小舞台" tabindex="-1">第 5 步：节点的小舞台 <a class="header-anchor" href="#第-5-步-节点的小舞台" aria-label="Permalink to &quot;第 5 步：节点的小舞台&quot;">​</a></h4><p>频繁分配节点<code>malloc</code>很吵。使用一个小竞技场，这样每个节点都只是一个凹凸分配，当你完成后，所有的东西都会立即释放。</p><h4 id="步骤-6-错误处理策略" tabindex="-1">步骤 6. 错误处理策略 <a class="header-anchor" href="#步骤-6-错误处理策略" aria-label="Permalink to &quot;步骤 6. 错误处理策略&quot;">​</a></h4><p>保持简单：</p><ul><li>如果出现意外标记，请打印一条包含该位置的消息。</li><li>停止解析并返回<code>NULL</code>.</li><li>漂亮的打印机只有在树不存在时才会运行<code>NULL</code>.</li></ul><h4 id="步骤-7-漂亮地打印-ast" tabindex="-1">步骤 7. 漂亮地打印 AST <a class="header-anchor" href="#步骤-7-漂亮地打印-ast" aria-label="Permalink to &quot;步骤 7. 漂亮地打印 AST&quot;">​</a></h4><p>要验证解析，请使用最少的括号进行打印：</p><ul><li>对于二进制节点，打印<code>(left op right)</code>.</li><li>对于整数，打印数字。这足以确认形状和优先级。</li></ul><h4 id="步骤-8-tiny-code-自包含词法分析器-解析器-打印机" tabindex="-1">步骤 8. Tiny Code：自包含词法分析器 + 解析器 + 打印机 <a class="header-anchor" href="#步骤-8-tiny-code-自包含词法分析器-解析器-打印机" aria-label="Permalink to &quot;步骤 8. Tiny Code：自包含词法分析器 + 解析器 + 打印机&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: expr_parser.c</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>构建并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 -Wall -Wextra expr_parser.c -o expr_parser</span></span>
<span class="line"><span>./expr_parser &quot;3 + 4*2 - (1 + 5)&quot;</span></span></code></pre></div><p>输出示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>((3 + (4 * 2)) - (1 + 5))</span></span></code></pre></div><p>这显示了正确的优先级和分组。</p><h4 id="步骤-9-如何扩展" tabindex="-1">步骤 9. 如何扩展 <a class="header-anchor" href="#步骤-9-如何扩展" aria-label="Permalink to &quot;步骤 9. 如何扩展&quot;">​</a></h4><ul><li>添加一元<code>+</code>和一元<code>-</code>在<code>parse_factor</code>.</li><li>支持十六进制整数和下划线，例如<code>1_000</code>.</li><li>添加电源操作员<code>^</code>具有更高的优先级。</li><li>记录每个节点上的源跨度以获得更好的错误消息。</li><li>将漂亮的打印机替换为 AST 的 JSON 转储。</li></ul><h4 id="第-10-步-为什么这很重要" tabindex="-1">第 10 步：为什么这很重要 <a class="header-anchor" href="#第-10-步-为什么这很重要" aria-label="Permalink to &quot;第 10 步：为什么这很重要&quot;">​</a></h4><p>解析将字节转换为含义。使用分词器、简洁的语法和小型 AST，您可以构建：</p><ul><li>表达评估器</li><li>配置文件读取器</li><li>查询语言</li><li>全程口译员</li></ul><p>在下一节中，您将使用此 AST 构建一个小型解释器，在运行时计算表达式。</p>`,38)])])}const _=s(l,[["render",t]]);export{g as __pageData,_ as default};
