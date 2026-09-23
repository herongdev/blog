import{_ as a,o as s,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"39. C 中的最小面向对象设计","description":"The Little Book of C 中文版 — 39. C 中的最小面向对象设计","frontmatter":{"title":"39. C 中的最小面向对象设计","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 39. C 中的最小面向对象设计","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":39,"sidebarWeight":39,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C","alternateEn":"/posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C.md","filePath":"posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C.md"};function t(i,n,c,r,o,d){return s(),e("div",null,[...n[0]||(n[0]=[p(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C)</p><p>C 没有类或继承，但它通过约定为您提供结构、函数指针和封装。有了这些，您可以构建简单、快速且明确的面向对象风格的系统。您将学习如何设计“拥有”数据和行为的数据结构，例如轻量级对象。</p><h4 id="核心理念" tabindex="-1">核心理念 <a class="header-anchor" href="#核心理念" aria-label="Permalink to &quot;核心理念&quot;">​</a></h4><p>在面向对象的设计中，对象结合了：</p><ul><li>数据 → 状态</li><li>功能 → 操作</li></ul><p>在 C 中，您可以通过将函数指针放置在结构中并将它们视为“方法”来实现此目的。</p><h4 id="一个简单的例子-计数器对象" tabindex="-1">一个简单的例子：计数器对象 <a class="header-anchor" href="#一个简单的例子-计数器对象" aria-label="Permalink to &quot;一个简单的例子：计数器对象&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Value: 2</span></span>
<span class="line"><span>Value: 0</span></span></code></pre></div><p>这里，<code>Counter</code>行为就像一个小类：它存储状态（<code>value</code>）及其方法（<code>inc</code>,<code>reset</code>,<code>print</code>).</p><h4 id="它是如何运作的" tabindex="-1">它是如何运作的 <a class="header-anchor" href="#它是如何运作的" aria-label="Permalink to &quot;它是如何运作的&quot;">​</a></h4><table tabindex="0"><thead><tr><th>概念（面向对象编程）</th><th>相当于 C</th></tr></thead><tbody><tr><td>班级</td><td><code>struct</code>定义</td></tr><tr><td>对象</td><td>一个实例（<code>malloc</code>ed 结构）</td></tr><tr><td>方法</td><td>函数指针</td></tr><tr><td>构造函数</td><td><code>new_...()</code>功能</td></tr><tr><td>析构函数</td><td><code>free_...()</code>功能</td></tr><tr><td>这</td><td>指向结构体的指针（<code>self</code>)</td></tr></tbody></table><h4 id="示例-形状接口-多态性" tabindex="-1">示例：形状接口（多态性） <a class="header-anchor" href="#示例-形状接口-多态性" aria-label="Permalink to &quot;示例：形状接口（多态性）&quot;">​</a></h4><p>您可以使用函数指针模拟多态性，即在不同类型上调用相同函数名的能力。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Circle (r=2.50) area=19.63</span></span>
<span class="line"><span>Rectangle (3.00x4.00) area=12.00</span></span></code></pre></div><p>两种形状共享相同的“界面”（<code>area</code>,<code>print</code>）但行为不同，典型的多态性。</p><h4 id="为什么这有效" tabindex="-1">为什么这有效 <a class="header-anchor" href="#为什么这有效" aria-label="Permalink to &quot;为什么这有效&quot;">​</a></h4><p>每个“对象”都存储指向其方法的指针，因此您可以在不知道确切类型的情况下调用它们。第一个字段（<code>base</code>) 在派生结构中允许在父级 (<code>Shape*</code>）和孩子（<code>Circle*</code>,<code>Rectangle*</code>）。这模仿了组合继承。</p><h4 id="好处" tabindex="-1">好处 <a class="header-anchor" href="#好处" aria-label="Permalink to &quot;好处&quot;">​</a></h4><ul><li>提供接口和实现之间的清晰分离。</li><li>启用运行时调度（函数行为取决于类型）。</li><li>保持代码模块化，函数可以对抽象“对象”进行操作。</li><li>用于 Linux 内核、GTK 和 SQLite 等主要 C 项目。</li></ul><h4 id="局限性" tabindex="-1">局限性 <a class="header-anchor" href="#局限性" aria-label="Permalink to &quot;局限性&quot;">​</a></h4><ul><li>没有真正的类型安全，强制转换可能会出错。</li><li>没有自动析构函数或构造函数（您必须管理内存）。</li><li>没有继承语法，一切都是明确的。</li></ul><p>但这些也是优势：没有什么是隐藏的，一切都在你的掌控之中。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>添加新形状：<code>Triangle</code>与底座和高度。</li><li>编写函数<code>print_all(Shape **arr, int n)</code>打印数组中的所有形状。 3.添加一个<code>destroy(Shape *s)</code>方法指针并实现特定于类型的清理。</li><li>延长<code>Counter</code>结构体有一个<code>decrement</code>方法。</li><li>尝试设计一个小的“界面”<code>Animal</code>→<code>Dog</code>,<code>Cat</code>与一个<code>speak()</code>功能。</li></ol><p>借助结构体和函数指针，C 成为一个最小但功能强大的对象系统。您现在拥有设计可重用、模块化代码所需的一切，同时又不会失去 C 语言永恒的清晰度和效率。</p><p>接下来，您将通过将所有这些想法放在一起来完成本章：用 C 语言构建一个小型的、真实的系统，您自己的小型库系统，具有数据结构、内存管理和模块化设计。</p>`,30)])])}const g=a(l,[["render",t]]);export{u as __pageData,g as default};
