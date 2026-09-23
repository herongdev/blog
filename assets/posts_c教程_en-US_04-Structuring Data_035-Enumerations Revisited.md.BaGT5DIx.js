import{_ as n,o as a,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"35. Enumerations Revisited","description":"The Little Book of C — 35. Enumerations Revisited","frontmatter":{"title":"35. Enumerations Revisited","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Structuring Data"],"description":"The Little Book of C — 35. Enumerations Revisited","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":35,"sidebarWeight":35,"lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited","alternateZh":"/posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited.md","filePath":"posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited.md"};function p(l,s,o,c,r,d){return a(),e("div",null,[...s[0]||(s[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited)</p><p>You’ve seen<code>enum</code> briefly when learning about constants, but now it’s time to use it as a first-class design tool. Enumerations give names to sets of integer values, making code easier to read, maintain, and debug. They also pair beautifully with<code>struct</code>,<code>union</code>, and<code>bitfield</code> patterns from the previous sections.</p><h4 id="what-is-an-enumeration" tabindex="-1">What Is an Enumeration? <a class="header-anchor" href="#what-is-an-enumeration" aria-label="Permalink to &quot;What Is an Enumeration?&quot;">​</a></h4><p>An enumeration (<code>enum</code>) defines a type whose values are limited to a specific list of named constants.</p><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Color {</span></span>
<span class="line"><span>    RED,</span></span>
<span class="line"><span>    GREEN,</span></span>
<span class="line"><span>    BLUE</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>Under the hood,<code>enum Color</code> is an integer type —<code>RED</code>= 0,<code>GREEN</code>= 1,<code>BLUE</code>= 2 by default.</p><h4 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Current direction: 1</span></span></code></pre></div><p>Even though<code>EAST</code> prints as<code>1</code>, using a named constant makes your code far more meaningful.</p><h4 id="assigning-custom-values" tabindex="-1">Assigning Custom Values <a class="header-anchor" href="#assigning-custom-values" aria-label="Permalink to &quot;Assigning Custom Values&quot;">​</a></h4><p>You can specify explicit integer values, useful for compatibility or mapping to real-world codes.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum ErrorCode {</span></span>
<span class="line"><span>    OK = 0,</span></span>
<span class="line"><span>    FILE_NOT_FOUND = 404,</span></span>
<span class="line"><span>    SERVER_ERROR = 500</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>If you skip a value, enumeration continues counting from the last number:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Level {</span></span>
<span class="line"><span>    LOW = 1,</span></span>
<span class="line"><span>    MEDIUM,</span></span>
<span class="line"><span>    HIGH</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// HIGH = 3</span></span></code></pre></div><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>A small program that uses enums for clear program flow:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Status: Warning (1)</span></span></code></pre></div><p>This pattern,<code>enum</code>+<code>switch</code>, is everywhere in C projects: error handling, state machines, network protocols, and more.</p><h4 id="enumerations-with-structs" tabindex="-1">Enumerations with Structs <a class="header-anchor" href="#enumerations-with-structs" aria-label="Permalink to &quot;Enumerations with Structs&quot;">​</a></h4><p>Combine<code>enum</code> with<code>struct</code> for self-describing data:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Circle with radius 2.50</span></span>
<span class="line"><span>Rectangle 3.00x4.00</span></span></code></pre></div><p>This pairing of<code>enum</code>+<code>union</code> is a common pattern in real-world systems, known as a tagged union.</p><h4 id="underlying-types-in-modern-c-c23" tabindex="-1">Underlying types in Modern C (C23) <a class="header-anchor" href="#underlying-types-in-modern-c-c23" aria-label="Permalink to &quot;Underlying types in Modern C (C23)&quot;">​</a></h4><p>In C23, the underlying type of an enumeration refers to the integer type used to represent the enum values in memory. Prior to C23, this type was implementation-defined and could be any integer type capable of holding all enumerator values, typically<code>int</code>. With C23, programmers can now explicitly specify the underlying type using the syntax<code>enum name : type</code>, allowing precise control over storage size and signedness (e.g.,<code>enum color : unsigned char</code>).</p><p>This enables more efficient memory usage and predictable behavior across platforms, especially in embedded systems or when interfacing with hardware. Enumerations with a fixed underlying type are compatible with that type and must accommodate all enumerator values; otherwise, a compile-time error occurs.</p><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum color : unsigned char {</span></span>
<span class="line"><span>    RED,</span></span>
<span class="line"><span>    GREEN,</span></span>
<span class="line"><span>    BLUE</span></span>
<span class="line"><span>};</span></span></code></pre></div><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Enumerations bring semantic clarity to your code:</p><ul><li>Replace “magic numbers” with meaningful names.</li><li>Simplify debugging and logging.</li><li>Enable compile-time checking, you can’t assign invalid constants easily.</li><li>Combine cleanly with structs, unions, and bitfields to express state machines or protocols.</li></ul><p>They also improve portability, your program logic is described by intent, not arbitrary numbers.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Define an enum<code>TrafficLight { RED, YELLOW, GREEN }</code> and print messages based on its value.</li><li>Create an enum<code>FileType { TEXT, BINARY, UNKNOWN }</code> and use it inside a<code>struct FileInfo</code>.</li><li>Extend your tagged-union pattern: add<code>TRIANGLE</code> to the<code>Shape</code> enum.</li><li>Write a<code>switch</code> statement that maps<code>enum ErrorCode</code> to error messages.</li><li>Experiment with explicitly setting values and skipping a few, observe the auto-increment behavior.</li></ol><p>Enumerations make your programs speak in concepts, not numbers. They are the key to clarity, readability, and robust design, the bridge between human meaning and machine representation.</p>`,41)])])}const m=n(i,[["render",p]]);export{h as __pageData,m as default};
