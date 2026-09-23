import{_ as s,o as n,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"95. Implementing a Custom Allocator","description":"The Little Book of C — 95. Implementing a Custom Allocator","frontmatter":{"title":"95. Implementing a Custom Allocator","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Building Real Projects"],"description":"The Little Book of C — 95. Implementing a Custom Allocator","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":95,"sidebarWeight":95,"lang":"en-US","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator","alternateZh":"/posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator"},"headers":[],"relativePath":"posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator.md","filePath":"posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator.md"};function l(i,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator)</p><p>Every C program eventually asks the operating system for memory, but<code>malloc</code> and<code>free</code> are not magic—they are layers above system calls like<code>brk</code> and<code>mmap</code>. In this section, you will build your own custom memory allocator—a simple arena allocator that grabs a large block of memory once and doles it out efficiently.</p><p>You’ll see how real allocators work inside kernels, games, and embedded systems.</p><h4 id="step-1-the-goal" tabindex="-1">Step 1. The Goal <a class="header-anchor" href="#step-1-the-goal" aria-label="Permalink to &quot;Step 1. The Goal&quot;">​</a></h4><p>We’ll implement a minimal arena allocator that:</p><ul><li>Allocates from a preallocated block</li><li>Never frees individual objects</li><li>Resets all memory at once when the arena is cleared</li></ul><p>This model is perfect for short-lived data structures, parsing, and high-performance applications.</p><h4 id="step-2-design" tabindex="-1">Step 2. Design <a class="header-anchor" href="#step-2-design" aria-label="Permalink to &quot;Step 2. Design&quot;">​</a></h4><p>An arena allocator tracks:</p><ul><li>The base pointer (start of memory)</li><li>The current pointer (next free position)</li><li>The capacity (total size of the arena)</li></ul><p>When you allocate, it simply bumps the pointer forward.</p><p>Structure:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    unsigned char *base;</span></span>
<span class="line"><span>    size_t capacity;</span></span>
<span class="line"><span>    size_t offset;</span></span>
<span class="line"><span>} Arena;</span></span></code></pre></div><h4 id="step-3-tiny-code-minimal-arena" tabindex="-1">Step 3. Tiny Code: Minimal Arena <a class="header-anchor" href="#step-3-tiny-code-minimal-arena" aria-label="Permalink to &quot;Step 3. Tiny Code: Minimal Arena&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;stdint.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    unsigned char *base;</span></span>
<span class="line"><span>    size_t capacity;</span></span>
<span class="line"><span>    size_t offset;</span></span>
<span class="line"><span>} Arena;</span></span>
<span class="line"><span>Arena *arena_create(size_t capacity) {</span></span>
<span class="line"><span>    Arena *a = malloc(sizeof(Arena));</span></span>
<span class="line"><span>    if (!a) return NULL;</span></span>
<span class="line"><span>    a-&gt;base = malloc(capacity);</span></span>
<span class="line"><span>    if (!a-&gt;base) { free(a); return NULL; }</span></span>
<span class="line"><span>    a-&gt;capacity = capacity;</span></span>
<span class="line"><span>    a-&gt;offset = 0;</span></span>
<span class="line"><span>    return a;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void *arena_alloc(Arena *a, size_t size) {</span></span>
<span class="line"><span>    if (a-&gt;offset + size &gt; a-&gt;capacity) return NULL;</span></span>
<span class="line"><span>    void *ptr = a-&gt;base + a-&gt;offset;</span></span>
<span class="line"><span>    a-&gt;offset += size;</span></span>
<span class="line"><span>    return ptr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void arena_reset(Arena *a) {</span></span>
<span class="line"><span>    a-&gt;offset = 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void arena_free(Arena *a) {</span></span>
<span class="line"><span>    free(a-&gt;base);</span></span>
<span class="line"><span>    free(a);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-4-example-use" tabindex="-1">Step 4. Example Use <a class="header-anchor" href="#step-4-example-use" aria-label="Permalink to &quot;Step 4. Example Use&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Arena *arena = arena_create(1024);</span></span>
<span class="line"><span>    if (!arena) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Failed to create arena\\n&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    int *arr = arena_alloc(arena, 10 * sizeof(int));</span></span>
<span class="line"><span>    if (!arr) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Allocation failed\\n&quot;);</span></span>
<span class="line"><span>        arena_free(arena);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 10; i++) arr[i] = i * i;</span></span>
<span class="line"><span>    printf(&quot;Squares: &quot;);</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 10; i++) printf(&quot;%d &quot;, arr[i]);</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    arena_reset(arena);  // all memory reused</span></span>
<span class="line"><span>    arena_free(arena);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-5-how-it-works" tabindex="-1">Step 5. How It Works <a class="header-anchor" href="#step-5-how-it-works" aria-label="Permalink to &quot;Step 5. How It Works&quot;">​</a></h4><ol><li><code>arena_create</code> grabs one large block from<code>malloc</code>.</li><li><code>arena_alloc</code> hands out memory by increasing an offset—no per-object metadata.</li><li><code>arena_reset</code> rewinds the arena to reuse the memory instantly.</li><li><code>arena_free</code> releases the entire block in one call.</li></ol><p>This is O(1) for every allocation, with zero fragmentation.</p><h4 id="step-6-adding-alignment" tabindex="-1">Step 6. Adding Alignment <a class="header-anchor" href="#step-6-adding-alignment" aria-label="Permalink to &quot;Step 6. Adding Alignment&quot;">​</a></h4><p>Sometimes allocations must be aligned (for example, 16-byte alignment for SIMD). We can round up the offset to the nearest alignment boundary.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static size_t align_up(size_t n, size_t align) {</span></span>
<span class="line"><span>    return (n + (align - 1)) &amp; ~(align - 1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void *arena_alloc_aligned(Arena *a, size_t size, size_t align) {</span></span>
<span class="line"><span>    size_t new_offset = align_up(a-&gt;offset, align);</span></span>
<span class="line"><span>    if (new_offset + size &gt; a-&gt;capacity) return NULL;</span></span>
<span class="line"><span>    void *ptr = a-&gt;base + new_offset;</span></span>
<span class="line"><span>    a-&gt;offset = new_offset + size;</span></span>
<span class="line"><span>    return ptr;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-7-debugging-helpers" tabindex="-1">Step 7. Debugging Helpers <a class="header-anchor" href="#step-7-debugging-helpers" aria-label="Permalink to &quot;Step 7. Debugging Helpers&quot;">​</a></h4><p>Add diagnostic printing to understand usage:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void arena_stats(Arena *a) {</span></span>
<span class="line"><span>    printf(&quot;Arena used: %zu / %zu bytes (%.1f%%)\\n&quot;,</span></span>
<span class="line"><span>           a-&gt;offset, a-&gt;capacity,</span></span>
<span class="line"><span>           (a-&gt;offset * 100.0) / a-&gt;capacity);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-8-advanced-idea-nested-arenas" tabindex="-1">Step 8. Advanced Idea: Nested Arenas <a class="header-anchor" href="#step-8-advanced-idea-nested-arenas" aria-label="Permalink to &quot;Step 8. Advanced Idea: Nested Arenas&quot;">​</a></h4><p>You can make sub-arenas for scoped memory:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Arena *parent;</span></span>
<span class="line"><span>    size_t start;</span></span>
<span class="line"><span>} ArenaScope;</span></span>
<span class="line"><span>ArenaScope arena_push(Arena *a) {</span></span>
<span class="line"><span>    return (ArenaScope){ .parent = a, .start = a-&gt;offset };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void arena_pop(ArenaScope s) {</span></span>
<span class="line"><span>    s.parent-&gt;offset = s.start;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This lets you “temporarily allocate” for a function or block and reset automatically.</p><h4 id="step-9-why-it-matters" tabindex="-1">Step 9. Why It Matters <a class="header-anchor" href="#step-9-why-it-matters" aria-label="Permalink to &quot;Step 9. Why It Matters&quot;">​</a></h4><p>Allocators define how performance feels in large systems. By writing one, you understand:</p><ul><li>How<code>malloc</code> and<code>free</code> manage metadata</li><li>How fragmentation occurs</li><li>How specialized allocators (arenas, pools, slabs) achieve speed and predictability</li></ul><p>Games, web servers, and compilers all use custom allocators to control lifetime and avoid overhead.</p><h4 id="step-10-try-it-yourself" tabindex="-1">Step 10. Try It Yourself <a class="header-anchor" href="#step-10-try-it-yourself" aria-label="Permalink to &quot;Step 10. Try It Yourself&quot;">​</a></h4><ol><li>Add bounds checking that prints errors when overrun.</li><li>Implement a pool allocator for fixed-size objects (e.g.,<code>struct Node</code>).</li><li>Use<code>mmap</code> to request anonymous memory directly from the OS.</li><li>Add a leak detector that reports unfreed bytes at shutdown.</li><li>Combine multiple arenas into a hierarchical allocator.</li></ol><p>Next you’ll build 96. Writing a Text Parser, using your allocator to manage short-lived strings and tokens as you build a mini lexer and parser in pure C.</p>`,37)])])}const m=s(p,[["render",l]]);export{h as __pageData,m as default};
