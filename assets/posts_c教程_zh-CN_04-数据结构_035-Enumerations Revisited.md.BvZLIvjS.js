import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"35. 重温枚举","description":"The Little Book of C 中文版 — 35. 重温枚举","frontmatter":{"title":"35. 重温枚举","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 35. 重温枚举","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":35,"sidebarWeight":35,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited","alternateEn":"/posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited.md","filePath":"posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited.md"};function t(l,s,c,o,d,r){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited)</p><p>你见过<code>enum</code>在学习常量时简要介绍过，但现在是时候将其用作一流的设计工具了。枚举为整数值集提供名称，使代码更易于阅读、维护和调试。它们还可以与<code>struct</code>,<code>union</code>， 和<code>bitfield</code>前面部分的模式。</p><h4 id="什么是枚举" tabindex="-1">什么是枚举？ <a class="header-anchor" href="#什么是枚举" aria-label="Permalink to &quot;什么是枚举？&quot;">​</a></h4><p>一个枚举（<code>enum</code>) 定义一个类型，其值仅限于特定的命名常量列表。</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Color {</span></span>
<span class="line"><span>    RED,</span></span>
<span class="line"><span>    GREEN,</span></span>
<span class="line"><span>    BLUE</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>在引擎盖下，<code>enum Color</code>是一个整数类型——<code>RED</code>= 0,<code>GREEN</code>= 1,<code>BLUE</code>默认 = 2。</p><h4 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>enum Direction {</span></span>
<span class="line"><span>    NORTH,</span></span>
<span class="line"><span>    EAST,</span></span>
<span class="line"><span>    SOUTH,</span></span>
<span class="line"><span>    WEST</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    enum Direction d = EAST;</span></span>
<span class="line"><span>    printf(&quot;Current direction: %d\\n&quot;, d);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Current direction: 1</span></span></code></pre></div><p>虽然<code>EAST</code>打印为<code>1</code>，使用命名常量使您的代码更有意义。</p><h4 id="分配自定义值" tabindex="-1">分配自定义值 <a class="header-anchor" href="#分配自定义值" aria-label="Permalink to &quot;分配自定义值&quot;">​</a></h4><p>您可以指定显式整数值，这对于兼容性或映射到实际代码很有用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum ErrorCode {</span></span>
<span class="line"><span>    OK = 0,</span></span>
<span class="line"><span>    FILE_NOT_FOUND = 404,</span></span>
<span class="line"><span>    SERVER_ERROR = 500</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>如果跳过某个值，枚举将继续从最后一个数字开始计数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Level {</span></span>
<span class="line"><span>    LOW = 1,</span></span>
<span class="line"><span>    MEDIUM,</span></span>
<span class="line"><span>    HIGH</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// HIGH = 3</span></span></code></pre></div><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>一个使用枚举来清晰程序流程的小程序：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>enum Status {</span></span>
<span class="line"><span>    SUCCESS = 0,</span></span>
<span class="line"><span>    WARNING = 1,</span></span>
<span class="line"><span>    ERROR = 2</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const char* status_to_string(enum Status s) {</span></span>
<span class="line"><span>    switch (s) {</span></span>
<span class="line"><span>        case SUCCESS: return &quot;Success&quot;;</span></span>
<span class="line"><span>        case WARNING: return &quot;Warning&quot;;</span></span>
<span class="line"><span>        case ERROR:   return &quot;Error&quot;;</span></span>
<span class="line"><span>        default:      return &quot;Unknown&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    enum Status s = WARNING;</span></span>
<span class="line"><span>    printf(&quot;Status: %s (%d)\\n&quot;, status_to_string(s), s);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Status: Warning (1)</span></span></code></pre></div><p>这个图案，<code>enum</code>+<code>switch</code>，在 C 项目中无处不在：错误处理、状态机、网络协议等等。</p><h4 id="带有结构的枚举" tabindex="-1">带有结构的枚举 <a class="header-anchor" href="#带有结构的枚举" aria-label="Permalink to &quot;带有结构的枚举&quot;">​</a></h4><p>结合<code>enum</code>和<code>struct</code>对于自描述数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>enum ShapeType {</span></span>
<span class="line"><span>    CIRCLE,</span></span>
<span class="line"><span>    RECTANGLE</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>struct Shape {</span></span>
<span class="line"><span>    enum ShapeType type;</span></span>
<span class="line"><span>    union {</span></span>
<span class="line"><span>        struct { float radius; };</span></span>
<span class="line"><span>        struct { float width, height; };</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>void print_shape(struct Shape s) {</span></span>
<span class="line"><span>    if (s.type == CIRCLE)</span></span>
<span class="line"><span>        printf(&quot;Circle with radius %.2f\\n&quot;, s.radius);</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        printf(&quot;Rectangle %.2fx%.2f\\n&quot;, s.width, s.height);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct Shape c = {CIRCLE, .radius = 2.5f};</span></span>
<span class="line"><span>    struct Shape r = {RECTANGLE, .width = 3.0f, .height = 4.0f};</span></span>
<span class="line"><span>    print_shape(c);</span></span>
<span class="line"><span>    print_shape(r);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Circle with radius 2.50</span></span>
<span class="line"><span>Rectangle 3.00x4.00</span></span></code></pre></div><p>这对搭配<code>enum</code>+<code>union</code>是现实系统中的常见模式，称为标记联合。</p><h4 id="现代-c-c23-中的基础类型" tabindex="-1">现代 C (C23) 中的基础类型 <a class="header-anchor" href="#现代-c-c23-中的基础类型" aria-label="Permalink to &quot;现代 C (C23) 中的基础类型&quot;">​</a></h4><p>在 C23 中，枚举的基础类型是指用于表示内存中枚举值的整数类型。在 C23 之前，此类型是实现定义的，并且可以是能够保存所有枚举器值的任何整数类型，通常是<code>int</code>。使用 C23，程序员现在可以使用以下语法显式指定基础类型<code>enum name : type</code>，允许精确控制存储大小和符号（例如，<code>enum color : unsigned char</code>).</p><p>这可以实现更高效的内存使用和跨平台的可预测行为，特别是在嵌入式系统中或与硬件连接时。具有固定基础类型的枚举与该类型兼容，并且必须容纳所有枚举器值；否则，会出现编译时错误。</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum color : unsigned char {</span></span>
<span class="line"><span>    RED,</span></span>
<span class="line"><span>    GREEN,</span></span>
<span class="line"><span>    BLUE</span></span>
<span class="line"><span>};</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>枚举使您的代码语义清晰：</p><ul><li>用有意义的名称替换“幻数”。</li><li>简化调试和日志记录。</li><li>启用编译时检查，您不能轻易分配无效常量。</li><li>与结构、联合和位域干净地结合以表达状态机或协议。</li></ul><p>它们还提高了可移植性，您的程序逻辑是按意图描述的，而不是任意数字。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>定义一个枚举<code>TrafficLight { RED, YELLOW, GREEN }</code>并根据其值打印消息。</li><li>创建一个枚举<code>FileType { TEXT, BINARY, UNKNOWN }</code>并在里面使用它<code>struct FileInfo</code>.</li><li>扩展你的 tagged-union 模式：添加<code>TRIANGLE</code>到<code>Shape</code>枚举。</li><li>写一个<code>switch</code>映射的语句<code>enum ErrorCode</code>到错误消息。</li><li>尝试显式设置值并跳过一些值，观察自动增量行为。</li></ol><p>枚举使您的程序用概念而不是数字来说话。它们是清晰度、可读性和稳健设计的关键，是人类意义和机器表示之间的桥梁。</p>`,41)])])}const g=a(i,[["render",t]]);export{h as __pageData,g as default};
