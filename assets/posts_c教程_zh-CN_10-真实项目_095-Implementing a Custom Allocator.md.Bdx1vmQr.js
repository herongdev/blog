import{_ as s,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"95. 实现自定义分配器","description":"The Little Book of C 中文版 — 95. 实现自定义分配器","frontmatter":{"title":"95. 实现自定义分配器","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 95. 实现自定义分配器","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":95,"sidebarWeight":95,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator.md","filePath":"posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator.md"};function t(i,a,c,o,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator)</p><p>每个 C 程序最终都会向操作系统请求内存，但是<code>malloc</code>和<code>free</code>不是魔法——它们是系统调用之上的层，例如<code>brk</code>和<code>mmap</code>。在本节中，您将构建自己的自定义内存分配器 - 一个简单的 arena 分配器，它一次抓取一大块内存并有效地将其分配出去。</p><p>您将看到真正的分配器如何在内核、游戏和嵌入式系统中工作。</p><h4 id="步骤-1-目标" tabindex="-1">步骤 1. 目标 <a class="header-anchor" href="#步骤-1-目标" aria-label="Permalink to &quot;步骤 1. 目标&quot;">​</a></h4><p>我们将实现一个最小的竞技场分配器：</p><ul><li>从预分配块中分配</li><li>从不释放单个对象</li><li>当竞技场被清除时立即重置所有内存</li></ul><p>该模型非常适合短期数据结构、解析和高性能应用程序。</p><h4 id="步骤-2-设计" tabindex="-1">步骤 2. 设计 <a class="header-anchor" href="#步骤-2-设计" aria-label="Permalink to &quot;步骤 2. 设计&quot;">​</a></h4><p>竞技场分配器跟踪：</p><ul><li>基址指针（内存的开始）</li><li>当前指针（下一个空闲位置）</li><li>容量（竞技场的总面积）</li></ul><p>当您分配时，它只是将指针向前移动。</p><p>结构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    unsigned char *base;</span></span>
<span class="line"><span>    size_t capacity;</span></span>
<span class="line"><span>    size_t offset;</span></span>
<span class="line"><span>} Arena;</span></span></code></pre></div><h4 id="步骤-3-小代码-最小竞技场" tabindex="-1">步骤 3. 小代码：最小竞技场 <a class="header-anchor" href="#步骤-3-小代码-最小竞技场" aria-label="Permalink to &quot;步骤 3. 小代码：最小竞技场&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-4-示例使用" tabindex="-1">步骤 4. 示例使用 <a class="header-anchor" href="#步骤-4-示例使用" aria-label="Permalink to &quot;步骤 4. 示例使用&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h4 id="第-5-步-如何运作" tabindex="-1">第 5 步：如何运作 <a class="header-anchor" href="#第-5-步-如何运作" aria-label="Permalink to &quot;第 5 步：如何运作&quot;">​</a></h4><p>1.<code>arena_create</code>抢了一大块<code>malloc</code>. 2.<code>arena_alloc</code>通过增加偏移量来分配内存——没有每个对象的元数据。 3.<code>arena_reset</code>倒带竞技场以立即重用内存。 4.<code>arena_free</code>在一次调用中释放整个块。</p><p>每次分配都是 O(1)，碎片为零。</p><h4 id="步骤-6-添加对齐" tabindex="-1">步骤 6. 添加对齐 <a class="header-anchor" href="#步骤-6-添加对齐" aria-label="Permalink to &quot;步骤 6. 添加对齐&quot;">​</a></h4><p>有时分配必须对齐（例如，SIMD 的 16 字节对齐）。我们可以将偏移量四舍五入到最近的对齐边界。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static size_t align_up(size_t n, size_t align) {</span></span>
<span class="line"><span>    return (n + (align - 1)) &amp; ~(align - 1);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void *arena_alloc_aligned(Arena *a, size_t size, size_t align) {</span></span>
<span class="line"><span>    size_t new_offset = align_up(a-&gt;offset, align);</span></span>
<span class="line"><span>    if (new_offset + size &gt; a-&gt;capacity) return NULL;</span></span>
<span class="line"><span>    void *ptr = a-&gt;base + new_offset;</span></span>
<span class="line"><span>    a-&gt;offset = new_offset + size;</span></span>
<span class="line"><span>    return ptr;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-7-调试助手" tabindex="-1">步骤 7. 调试助手 <a class="header-anchor" href="#步骤-7-调试助手" aria-label="Permalink to &quot;步骤 7. 调试助手&quot;">​</a></h4><p>添加诊断打印以了解用法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void arena_stats(Arena *a) {</span></span>
<span class="line"><span>    printf(&quot;Arena used: %zu / %zu bytes (%.1f%%)\\n&quot;,</span></span>
<span class="line"><span>           a-&gt;offset, a-&gt;capacity,</span></span>
<span class="line"><span>           (a-&gt;offset * 100.0) / a-&gt;capacity);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-8-高级想法-嵌套竞技场" tabindex="-1">步骤 8.高级想法：嵌套竞技场 <a class="header-anchor" href="#步骤-8-高级想法-嵌套竞技场" aria-label="Permalink to &quot;步骤 8.高级想法：嵌套竞技场&quot;">​</a></h4><p>您可以为作用域内存创建子区域：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Arena *parent;</span></span>
<span class="line"><span>    size_t start;</span></span>
<span class="line"><span>} ArenaScope;</span></span>
<span class="line"><span>ArenaScope arena_push(Arena *a) {</span></span>
<span class="line"><span>    return (ArenaScope){ .parent = a, .start = a-&gt;offset };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void arena_pop(ArenaScope s) {</span></span>
<span class="line"><span>    s.parent-&gt;offset = s.start;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这使您可以“临时分配”函数或块并自动重置。</p><h4 id="第-9-步-为什么它很重要" tabindex="-1">第 9 步：为什么它很重要 <a class="header-anchor" href="#第-9-步-为什么它很重要" aria-label="Permalink to &quot;第 9 步：为什么它很重要&quot;">​</a></h4><p>分配器定义了大型系统中的性能感受。通过写一篇，你就会明白：</p><ul><li>如何<code>malloc</code>和<code>free</code>管理元数据</li><li>碎片是如何发生的</li><li>专门的分配器（arena、pool、slab）如何实现速度和可预测性</li></ul><p>游戏、Web 服务器和编译器都使用自定义分配器来控制生命周期并避免开销。</p><h4 id="第-10-步-亲自尝试一下" tabindex="-1">第 10 步：亲自尝试一下 <a class="header-anchor" href="#第-10-步-亲自尝试一下" aria-label="Permalink to &quot;第 10 步：亲自尝试一下&quot;">​</a></h4><ol><li>添加边界检查，在溢出时打印错误。</li><li>为固定大小的对象实现一个池分配器（例如，<code>struct Node</code>).</li><li>使用<code>mmap</code>直接从操作系统请求匿名内存。</li><li>添加一个泄漏检测器，报告关机时未释放的字节。</li><li>将多个 arena 组合成一个分层分配器。</li></ol><p>接下来，您将构建 96。编写一个文本解析器，在用纯 C 构建迷你词法分析器和解析器时，使用分配器来管理短期字符串和标记。</p>`,37)])])}const g=s(l,[["render",t]]);export{h as __pageData,g as default};
