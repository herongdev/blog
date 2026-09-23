import{_ as s,o as n,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"49. Serializing Structs to Disk","description":"The Little Book of C — 49. Serializing Structs to Disk","frontmatter":{"title":"49. Serializing Structs to Disk","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Input Output and Files"],"description":"The Little Book of C — 49. Serializing Structs to Disk","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":49,"sidebarWeight":49,"lang":"en-US","alternateEn":"/posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk","alternateZh":"/posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk"},"headers":[],"relativePath":"posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk.md","filePath":"posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk.md"};function i(o,a,l,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk)</p><p>So far, you’ve worked with text files, configuration files, and basic binary data. Now it’s time to combine those ideas into something more powerful, serialization: saving complete C structs to disk and restoring them later, exactly as they were in memory.</p><p>This is the foundation for databases, caches, and persistent state in operating systems and games.</p><h4 id="what-is-serialization" tabindex="-1">What Is Serialization? <a class="header-anchor" href="#what-is-serialization" aria-label="Permalink to &quot;What Is Serialization?&quot;">​</a></h4><p>Serialization means converting in-memory data into a format that can be stored or transmitted (like a file). Deserialization is the reverse: reconstructing that data from the file.</p><p>In C, this often means writing structs directly as binary data with<code>fwrite()</code> and reading them back with<code>fread()</code>.</p><h4 id="step-1-define-a-struct-to-store" tabindex="-1">Step 1. Define a Struct to Store <a class="header-anchor" href="#step-1-define-a-struct-to-store" aria-label="Permalink to &quot;Step 1. Define a Struct to Store&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int id;</span></span>
<span class="line"><span>    char name[50];</span></span>
<span class="line"><span>    float price;</span></span>
<span class="line"><span>} Product;</span></span></code></pre></div><p>Each field is fixed-size, which makes it safe to write directly to disk as binary.</p><h4 id="step-2-write-structs-to-disk" tabindex="-1">Step 2. Write Structs to Disk <a class="header-anchor" href="#step-2-write-structs-to-disk" aria-label="Permalink to &quot;Step 2. Write Structs to Disk&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void save_products(const char *filename, Product *arr, size_t count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;wb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open file for writing&quot;);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fwrite(arr, sizeof(Product), count, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-3-read-structs-from-disk" tabindex="-1">Step 3. Read Structs from Disk <a class="header-anchor" href="#step-3-read-structs-from-disk" aria-label="Permalink to &quot;Step 3. Read Structs from Disk&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>size_t load_products(const char *filename, Product *arr, size_t max_count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;rb&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open file for reading&quot;);</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    size_t n = fread(arr, sizeof(Product), max_count, fp);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="tiny-code-complete-example" tabindex="-1">Tiny Code: Complete Example <a class="header-anchor" href="#tiny-code-complete-example" aria-label="Permalink to &quot;Tiny Code: Complete Example&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Products saved.</span></span>
<span class="line"><span>Loaded 3 products:</span></span>
<span class="line"><span>1 | Notebook   | $2.99</span></span>
<span class="line"><span>2 | Pencil     | $0.49</span></span>
<span class="line"><span>3 | Backpack   | $25.00</span></span></code></pre></div><h4 id="step-4-appending-records" tabindex="-1">Step 4. Appending Records <a class="header-anchor" href="#step-4-appending-records" aria-label="Permalink to &quot;Step 4. Appending Records&quot;">​</a></h4><p>You can add more data without overwriting by using append mode<code>&quot;ab&quot;</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Product p = {4, &quot;Eraser&quot;, 0.99};</span></span>
<span class="line"><span>FILE *fp = fopen(&quot;store.bin&quot;, &quot;ab&quot;);</span></span>
<span class="line"><span>fwrite(&amp;p, sizeof(Product), 1, fp);</span></span>
<span class="line"><span>fclose(fp);</span></span></code></pre></div><h4 id="step-5-random-access-to-records" tabindex="-1">Step 5. Random Access to Records <a class="header-anchor" href="#step-5-random-access-to-records" aria-label="Permalink to &quot;Step 5. Random Access to Records&quot;">​</a></h4><p>You can use<code>fseek()</code> to jump to a specific record (useful for updating or reading one record at a time).</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FILE *fp = fopen(&quot;store.bin&quot;, &quot;rb&quot;);</span></span>
<span class="line"><span>fseek(fp, sizeof(Product) * 1, SEEK_SET);  // skip first record</span></span>
<span class="line"><span>Product p;</span></span>
<span class="line"><span>fread(&amp;p, sizeof(Product), 1, fp);</span></span>
<span class="line"><span>printf(&quot;Record 2: %s\\n&quot;, p.name);</span></span>
<span class="line"><span>fclose(fp);</span></span></code></pre></div><h4 id="step-6-portability-considerations" tabindex="-1">Step 6. Portability Considerations <a class="header-anchor" href="#step-6-portability-considerations" aria-label="Permalink to &quot;Step 6. Portability Considerations&quot;">​</a></h4><p>Serialization like this is machine-dependent because of:</p><ul><li>Endianness (byte order of integers/floats)</li><li>Structure padding (compiler alignment)</li><li>Data type sizes</li></ul><p>To make it portable:</p><ul><li>Use<code>#pragma pack(1)</code> or<code>__attribute__((packed))</code> to disable padding.</li><li>Convert integers to a standard byte order (e.g., use<code>htonl()</code> and<code>ntohl()</code>).</li><li>Consider text-based or portable formats like CSV, JSON, or protobuf for cross-platform storage.</li></ul><h4 id="step-7-text-based-alternative-human-readable" tabindex="-1">Step 7. Text-Based Alternative (Human-Readable) <a class="header-anchor" href="#step-7-text-based-alternative-human-readable" aria-label="Permalink to &quot;Step 7. Text-Based Alternative (Human-Readable)&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void save_as_text(const char *filename, Product *arr, size_t count) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;w&quot;);</span></span>
<span class="line"><span>    if (!fp) return;</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; count; i++)</span></span>
<span class="line"><span>        fprintf(fp, &quot;%d,%s,%.2f\\n&quot;, arr[i].id, arr[i].name, arr[i].price);</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This produces:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1,Notebook,2.99</span></span>
<span class="line"><span>2,Pencil,0.49</span></span>
<span class="line"><span>3,Backpack,25.00</span></span></code></pre></div><p>Easy to read, but slower to parse and less space-efficient.</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Serialization makes your C programs stateful, they can save progress, store data, or recover after restarts. It’s the basis for:</p><ul><li>Databases and key-value stores</li><li>Save files in games</li><li>Checkpointing in scientific software</li><li>System daemons and caches</li></ul><p>You’re now handling real persistence in C.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Add a function<code>add_product()</code> that appends new records safely.</li><li>Implement<code>list_products()</code> that prints all products from file.</li><li>Add a “delete by id” operation by copying all but one record to a new file.</li><li>Experiment with structure padding (<code>sizeof(Product)</code> may not be what you expect).</li><li>Add a checksum field to detect corrupted data.</li></ol><p>You now know how to persist structured data in binary or text form. Next, you’ll close Chapter 5 by combining all this knowledge, writing a log reader and writer system that records events, rotates files, and safely replays logs on startup.</p>`,40)])])}const f=s(p,[["render",i]]);export{h as __pageData,f as default};
