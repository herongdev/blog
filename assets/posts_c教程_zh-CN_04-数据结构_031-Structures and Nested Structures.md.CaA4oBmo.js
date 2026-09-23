import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"31. 结构和嵌套结构","description":"The Little Book of C 中文版 — 31. 结构和嵌套结构","frontmatter":{"title":"31. 结构和嵌套结构","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 31. 结构和嵌套结构","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":31,"sidebarWeight":31,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures","alternateEn":"/posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures.md","filePath":"posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures.md"};function i(l,s,c,o,d,r){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures)</p><p>现实世界的程序通常处理相关数据组，而不仅仅是单个变量。例如，一个人有姓名、年龄和地址。您可以使用以下命令将它们组合成一个结构，而不是处理单独的变量<code>struct</code>.</p><p><code>struct</code>是 C 中最强大的功能之一，它允许您定义自己的数据类型，对信息进行逻辑有效的分组。</p><h4 id="什么是结构" tabindex="-1">什么是结构？ <a class="header-anchor" href="#什么是结构" aria-label="Permalink to &quot;什么是结构？&quot;">​</a></h4><p>结构是一种用户定义的类型，它在一个名称下保存不同类型的变量。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person {</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    int age;</span></span>
<span class="line"><span>    float height;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这声明了一个模板<code>Person</code>目的。它还没有创建实际数据，只是创建蓝图。</p><h4 id="声明和使用结构" tabindex="-1">声明和使用结构 <a class="header-anchor" href="#声明和使用结构" aria-label="Permalink to &quot;声明和使用结构&quot;">​</a></h4><p>您现在可以创建这种新类型的变量：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>struct Person {</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    int age;</span></span>
<span class="line"><span>    float height;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct Person p1 = {&quot;Alice&quot;, 25, 1.65f};</span></span>
<span class="line"><span>    printf(&quot;Name: %s\\n&quot;, p1.name);</span></span>
<span class="line"><span>    printf(&quot;Age: %d\\n&quot;, p1.age);</span></span>
<span class="line"><span>    printf(&quot;Height: %.2f m\\n&quot;, p1.height);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Name: Alice</span></span>
<span class="line"><span>Age: 25</span></span>
<span class="line"><span>Height: 1.65 m</span></span></code></pre></div><h4 id="访问会员" tabindex="-1">访问会员 <a class="header-anchor" href="#访问会员" aria-label="Permalink to &quot;访问会员&quot;">​</a></h4><p>使用点运算符<code>.</code>访问结构体变量的字段：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>p1.age = 26;</span></span>
<span class="line"><span>printf(&quot;Updated age: %d\\n&quot;, p1.age);</span></span></code></pre></div><p>如果您有指向结构的指针，请使用箭头运算符<code>-&gt;</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person *ptr = &amp;p1;</span></span>
<span class="line"><span>printf(&quot;Pointer access: %s is %d years old.\\n&quot;, ptr-&gt;name, ptr-&gt;age);</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Pointer access: Alice is 26 years old.</span></span></code></pre></div><h4 id="初始化和复制结构" tabindex="-1">初始化和复制结构 <a class="header-anchor" href="#初始化和复制结构" aria-label="Permalink to &quot;初始化和复制结构&quot;">​</a></h4><p>您可以直接初始化结构体：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person p2 = {.name = &quot;Bob&quot;, .age = 30, .height = 1.75f};</span></span></code></pre></div><p>结构体可以按值赋值和复制：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person copy = p2;</span></span>
<span class="line"><span>printf(&quot;Copy: %s (%d)\\n&quot;, copy.name, copy.age);</span></span></code></pre></div><p>这执行浅复制，所有字段都被复制，但如果有任何包含指针，它们仍然会引用相同的内存（稍后您将学习如何进行深复制）。</p><h4 id="嵌套结构" tabindex="-1">嵌套结构 <a class="header-anchor" href="#嵌套结构" aria-label="Permalink to &quot;嵌套结构&quot;">​</a></h4><p>结构可以包含其他结构。这可以帮助您清晰地组织复杂的数据。</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>struct Date {</span></span>
<span class="line"><span>    int day;</span></span>
<span class="line"><span>    int month;</span></span>
<span class="line"><span>    int year;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>struct Student {</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    int id;</span></span>
<span class="line"><span>    struct Date birthdate; // nested structure</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct Student s = {</span></span>
<span class="line"><span>        .name = &quot;Carol&quot;,</span></span>
<span class="line"><span>        .id = 1234,</span></span>
<span class="line"><span>        .birthdate = {15, 8, 2003}</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    printf(&quot;%s (ID %d) was born on %02d/%02d/%04d\\n&quot;,</span></span>
<span class="line"><span>           s.name, s.id,</span></span>
<span class="line"><span>           s.birthdate.day, s.birthdate.month, s.birthdate.year);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Carol (ID 1234) was born on 15/08/2003</span></span></code></pre></div><p>您可以使用点运算符访问嵌套字段：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>s.birthdate.year = 2004;</span></span></code></pre></div><h4 id="结构与功能" tabindex="-1">结构与功能 <a class="header-anchor" href="#结构与功能" aria-label="Permalink to &quot;结构与功能&quot;">​</a></h4><p>您可以通过值或指针将结构传递给函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void print_person(struct Person p);</span></span>
<span class="line"><span>void update_age(struct Person *p, int new_age);</span></span></code></pre></div><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void update_age(struct Person *p, int new_age) {</span></span>
<span class="line"><span>    p-&gt;age = new_age;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>传递指针更有效，特别是对于大型结构。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个结合了上述所有内容的完整示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>struct Date {</span></span>
<span class="line"><span>    int day;</span></span>
<span class="line"><span>    int month;</span></span>
<span class="line"><span>    int year;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>struct Person {</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    int age;</span></span>
<span class="line"><span>    float height;</span></span>
<span class="line"><span>    struct Date birthdate;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>void print_person(const struct Person *p) {</span></span>
<span class="line"><span>    printf(&quot;%s, %d years old, born on %02d/%02d/%04d, height %.2fm\\n&quot;,</span></span>
<span class="line"><span>           p-&gt;name, p-&gt;age,</span></span>
<span class="line"><span>           p-&gt;birthdate.day, p-&gt;birthdate.month, p-&gt;birthdate.year,</span></span>
<span class="line"><span>           p-&gt;height);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct Person person = {&quot;Alice&quot;, 25, 1.68f, {1, 2, 1999}};</span></span>
<span class="line"><span>    print_person(&amp;person);</span></span>
<span class="line"><span>    person.age++;</span></span>
<span class="line"><span>    person.birthdate.year++;</span></span>
<span class="line"><span>    printf(&quot;After update:\\n&quot;);</span></span>
<span class="line"><span>    print_person(&amp;person);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Alice, 25 years old, born on 01/02/1999, height 1.68m</span></span>
<span class="line"><span>After update:</span></span>
<span class="line"><span>Alice, 26 years old, born on 01/02/2000, height 1.68m</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>结构让您：</p><ul><li>将相关数据组合成逻辑单元。</li><li>直接在代码中对现实世界的实体进行建模。</li><li>在函数之间有效地传递数据。</li><li>构建更高级别的数据抽象，例如列表、树或对象。</li></ul><p>它们是所有复杂 C 系统、文件、网络数据包、内核数据甚至数据库行的基础<code>struct</code>.</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>创建一个<code>Book</code>结构与<code>title</code>,<code>author</code>， 和<code>year</code>.</li><li>编写一个函数来打印a的所有详细信息<code>Book</code>.</li><li>创建嵌套结构<code>Library</code>包含多本书。</li><li>访问嵌套字段（例如，第一本书的标题）。</li><li>修改<code>Library</code>通过指针使用<code>-&gt;</code>操作员。</li></ol><p>结构是 C 语言让您对世界进行建模的方式，紧凑、明确且快速。接下来，您将了解联合以及 C 如何让不同的数据类型有效地共享相同的内存空间。</p>`,51)])])}const g=a(t,[["render",i]]);export{u as __pageData,g as default};
