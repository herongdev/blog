import{_ as s,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"29. Deep vs Shallow Copies","description":"The Little Book of C — 29. Deep vs Shallow Copies","frontmatter":{"title":"29. Deep vs Shallow Copies","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Working with Memory"],"description":"The Little Book of C — 29. Deep vs Shallow Copies","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":29,"sidebarWeight":29,"lang":"en-US","alternateEn":"/posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies","alternateZh":"/posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies"},"headers":[],"relativePath":"posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies.md","filePath":"posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies.md"};function o(i,a,t,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies)</p><p>When you assign one variable to another in C, you’re often copying addresses, not actual data. This distinction between shallow copies and deep copies becomes critical when working with pointers, arrays, and dynamically allocated structures. Understanding it helps you prevent memory corruption, double frees, and mysterious bugs.</p><h4 id="the-core-idea" tabindex="-1">The Core Idea <a class="header-anchor" href="#the-core-idea" aria-label="Permalink to &quot;The Core Idea&quot;">​</a></h4><ul><li>A shallow copy duplicates only the pointer, both variables refer to the same memory.</li><li>A deep copy duplicates the data itself, each variable owns its own independent memory.</li></ul><h4 id="simple-analogy" tabindex="-1">Simple Analogy <a class="header-anchor" href="#simple-analogy" aria-label="Permalink to &quot;Simple Analogy&quot;">​</a></h4><p>Think of shallow vs deep copy like two houses:</p><ul><li>Shallow copy: You hand someone your house key. You both open the same door.</li><li>Deep copy: You build a new house that looks identical, but is separate.</li></ul><h4 id="shallow-copy-example" tabindex="-1">Shallow Copy Example <a class="header-anchor" href="#shallow-copy-example" aria-label="Permalink to &quot;Shallow Copy Example&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before change: Hello | Hello</span></span>
<span class="line"><span>After change: Jello | Jello</span></span></code></pre></div><p>Explanation:</p><ul><li><code>copy</code> points to the same memory as<code>original</code>.</li><li>Changing one changes both.</li><li>You must only<code>free()</code> it once, freeing both is a bug.</li></ul><h4 id="deep-copy-example" tabindex="-1">Deep Copy Example <a class="header-anchor" href="#deep-copy-example" aria-label="Permalink to &quot;Deep Copy Example&quot;">​</a></h4><p>A deep copy allocates new memory and copies the data over.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before change: Hello | Hello</span></span>
<span class="line"><span>After change: Hello | Jello</span></span></code></pre></div><p>Now the two strings are completely independent, a true deep copy.</p><h4 id="shallow-vs-deep-in-structs" tabindex="-1">Shallow vs Deep in Structs <a class="header-anchor" href="#shallow-vs-deep-in-structs" aria-label="Permalink to &quot;Shallow vs Deep in Structs&quot;">​</a></h4><p>Consider this structure:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    char *name;</span></span>
<span class="line"><span>} Person;</span></span></code></pre></div><p>If you assign one<code>Person</code> to another:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Person a, b;</span></span>
<span class="line"><span>a.name = malloc(20);</span></span>
<span class="line"><span>strcpy(a.name, &quot;Alice&quot;);</span></span>
<span class="line"><span>b = a; // shallow copy</span></span>
<span class="line"><span>b.name[0] = &#39;M&#39;; // modifies a.name too!</span></span></code></pre></div><p>Both<code>a</code> and<code>b</code> point to the same memory. To make a deep copy:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>b.name = malloc(strlen(a.name) + 1);</span></span>
<span class="line"><span>strcpy(b.name, a.name);</span></span></code></pre></div><p>Now they’re independent.</p><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>Here’s a full program demonstrating both copies with structs:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Before: name=Alice age=25</span></span>
<span class="line"><span>After shallow copy: name=Mlice age=25</span></span>
<span class="line"><span>After deep copy: name=Mlice age=25</span></span>
<span class="line"><span>Deep copy result: name=Clice age=25</span></span></code></pre></div><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Shallow and deep copies determine ownership of memory:</p><ul><li>If two variables share the same pointer (shallow), freeing one invalidates the other.</li><li>Deep copies isolate data, preventing interference but using more memory.</li></ul><p>Getting this wrong leads to:</p><ul><li>Double free or dangling pointer errors</li><li>Memory leaks</li><li>Corrupted data in complex structures</li></ul><p>Understanding these concepts is crucial for:</p><ul><li>Managing dynamic arrays and linked lists</li><li>Designing APIs that safely return or duplicate data</li><li>Writing custom copy constructors for structs</li></ul><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Create a struct with dynamically allocated fields (e.g.,<code>name</code>,<code>address</code>) and write two copy functions:<code>copy_shallow()</code> and<code>copy_deep()</code>.</li><li>Modify one copy and observe the difference.</li><li>Call<code>free()</code> in the wrong order and note what happens.</li><li>Use Valgrind to verify that deep copies are properly freed.</li><li>Extend the concept to an array of structs, implement deep copy for each element.</li></ol><p>When you understand deep vs shallow copies, you control how memory ownership moves in your program, a foundation for safe, modular, and leak-free C design.</p>`,42)])])}const g=s(l,[["render",o]]);export{u as __pageData,g as default};
