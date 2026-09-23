import{_ as s,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"66. 内存映射（mmap）","description":"The Little Book of C 中文版 — 66. 内存映射（mmap）","frontmatter":{"title":"66. 内存映射（mmap）","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 66. 内存映射（mmap）","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":66,"sidebarWeight":66,"alternateZh":"/posts/c教程/zh-CN/07-贴近系统/066-Memory Mapping (mmap)","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/066-Memory Mapping (mmap)"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/066-Memory Mapping (mmap).md","filePath":"posts/c教程/zh-CN/07-贴近系统/066-Memory Mapping (mmap).md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/07-贴近系统/066-Memory Mapping (mmap).md"};function l(i,a,d,c,o,r){return n(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/066-Memory Mapping (mmap))</p><p>在前面的部分中，您学习了如何使用读取和写入文件<code>read()</code>和<code>write()</code>。这些系统调用在文件和 RAM 中的用户空间缓冲区之间移动数据。</p><p>但是，如果您可以将文件直接映射到内存中，然后将其视为进程地址空间的一部分呢？</p><p>这正是内存映射（通过<code>mmap</code>）确实如此，它更快、更灵活，并且构成了数据库、共享内存系统甚至虚拟内存本身的支柱。</p><h4 id="步骤-1-什么是-mmap" tabindex="-1">步骤 1. 什么是 mmap？ <a class="header-anchor" href="#步骤-1-什么是-mmap" aria-label="Permalink to &quot;步骤 1. 什么是 mmap？&quot;">​</a></h4><p><code>mmap()</code>将文件或设备映射到内存中，以便您可以直接访问它，就像 RAM 中的数组一样。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;sys/mman.h&gt;</span></span>
<span class="line"><span>void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);</span></span></code></pre></div><table tabindex="0"><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td><code>addr</code></td><td>Hint for mapping address (usually<code>NULL</code>)</td></tr><tr><td><code>length</code></td><td>Number of bytes to map</td></tr><tr><td><code>prot</code></td><td>保护：<code>PROT_READ</code>,<code>PROT_WRITE</code>等</td></tr><tr><td><code>flags</code></td><td>类型：<code>MAP_PRIVATE</code>,<code>MAP_SHARED</code>等</td></tr><tr><td><code>fd</code></td><td>要映射的文件描述符</td></tr><tr><td><code>offset</code></td><td>文件中的起始偏移量（必须是页面大小的倍数）</td></tr></tbody></table><h4 id="步骤-2-简单文件映射示例" tabindex="-1">步骤 2. 简单文件映射示例 <a class="header-anchor" href="#步骤-2-简单文件映射示例" aria-label="Permalink to &quot;步骤 2. 简单文件映射示例&quot;">​</a></h4><p>让我们将文件映射到内存并打印其内容。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/mman.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/stat.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;data.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    if (fd == -1) { perror(&quot;open&quot;); return 1; }</span></span>
<span class="line"><span>    struct stat st;</span></span>
<span class="line"><span>    fstat(fd, &amp;st);</span></span>
<span class="line"><span>    char *data = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);</span></span>
<span class="line"><span>    if (data == MAP_FAILED) { perror(&quot;mmap&quot;); return 1; }</span></span>
<span class="line"><span>    write(STDOUT_FILENO, data, st.st_size);</span></span>
<span class="line"><span>    munmap(data, st.st_size);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc mmap_read.c -o mmap_read</span></span>
<span class="line"><span>./mmap_read</span></span></code></pre></div><p>这个直接打印文件内容，没有循环，没有<code>read()</code>来电。</p><h4 id="第三步-阅读与写作" tabindex="-1">第三步：阅读与写作 <a class="header-anchor" href="#第三步-阅读与写作" aria-label="Permalink to &quot;第三步：阅读与写作&quot;">​</a></h4><p>如果要通过内存修改文件，则必须以读写方式打开它并使用<code>PROT_WRITE</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;sys/mman.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/stat.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;memo.txt&quot;, O_RDWR | O_CREAT, 0666);</span></span>
<span class="line"><span>    ftruncate(fd, 64); // ensure file has enough size</span></span>
<span class="line"><span>    char *map = mmap(NULL, 64, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);</span></span>
<span class="line"><span>    if (map == MAP_FAILED) return 1;</span></span>
<span class="line"><span>    strcpy(map, &quot;Hello, memory-mapped file!&quot;);</span></span>
<span class="line"><span>    msync(map, 64, MS_SYNC);</span></span>
<span class="line"><span>    munmap(map, 64);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>打开<code>memo.txt</code>，您将立即看到书面文字。</p><p>-<code>MAP_SHARED</code>：更改被写回文件。 -<code>MAP_PRIVATE</code>：写入时复制（更改仅对此进程可见）。</p><h4 id="步骤-4-匿名映射" tabindex="-1">步骤 4. 匿名映射 <a class="header-anchor" href="#步骤-4-匿名映射" aria-label="Permalink to &quot;步骤 4. 匿名映射&quot;">​</a></h4><p>您可以创建不与任何文件绑定的内存，纯粹在 RAM 中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;sys/mman.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    size_t len = 4096;</span></span>
<span class="line"><span>    int *arr = mmap(NULL, len, PROT_READ | PROT_WRITE,</span></span>
<span class="line"><span>                    MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);</span></span>
<span class="line"><span>    if (arr == MAP_FAILED) return 1;</span></span>
<span class="line"><span>    arr[0] = 1234;</span></span>
<span class="line"><span>    printf(&quot;arr[0] = %d\\n&quot;, arr[0]);</span></span>
<span class="line"><span>    munmap(arr, len);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arr[0] = 1234</span></span></code></pre></div><p>匿名映射通常用于动态内存区域或进程之间的共享内存。</p><h4 id="步骤-5-进程之间共享内存" tabindex="-1">步骤 5. 进程之间共享内存 <a class="header-anchor" href="#步骤-5-进程之间共享内存" aria-label="Permalink to &quot;步骤 5. 进程之间共享内存&quot;">​</a></h4><p>您可以使用<code>MAP_SHARED</code>和<code>fork()</code>让父进程和子进程共享相同的映射内存。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;sys/mman.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int *shared = mmap(NULL, sizeof(int),</span></span>
<span class="line"><span>                       PROT_READ | PROT_WRITE,</span></span>
<span class="line"><span>                       MAP_SHARED | MAP_ANONYMOUS,</span></span>
<span class="line"><span>                       -1, 0);</span></span>
<span class="line"><span>    *shared = 0;</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        (*shared)++;</span></span>
<span class="line"><span>        printf(&quot;Child: shared = %d\\n&quot;, *shared);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>        printf(&quot;Parent: shared = %d\\n&quot;, *shared);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    munmap(shared, sizeof(int));</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Child: shared = 1</span></span>
<span class="line"><span>Parent: shared = 1</span></span></code></pre></div><p>两个进程看到相同的内存，不需要管道或套接字。</p><h4 id="步骤-6-内存保护" tabindex="-1">步骤 6. 内存保护 <a class="header-anchor" href="#步骤-6-内存保护" aria-label="Permalink to &quot;步骤 6. 内存保护&quot;">​</a></h4><p>使用<code>PROT_*</code>控制访问的标志：</p><p>-<code>PROT_READ</code>→ 允许读取 -<code>PROT_WRITE</code>→ 允许写入 -<code>PROT_EXEC</code>→ 可执行文件 -<code>PROT_NONE</code>→ 无法访问</p><p>您可以稍后更改权限：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mprotect(ptr, len, PROT_READ);</span></span></code></pre></div><p>这可以帮助您模拟“只读”数据区域或有意测试分段错误。</p><h4 id="步骤-7-页面大小和对齐方式" tabindex="-1">步骤 7. 页面大小和对齐方式 <a class="header-anchor" href="#步骤-7-页面大小和对齐方式" aria-label="Permalink to &quot;步骤 7. 页面大小和对齐方式&quot;">​</a></h4><p>内存以页为单位进行映射（通常为 4096 字节）。 You can get your system’s page size:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;Page size: %ld bytes\\n&quot;, sysconf(_SC_PAGESIZE));</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>偏移量为<code>mmap</code>必须与页面大小对齐。</p><h4 id="步骤-8-取消映射和同步" tabindex="-1">步骤 8. 取消映射和同步 <a class="header-anchor" href="#步骤-8-取消映射和同步" aria-label="Permalink to &quot;步骤 8. 取消映射和同步&quot;">​</a></h4><p>当您完成映射区域后，请始终调用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>munmap(addr, length);</span></span></code></pre></div><p>如果您修改了数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>msync(addr, length, MS_SYNC);</span></span></code></pre></div><p>这可确保更改被写回磁盘。</p><h4 id="步骤-9-使用-mmap-提高性能" tabindex="-1">步骤 9. 使用 mmap 提高性能 <a class="header-anchor" href="#步骤-9-使用-mmap-提高性能" aria-label="Permalink to &quot;步骤 9. 使用 mmap 提高性能&quot;">​</a></h4><p>优于<code>read()</code>和<code>write()</code>:</p><ul><li>避免内核和用户空间之间的额外数据复制。</li><li>操作系统仅加载您触摸的页面（延迟加载）。</li><li>有效地随机访问大文件。</li></ul><p>数据库、编辑器和浏览器（如 SQLite、Vim、Chrome）严重依赖<code>mmap</code>为了性能。</p><h4 id="小代码-计算大文件中的行数" tabindex="-1">小代码：计算大文件中的行数 <a class="header-anchor" href="#小代码-计算大文件中的行数" aria-label="Permalink to &quot;小代码：计算大文件中的行数&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;sys/mman.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/stat.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;bigfile.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    struct stat st;</span></span>
<span class="line"><span>    fstat(fd, &amp;st);</span></span>
<span class="line"><span>    char *data = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);</span></span>
<span class="line"><span>    size_t lines = 0;</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; st.st_size; i++)</span></span>
<span class="line"><span>        if (data[i] == &#39;\\n&#39;) lines++;</span></span>
<span class="line"><span>    printf(&quot;Lines: %zu\\n&quot;, lines);</span></span>
<span class="line"><span>    munmap(data, st.st_size);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在多 GB 文件上运行它，它的执行速度会非常快。</p><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p><code>mmap</code>打开内存驱动文件访问的新世界：</p><ul><li>由操作系统用来加载可执行文件、共享库和页面。</li><li>为数据库、编译器和搜索引擎提供支持。</li><li>启用进程之间的共享内存。</li><li>减少大文件的 I/O 开销。</li></ul><p>它是文件和内存之间的桥梁，统一了 C 和 Unix 中的两个关键抽象。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.编写一个文件并使用以下命令就地修改它<code>mmap</code>. 2. 在父进程和子进程之间创建共享内存<code>MAP_SHARED</code>. 3. 测量之间的性能差异<code>read()</code>和<code>mmap</code>. 4. 使用与页面大小对齐的偏移量仅映射文件的一部分。 5. 实现一个小型内存键值存储<code>mmap</code>.</p><p>接下来，您将探索如何在 C 中使用时间和时钟、检索系统时间戳、测量持续时间以及精确实现计时器。</p>`,61)])])}const u=s(t,[["render",l]]);export{m as __pageData,u as default};
