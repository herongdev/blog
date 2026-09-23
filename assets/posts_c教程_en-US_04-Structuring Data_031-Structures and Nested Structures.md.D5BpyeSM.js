import{_ as a,o as n,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"31. Structures and Nested Structures","description":"The Little Book of C — 31. Structures and Nested Structures","frontmatter":{"title":"31. Structures and Nested Structures","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Structuring Data"],"description":"The Little Book of C — 31. Structures and Nested Structures","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":31,"sidebarWeight":31,"lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures","alternateZh":"/posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures.md","filePath":"posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures.md"};function i(l,s,o,c,r,d){return n(),e("div",null,[...s[0]||(s[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures)</p><p>Real-world programs often deal with groups of related data, not just single variables. For example, a person has a name, an age, and an address. Instead of juggling separate variables, you can combine them into a single structure using<code>struct</code>.</p><p><code>struct</code> is one of the most powerful features in C, it lets you define your own data types that group information logically and efficiently.</p><h4 id="what-is-a-structure" tabindex="-1">What Is a Structure? <a class="header-anchor" href="#what-is-a-structure" aria-label="Permalink to &quot;What Is a Structure?&quot;">​</a></h4><p>A structure is a user-defined type that holds variables of different kinds under one name.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person {</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    int age;</span></span>
<span class="line"><span>    float height;</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>This declares a template for a<code>Person</code> object. It doesn’t create actual data yet, just the blueprint.</p><h4 id="declaring-and-using-structures" tabindex="-1">Declaring and Using Structures <a class="header-anchor" href="#declaring-and-using-structures" aria-label="Permalink to &quot;Declaring and Using Structures&quot;">​</a></h4><p>You can now create variables of this new type:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Name: Alice</span></span>
<span class="line"><span>Age: 25</span></span>
<span class="line"><span>Height: 1.65 m</span></span></code></pre></div><h4 id="accessing-members" tabindex="-1">Accessing Members <a class="header-anchor" href="#accessing-members" aria-label="Permalink to &quot;Accessing Members&quot;">​</a></h4><p>Use the dot operator<code>.</code> to access fields of a structure variable:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>p1.age = 26;</span></span>
<span class="line"><span>printf(&quot;Updated age: %d\\n&quot;, p1.age);</span></span></code></pre></div><p>If you have a pointer to a structure, use the arrow operator<code>-&gt;</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person *ptr = &amp;p1;</span></span>
<span class="line"><span>printf(&quot;Pointer access: %s is %d years old.\\n&quot;, ptr-&gt;name, ptr-&gt;age);</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Pointer access: Alice is 26 years old.</span></span></code></pre></div><h4 id="initializing-and-copying-structures" tabindex="-1">Initializing and Copying Structures <a class="header-anchor" href="#initializing-and-copying-structures" aria-label="Permalink to &quot;Initializing and Copying Structures&quot;">​</a></h4><p>You can initialize a struct directly:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person p2 = {.name = &quot;Bob&quot;, .age = 30, .height = 1.75f};</span></span></code></pre></div><p>Structures can be assigned and copied by value:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Person copy = p2;</span></span>
<span class="line"><span>printf(&quot;Copy: %s (%d)\\n&quot;, copy.name, copy.age);</span></span></code></pre></div><p>This performs a shallow copy, all fields are copied, but if any contain pointers, they’ll still refer to the same memory (you’ll learn how to make deep copies later).</p><h4 id="nested-structures" tabindex="-1">Nested Structures <a class="header-anchor" href="#nested-structures" aria-label="Permalink to &quot;Nested Structures&quot;">​</a></h4><p>Structures can contain other structures. This helps you organize complex data clearly.</p><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Carol (ID 1234) was born on 15/08/2003</span></span></code></pre></div><p>You access nested fields with the dot operator:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>s.birthdate.year = 2004;</span></span></code></pre></div><h4 id="structures-and-functions" tabindex="-1">Structures and Functions <a class="header-anchor" href="#structures-and-functions" aria-label="Permalink to &quot;Structures and Functions&quot;">​</a></h4><p>You can pass structs to functions by value or by pointer:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void print_person(struct Person p);</span></span>
<span class="line"><span>void update_age(struct Person *p, int new_age);</span></span></code></pre></div><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void update_age(struct Person *p, int new_age) {</span></span>
<span class="line"><span>    p-&gt;age = new_age;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Passing a pointer is more efficient, especially for large structures.</p><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>Here’s a full example combining everything above:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Alice, 25 years old, born on 01/02/1999, height 1.68m</span></span>
<span class="line"><span>After update:</span></span>
<span class="line"><span>Alice, 26 years old, born on 01/02/2000, height 1.68m</span></span></code></pre></div><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Structures let you:</p><ul><li>Combine related data into logical units.</li><li>Model real-world entities directly in code.</li><li>Pass data efficiently between functions.</li><li>Build higher-level data abstractions like lists, trees, or objects.</li></ul><p>They’re the foundation of all complex C systems, files, network packets, kernel data, even database rows are built on top of<code>struct</code>.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Create a<code>Book</code> structure with<code>title</code>,<code>author</code>, and<code>year</code>.</li><li>Write a function to print all details of a<code>Book</code>.</li><li>Create a nested structure<code>Library</code> that contains multiple books.</li><li>Access a nested field (e.g., the title of the first book).</li><li>Modify the<code>Library</code> through a pointer using the<code>-&gt;</code> operator.</li></ol><p>Structures are how C lets you model the world, compact, explicit, and fast. Next, you’ll learn about unions and how C lets different data types share the same memory space efficiently.</p>`,51)])])}const g=a(p,[["render",i]]);export{h as __pageData,g as default};
