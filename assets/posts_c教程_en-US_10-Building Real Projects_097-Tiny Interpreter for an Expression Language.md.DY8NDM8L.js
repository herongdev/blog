import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"97. Tiny Interpreter for an Expression Language","description":"The Little Book of C — 97. Tiny Interpreter for an Expression Language","frontmatter":{"title":"97. Tiny Interpreter for an Expression Language","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Building Real Projects"],"description":"The Little Book of C — 97. Tiny Interpreter for an Expression Language","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":97,"sidebarWeight":97,"lang":"en-US","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/097-Tiny Interpreter for an Expression Language","alternateZh":"/posts/c教程/zh-CN/10-真实项目/097-Tiny Interpreter for an Expression Language"},"headers":[],"relativePath":"posts/c教程/en-US/10-Building Real Projects/097-Tiny Interpreter for an Expression Language.md","filePath":"posts/c教程/en-US/10-Building Real Projects/097-Tiny Interpreter for an Expression Language.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/en-US/10-Building Real Projects/097-Tiny Interpreter for an Expression Language.md"};function i(l,n,r,c,o,d){return a(),e("div",null,[...n[0]||(n[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/10-真实项目/097-Tiny Interpreter for an Expression Language)</p><p>You already built a tokenizer, parser, and AST. Now you will evaluate that AST so<code>3 + 4*2 - (1 + 5)</code> produces<code>5</code> at runtime. We will add a tiny environment for variables, a few built in functions, and a simple REPL.</p><h4 id="step-1-evaluation-model" tabindex="-1">Step 1. Evaluation model <a class="header-anchor" href="#step-1-evaluation-model" aria-label="Permalink to &quot;Step 1. Evaluation model&quot;">​</a></h4><p>We will walk the AST recursively:</p><ul><li><code>N_INT</code> returns its value</li><li><code>N_ADD</code> returns<code>eval(left) + eval(right)</code></li><li><code>N_SUB</code>,<code>N_MUL</code>,<code>N_DIV</code> similar, with divide by zero checks</li></ul><p>Keep everything in<code>long</code> for now. You can switch to<code>double</code> later if you want decimals.</p><h4 id="step-2-variables-and-assignments" tabindex="-1">Step 2. Variables and assignments <a class="header-anchor" href="#step-2-variables-and-assignments" aria-label="Permalink to &quot;Step 2. Variables and assignments&quot;">​</a></h4><p>Extend the grammar slightly:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>stmt   -&gt; IDENT &#39;=&#39; expr | expr</span></span>
<span class="line"><span>expr   -&gt; term ((&#39;+&#39; | &#39;-&#39;) term)*</span></span>
<span class="line"><span>term   -&gt; factor ((&#39;*&#39; | &#39;/&#39;) factor)*</span></span>
<span class="line"><span>factor -&gt; INT | IDENT | &#39;(&#39; expr &#39;)&#39;</span></span></code></pre></div><ul><li>If input contains<code>x = 10</code>, store<code>x -&gt; 10</code> in the environment</li><li>If input contains<code>x + 2</code>, look up<code>x</code> then evaluate</li></ul><h4 id="step-3-environment" tabindex="-1">Step 3. Environment <a class="header-anchor" href="#step-3-environment" aria-label="Permalink to &quot;Step 3. Environment&quot;">​</a></h4><p>Use a tiny linear table for clarity:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct { const char *name; long value; } Binding;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>This is not the fastest map, but it is simple and good for a tiny interpreter.</p><h4 id="step-4-extend-tokens-for-identifiers-and-equals" tabindex="-1">Step 4. Extend tokens for identifiers and equals <a class="header-anchor" href="#step-4-extend-tokens-for-identifiers-and-equals" aria-label="Permalink to &quot;Step 4. Extend tokens for identifiers and equals&quot;">​</a></h4><p>Add two kinds:</p><ul><li><code>TOK_IDENT</code> for variable names</li><li><code>TOK_EQ</code> for<code>=</code></li></ul><p>Identifier rule: start with letter or<code>_</code>, continue with letter, digit,<code>_</code>.</p><h4 id="step-5-ast-nodes-for-identifiers-and-assignment" tabindex="-1">Step 5. AST nodes for identifiers and assignment <a class="header-anchor" href="#step-5-ast-nodes-for-identifiers-and-assignment" aria-label="Permalink to &quot;Step 5. AST nodes for identifiers and assignment&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef enum { N_INT, N_ADD, N_SUB, N_MUL, N_DIV, N_IDENT, N_ASSIGN } NodeKind;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    NodeKind kind;</span></span>
<span class="line"><span>    struct Node *l, *r;  // for binary ops and assignment</span></span>
<span class="line"><span>    long value;          // for integers</span></span>
<span class="line"><span>    const char *name;    // for identifiers</span></span>
<span class="line"><span>} Node;</span></span></code></pre></div><ul><li><code>N_IDENT</code> uses<code>name</code></li><li><code>N_ASSIGN</code> uses<code>l</code> as name node and<code>r</code> as expression node</li></ul><h4 id="step-6-parser-changes" tabindex="-1">Step 6. Parser changes <a class="header-anchor" href="#step-6-parser-changes" aria-label="Permalink to &quot;Step 6. Parser changes&quot;">​</a></h4><p>In<code>factor</code>, if token is<code>IDENT</code>, return<code>N_IDENT</code></p><p>Add<code>parse_stmt</code>:</p><ul><li>If lookahead is<code>IDENT</code> then<code>=</code> then parse<code>expr</code> and build<code>N_ASSIGN</code></li><li>Else parse<code>expr</code></li></ul><h4 id="step-7-tiny-code-evaluator-minimal-repl" tabindex="-1">Step 7. Tiny Code: evaluator + minimal REPL <a class="header-anchor" href="#step-7-tiny-code-evaluator-minimal-repl" aria-label="Permalink to &quot;Step 7. Tiny Code: evaluator + minimal REPL&quot;">​</a></h4><p>Below is a compact interpreter that builds on the earlier parser. For brevity, the lexer and arena are trimmed to only the new bits you need here.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: tiny_interp.c</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Build and try:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 -Wall -Wextra tiny_interp.c -o tiny_interp</span></span>
<span class="line"><span>./tiny_interp</span></span></code></pre></div><p>Example session:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 3 + 4*2 - (1 + 5)</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>&gt; x = 10</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>&gt; x + 7</span></span>
<span class="line"><span>17</span></span>
<span class="line"><span>&gt; y = x * 3</span></span>
<span class="line"><span>30</span></span>
<span class="line"><span>&gt; y / 5</span></span>
<span class="line"><span>6</span></span></code></pre></div><h4 id="step-8-add-built-in-functions-optional" tabindex="-1">Step 8. Add built in functions (optional) <a class="header-anchor" href="#step-8-add-built-in-functions-optional" aria-label="Permalink to &quot;Step 8. Add built in functions (optional)&quot;">​</a></h4><p>You can recognize identifiers like<code>max</code> or<code>min</code> and parse a function call form<code>name &#39;(&#39; args &#39;)&#39;</code>. Then implement small handlers in the evaluator that pop evaluated arguments and return a result.</p><h4 id="step-9-better-numbers" tabindex="-1">Step 9. Better numbers <a class="header-anchor" href="#step-9-better-numbers" aria-label="Permalink to &quot;Step 9. Better numbers&quot;">​</a></h4><p>Switch to<code>double</code> if you want division with fractions:</p><ul><li>Change value type to<code>double</code></li><li>Print with<code>%.6g</code></li><li>Update divide by zero checks accordingly</li></ul><h4 id="step-10-why-this-matters" tabindex="-1">Step 10. Why this matters <a class="header-anchor" href="#step-10-why-this-matters" aria-label="Permalink to &quot;Step 10. Why this matters&quot;">​</a></h4><p>You now have a complete loop:</p><ul><li>Text</li><li>Tokens</li><li>AST</li><li>Evaluation</li></ul><p>This is the heart of configuration languages, query languages, calculators, and many scripting systems. In the next section you will connect this skill to external data by interfacing with SQLite or LevelDB from C and building a tiny query tool.</p>`,41)])])}const m=s(t,[["render",i]]);export{g as __pageData,m as default};
