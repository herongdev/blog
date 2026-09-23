import{_ as n,o as s,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"32. Unions and Type Reuse","description":"The Little Book of C — 32. Unions and Type Reuse","frontmatter":{"title":"32. Unions and Type Reuse","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Structuring Data"],"description":"The Little Book of C — 32. Unions and Type Reuse","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":32,"sidebarWeight":32,"lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse","alternateZh":"/posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse.md","filePath":"posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse.md"};function i(l,a,o,c,r,d){return s(),e("div",null,[...a[0]||(a[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse)</p><p>Sometimes you need a variable that can hold different types of data at different times, but you don’t want to waste memory keeping all of them active at once. That’s where unions come in.</p><p>A<code>union</code> lets multiple fields share the same memory location. It’s a space-saving feature and a powerful tool for implementing type flexibility, variant data, and even low-level binary manipulation.</p><h4 id="what-is-a-union" tabindex="-1">What Is a Union? <a class="header-anchor" href="#what-is-a-union" aria-label="Permalink to &quot;What Is a Union?&quot;">​</a></h4><p>A union is like a structure, but instead of giving each member its own memory, all members share the same memory block. Only one field is valid at any moment.</p><p>Syntax:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>union Data {</span></span>
<span class="line"><span>    int i;</span></span>
<span class="line"><span>    float f;</span></span>
<span class="line"><span>    char c;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Here,<code>i</code>,<code>f</code>, and<code>c</code> share the same storage. The size of the union is equal to the size of its largest member.</p><h4 id="using-a-union" tabindex="-1">Using a Union <a class="header-anchor" href="#using-a-union" aria-label="Permalink to &quot;Using a Union&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>union Data {</span></span>
<span class="line"><span>    int i;</span></span>
<span class="line"><span>    float f;</span></span>
<span class="line"><span>    char c;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    union Data d;</span></span>
<span class="line"><span>    d.i = 42;</span></span>
<span class="line"><span>    printf(&quot;d.i = %d\\n&quot;, d.i);</span></span>
<span class="line"><span>    d.f = 3.14f;</span></span>
<span class="line"><span>    printf(&quot;d.f = %.2f\\n&quot;, d.f);</span></span>
<span class="line"><span>    d.c = &#39;A&#39;;</span></span>
<span class="line"><span>    printf(&quot;d.c = %c\\n&quot;, d.c);</span></span>
<span class="line"><span>    // The last assignment overwrites the previous ones</span></span>
<span class="line"><span>    printf(&quot;After d.c = &#39;A&#39;, d.i = %d (corrupted)\\n&quot;, d.i);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>d.i = 42</span></span>
<span class="line"><span>d.f = 3.14</span></span>
<span class="line"><span>d.c = A</span></span>
<span class="line"><span>After d.c = &#39;A&#39;, d.i = 1094795585</span></span></code></pre></div><p>Notice how writing to one member affects the others, because they occupy the same memory.</p><h4 id="memory-layout-illustration" tabindex="-1">Memory Layout Illustration <a class="header-anchor" href="#memory-layout-illustration" aria-label="Permalink to &quot;Memory Layout Illustration&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+------------------+</span></span>
<span class="line"><span>| Shared Memory    |  &lt;- same location for all fields</span></span>
<span class="line"><span>| (size = largest) |</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span>| i: 4 bytes       |</span></span>
<span class="line"><span>| f: 4 bytes       |</span></span>
<span class="line"><span>| c: 1 byte        |</span></span>
<span class="line"><span>+------------------+</span></span></code></pre></div><p>All fields overlap in the same storage area.</p><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>Let’s see a practical example where a union saves memory.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>union Value {</span></span>
<span class="line"><span>    int i;</span></span>
<span class="line"><span>    float f;</span></span>
<span class="line"><span>    char str[20];</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    union Value v;</span></span>
<span class="line"><span>    v.i = 42;</span></span>
<span class="line"><span>    printf(&quot;As int: %d\\n&quot;, v.i);</span></span>
<span class="line"><span>    v.f = 3.14f;</span></span>
<span class="line"><span>    printf(&quot;As float: %.2f\\n&quot;, v.f);</span></span>
<span class="line"><span>    strcpy(v.str, &quot;Hello&quot;);</span></span>
<span class="line"><span>    printf(&quot;As string: %s\\n&quot;, v.str);</span></span>
<span class="line"><span>    printf(&quot;Union size: %zu bytes\\n&quot;, sizeof(v));</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>As int: 42</span></span>
<span class="line"><span>As float: 3.14</span></span>
<span class="line"><span>As string: Hello</span></span>
<span class="line"><span>Union size: 20 bytes</span></span></code></pre></div><p>Even though it contains an<code>int</code>, a<code>float</code>, and a<code>char[20]</code>, the total size is only 20 bytes, the size of the largest member.</p><h4 id="tagged-unions-type-safe-pattern" tabindex="-1">Tagged Unions (Type-Safe Pattern) <a class="header-anchor" href="#tagged-unions-type-safe-pattern" aria-label="Permalink to &quot;Tagged Unions (Type-Safe Pattern)&quot;">​</a></h4><p>In practice, you often use a tag (an enum or integer) to remember which member is active, this is known as a tagged union or discriminated union.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>enum Type { INT, FLOAT, STRING };</span></span>
<span class="line"><span>struct Variant {</span></span>
<span class="line"><span>    enum Type type;</span></span>
<span class="line"><span>    union {</span></span>
<span class="line"><span>        int i;</span></span>
<span class="line"><span>        float f;</span></span>
<span class="line"><span>        char str[20];</span></span>
<span class="line"><span>    } data;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>void print_variant(const struct Variant *v) {</span></span>
<span class="line"><span>    switch (v-&gt;type) {</span></span>
<span class="line"><span>        case INT:   printf(&quot;INT: %d\\n&quot;, v-&gt;data.i); break;</span></span>
<span class="line"><span>        case FLOAT: printf(&quot;FLOAT: %.2f\\n&quot;, v-&gt;data.f); break;</span></span>
<span class="line"><span>        case STRING:printf(&quot;STRING: %s\\n&quot;, v-&gt;data.str); break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct Variant v;</span></span>
<span class="line"><span>    v.type = STRING;</span></span>
<span class="line"><span>    strcpy(v.data.str, &quot;C Language&quot;);</span></span>
<span class="line"><span>    print_variant(&amp;v);</span></span>
<span class="line"><span>    v.type = INT;</span></span>
<span class="line"><span>    v.data.i = 123;</span></span>
<span class="line"><span>    print_variant(&amp;v);</span></span>
<span class="line"><span>    v.type = FLOAT;</span></span>
<span class="line"><span>    v.data.f = 9.81f;</span></span>
<span class="line"><span>    print_variant(&amp;v);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>STRING: C Language</span></span>
<span class="line"><span>INT: 123</span></span>
<span class="line"><span>FLOAT: 9.81</span></span></code></pre></div><p>This is how you combine the flexibility of unions with the safety of knowing which field is currently valid.</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Unions are crucial for:</p><ul><li>Saving memory, only one field exists at a time.</li><li>Implementing variant data types, e.g., JSON values, expression trees, network packets.</li><li>Working with hardware registers, map one register into multiple view types.</li><li>Binary serialization, reinterpret raw bytes as various data forms.</li></ul><p>In low-level systems, they enable compact and flexible representations that C is famous for.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><p>Write a union<code>Number</code> with<code>int</code>,<code>float</code>, and<code>double</code>.</p><ul><li>Print its size and observe which member determines it.</li></ul><p>Implement a tagged union<code>Message</code> with types TEXT, BINARY, and COMMAND.</p><p>Create a struct with an enum tag and a union, simulate how file formats (like PNG chunks) are parsed.</p><p>Write a function that prints the active union field using the tag.</p><p>Modify the previous example to store an array of tagged unions.</p><p>In C, unions give you memory control and flexibility that few languages allow. They’re the foundation for advanced constructs like variant types, polymorphic structs, and even message protocols, used everywhere from the Linux kernel to embedded firmware.</p>`,40)])])}const m=n(t,[["render",i]]);export{h as __pageData,m as default};
