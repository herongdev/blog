import{_ as n,o as a,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"38. Hash Tables and Function Pointers","description":"The Little Book of C — 38. Hash Tables and Function Pointers","frontmatter":{"title":"38. Hash Tables and Function Pointers","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Structuring Data"],"description":"The Little Book of C — 38. Hash Tables and Function Pointers","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":38,"sidebarWeight":38,"lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers","alternateZh":"/posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers.md","filePath":"posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers.md"};function i(l,s,o,c,r,h){return a(),e("div",null,[...s[0]||(s[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers)</p><p>Hash tables are among the most important data structures in computing, fast, flexible, and foundational. They give you average O(1) lookup, insertion, and deletion by mapping keys to values through a hash function. In this section, you’ll build a simple hash table from scratch in C using structs, arrays, and function pointers for hash and comparison operations.</p><h4 id="what-is-a-hash-table" tabindex="-1">What Is a Hash Table? <a class="header-anchor" href="#what-is-a-hash-table" aria-label="Permalink to &quot;What Is a Hash Table?&quot;">​</a></h4><p>A hash table stores data as key–value pairs. When you insert a key:</p><ol><li>The hash function converts it into an integer index.</li><li>The data is stored in that slot of an array.</li><li>When you search later, the key is hashed again to find the same index.</li></ol><p>If multiple keys map to the same slot, that’s called a collision, handled by chaining (linked lists) or open addressing.</p><h4 id="simple-design" tabindex="-1">Simple Design <a class="header-anchor" href="#simple-design" aria-label="Permalink to &quot;Simple Design&quot;">​</a></h4><p>We’ll use chaining, each slot in the table is a linked list of key–value pairs that share the same hash.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct Entry {</span></span>
<span class="line"><span>    char *key;</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Entry *next;</span></span>
<span class="line"><span>} Entry;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Entry **buckets; // array of linked lists</span></span>
<span class="line"><span>    size_t size;</span></span>
<span class="line"><span>} HashTable;</span></span></code></pre></div><h4 id="hash-function" tabindex="-1">Hash Function <a class="header-anchor" href="#hash-function" aria-label="Permalink to &quot;Hash Function&quot;">​</a></h4><p>A basic string hash function (the djb2 algorithm):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stddef.h&gt;</span></span>
<span class="line"><span>unsigned long hash_string(const char *str) {</span></span>
<span class="line"><span>    unsigned long hash = 5381;</span></span>
<span class="line"><span>    int c;</span></span>
<span class="line"><span>    while ((c = *str++))</span></span>
<span class="line"><span>        hash = ((hash &lt;&lt; 5) + hash) + c; // hash * 33 + c</span></span>
<span class="line"><span>    return hash;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="tiny-code-hash-table-implementation" tabindex="-1">Tiny Code: Hash Table Implementation <a class="header-anchor" href="#tiny-code-hash-table-implementation" aria-label="Permalink to &quot;Tiny Code: Hash Table Implementation&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>banana = 7</span></span></code></pre></div><h4 id="using-function-pointers-for-genericity" tabindex="-1">Using Function Pointers for Genericity <a class="header-anchor" href="#using-function-pointers-for-genericity" aria-label="Permalink to &quot;Using Function Pointers for Genericity&quot;">​</a></h4><p>We can make the hash table generic by letting users provide custom hash and compare functions:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef unsigned long (*HashFunc)(const void*);</span></span>
<span class="line"><span>typedef int (*CompareFunc)(const void*, const void*);</span></span></code></pre></div><p>Then we embed them in the struct:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Entry **buckets;</span></span>
<span class="line"><span>    size_t size;</span></span>
<span class="line"><span>    HashFunc hash;</span></span>
<span class="line"><span>    CompareFunc compare;</span></span>
<span class="line"><span>} GenericTable;</span></span></code></pre></div><p>This lets you reuse the same table for strings, integers, or structs, just provide the right hash and compare functions.</p><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>unsigned long hash_int(const void *p) {</span></span>
<span class="line"><span>    return (*(int*)p) * 2654435761u;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Hash tables power:</p><ul><li>Compilers (symbol tables, variable scopes)</li><li>Databases and caches (key-value stores)</li><li>Operating systems (file descriptor maps, kernel objects)</li><li>Network stacks (routing tables, ARP caches)</li></ul><p>They balance speed, simplicity, and control, the heart of efficient system design in C.</p><h4 id="common-pitfalls" tabindex="-1">Common Pitfalls <a class="header-anchor" href="#common-pitfalls" aria-label="Permalink to &quot;Common Pitfalls&quot;">​</a></h4><ul><li>Forgetting to handle collisions (loses data).</li><li>Failing to free all nodes → memory leaks.</li><li>Using poor hash functions → clustering, performance drops.</li><li>Not resizing when full → reduced efficiency.</li></ul><p>A well-designed hash table grows dynamically (doubling capacity and rehashing when load exceeds a threshold).</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Modify the table to update existing keys instead of always inserting new ones.</li><li>Implement a delete(key) function that removes an entry.</li><li>Write a version with integer keys.</li><li>Implement rehash() that doubles table size when 75% full.</li><li>Replace function pointers with macros for performance comparison.</li></ol><p>Hash tables are where C shows its full power: raw pointers, function indirection, and dynamic memory, all working together for blazing-fast lookups. Next, you’ll take these ideas further and explore how to simulate object-oriented design in C using structs, function pointers, and encapsulation.</p>`,34)])])}const g=n(p,[["render",i]]);export{d as __pageData,g as default};
