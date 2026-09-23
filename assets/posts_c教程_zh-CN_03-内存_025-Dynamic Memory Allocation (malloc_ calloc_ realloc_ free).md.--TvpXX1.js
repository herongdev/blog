import{_ as n,o as s,c as e,a5 as l}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"25. 动态内存分配（malloc、calloc、realloc、free）","description":"The Little Book of C 中文版 — 25. 动态内存分配（malloc、calloc、realloc、free）","frontmatter":{"title":"25. 动态内存分配（malloc、calloc、realloc、free）","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","03-内存","中文"],"description":"The Little Book of C 中文版 — 25. 动态内存分配（malloc、calloc、realloc、free）","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":25,"sidebarWeight":25,"alternateZh":"/posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)","alternateEn":"/posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)"},"headers":[],"relativePath":"posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md","filePath":"posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md","lastUpdated":1790163617000}'),p={name:"posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md"};function i(t,a,o,c,r,d){return s(),e("div",null,[...a[0]||(a[0]=[l(`<p>[English version](/posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free))</p><p>静态数组具有固定大小，但实际程序通常需要在运行时增长或缩小的灵活数据。动态内存分配允许您在程序运行时手动请求、使用和释放内存。它是 C 中最强大和最容易出错的部分之一。</p><h4 id="想法" tabindex="-1">想法 <a class="header-anchor" href="#想法" aria-label="Permalink to &quot;想法&quot;">​</a></h4><p>C 提供了四个关键函数<code>&lt;stdlib.h&gt;</code>对于动态内存管理：</p><table tabindex="0"><thead><tr><th>功能</th><th>目的</th></tr></thead><tbody><tr><td><code>malloc(size)</code></td><td>分配一块内存</td></tr><tr><td><code>calloc(n, size)</code></td><td>分配和清除内存<code>n</code>元素</td></tr><tr><td><code>realloc(ptr, size)</code></td><td>更改先前分配的块的大小</td></tr><tr><td><code>free(ptr)</code></td><td>将内存释放回系统</td></tr></tbody></table><p>它们返回指向已分配内存的指针，或者<code>NULL</code>如果分配失败。</p><h4 id="基本示例" tabindex="-1">基本示例 <a class="header-anchor" href="#基本示例" aria-label="Permalink to &quot;基本示例&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int *p = malloc(sizeof(int));  // allocate space for one int</span></span>
<span class="line"><span>    if (p == NULL) {</span></span>
<span class="line"><span>        printf(&quot;Memory allocation failed.\\n&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    *p = 42;</span><span>  // store a value in allocated memory</span></span>
<span class="line"><span>    printf(&quot;Value: %d\\n&quot;, *p);</span></span>
<span class="line"><span>    free(p);  // release the memory</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc malloc_demo.c -o malloc_demo</span></span>
<span class="line"><span>./malloc_demo</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Value: 42</span></span></code></pre></div><h4 id="动态分配数组" tabindex="-1">动态分配数组 <a class="header-anchor" href="#动态分配数组" aria-label="Permalink to &quot;动态分配数组&quot;">​</a></h4><p>您可以使用在运行时分配数组<code>malloc()</code>或者<code>calloc()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int n;</span></span>
<span class="line"><span>printf(&quot;Enter number of elements: &quot;);</span></span>
<span class="line"><span>scanf(&quot;%d&quot;, &amp;n);</span></span>
<span class="line"><span>int *arr = malloc(n * sizeof(int));</span></span>
<span class="line"><span>if (arr == NULL) {</span></span>
<span class="line"><span>    printf(&quot;Out of memory.\\n&quot;);</span></span>
<span class="line"><span>    return 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// Initialize and print</span></span>
<span class="line"><span>for (int i = 0; i &lt; n; i++) {</span></span>
<span class="line"><span>    arr[i] = i * 10;</span></span>
<span class="line"><span>    printf(&quot;%d &quot;, arr[i]);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>free(arr);</span></span></code></pre></div><p>输出示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Enter number of elements: 5</span></span>
<span class="line"><span>0 10 20 30 40</span></span></code></pre></div><p><code>malloc()</code>留下内存未初始化，同时<code>calloc()</code>将其清零：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int *arr = calloc(n, sizeof(int)); // all elements start at 0</span></span></code></pre></div><h4 id="使用-realloc-更改内存大小" tabindex="-1">使用 realloc() 更改内存大小 <a class="header-anchor" href="#使用-realloc-更改内存大小" aria-label="Permalink to &quot;使用 realloc() 更改内存大小&quot;">​</a></h4><p>当您需要调整已分配块的大小（例如，将数组容量加倍）时，请使用<code>realloc()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int *arr = malloc(3 * sizeof(int));</span></span>
<span class="line"><span>arr[0] = 1; arr[1] = 2; arr[2] = 3;</span></span>
<span class="line"><span>// grow array to 5 elements</span></span>
<span class="line"><span>int *temp = realloc(arr, 5 * sizeof(int));</span></span>
<span class="line"><span>if (temp == NULL) {</span></span>
<span class="line"><span>    printf(&quot;Reallocation failed!\\n&quot;);</span></span>
<span class="line"><span>    free(arr);</span></span>
<span class="line"><span>    return 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>arr = temp;</span></span>
<span class="line"><span>arr[3] = 4;</span></span>
<span class="line"><span>arr[4] = 5;</span></span>
<span class="line"><span>for (int i = 0; i &lt; 5; i++)</span></span>
<span class="line"><span>    printf(&quot;%d &quot;, arr[i]);</span></span>
<span class="line"><span>free(arr);</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1 2 3 4 5</span></span></code></pre></div><p><code>realloc()</code>如果可能的话尝试扩大现有区块；如果没有，它会分配一个新块，复制数据，并自动释放旧块。</p><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个完整的程序结合<code>malloc</code>,<code>calloc</code>,<code>realloc</code>， 和<code>free</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int n = 3;</span></span>
<span class="line"><span>    int *nums = calloc(n, sizeof(int));</span></span>
<span class="line"><span>    if (nums == NULL) {</span></span>
<span class="line"><span>        printf(&quot;Initial allocation failed.\\n&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // Fill array</span></span>
<span class="line"><span>    for (int i = 0; i &lt; n; i++) nums[i] = (i + 1) * 5;</span></span>
<span class="line"><span>    printf(&quot;Initial values: &quot;);</span></span>
<span class="line"><span>    for (int i = 0; i &lt; n; i++) printf(&quot;%d &quot;, nums[i]);</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    // Resize</span></span>
<span class="line"><span>    n = 5;</span></span>
<span class="line"><span>    int *new_nums = realloc(nums, n * sizeof(int));</span></span>
<span class="line"><span>    if (new_nums == NULL) {</span></span>
<span class="line"><span>        printf(&quot;Reallocation failed.\\n&quot;);</span></span>
<span class="line"><span>        free(nums);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    nums = new_nums;</span></span>
<span class="line"><span>    // Fill new slots</span></span>
<span class="line"><span>    for (int i = 3; i &lt; n; i++) nums[i] = (i + 1) * 5;</span></span>
<span class="line"><span>    printf(&quot;After realloc: &quot;);</span></span>
<span class="line"><span>    for (int i = 0; i &lt; n; i++) printf(&quot;%d &quot;, nums[i]);</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    free(nums);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Initial values: 5 10 15</span></span>
<span class="line"><span>After realloc: 5 10 15 20 25</span></span></code></pre></div><h4 id="内存分配图" tabindex="-1">内存分配图 <a class="header-anchor" href="#内存分配图" aria-label="Permalink to &quot;内存分配图&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Stack   →   grows downward</span></span>
<span class="line"><span>Heap    →   grows upward</span></span>
<span class="line"><span>Data    →   global/static variables</span></span>
<span class="line"><span>Code    →   program instructions</span></span></code></pre></div><p>每次致电<code>malloc</code>在堆上保留空间，该空间在显式释放之前一直保持分配状态。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>动态内存是所有实际系统编程的支柱。没有它，您将无法构建：</p><ul><li>可变大小的数组</li><li>链接列表、树、图</li><li>缓存和数据库</li><li>文件读取器和解析器</li></ul><p>这也是大多数 C 错误发生的地方，包括悬挂指针、泄漏、双重释放和缓冲区溢出，因此严格的管理至关重要。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>分配一个包含 10 个整数的数组，填充它，打印它，然后释放它。</li><li>使用<code>calloc</code>而不是<code>malloc</code>并观察零初始化。</li><li>使用以下命令将数组大小从 10 个元素调整为 20 个元素<code>realloc</code>. 4.忘记打电话<code>free()</code>然后用 Valgrind 运行你的程序，查看内存泄漏报告。</li><li>编写函数<code>int *make_array(int n)</code>分配并返回指向新数组的指针。</li></ol><p>动态分配是您开始手动管理内存的地方。如果做得对，它会给你令人难以置信的控制力和效率，如果做错了，那就是混乱。认真掌握：这是作为一名C程序员的精髓。</p>`,40)])])}const m=n(p,[["render",i]]);export{h as __pageData,m as default};
