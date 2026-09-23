import{_ as a,o as s,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"43. 读写二进制文件","description":"The Little Book of C 中文版 — 43. 读写二进制文件","frontmatter":{"title":"43. 读写二进制文件","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","05-输入输出与文件","中文"],"description":"The Little Book of C 中文版 — 43. 读写二进制文件","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":43,"sidebarWeight":43,"alternateZh":"/posts/c教程/zh-CN/05-输入输出与文件/043-Reading and Writing Binary Files","alternateEn":"/posts/c教程/en-US/05-Input Output and Files/043-Reading and Writing Binary Files"},"headers":[],"relativePath":"posts/c教程/zh-CN/05-输入输出与文件/043-Reading and Writing Binary Files.md","filePath":"posts/c教程/zh-CN/05-输入输出与文件/043-Reading and Writing Binary Files.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/05-输入输出与文件/043-Reading and Writing Binary Files.md"};function i(l,n,o,d,c,r){return s(),e("div",null,[...n[0]||(n[0]=[p(`<p>[English version](/posts/c教程/en-US/05-Input Output and Files/043-Reading and Writing Binary Files)</p><p>文本文件易于阅读，但并不总是高效。另一方面，二进制文件完全按照内存中存在的方式存储原始字节，无需格式化，无需转换。它们非常适合保存数组、结构或任何必须快速写入和读回而不会丢失或舍入的数据。</p><h4 id="文本与二进制" tabindex="-1">文本与二进制 <a class="header-anchor" href="#文本与二进制" aria-label="Permalink to &quot;文本与二进制&quot;">​</a></h4><table tabindex="0"><thead><tr><th>方面</th><th>文本文件</th><th>二进制文件</th></tr></thead><tbody><tr><td>格式</td><td>人类可读 (ASCII)</td><td>原始字节</td></tr><tr><td>尺寸</td><td>更大（额外字符、换行符）</td><td>更小（紧凑形式）</td></tr><tr><td>读/写</td><td><code>fprintf</code>,<code>fscanf</code>,<code>fgets</code></td><td><code>fwrite</code>,<code>fread</code></td></tr><tr><td>使用案例</td><td>日志、配置、报告</td><td>结构、图像、可执行文件、序列化数据</td></tr></tbody></table><p>当您打开二进制 I/O 文件时，添加<code>b</code>到模式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FILE *fp = fopen(&quot;data.bin&quot;, &quot;wb&quot;); // write binary</span></span>
<span class="line"><span>FILE *fp = fopen(&quot;data.bin&quot;, &quot;rb&quot;); // read binary</span></span></code></pre></div><h4 id="写入二进制数据" tabindex="-1">写入二进制数据 <a class="header-anchor" href="#写入二进制数据" aria-label="Permalink to &quot;写入二进制数据&quot;">​</a></h4><p>让我们将整数数组直接写入磁盘。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int numbers[] = {10, 20, 30, 40, 50};</span></span>
<span class="line"><span>    size_t count = sizeof(numbers) / sizeof(numbers[0]);</span></span>
<span class="line"><span>    FILE *fp = fopen(&quot;numbers.bin&quot;, &quot;wb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Failed to open file&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fwrite(numbers, sizeof(int), count, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    printf(&quot;Wrote %zu integers to numbers.bin\\n&quot;, count);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这会将 5 个整数（在大多数系统上每个整数 4 个字节）作为原始字节直接写入磁盘，不进行文本转换。</p><h4 id="读取二进制数据" tabindex="-1">读取二进制数据 <a class="header-anchor" href="#读取二进制数据" aria-label="Permalink to &quot;读取二进制数据&quot;">​</a></h4><p>现在让我们回读一下它们：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int numbers[5];</span></span>
<span class="line"><span>    FILE *fp = fopen(&quot;numbers.bin&quot;, &quot;rb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Failed to open file&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    size_t n = fread(numbers, sizeof(int), 5, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    printf(&quot;Read %zu integers:\\n&quot;, n);</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; n; i++)</span></span>
<span class="line"><span>        printf(&quot;%d &quot;, numbers[i]);</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Wrote 5 integers to numbers.bin</span></span>
<span class="line"><span>Read 5 integers:</span></span>
<span class="line"><span>10 20 30 40 50</span></span></code></pre></div><h4 id="写作和阅读结构" tabindex="-1">写作和阅读结构 <a class="header-anchor" href="#写作和阅读结构" aria-label="Permalink to &quot;写作和阅读结构&quot;">​</a></h4><p>您可以使用相同的模式直接存储整个结构。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int id;</span></span>
<span class="line"><span>    float price;</span></span>
<span class="line"><span>    char title[50];</span></span>
<span class="line"><span>} Book;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Book b1 = {1, 9.99, &quot;The C Book&quot;};</span></span>
<span class="line"><span>    Book b2 = {2, 15.49, &quot;Algorithms in C&quot;};</span></span>
<span class="line"><span>    FILE *fp = fopen(&quot;books.bin&quot;, &quot;wb&quot;);</span></span>
<span class="line"><span>    if (!fp) return 1;</span></span>
<span class="line"><span>    fwrite(&amp;b1, sizeof(Book), 1, fp);</span></span>
<span class="line"><span>    fwrite(&amp;b2, sizeof(Book), 1, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    fp = fopen(&quot;books.bin&quot;, &quot;rb&quot;);</span></span>
<span class="line"><span>    if (!fp) return 1;</span></span>
<span class="line"><span>    Book b;</span></span>
<span class="line"><span>    while (fread(&amp;b, sizeof(Book), 1, fp) == 1)</span></span>
<span class="line"><span>        printf(&quot;%d | %s | %.2f\\n&quot;, b.id, b.title, b.price);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1 | The C Book | 9.99</span></span>
<span class="line"><span>2 | Algorithms in C | 15.49</span></span></code></pre></div><h4 id="处理字节顺序" tabindex="-1">处理字节顺序 <a class="header-anchor" href="#处理字节顺序" aria-label="Permalink to &quot;处理字节顺序&quot;">​</a></h4><p>二进制文件取决于 CPU 的字节顺序（字节顺序）。如果您在小端机器上写入并在大端机器上读取，则字节可能会出现反转。</p><p>对于便携式格式，您可以：</p><ul><li>使用标准化序列化（如 Protocol Buffers 或 MessagePack）。</li><li>使用位移位或网络字节顺序函数手动转换（<code>htonl</code>,<code>ntohl</code>).</li></ul><p>手动转换示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>unsigned int to_big_endian(unsigned int x) {</span></span>
<span class="line"><span>    return ((x &amp; 0xFF) &lt;&lt; 24) |</span></span>
<span class="line"><span>           ((x &amp; 0xFF00) &lt;&lt; 8) |</span></span>
<span class="line"><span>           ((x &amp; 0xFF0000) &gt;&gt; 8) |</span></span>
<span class="line"><span>           ((x &gt;&gt; 24) &amp; 0xFF);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="附加二进制数据" tabindex="-1">附加二进制数据 <a class="header-anchor" href="#附加二进制数据" aria-label="Permalink to &quot;附加二进制数据&quot;">​</a></h4><p>您可以使用模式附加更多记录<code>&quot;ab&quot;</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Book b3 = {3, 21.75, &quot;Advanced C&quot;};</span></span>
<span class="line"><span>FILE *fp = fopen(&quot;books.bin&quot;, &quot;ab&quot;);</span></span>
<span class="line"><span>fwrite(&amp;b3, sizeof(Book), 1, fp);</span></span>
<span class="line"><span>fclose(fp);</span></span></code></pre></div><h4 id="二进制文件实用程序" tabindex="-1">二进制文件实用程序 <a class="header-anchor" href="#二进制文件实用程序" aria-label="Permalink to &quot;二进制文件实用程序&quot;">​</a></h4><table tabindex="0"><thead><tr><th>功能</th><th>目的</th></tr></thead><tbody><tr><td><code>fwrite(ptr, size, count, file)</code></td><td>写入二进制数据</td></tr><tr><td><code>fread(ptr, size, count, file)</code></td><td>读取二进制数据</td></tr><tr><td><code>fseek(file, offset, origin)</code></td><td>移动位置</td></tr><tr><td><code>ftell(file)</code></td><td>获取当前位置</td></tr><tr><td><code>rewind(file)</code></td><td>返回开始</td></tr></tbody></table><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>二进制 I/O 对于以下方面至关重要：</p><ul><li>有效保存大型数据集</li><li>游戏保存文件、多媒体格式或科学数据</li><li>数据库和内存映射存储</li><li>嵌入式和系统级工具</li></ul><p>它是序列化的基础，将内存中的数据转换为可以传输或持久的字节。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>保存数组<code>double</code>值并读回它们。</li><li>修改结构示例以包含<code>enum</code>字段并测试二进制结果。</li><li>实现一个功能<code>count_records(filename)</code>计算存储了多少个结构。</li><li>使用<code>fseek()</code>跳转到第三条记录并仅打印该记录。</li><li>写入同一文件的文本和二进制版本并比较大小。</li></ol><p>二进制 I/O 将 C 的低级功能与现实世界的存储效率联系起来。接下来，您将通过了解标准流、如何使用来进一步扩展它<code>stdin</code>,<code>stdout</code>， 和<code>stderr</code>构建灵活、可组合的命令行工具。</p>`,38)])])}const b=a(t,[["render",i]]);export{h as __pageData,b as default};
