import{_ as s,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"29. 深拷贝与浅拷贝","description":"The Little Book of C 中文版 — 29. 深拷贝与浅拷贝","frontmatter":{"title":"29. 深拷贝与浅拷贝","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","03-内存","中文"],"description":"The Little Book of C 中文版 — 29. 深拷贝与浅拷贝","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":29,"sidebarWeight":29,"alternateZh":"/posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies","alternateEn":"/posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies"},"headers":[],"relativePath":"posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies.md","filePath":"posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies.md"};function i(o,a,t,c,r,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies)</p><p>当您在 C 中将一个变量分配给另一个变量时，您通常会复制地址，而不是实际数据。在使用指针、数组和动态分配的结构时，浅拷贝和深拷贝之间的区别变得至关重要。了解它可以帮助您防止内存损坏、双重释放和神秘的错误。</p><h4 id="核心理念" tabindex="-1">核心理念 <a class="header-anchor" href="#核心理念" aria-label="Permalink to &quot;核心理念&quot;">​</a></h4><ul><li>浅拷贝仅复制指针，两个变量引用同一内存。</li><li>深拷贝复制数据本身，每个变量拥有自己独立的内存。</li></ul><h4 id="简单的比喻" tabindex="-1">简单的比喻 <a class="header-anchor" href="#简单的比喻" aria-label="Permalink to &quot;简单的比喻&quot;">​</a></h4><p>将浅复制与深复制想象成两栋房子：</p><ul><li>浅拷贝：你把你家的钥匙交给某人。你们都打开同一扇门。</li><li>深度复制：你建造一座看起来相同但又独立的新房子。</li></ul><h4 id="浅拷贝示例" tabindex="-1">浅拷贝示例 <a class="header-anchor" href="#浅拷贝示例" aria-label="Permalink to &quot;浅拷贝示例&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char *original = malloc(10);</span></span>
<span class="line"><span>    strcpy(original, &quot;Hello&quot;);</span></span>
<span class="line"><span>    // Shallow copy</span></span>
<span class="line"><span>    char *copy = original;</span></span>
<span class="line"><span>    printf(&quot;Before change: %s | %s\\n&quot;, original, copy);</span></span>
<span class="line"><span>    copy[0] = &#39;J&#39;; // modify one</span></span>
<span class="line"><span>    printf(&quot;After change: %s | %s\\n&quot;, original, copy);</span></span>
<span class="line"><span>    free(original);</span></span>
<span class="line"><span>    // free(copy);</span><span> // ❌ would cause double free error!</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before change: Hello | Hello</span></span>
<span class="line"><span>After change: Jello | Jello</span></span></code></pre></div><p>解释：</p><p>-<code>copy</code>指向相同的内存<code>original</code>.</p><ul><li>改变其中之一会改变两者。</li><li>你必须只<code>free()</code>一次，释放两者都是一个错误。</li></ul><h4 id="深拷贝示例" tabindex="-1">深拷贝示例 <a class="header-anchor" href="#深拷贝示例" aria-label="Permalink to &quot;深拷贝示例&quot;">​</a></h4><p>深复制分配新内存并复制数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char *original = malloc(10);</span></span>
<span class="line"><span>    strcpy(original, &quot;Hello&quot;);</span></span>
<span class="line"><span>    // Deep copy</span></span>
<span class="line"><span>    char *copy = malloc(strlen(original) + 1);</span></span>
<span class="line"><span>    strcpy(copy, original);</span></span>
<span class="line"><span>    printf(&quot;Before change: %s | %s\\n&quot;, original, copy);</span></span>
<span class="line"><span>    copy[0] = &#39;J&#39;;</span></span>
<span class="line"><span>    printf(&quot;After change: %s | %s\\n&quot;, original, copy);</span></span>
<span class="line"><span>    free(original);</span></span>
<span class="line"><span>    free(copy); // ✅ both safely freed</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before change: Hello | Hello</span></span>
<span class="line"><span>After change: Hello | Jello</span></span></code></pre></div><p>现在两个字符串完全独立，是真正的深拷贝。</p><h4 id="结构中的浅层与深层" tabindex="-1">结构中的浅层与深层 <a class="header-anchor" href="#结构中的浅层与深层" aria-label="Permalink to &quot;结构中的浅层与深层&quot;">​</a></h4><p>考虑这个结构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    char *name;</span></span>
<span class="line"><span>} Person;</span></span></code></pre></div><p>如果您指定一个<code>Person</code>到另一个：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Person a, b;</span></span>
<span class="line"><span>a.name = malloc(20);</span></span>
<span class="line"><span>strcpy(a.name, &quot;Alice&quot;);</span></span>
<span class="line"><span>b = a; // shallow copy</span></span>
<span class="line"><span>b.name[0] = &#39;M&#39;; // modifies a.name too!</span></span></code></pre></div><p>两个都<code>a</code>和<code>b</code>指向同一个内存。要进行深层复制：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>b.name = malloc(strlen(a.name) + 1);</span></span>
<span class="line"><span>strcpy(b.name, a.name);</span></span></code></pre></div><p>现在他们独立了。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个完整的程序，演示了两个带有结构的副本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    char *name;</span></span>
<span class="line"><span>    int age;</span></span>
<span class="line"><span>} Person;</span></span>
<span class="line"><span>void print_person(const char *label, Person p) {</span></span>
<span class="line"><span>    printf(&quot;%s: name=%s age=%d\\n&quot;, label, p.name, p.age);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Person p1;</span></span>
<span class="line"><span>    p1.name = malloc(20);</span></span>
<span class="line"><span>    strcpy(p1.name, &quot;Alice&quot;);</span></span>
<span class="line"><span>    p1.age = 25;</span></span>
<span class="line"><span>    // Shallow copy</span></span>
<span class="line"><span>    Person p2 = p1;</span></span>
<span class="line"><span>    print_person(&quot;Before&quot;, p1);</span></span>
<span class="line"><span>    p2.name[0] = &#39;M&#39;; // modifies same memory</span></span>
<span class="line"><span>    print_person(&quot;After shallow copy&quot;, p1);</span></span>
<span class="line"><span>    // Deep copy</span></span>
<span class="line"><span>    Person p3;</span></span>
<span class="line"><span>    p3.name = malloc(strlen(p1.name) + 1);</span></span>
<span class="line"><span>    strcpy(p3.name, p1.name);</span></span>
<span class="line"><span>    p3.age = p1.age;</span></span>
<span class="line"><span>    p3.name[0] = &#39;C&#39;; // independent copy</span></span>
<span class="line"><span>    print_person(&quot;After deep copy&quot;, p1);</span></span>
<span class="line"><span>    print_person(&quot;Deep copy result&quot;, p3);</span></span>
<span class="line"><span>    free(p1.name);</span></span>
<span class="line"><span>    free(p3.name); // ✅ safe</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before: name=Alice age=25</span></span>
<span class="line"><span>After shallow copy: name=Mlice age=25</span></span>
<span class="line"><span>After deep copy: name=Mlice age=25</span></span>
<span class="line"><span>Deep copy result: name=Clice age=25</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>浅拷贝和深拷贝决定内存的所有权：</p><ul><li>如果两个变量共享同一指针（浅），则释放一个变量会使另一个变量无效。</li><li>深度复制隔离数据，防止干扰，但使用更多内存。</li></ul><p>犯这个错误会导致：</p><ul><li>双自由或悬垂指针错误</li><li>内存泄漏</li><li>复杂结构中的数据损坏</li></ul><p>理解这些概念对于以下方面至关重要：</p><ul><li>管理动态数组和链表</li><li>设计安全返回或复制数据的 API</li><li>为结构编写自定义复制构造函数</li></ul><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>创建一个具有动态分配字段的结构体（例如，<code>name</code>,<code>address</code>）并编写两个复制函数：<code>copy_shallow()</code>和<code>copy_deep()</code>.</li><li>修改一份并观察差异。</li><li>打电话<code>free()</code>以错误的顺序并记下会发生什么。</li><li>使用 Valgrind 验证深拷贝是否已正确释放。</li><li>将概念扩展到结构体数组，为每个元素实现深复制。</li></ol><p>当您了解深拷贝与浅拷贝时，您就可以控制内存所有权在程序中的移动方式，这是安全、模块化和无泄漏 C 设计的基础。</p>`,43)])])}const g=s(l,[["render",i]]);export{u as __pageData,g as default};
