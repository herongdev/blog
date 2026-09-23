import{_ as n,o as a,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"32. 联合和类型重用","description":"The Little Book of C 中文版 — 32. 联合和类型重用","frontmatter":{"title":"32. 联合和类型重用","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 32. 联合和类型重用","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":32,"sidebarWeight":32,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse","alternateEn":"/posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse.md","filePath":"posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse.md"};function l(t,s,c,o,d,r){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse)</p><p>有时您需要一个可以在不同时间保存不同类型数据的变量，但您不想浪费内存让所有数据同时保持活动状态。这就是工会发挥作用的地方。</p><p>一个<code>union</code>让多个字段共享相同的内存位置。它是一个节省空间的功能，也是实现类型灵活性、变体数据甚至低级二进制操作的强大工具。</p><h4 id="什么是联盟" tabindex="-1">什么是联盟？ <a class="header-anchor" href="#什么是联盟" aria-label="Permalink to &quot;什么是联盟？&quot;">​</a></h4><p>联合就像一个结构，但不是为每个成员提供自己的内存，而是所有成员共享相同的内存块。任何时刻只有一个字段有效。</p><p>句法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>union Data {</span></span>
<span class="line"><span>    int i;</span></span>
<span class="line"><span>    float f;</span></span>
<span class="line"><span>    char c;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这里，<code>i</code>,<code>f</code>， 和<code>c</code>共享相同的存储。联合的大小等于其最大成员的大小。</p><h4 id="使用联盟" tabindex="-1">使用联盟 <a class="header-anchor" href="#使用联盟" aria-label="Permalink to &quot;使用联盟&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>d.i = 42</span></span>
<span class="line"><span>d.f = 3.14</span></span>
<span class="line"><span>d.c = A</span></span>
<span class="line"><span>After d.c = &#39;A&#39;, d.i = 1094795585</span></span></code></pre></div><p>请注意对一个成员的写入如何影响其他成员，因为它们占用相同的内存。</p><h4 id="内存布局图" tabindex="-1">内存布局图 <a class="header-anchor" href="#内存布局图" aria-label="Permalink to &quot;内存布局图&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+------------------+</span></span>
<span class="line"><span>| Shared Memory    |  &lt;- same location for all fields</span></span>
<span class="line"><span>| (size = largest) |</span></span>
<span class="line"><span>+------------------+</span></span>
<span class="line"><span>| i: 4 bytes       |</span></span>
<span class="line"><span>| f: 4 bytes       |</span></span>
<span class="line"><span>| c: 1 byte        |</span></span>
<span class="line"><span>+------------------+</span></span></code></pre></div><p>所有字段在同一存储区域中重叠。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>让我们看一个联合节省内存的实际例子。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>As int: 42</span></span>
<span class="line"><span>As float: 3.14</span></span>
<span class="line"><span>As string: Hello</span></span>
<span class="line"><span>Union size: 20 bytes</span></span></code></pre></div><p>尽管它包含一个<code>int</code>, 一个<code>float</code>，和一个<code>char[20]</code>，总大小只有20字节，是最大成员的大小。</p><h4 id="标记联合-类型安全模式" tabindex="-1">标记联合（类型安全模式） <a class="header-anchor" href="#标记联合-类型安全模式" aria-label="Permalink to &quot;标记联合（类型安全模式）&quot;">​</a></h4><p>在实践中，您经常使用标签（枚举或整数）来记住哪个成员是活动的，这称为标记联合或可区分联合。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>STRING: C Language</span></span>
<span class="line"><span>INT: 123</span></span>
<span class="line"><span>FLOAT: 9.81</span></span></code></pre></div><p>这就是如何将联合的灵活性与了解当前有效字段的安全性结合起来。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>工会对于以下方面至关重要：</p><ul><li>节省内存，一次仅存在一个字段。</li><li>实现变体数据类型，例如 JSON 值、表达式树、网络数据包。</li><li>使用硬件寄存器，将一个寄存器映射到多种视图类型。</li><li>二进制序列化，将原始字节重新解释为各种数据形式。</li></ul><p>在低级系统中，它们实现了 C 语言闻名的紧凑而灵活的表示。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>写一个联盟<code>Number</code>和<code>int</code>,<code>float</code>， 和<code>double</code>.</p><ul><li>打印它的大小并观察哪个成员决定它。</li></ul><p>实施标记联合<code>Message</code>类型为 TEXT、BINARY 和 COMMAND。</p><p>创建一个带有枚举标记和联合的结构体，模拟如何解析文件格式（如 PNG 块）。</p><p>编写一个使用标签打印活动联合字段的函数。</p><p>修改前面的示例以存储标记联合的数组。</p><p>在 C 中，联合为您提供了很少有语言允许的内存控制和灵活性。它们是高级结构的基础，如变体类型、多态结构，甚至消息协议，从 Linux 内核到嵌入式固件，无处不在。</p>`,40)])])}const g=n(i,[["render",l]]);export{h as __pageData,g as default};
