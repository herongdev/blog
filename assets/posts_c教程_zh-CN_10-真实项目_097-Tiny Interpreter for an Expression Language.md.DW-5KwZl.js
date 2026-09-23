import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"97. 表达语言的微型解释器","description":"The Little Book of C 中文版 — 97. 表达语言的微型解释器","frontmatter":{"title":"97. 表达语言的微型解释器","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 97. 表达语言的微型解释器","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":97,"sidebarWeight":97,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/097-Tiny Interpreter for an Expression Language","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/097-Tiny Interpreter for an Expression Language"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/097-Tiny Interpreter for an Expression Language.md","filePath":"posts/c教程/zh-CN/10-真实项目/097-Tiny Interpreter for an Expression Language.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/10-真实项目/097-Tiny Interpreter for an Expression Language.md"};function l(i,n,c,r,o,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/097-Tiny Interpreter for an Expression Language)</p><p>您已经构建了分词器、解析器和 AST。现在您将评估该 AST<code>3 + 4*2 - (1 + 5)</code>产生<code>5</code>在运行时。我们将为变量添加一个微型环境、一些内置函数和一个简单的 REPL。</p><h4 id="步骤1-评估模型" tabindex="-1">步骤1.评估模型 <a class="header-anchor" href="#步骤1-评估模型" aria-label="Permalink to &quot;步骤1.评估模型&quot;">​</a></h4><p>我们将递归地遍历 AST：</p><p>-<code>N_INT</code>返回它的值 -<code>N_ADD</code>回报<code>eval(left) + eval(right)</code> -<code>N_SUB</code>,<code>N_MUL</code>,<code>N_DIV</code>类似，除以零检查</p><p>把所有东西都放进去<code>long</code>目前。您可以切换到<code>double</code>稍后如果你想要小数。</p><h4 id="步骤-2-变量和赋值" tabindex="-1">步骤 2. 变量和赋值 <a class="header-anchor" href="#步骤-2-变量和赋值" aria-label="Permalink to &quot;步骤 2. 变量和赋值&quot;">​</a></h4><p>稍微扩展一下语法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>stmt   -&gt; IDENT &#39;=&#39; expr | expr</span></span>
<span class="line"><span>expr   -&gt; term ((&#39;+&#39; | &#39;-&#39;) term)*</span></span>
<span class="line"><span>term   -&gt; factor ((&#39;*&#39; | &#39;/&#39;) factor)*</span></span>
<span class="line"><span>factor -&gt; INT | IDENT | &#39;(&#39; expr &#39;)&#39;</span></span></code></pre></div><ul><li>如果输入包含<code>x = 10</code>， 店铺<code>x -&gt; 10</code>在环境中</li><li>如果输入包含<code>x + 2</code>， 抬头<code>x</code>然后评估</li></ul><h4 id="步骤-3-环境" tabindex="-1">步骤 3. 环境 <a class="header-anchor" href="#步骤-3-环境" aria-label="Permalink to &quot;步骤 3. 环境&quot;">​</a></h4><p>为了清楚起见，使用一个微小的线性表：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct { const char *name; long value; } Binding;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Binding *items;</span></span>
<span class="line"><span>    size_t   count, cap;</span></span>
<span class="line"><span>} Env;</span></span>
<span class="line"><span>static long *env_get(Env *E, const char *name) {</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; E-&gt;count; i++)</span></span>
<span class="line"><span>        if (strcmp(E-&gt;items[i].name, name) == 0) return &amp;E-&gt;items[i].value;</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static int env_set(Env *E, const char *name, long v) {</span></span>
<span class="line"><span>    long *p = env_get(E, name);</span></span>
<span class="line"><span>    if (p) { *p = v; return 1; }</span></span>
<span class="line"><span>    if (E-&gt;count == E-&gt;cap) {</span></span>
<span class="line"><span>        size_t ncap = E-&gt;cap ? E-&gt;cap * 2 : 16;</span></span>
<span class="line"><span>        Binding *n = realloc(E-&gt;items, ncap * sizeof(*n));</span></span>
<span class="line"><span>        if (!n) return 0;</span></span>
<span class="line"><span>        E-&gt;items = n; E-&gt;cap = ncap;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    E-&gt;items[E-&gt;count++] = (Binding){ strdup(name), v };</span></span>
<span class="line"><span>    return 1;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这不是最快的地图，但它简单且适合小型解释器。</p><h4 id="步骤-4-扩展标识符和等于的标记" tabindex="-1">步骤 4. 扩展标识符和等于的标记 <a class="header-anchor" href="#步骤-4-扩展标识符和等于的标记" aria-label="Permalink to &quot;步骤 4. 扩展标识符和等于的标记&quot;">​</a></h4><p>添加两种：</p><p>-<code>TOK_IDENT</code>对于变量名 -<code>TOK_EQ</code>为了<code>=</code></p><p>标识符规则：以字母或开头<code>_</code>，继续字母，数字，<code>_</code>.</p><h4 id="步骤-5-用于标识符和分配的-ast-节点" tabindex="-1">步骤 5. 用于标识符和分配的 AST 节点 <a class="header-anchor" href="#步骤-5-用于标识符和分配的-ast-节点" aria-label="Permalink to &quot;步骤 5. 用于标识符和分配的 AST 节点&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV, N_IDENT, N_ASSIGN } NodeKind;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    NodeKind kind;</span></span>
<span class="line"><span>    struct Node *l, *r;  // for binary ops and assignment</span></span>
<span class="line"><span>    long value;          // for integers</span></span>
<span class="line"><span>    const char *name;    // for identifiers</span></span>
<span class="line"><span>} Node;</span></span></code></pre></div><p>-<code>N_IDENT</code>用途<code>name</code> -<code>N_ASSIGN</code>用途<code>l</code>作为名称节点和<code>r</code>作为表达式节点</p><h4 id="步骤-6-解析器更改" tabindex="-1">步骤 6. 解析器更改 <a class="header-anchor" href="#步骤-6-解析器更改" aria-label="Permalink to &quot;步骤 6. 解析器更改&quot;">​</a></h4><p>在<code>factor</code>，如果令牌是<code>IDENT</code>， 返回<code>N_IDENT</code></p><p>添加<code>parse_stmt</code>:</p><ul><li>如果前瞻是<code>IDENT</code>然后<code>=</code>然后解析<code>expr</code>并建立<code>N_ASSIGN</code></li><li>否则解析<code>expr</code></li></ul><h4 id="步骤-7-tiny-code-评估器-最小-repl" tabindex="-1">步骤 7.Tiny Code：评估器 + 最小 REPL <a class="header-anchor" href="#步骤-7-tiny-code-评估器-最小-repl" aria-label="Permalink to &quot;步骤 7.Tiny Code：评估器 + 最小 REPL&quot;">​</a></h4><p>下面是一个基于早期解析器的紧凑解释器。为了简洁起见，词法分析器和 arena 被修剪为仅您需要的新位。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: tiny_interp.c</span></span>
<span class="line"><span>#define _POSIX_C_SOURCE 200809L</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;ctype.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>/* ----- tiny arena ----- */</span></span>
<span class="line"><span>typedef struct { unsigned char *base; size_t cap, off; } Arena;</span></span>
<span class="line"><span>static Arena *arena_new(size_t cap){ Arena*a=malloc(sizeof(*a)); if(!a)return NULL; a-&gt;base=malloc(cap); if(!a-&gt;base){free(a);return NULL;} a-&gt;cap=cap; a-&gt;off=0; return a;}</span></span>
<span class="line"><span>static void *arena_alloc(Arena*a,size_t n,size_t al){ size_t p=(a-&gt;off+(al-1))&amp;~(al-1); if(p+n&gt;a-&gt;cap)return NULL; void*ptr=a-&gt;base+p; a-&gt;off=p+n; return ptr; }</span></span>
<span class="line"><span>static void arena_free(Arena*a){ if(!a)return; free(a-&gt;base); free(a); }</span></span>
<span class="line"><span>/* ----- tokens ----- */</span></span>
<span class="line"><span>typedef enum { TOK_INT, TOK_PLUS, TOK_MINUS, TOK_STAR, TOK_SLASH,</span></span>
<span class="line"><span>               TOK_LPAREN, TOK_RPAREN, TOK_IDENT, TOK_EQ, TOK_EOF, TOK_ERR } TokKind;</span></span>
<span class="line"><span>typedef struct { TokKind kind; long ival; const char *s,*e; char *lexeme; } Token;</span></span>
<span class="line"><span>typedef struct { const char *src,*cur; Token look; } Lexer;</span></span>
<span class="line"><span>static void skip_ws(Lexer*L){ while(isspace((unsigned char)*L-&gt;cur)) L-&gt;cur++; }</span></span>
<span class="line"><span>static Token make_tok(TokKind k,const char*s,const char*e,long v,char*lex){ return (Token){k,v,s,e,lex}; }</span></span>
<span class="line"><span>static Token next_raw(Lexer*L){</span></span>
<span class="line"><span>    skip_ws(L); const char*s=L-&gt;cur; if(*L-&gt;cur==0) return make_tok(TOK_EOF,s,s,0,NULL);</span></span>
<span class="line"><span>    char c=*L-&gt;cur++;</span></span>
<span class="line"><span>    if (c==&#39;+&#39;) return make_tok(TOK_PLUS, s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>    if (c==&#39;-&#39;) return make_tok(TOK_MINUS,s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>    if (c==&#39;*&#39;) return make_tok(TOK_STAR, s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>    if (c==&#39;/&#39;) return make_tok(TOK_SLASH,s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>    if (c==&#39;(&#39;) return make_tok(TOK_LPAREN,s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>    if (c==&#39;)&#39;) return make_tok(TOK_RPAREN,s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>    if (c==&#39;=&#39;) return make_tok(TOK_EQ,    s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>    if (isdigit((unsigned char)c)) {</span></span>
<span class="line"><span>        long v = c - &#39;0&#39;; const char*p=L-&gt;cur;</span></span>
<span class="line"><span>        while (isdigit((unsigned char)*p)) { v = v*10 + (*p - &#39;0&#39;); p++; }</span></span>
<span class="line"><span>        L-&gt;cur = p; return make_tok(TOK_INT, s,p,v,NULL);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (isalpha((unsigned char)c) || c==&#39;_&#39;) {</span></span>
<span class="line"><span>        const char*p=L-&gt;cur; while (isalnum((unsigned char)*p) || *p==&#39;_&#39;) p++;</span></span>
<span class="line"><span>        size_t n = (size_t)(p - (L-&gt;cur-1)); // include first char</span></span>
<span class="line"><span>        char *lex = malloc(n+1);</span></span>
<span class="line"><span>        memcpy(lex, s, n); lex[n] = 0;</span></span>
<span class="line"><span>        L-&gt;cur = p; return make_tok(TOK_IDENT,s,p,0,lex);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return make_tok(TOK_ERR, s,L-&gt;cur,0,NULL);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static void lex_init(Lexer*L,const char*src){ L-&gt;src=src; L-&gt;cur=src; L-&gt;look=next_raw(L); }</span></span>
<span class="line"><span>static Token peek(Lexer*L){ return L-&gt;look; }</span></span>
<span class="line"><span>static Token take(Lexer*L){ Token t=L-&gt;look; L-&gt;look=next_raw(L); return t; }</span></span>
<span class="line"><span>/* ----- AST ----- */</span></span>
<span class="line"><span>typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV, N_IDENT, N_ASSIGN } NodeKind;</span></span>
<span class="line"><span>typedef struct Node { NodeKind k; struct Node *l,*r; long v; const char*name; } Node;</span></span>
<span class="line"><span>static Node* new_int(Arena*A,long v){ Node*n=arena_alloc(A,sizeof(*n),_Alignof(Node)); if(!n)return NULL; n-&gt;k=N_INT; n-&gt;l=n-&gt;r=NULL; n-&gt;v=v; n-&gt;name=NULL; return n; }</span></span>
<span class="line"><span>static Node* new_ident(Arena*A,const char*name){ Node*n=arena_alloc(A,sizeof(*n),_Alignof(Node)); if(!n)return NULL; n-&gt;k=N_IDENT; n-&gt;l=n-&gt;r=NULL; n-&gt;v=0; n-&gt;name=name; return n; }</span></span>
<span class="line"><span>static Node* new_bin(Arena*A,NodeKind k,Node*l,Node*r){ Node*n=arena_alloc(A,sizeof(*n),_Alignof(Node)); if(!n)return NULL; n-&gt;k=k; n-&gt;l=l; n-&gt;r=r; n-&gt;v=0; n-&gt;name=NULL; return n; }</span></span>
<span class="line"><span>static Node* new_assign(Arena*A,Node*name,Node*expr){ Node*n=arena_alloc(A,sizeof(*n),_Alignof(Node)); if(!n)return NULL; n-&gt;k=N_ASSIGN; n-&gt;l=name; n-&gt;r=expr; n-&gt;v=0; n-&gt;name=NULL; return n; }</span></span>
<span class="line"><span>/* ----- parser ----- */</span></span>
<span class="line"><span>typedef struct { Lexer*L; Arena*A; int ok; } Parser;</span></span>
<span class="line"><span>static void fail(Parser*P,const char*msg,Token t){ P-&gt;ok=0; size_t pos=(size_t)(t.s - P-&gt;L-&gt;src); fprintf(stderr,&quot;Parse error at %zu: %s\\n&quot;, pos, msg); }</span></span>
<span class="line"><span>static Node* parse_expr(Parser*P); // forward</span></span>
<span class="line"><span>static Node* parse_factor(Parser*P){</span></span>
<span class="line"><span>    Token t = peek(P-&gt;L);</span></span>
<span class="line"><span>    if (t.kind==TOK_INT){ take(P-&gt;L); return new_int(P-&gt;A, t.ival); }</span></span>
<span class="line"><span>    if (t.kind==TOK_IDENT){ take(P-&gt;L); return new_ident(P-&gt;A, t.lexeme); }</span></span>
<span class="line"><span>    if (t.kind==TOK_LPAREN){ take(P-&gt;L); Node*e=parse_expr(P); if(peek(P-&gt;L).kind!=TOK_RPAREN){ fail(P,&quot;expected &#39;)&#39;&quot;,peek(P-&gt;L)); return NULL;} take(P-&gt;L); return e; }</span></span>
<span class="line"><span>    fail(P,&quot;expected number, name, or &#39;(&#39;&quot;, t); return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Node* parse_term(Parser*P){</span></span>
<span class="line"><span>    Node*n=parse_factor(P);</span></span>
<span class="line"><span>    while(P-&gt;ok){</span></span>
<span class="line"><span>        TokKind k = peek(P-&gt;L).kind;</span></span>
<span class="line"><span>        if(k!=TOK_STAR &amp;&amp; k!=TOK_SLASH) break;</span></span>
<span class="line"><span>        take(P-&gt;L);</span></span>
<span class="line"><span>        Node*r=parse_factor(P); if(!r) return NULL;</span></span>
<span class="line"><span>        n=new_bin(P-&gt;A, k==TOK_STAR?N_MUL:N_DIV, n, r);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Node* parse_expr(Parser*P){</span></span>
<span class="line"><span>    Node*n=parse_term(P);</span></span>
<span class="line"><span>    while(P-&gt;ok){</span></span>
<span class="line"><span>        TokKind k = peek(P-&gt;L).kind;</span></span>
<span class="line"><span>        if(k!=TOK_PLUS &amp;&amp; k!=TOK_MINUS) break;</span></span>
<span class="line"><span>        take(P-&gt;L);</span></span>
<span class="line"><span>        Node*r=parse_term(P); if(!r) return NULL;</span></span>
<span class="line"><span>        n=new_bin(P-&gt;A, k==TOK_PLUS?N_ADD:N_SUB, n, r);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Node* parse_stmt(Parser*P){</span></span>
<span class="line"><span>    if (peek(P-&gt;L).kind==TOK_IDENT){</span></span>
<span class="line"><span>        // look ahead for &#39;=&#39;</span></span>
<span class="line"><span>        Token save = P-&gt;L-&gt;look;</span></span>
<span class="line"><span>        Token ident = take(P-&gt;L);</span></span>
<span class="line"><span>        if (peek(P-&gt;L).kind==TOK_EQ){</span></span>
<span class="line"><span>            take(P-&gt;L); // consume &#39;=&#39;</span></span>
<span class="line"><span>            Node*rhs = parse_expr(P);</span></span>
<span class="line"><span>            if (!rhs) return NULL;</span></span>
<span class="line"><span>            return new_assign(P-&gt;A, new_ident(P-&gt;A, ident.lexeme), rhs);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // no &#39;=&#39;, rewind</span></span>
<span class="line"><span>        P-&gt;L-&gt;look = save;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return parse_expr(P);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* ----- environment ----- */</span></span>
<span class="line"><span>typedef struct { const char*name; long value; } Binding;</span></span>
<span class="line"><span>typedef struct { Binding *items; size_t count, cap; } Env;</span></span>
<span class="line"><span>static long* env_get(Env*E,const char*name){ for(size_t i=0;i&lt;E-&gt;count;i++) if(strcmp(E-&gt;items[i].name,name)==0) return &amp;E-&gt;items[i].value; return NULL; }</span></span>
<span class="line"><span>static int env_set(Env*E,const char*name,long v){</span></span>
<span class="line"><span>    long*p=env_get(E,name); if(p){*p=v; return 1;}</span></span>
<span class="line"><span>    if(E-&gt;count==E-&gt;cap){ size_t ncap=E-&gt;cap?E-&gt;cap*2:16; Binding*n=realloc(E-&gt;items,ncap*sizeof(*n)); if(!n)return 0; E-&gt;items=n; E-&gt;cap=ncap; }</span></span>
<span class="line"><span>    E-&gt;items[E-&gt;count++] = (Binding){ strdup(name), v };</span></span>
<span class="line"><span>    return 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* ----- evaluator ----- */</span></span>
<span class="line"><span>static int eval(Node*n, Env*E, long *out){</span></span>
<span class="line"><span>    if(!n) return 0;</span></span>
<span class="line"><span>    switch(n-&gt;k){</span></span>
<span class="line"><span>        case N_INT: *out = n-&gt;v; return 1;</span></span>
<span class="line"><span>        case N_IDENT: {</span></span>
<span class="line"><span>            long *p = env_get(E, n-&gt;name);</span></span>
<span class="line"><span>            if(!p){ fprintf(stderr,&quot;Name not found: %s\\n&quot;, n-&gt;name); return 0; }</span></span>
<span class="line"><span>            *out = *p; return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        case N_ADD: { long a,b; if(!eval(n-&gt;l,E,&amp;a)||!eval(n-&gt;r,E,&amp;b)) return 0; *out=a+b; return 1; }</span></span>
<span class="line"><span>        case N_SUB: { long a,b; if(!eval(n-&gt;l,E,&amp;a)||!eval(n-&gt;r,E,&amp;b)) return 0; *out=a-b; return 1; }</span></span>
<span class="line"><span>        case N_MUL: { long a,b; if(!eval(n-&gt;l,E,&amp;a)||!eval(n-&gt;r,E,&amp;b)) return 0; *out=a*b; return 1; }</span></span>
<span class="line"><span>        case N_DIV: {</span></span>
<span class="line"><span>            long a,b; if(!eval(n-&gt;l,E,&amp;a)||!eval(n-&gt;r,E,&amp;b)) return 0;</span></span>
<span class="line"><span>            if(b==0){ fprintf(stderr,&quot;Divide by zero\\n&quot;); return 0; }</span></span>
<span class="line"><span>            *out=a/b; return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        case N_ASSIGN: {</span></span>
<span class="line"><span>            long v; if(!eval(n-&gt;r,E,&amp;v)) return 0;</span></span>
<span class="line"><span>            if(!n-&gt;l || n-&gt;l-&gt;k != N_IDENT){ fprintf(stderr,&quot;Left side of &#39;=&#39; must be a name\\n&quot;); return 0; }</span></span>
<span class="line"><span>            if(!env_set(E, n-&gt;l-&gt;name, v)){ fprintf(stderr,&quot;Env set failed\\n&quot;); return 0; }</span></span>
<span class="line"><span>            *out = v; return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* ----- simple REPL ----- */</span></span>
<span class="line"><span>int main(void){</span></span>
<span class="line"><span>    char *line = NULL; size_t n = 0;</span></span>
<span class="line"><span>    Env env = {0};</span></span>
<span class="line"><span>    puts(&quot;tiny repl. enter expressions or assignments. Ctrl D to exit.&quot;);</span></span>
<span class="line"><span>    while (1){</span></span>
<span class="line"><span>        printf(&quot;&gt; &quot;); fflush(stdout);</span></span>
<span class="line"><span>        ssize_t m = getline(&amp;line, &amp;n, stdin);</span></span>
<span class="line"><span>        if (m &lt;= 0) break;</span></span>
<span class="line"><span>        // strip newline</span></span>
<span class="line"><span>        if (m&gt;0 &amp;&amp; line[m-1]==&#39;\\n&#39;) line[m-1]=0;</span></span>
<span class="line"><span>        Arena *A = arena_new(1&lt;&lt;16);</span></span>
<span class="line"><span>        if(!A){ fprintf(stderr,&quot;arena failed\\n&quot;); break; }</span></span>
<span class="line"><span>        Lexer L; lex_init(&amp;L, line);</span></span>
<span class="line"><span>        Parser P = { .L=&amp;L, .A=A, .ok=1 };</span></span>
<span class="line"><span>        Node* root = parse_stmt(&amp;P);</span></span>
<span class="line"><span>        long result = 0;</span></span>
<span class="line"><span>        if (P.ok &amp;&amp; root &amp;&amp; eval(root, &amp;env, &amp;result))</span></span>
<span class="line"><span>            printf(&quot;%ld\\n&quot;, result);</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            fprintf(stderr,&quot;Error\\n&quot;);</span></span>
<span class="line"><span>        arena_free(A);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    free(line);</span></span>
<span class="line"><span>    // free env bindings</span></span>
<span class="line"><span>    for(size_t i=0;i&lt;env.count;i++) free((void*)env.items[i].name);</span></span>
<span class="line"><span>    free(env.items);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>构建并尝试：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 -Wall -Wextra tiny_interp.c -o tiny_interp</span></span>
<span class="line"><span>./tiny_interp</span></span></code></pre></div><p>会话示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 3 + 4*2 - (1 + 5)</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>&gt; x = 10</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>&gt; x + 7</span></span>
<span class="line"><span>17</span></span>
<span class="line"><span>&gt; y = x * 3</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>&gt; y / 5</span></span>
<span class="line"><span>6</span></span></code></pre></div><h4 id="步骤-8-添加内置函数-可选" tabindex="-1">步骤 8. 添加内置函数（可选） <a class="header-anchor" href="#步骤-8-添加内置函数-可选" aria-label="Permalink to &quot;步骤 8. 添加内置函数（可选）&quot;">​</a></h4><p>您可以识别类似的标识符<code>max</code>或者<code>min</code>并解析函数调用形式<code>name &#39;(&#39; args &#39;)&#39;</code>。然后在求值器中实现小型处理程序，弹出求值参数并返回结果。</p><h4 id="第-9-步-更好的数字" tabindex="-1">第 9 步：更好的数字 <a class="header-anchor" href="#第-9-步-更好的数字" aria-label="Permalink to &quot;第 9 步：更好的数字&quot;">​</a></h4><p>切换到<code>double</code>如果你想用分数除法：</p><ul><li>将值类型更改为<code>double</code></li><li>打印<code>%.6g</code></li><li>相应地更新除零检查</li></ul><h4 id="第-10-步-为什么这很重要" tabindex="-1">第 10 步：为什么这很重要 <a class="header-anchor" href="#第-10-步-为什么这很重要" aria-label="Permalink to &quot;第 10 步：为什么这很重要&quot;">​</a></h4><p>现在你已经有了一个完整的循环：</p><ul><li>文字</li><li>代币</li><li>谷草转氨酶</li><li>评价</li></ul><p>这是配置语言、查询语言、计算器和许多脚本系统的核心。在下一节中，您将通过使用 C 语言与 SQLite 或 LevelDB 连接并构建一个小型查询工具，将此技能与外部数据连接起来。</p>`,41)])])}const _=s(t,[["render",l]]);export{u as __pageData,_ as default};
