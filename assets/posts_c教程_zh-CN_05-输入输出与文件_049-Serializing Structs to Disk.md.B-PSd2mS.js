import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"49. 将结构序列化到磁盘","description":"The Little Book of C 中文版 — 49. 将结构序列化到磁盘","frontmatter":{"title":"49. 将结构序列化到磁盘","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","05-输入输出与文件","中文"],"description":"The Little Book of C 中文版 — 49. 将结构序列化到磁盘","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":49,"sidebarWeight":49,"alternateZh":"/posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk","alternateEn":"/posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk"},"headers":[],"relativePath":"posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk.md","filePath":"posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk.md"};function i(l,s,o,c,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk)</p><p>到目前为止，您已经使用了文本文件、配置文件和基本二进制数据。现在是时候将这些想法结合到更强大的序列化中了：将完整的 C 结构保存到磁盘并稍后恢复它们，就像它们在内存中一样。</p><p>这是操作系统和游戏中数据库、缓存和持久状态的基础。</p><h4 id="什么是序列化" tabindex="-1">什么是序列化？ <a class="header-anchor" href="#什么是序列化" aria-label="Permalink to &quot;什么是序列化？&quot;">​</a></h4><p>序列化意味着将内存中的数据转换为可以存储或传输的格式（如文件）。反序列化则相反：从文件中重建该数据。</p><p>在 C 中，这通常意味着将结构直接写为二进制数据<code>fwrite()</code>并读回它们<code>fread()</code>.</p><h4 id="步骤-1-定义要存储的结构" tabindex="-1">步骤 1. 定义要存储的结构 <a class="header-anchor" href="#步骤-1-定义要存储的结构" aria-label="Permalink to &quot;步骤 1. 定义要存储的结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int id;</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    float price;</span></span>
<span class="line"><span>} Product;</span></span></code></pre></div><p>每个字段都是固定大小的，这使得可以安全地以二进制形式直接写入磁盘。</p><h4 id="步骤-2-将结构写入磁盘" tabindex="-1">步骤 2. 将结构写入磁盘 <a class="header-anchor" href="#步骤-2-将结构写入磁盘" aria-label="Permalink to &quot;步骤 2. 将结构写入磁盘&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void save_products(const char *filename, Product *arr, size_t count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;wb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open file for writing&quot;);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fwrite(arr, sizeof(Product), count, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-3-从磁盘读取结构" tabindex="-1">步骤 3. 从磁盘读取结构 <a class="header-anchor" href="#步骤-3-从磁盘读取结构" aria-label="Permalink to &quot;步骤 3. 从磁盘读取结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size_t load_products(const char *filename, Product *arr, size_t max_count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;rb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open file for reading&quot;);</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    size_t n = fread(arr, sizeof(Product), max_count, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="小代码-完整示例" tabindex="-1">小代码：完整示例 <a class="header-anchor" href="#小代码-完整示例" aria-label="Permalink to &quot;小代码：完整示例&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int id;</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    float price;</span></span>
<span class="line"><span>} Product;</span></span>
<span class="line"><span>void save_products(const char *filename, Product *arr, size_t count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;wb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open file&quot;);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fwrite(arr, sizeof(Product), count, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>size_t load_products(const char *filename, Product *arr, size_t max_count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;rb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open file&quot;);</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    size_t n = fread(arr, sizeof(Product), max_count, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Product products[3] = {</span></span>
<span class="line"><span>        {1, &quot;Notebook&quot;, 2.99},</span></span>
<span class="line"><span>        {2, &quot;Pencil&quot;, 0.49},</span></span>
<span class="line"><span>        {3, &quot;Backpack&quot;, 25.00}</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    save_products(&quot;store.bin&quot;, products, 3);</span></span>
<span class="line"><span>    printf(&quot;Products saved.\\n&quot;);</span></span>
<span class="line"><span>    Product loaded[3];</span></span>
<span class="line"><span>    size_t n = load_products(&quot;store.bin&quot;, loaded, 3);</span></span>
<span class="line"><span>    printf(&quot;Loaded %zu products:\\n&quot;, n);</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; n; i++)</span></span>
<span class="line"><span>        printf(&quot;%d | %-10s | $%.2f\\n&quot;, loaded[i].id, loaded[i].name, loaded[i].price);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Products saved.</span></span>
<span class="line"><span>Loaded 3 products:</span></span>
<span class="line"><span>1 | Notebook   | $2.99</span></span>
<span class="line"><span>2 | Pencil     | $0.49</span></span>
<span class="line"><span>3 | Backpack   | $25.00</span></span></code></pre></div><h4 id="步骤-4-追加记录" tabindex="-1">步骤 4. 追加记录 <a class="header-anchor" href="#步骤-4-追加记录" aria-label="Permalink to &quot;步骤 4. 追加记录&quot;">​</a></h4><p>您可以使用追加模式添加更多数据而不覆盖<code>&quot;ab&quot;</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Product p = {4, &quot;Eraser&quot;, 0.99};</span></span>
<span class="line"><span>FILE *fp = fopen(&quot;store.bin&quot;, &quot;ab&quot;);</span></span>
<span class="line"><span>fwrite(&amp;p, sizeof(Product), 1, fp);</span></span>
<span class="line"><span>fclose(fp);</span></span></code></pre></div><h4 id="步骤-5-随机访问记录" tabindex="-1">步骤 5. 随机访问记录 <a class="header-anchor" href="#步骤-5-随机访问记录" aria-label="Permalink to &quot;步骤 5. 随机访问记录&quot;">​</a></h4><p>您可以使用<code>fseek()</code>跳转到特定记录（对于一次更新或读取一条记录很有用）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FILE *fp = fopen(&quot;store.bin&quot;, &quot;rb&quot;);</span></span>
<span class="line"><span>fseek(fp, sizeof(Product) * 1, SEEK_SET);  // skip first record</span></span>
<span class="line"><span>Product p;</span></span>
<span class="line"><span>fread(&amp;p, sizeof(Product), 1, fp);</span></span>
<span class="line"><span>printf(&quot;Record 2: %s\\n&quot;, p.name);</span></span>
<span class="line"><span>fclose(fp);</span></span></code></pre></div><h4 id="步骤-6-可移植性考虑因素" tabindex="-1">步骤 6. 可移植性考虑因素 <a class="header-anchor" href="#步骤-6-可移植性考虑因素" aria-label="Permalink to &quot;步骤 6. 可移植性考虑因素&quot;">​</a></h4><p>像这样的序列化是依赖于机器的，因为：</p><ul><li>Endianness（整数/浮点数的字节顺序）</li><li>结构填充（编译器对齐）</li><li>数据类型大小</li></ul><p>为了使其便携：</p><ul><li>使用<code>#pragma pack(1)</code>或者<code>__attribute__((packed))</code>禁用填充。</li><li>将整数转换为标准字节顺序（例如，使用<code>htonl()</code>和<code>ntohl()</code>).</li><li>考虑使用基于文本或可移植的格式（例如 CSV、JSON 或 protobuf）进行跨平台存储。</li></ul><h4 id="步骤-7-基于文本的替代方案-人类可读" tabindex="-1">步骤 7. 基于文本的替代方案（人类可读） <a class="header-anchor" href="#步骤-7-基于文本的替代方案-人类可读" aria-label="Permalink to &quot;步骤 7. 基于文本的替代方案（人类可读）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void save_as_text(const char *filename, Product *arr, size_t count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;w&quot;);</span></span>
<span class="line"><span>    if (!fp) return;</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; count; i++)</span></span>
<span class="line"><span>        fprintf(fp, &quot;%d,%s,%.2f\\n&quot;, arr[i].id, arr[i].name, arr[i].price);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这会产生：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1,Notebook,2.99</span></span>
<span class="line"><span>2,Pencil,0.49</span></span>
<span class="line"><span>3,Backpack,25.00</span></span></code></pre></div><p>易于阅读，但解析速度较慢且空间利用率较低。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>序列化使您的 C 程序有状态，它们可以保存进度、存储数据或重新启动后恢复。它的基础是：</p><ul><li>数据库和键值存储</li><li>在游戏中保存文件</li><li>科学软件中的检查点</li><li>系统守护进程和缓存</li></ul><p>您现在正在用 C 处理真正的持久性。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加功能<code>add_product()</code>安全地附加新记录。 2. 实施<code>list_products()</code>打印文件中的所有产品。 3. 添加“按 id 删除”操作，将除一条记录外的所有记录复制到新文件中。 4. 结构填充实验（<code>sizeof(Product)</code>可能不是你所期望的）。 5. 添加校验和字段以检测损坏的数据。</p><p>您现在知道如何以二进制或文本形式保存结构化数据。接下来，您将通过结合所有这些知识来结束第 5 章，编写一个日志读取器和写入器系统来记录事件、轮换文件并在启动时安全地重播日志。</p>`,40)])])}const f=a(t,[["render",i]]);export{h as __pageData,f as default};
