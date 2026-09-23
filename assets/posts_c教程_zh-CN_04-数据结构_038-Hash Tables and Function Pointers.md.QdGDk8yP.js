import{_ as n,o as a,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"38. 哈希表和函数指针","description":"The Little Book of C 中文版 — 38. 哈希表和函数指针","frontmatter":{"title":"38. 哈希表和函数指针","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 38. 哈希表和函数指针","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":38,"sidebarWeight":38,"alternateZh":"/posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers","alternateEn":"/posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers.md","filePath":"posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers.md"};function t(i,s,c,o,r,h){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers)</p><p>哈希表是计算中最重要的数据结构之一，快速、灵活且基础。它们通过哈希函数将键映射到值，为您提供平均 O(1) 查找、插入和删除。在本节中，您将从头开始使用 C 语言构建一个简单的哈希表，使用结构体、数组和函数指针进行哈希和比较操作。</p><h4 id="什么是哈希表" tabindex="-1">什么是哈希表？ <a class="header-anchor" href="#什么是哈希表" aria-label="Permalink to &quot;什么是哈希表？&quot;">​</a></h4><p>哈希表将数据存储为键值对。当您插入密钥时：</p><ol><li>哈希函数将其转换为整数索引。</li><li>数据存储在数组的该槽中。</li><li>稍后搜索时，会再次对键进行哈希处理以找到相同的索引。</li></ol><p>如果多个键映射到同一个槽，则称为冲突，通过链接（链表）或开放寻址来处理。</p><h4 id="简单的设计" tabindex="-1">简单的设计 <a class="header-anchor" href="#简单的设计" aria-label="Permalink to &quot;简单的设计&quot;">​</a></h4><p>我们将使用链接，表中的每个槽都是共享相同哈希的键值对的链接列表。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct Entry {</span></span>
<span class="line"><span>    char *key;</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Entry *next;</span></span>
<span class="line"><span>} Entry;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Entry **buckets; // array of linked lists</span></span>
<span class="line"><span>    size_t size;</span></span>
<span class="line"><span>} HashTable;</span></span></code></pre></div><h4 id="哈希函数" tabindex="-1">哈希函数 <a class="header-anchor" href="#哈希函数" aria-label="Permalink to &quot;哈希函数&quot;">​</a></h4><p>一个基本的字符串哈希函数（djb2 算法）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stddef.h&gt;</span></span>
<span class="line"><span>unsigned long hash_string(const char *str) {</span></span>
<span class="line"><span>    unsigned long hash = 5381;</span></span>
<span class="line"><span>    int c;</span></span>
<span class="line"><span>    while ((c = *str++))</span></span>
<span class="line"><span>        hash = ((hash &lt;&lt; 5) + hash) + c; // hash * 33 + c</span></span>
<span class="line"><span>    return hash;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="小代码-哈希表实现" tabindex="-1">小代码：哈希表实现 <a class="header-anchor" href="#小代码-哈希表实现" aria-label="Permalink to &quot;小代码：哈希表实现&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef struct Entry {</span></span>
<span class="line"><span>    char *key;</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Entry *next;</span></span>
<span class="line"><span>} Entry;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Entry **buckets;</span></span>
<span class="line"><span>    size_t size;</span></span>
<span class="line"><span>} HashTable;</span></span>
<span class="line"><span>unsigned long hash_string(const char *str) {</span></span>
<span class="line"><span>    unsigned long hash = 5381;</span></span>
<span class="line"><span>    int c;</span></span>
<span class="line"><span>    while ((c = *str++))</span></span>
<span class="line"><span>        hash = ((hash &lt;&lt; 5) + hash) + c;</span></span>
<span class="line"><span>    return hash;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>HashTable* create_table(size_t size) {</span></span>
<span class="line"><span>    HashTable *t = malloc(sizeof(HashTable));</span></span>
<span class="line"><span>    t-&gt;size = size;</span></span>
<span class="line"><span>    t-&gt;buckets = calloc(size, sizeof(Entry*));</span></span>
<span class="line"><span>    return t;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Entry* create_entry(const char *key, int value) {</span></span>
<span class="line"><span>    Entry *e = malloc(sizeof(Entry));</span></span>
<span class="line"><span>    e-&gt;key = strdup(key);</span></span>
<span class="line"><span>    e-&gt;value = value;</span></span>
<span class="line"><span>    e-&gt;next = NULL;</span></span>
<span class="line"><span>    return e;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void insert(HashTable *t, const char *key, int value) {</span></span>
<span class="line"><span>    unsigned long index = hash_string(key) % t-&gt;size;</span></span>
<span class="line"><span>    Entry *new_entry = create_entry(key, value);</span></span>
<span class="line"><span>    new_entry-&gt;next = t-&gt;buckets[index];</span></span>
<span class="line"><span>    t-&gt;buckets[index] = new_entry;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Entry* search(HashTable *t, const char *key) {</span></span>
<span class="line"><span>    unsigned long index = hash_string(key) % t-&gt;size;</span></span>
<span class="line"><span>    for (Entry *e = t-&gt;buckets[index]; e; e = e-&gt;next)</span></span>
<span class="line"><span>        if (strcmp(e-&gt;key, key) == 0)</span></span>
<span class="line"><span>            return e;</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void free_table(HashTable *t) {</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; t-&gt;size; i++) {</span></span>
<span class="line"><span>        Entry *e = t-&gt;buckets[i];</span></span>
<span class="line"><span>        while (e) {</span></span>
<span class="line"><span>            Entry *next = e-&gt;next;</span></span>
<span class="line"><span>            free(e-&gt;key);</span></span>
<span class="line"><span>            free(e);</span></span>
<span class="line"><span>            e = next;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    free(t-&gt;buckets);</span></span>
<span class="line"><span>    free(t);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    HashTable *table = create_table(8);</span></span>
<span class="line"><span>    insert(table, &quot;apple&quot;, 5);</span></span>
<span class="line"><span>    insert(table, &quot;banana&quot;, 7);</span></span>
<span class="line"><span>    insert(table, &quot;orange&quot;, 10);</span></span>
<span class="line"><span>    Entry *result = search(table, &quot;banana&quot;);</span></span>
<span class="line"><span>    if (result)</span></span>
<span class="line"><span>        printf(&quot;banana = %d\\n&quot;, result-&gt;value);</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        printf(&quot;Key not found\\n&quot;);</span></span>
<span class="line"><span>    free_table(table);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>banana = 7</span></span></code></pre></div><h4 id="使用函数指针实现通用性" tabindex="-1">使用函数指针实现通用性 <a class="header-anchor" href="#使用函数指针实现通用性" aria-label="Permalink to &quot;使用函数指针实现通用性&quot;">​</a></h4><p>我们可以通过让用户提供自定义哈希和比较函数来使哈希表通用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef unsigned long (*HashFunc)(const void*);</span></span>
<span class="line"><span>typedef int (*CompareFunc)(const void*, const void*);</span></span></code></pre></div><p>然后我们将它们嵌入到结构中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Entry **buckets;</span></span>
<span class="line"><span>    size_t size;</span></span>
<span class="line"><span>    HashFunc hash;</span></span>
<span class="line"><span>    CompareFunc compare;</span></span>
<span class="line"><span>} GenericTable;</span></span></code></pre></div><p>这使您可以对字符串、整数或结构重复使用同一个表，只需提供正确的哈希和比较函数即可。</p><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>unsigned long hash_int(const void *p) {</span></span>
<span class="line"><span>    return (*(int*)p) * 2654435761u;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>哈希表的功效：</p><ul><li>编译器（符号表、变量范围）</li><li>数据库和缓存（键值存储）</li><li>操作系统（文件描述符映射、内核对象）</li><li>网络堆栈（路由表、ARP 缓存）</li></ul><p>它们平衡了速度、简单性和控制，这是 C 语言高效系统设计的核心。</p><h4 id="常见陷阱" tabindex="-1">常见陷阱 <a class="header-anchor" href="#常见陷阱" aria-label="Permalink to &quot;常见陷阱&quot;">​</a></h4><ul><li>忘记处理碰撞（丢失数据）。</li><li>未能释放所有节点→内存泄漏。</li><li>使用较差的哈希函数 → 集群，性能下降。</li><li>满时不调整大小 → 效率降低。</li></ul><p>设计良好的哈希表会动态增长（当负载超过阈值时，容量加倍并重新哈希）。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>修改表以更新现有键，而不是总是插入新键。</li><li>实现删除条目的delete(key) 函数。</li><li>编写带有整数键的版本。</li><li>实现 rehash()，在 75% 满时将表大小加倍。 5、用宏替换函数指针进行性能比较。</li></ol><p>哈希表是 C 语言展示其全部威力的地方：原始指针、函数间接寻址和动态内存，所有这些一起工作以实现极快的查找。接下来，您将进一步深化这些想法，探索如何使用结构、函数指针和封装在 C 中模拟面向对象的设计。</p>`,34)])])}const g=n(l,[["render",t]]);export{u as __pageData,g as default};
