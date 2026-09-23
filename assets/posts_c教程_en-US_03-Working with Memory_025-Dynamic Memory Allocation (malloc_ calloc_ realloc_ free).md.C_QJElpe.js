import{_ as n,o as s,c as e,a5 as l}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"25. Dynamic Memory Allocation (malloc, calloc, realloc, free)","description":"The Little Book of C — 25. Dynamic Memory Allocation (malloc, calloc, realloc, free)","frontmatter":{"title":"25. Dynamic Memory Allocation (malloc, calloc, realloc, free)","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Working with Memory"],"description":"The Little Book of C — 25. Dynamic Memory Allocation (malloc, calloc, realloc, free)","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":25,"sidebarWeight":25,"lang":"en-US","alternateEn":"/posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)","alternateZh":"/posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)"},"headers":[],"relativePath":"posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md","filePath":"posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md"};function t(p,a,o,c,r,d){return s(),e("div",null,[...a[0]||(a[0]=[l(`<p>[中文版本](/posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free))</p><p>Static arrays have fixed size, but real programs often need flexible data that grows or shrinks at runtime. Dynamic memory allocation lets you request, use, and release memory manually while your program is running. It’s one of the most powerful and error-prone parts of C.</p><h4 id="the-idea" tabindex="-1">The Idea <a class="header-anchor" href="#the-idea" aria-label="Permalink to &quot;The Idea&quot;">​</a></h4><p>C provides four key functions from<code>&lt;stdlib.h&gt;</code> for dynamic memory management:</p><table tabindex="0"><thead><tr><th>Function</th><th>Purpose</th></tr></thead><tbody><tr><td><code>malloc(size)</code></td><td>Allocates a block of memory</td></tr><tr><td><code>calloc(n, size)</code></td><td>Allocates and clears memory for<code>n</code> elements</td></tr><tr><td><code>realloc(ptr, size)</code></td><td>Changes the size of a previously allocated block</td></tr><tr><td><code>free(ptr)</code></td><td>Releases memory back to the system</td></tr></tbody></table><p>These return a pointer to the allocated memory, or<code>NULL</code> if allocation fails.</p><h4 id="basic-example" tabindex="-1">Basic Example <a class="header-anchor" href="#basic-example" aria-label="Permalink to &quot;Basic Example&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc malloc_demo.c -o malloc_demo</span></span>
<span class="line"><span>./malloc_demo</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Value: 42</span></span></code></pre></div><h4 id="allocating-arrays-dynamically" tabindex="-1">Allocating Arrays Dynamically <a class="header-anchor" href="#allocating-arrays-dynamically" aria-label="Permalink to &quot;Allocating Arrays Dynamically&quot;">​</a></h4><p>You can allocate arrays at runtime using<code>malloc()</code> or<code>calloc()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int n;</span></span>
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
<span class="line"><span>free(arr);</span></span></code></pre></div><p>Output example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Enter number of elements: 5</span></span>
<span class="line"><span>0 10 20 30 40</span></span></code></pre></div><p><code>malloc()</code> leaves memory uninitialized, while<code>calloc()</code> clears it to zero:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int *arr = calloc(n, sizeof(int)); // all elements start at 0</span></span></code></pre></div><h4 id="changing-memory-size-with-realloc" tabindex="-1">Changing Memory Size with realloc() <a class="header-anchor" href="#changing-memory-size-with-realloc" aria-label="Permalink to &quot;Changing Memory Size with realloc()&quot;">​</a></h4><p>When you need to resize an allocated block, say, double an array’s capacity, use<code>realloc()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int *arr = malloc(3 * sizeof(int));</span></span>
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
<span class="line"><span>free(arr);</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1 2 3 4 5</span></span></code></pre></div><p><code>realloc()</code> tries to expand the existing block if possible; if not, it allocates a new block, copies the data, and frees the old one automatically.</p><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>Here’s a complete program combining<code>malloc</code>,<code>calloc</code>,<code>realloc</code>, and<code>free</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Initial values: 5 10 15</span></span>
<span class="line"><span>After realloc: 5 10 15 20 25</span></span></code></pre></div><h4 id="memory-allocation-diagram" tabindex="-1">Memory Allocation Diagram <a class="header-anchor" href="#memory-allocation-diagram" aria-label="Permalink to &quot;Memory Allocation Diagram&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Stack   →   grows downward</span></span>
<span class="line"><span>Heap    →   grows upward</span></span>
<span class="line"><span>Data    →   global/static variables</span></span>
<span class="line"><span>Code    →   program instructions</span></span></code></pre></div><p>Each call to<code>malloc</code> reserves space on the heap, which stays allocated until explicitly freed.</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Dynamic memory is the backbone of all real systems programming. Without it, you can’t build:</p><ul><li>Variable-sized arrays</li><li>Linked lists, trees, graphs</li><li>Caches and databases</li><li>File readers and parsers</li></ul><p>It’s also where most C bugs happen, dangling pointers, leaks, double frees, and buffer overruns, so disciplined management is crucial.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Allocate an array of 10 integers, fill it, print it, and free it.</li><li>Use<code>calloc</code> instead of<code>malloc</code> and observe the zero initialization.</li><li>Resize the array from 10 to 20 elements using<code>realloc</code>.</li><li>Forget to call<code>free()</code> and then run your program with Valgrind, see the memory leak report.</li><li>Write a function<code>int *make_array(int n)</code> that allocates and returns a pointer to a new array.</li></ol><p>Dynamic allocation is where you start managing memory by hand. Done right, it gives you incredible control and efficiency, done wrong, it’s chaos. Master it carefully: it’s the essence of being a C programmer.</p>`,40)])])}const h=n(i,[["render",t]]);export{u as __pageData,h as default};
