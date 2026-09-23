import{_ as a,o as s,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"39. Minimal Object-Oriented Design in C","description":"The Little Book of C — 39. Minimal Object-Oriented Design in C","frontmatter":{"title":"39. Minimal Object-Oriented Design in C","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Structuring Data"],"description":"The Little Book of C — 39. Minimal Object-Oriented Design in C","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":39,"sidebarWeight":39,"lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C","alternateZh":"/posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C.md","filePath":"posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C.md"};function i(l,n,c,o,r,d){return s(),e("div",null,[...n[0]||(n[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C)</p><p>C doesn’t have classes or inheritance, but it gives you structs, function pointers, and encapsulation through conventions. With these, you can build object-oriented style systems that are simple, fast, and explicit. You’ll learn how to design data structures that “own” both data and behavior, like lightweight objects.</p><h4 id="the-core-idea" tabindex="-1">The Core Idea <a class="header-anchor" href="#the-core-idea" aria-label="Permalink to &quot;The Core Idea&quot;">​</a></h4><p>In object-oriented design, an object combines:</p><ul><li>Data → the state</li><li>Functions → the operations</li></ul><p>In C, you can achieve this by placing function pointers inside structs, and treating them as “methods.”</p><h4 id="a-simple-example-a-counter-object" tabindex="-1">A Simple Example: A Counter Object <a class="header-anchor" href="#a-simple-example-a-counter-object" aria-label="Permalink to &quot;A Simple Example: A Counter Object&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>typedef struct Counter Counter; // forward declaration</span></span>
<span class="line"><span>struct Counter {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    // methods (function pointers)</span></span>
<span class="line"><span>    void (*inc)(Counter *self);</span></span>
<span class="line"><span>    void (*reset)(Counter *self);</span></span>
<span class="line"><span>    void (*print)(const Counter *self);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>void counter_inc(Counter *self) { self-&gt;value++; }</span></span>
<span class="line"><span>void counter_reset(Counter *self) { self-&gt;value = 0; }</span></span>
<span class="line"><span>void counter_print(const Counter *self) { printf(&quot;Value: %d\\n&quot;, self-&gt;value); }</span></span>
<span class="line"><span>Counter* new_counter(void) {</span></span>
<span class="line"><span>    Counter *c = malloc(sizeof(Counter));</span></span>
<span class="line"><span>    c-&gt;value = 0;</span></span>
<span class="line"><span>    c-&gt;inc = counter_inc;</span></span>
<span class="line"><span>    c-&gt;reset = counter_reset;</span></span>
<span class="line"><span>    c-&gt;print = counter_print;</span></span>
<span class="line"><span>    return c;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void free_counter(Counter *c) { free(c); }</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Counter *c = new_counter();</span></span>
<span class="line"><span>    c-&gt;inc(c);</span></span>
<span class="line"><span>    c-&gt;inc(c);</span></span>
<span class="line"><span>    c-&gt;print(c);</span></span>
<span class="line"><span>    c-&gt;reset(c);</span></span>
<span class="line"><span>    c-&gt;print(c);</span></span>
<span class="line"><span>    free_counter(c);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Value: 2</span></span>
<span class="line"><span>Value: 0</span></span></code></pre></div><p>Here,<code>Counter</code> behaves like a small class: it stores both the state (<code>value</code>) and its methods (<code>inc</code>,<code>reset</code>,<code>print</code>).</p><h4 id="how-it-works" tabindex="-1">How It Works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How It Works&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Concept (OOP)</th><th>Equivalent in C</th></tr></thead><tbody><tr><td>Class</td><td><code>struct</code> definition</td></tr><tr><td>Object</td><td>An instance (<code>malloc</code> ed struct)</td></tr><tr><td>Method</td><td>Function pointer</td></tr><tr><td>Constructor</td><td><code>new_...()</code> function</td></tr><tr><td>Destructor</td><td><code>free_...()</code> function</td></tr><tr><td>this</td><td>Pointer to the struct (<code>self</code>)</td></tr></tbody></table><h4 id="example-shape-interface-polymorphism" tabindex="-1">Example: Shape Interface (Polymorphism) <a class="header-anchor" href="#example-shape-interface-polymorphism" aria-label="Permalink to &quot;Example: Shape Interface (Polymorphism)&quot;">​</a></h4><p>You can simulate polymorphism, the ability to call the same function name on different types, using function pointers.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;math.h&gt;</span></span>
<span class="line"><span>typedef struct Shape Shape;</span></span>
<span class="line"><span>struct Shape {</span></span>
<span class="line"><span>    double (*area)(Shape *self);</span></span>
<span class="line"><span>    void (*print)(Shape *self);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Shape base;</span></span>
<span class="line"><span>    double radius;</span></span>
<span class="line"><span>} Circle;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Shape base;</span></span>
<span class="line"><span>    double width, height;</span></span>
<span class="line"><span>} Rectangle;</span></span>
<span class="line"><span>double circle_area(Shape *s) {</span></span>
<span class="line"><span>    Circle *c = (Circle*)s;</span></span>
<span class="line"><span>    return M_PI * c-&gt;radius * c-&gt;radius;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void circle_print(Shape *s) {</span></span>
<span class="line"><span>    Circle *c = (Circle*)s;</span></span>
<span class="line"><span>    printf(&quot;Circle (r=%.2f) area=%.2f\\n&quot;, c-&gt;radius, circle_area(s));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>double rect_area(Shape *s) {</span></span>
<span class="line"><span>    Rectangle *r = (Rectangle*)s;</span></span>
<span class="line"><span>    return r-&gt;width * r-&gt;height;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void rect_print(Shape *s) {</span></span>
<span class="line"><span>    Rectangle *r = (Rectangle*)s;</span></span>
<span class="line"><span>    printf(&quot;Rectangle (%.2fx%.2f) area=%.2f\\n&quot;,</span></span>
<span class="line"><span>           r-&gt;width, r-&gt;height, rect_area(s));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Shape* new_circle(double r) {</span></span>
<span class="line"><span>    Circle *c = malloc(sizeof(Circle));</span></span>
<span class="line"><span>    c-&gt;radius = r;</span></span>
<span class="line"><span>    c-&gt;base.area = circle_area;</span></span>
<span class="line"><span>    c-&gt;base.print = circle_print;</span></span>
<span class="line"><span>    return (Shape*)c;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Shape* new_rectangle(double w, double h) {</span></span>
<span class="line"><span>    Rectangle *r = malloc(sizeof(Rectangle));</span></span>
<span class="line"><span>    r-&gt;width = w;</span></span>
<span class="line"><span>    r-&gt;height = h;</span></span>
<span class="line"><span>    r-&gt;base.area = rect_area;</span></span>
<span class="line"><span>    r-&gt;base.print = rect_print;</span></span>
<span class="line"><span>    return (Shape*)r;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Shape *s1 = new_circle(2.5);</span></span>
<span class="line"><span>    Shape *s2 = new_rectangle(3.0, 4.0);</span></span>
<span class="line"><span>    s1-&gt;print(s1);</span></span>
<span class="line"><span>    s2-&gt;print(s2);</span></span>
<span class="line"><span>    free(s1);</span></span>
<span class="line"><span>    free(s2);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Circle (r=2.50) area=19.63</span></span>
<span class="line"><span>Rectangle (3.00x4.00) area=12.00</span></span></code></pre></div><p>Both shapes share the same “interface” (<code>area</code>,<code>print</code>) but behave differently, classic polymorphism.</p><h4 id="why-this-works" tabindex="-1">Why This Works <a class="header-anchor" href="#why-this-works" aria-label="Permalink to &quot;Why This Works&quot;">​</a></h4><p>Every “object” stores pointers to its methods, so you can call them without knowing the exact type. The first field (<code>base</code>) in derived structs allows casting between the parent (<code>Shape*</code>) and child (<code>Circle*</code>,<code>Rectangle*</code>). This mimics inheritance by composition.</p><h4 id="benefits" tabindex="-1">Benefits <a class="header-anchor" href="#benefits" aria-label="Permalink to &quot;Benefits&quot;">​</a></h4><ul><li>Provides clear separation between interface and implementation.</li><li>Enables runtime dispatch (function behavior depends on type).</li><li>Keeps code modular, functions can operate on abstract “objects.”</li><li>Used in major C projects like the Linux kernel, GTK, and SQLite.</li></ul><h4 id="limitations" tabindex="-1">Limitations <a class="header-anchor" href="#limitations" aria-label="Permalink to &quot;Limitations&quot;">​</a></h4><ul><li>No true type safety, casts can go wrong.</li><li>No automatic destructors or constructors (you must manage memory).</li><li>No inheritance syntax, everything is explicit.</li></ul><p>But these are also strengths: nothing is hidden, and everything is under your control.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Add a new shape:<code>Triangle</code> with base and height.</li><li>Write a function<code>print_all(Shape **arr, int n)</code> that prints all shapes in an array.</li><li>Add a<code>destroy(Shape *s)</code> method pointer and implement type-specific cleanup.</li><li>Extend the<code>Counter</code> struct with a<code>decrement</code> method.</li><li>Try designing a small “interface” for<code>Animal</code>→<code>Dog</code>,<code>Cat</code> with a<code>speak()</code> function.</li></ol><p>With structs and function pointers, C becomes a minimal but powerful object system. You now have everything needed to design reusable, modular code, without losing the clarity and efficiency that make C timeless.</p><p>Next, you’ll finish this chapter by putting all these ideas together: building a small, real-world system in C, your own Tiny Library System, with data structures, memory management, and modular design.</p>`,30)])])}const g=a(p,[["render",i]]);export{u as __pageData,g as default};
