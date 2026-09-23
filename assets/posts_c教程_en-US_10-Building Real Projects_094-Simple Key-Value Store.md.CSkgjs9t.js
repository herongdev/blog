import{_ as s,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"94. Simple Key-Value Store","description":"The Little Book of C — 94. Simple Key-Value Store","frontmatter":{"title":"94. Simple Key-Value Store","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Building Real Projects"],"description":"The Little Book of C — 94. Simple Key-Value Store","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":94,"sidebarWeight":94,"lang":"en-US","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store","alternateZh":"/posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store"},"headers":[],"relativePath":"posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store.md","filePath":"posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store.md"};function l(i,n,c,o,r,d){return a(),e("div",null,[...n[0]||(n[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store)</p><p>Databases look scary until you build one yourself. In this section you will write a tiny append only key value store that persists data to disk, loads an in memory index on startup, and supports<code>get</code> and<code>set</code> from a simple CLI.</p><p>You will learn files, serialization, indexing, and crash safety basics.</p><h4 id="step-1-design-the-file-format" tabindex="-1">Step 1. Design the file format <a class="header-anchor" href="#step-1-design-the-file-format" aria-label="Permalink to &quot;Step 1. Design the file format&quot;">​</a></h4><p>Keep it simple and binary. Each record is append only:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[ u32 key_len ][ u32 val_len ][ key bytes ][ value bytes ]</span></span></code></pre></div><ul><li>All integers are stored as big endian so the file is portable.</li><li>No in place updates. Setting the same key again appends a new record.</li></ul><h4 id="step-2-endianness-helpers" tabindex="-1">Step 2. Endianness helpers <a class="header-anchor" href="#step-2-endianness-helpers" aria-label="Permalink to &quot;Step 2. Endianness helpers&quot;">​</a></h4><p>We will use<code>htonl</code> and<code>ntohl</code> to encode and decode 32 bit lengths.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;arpa/inet.h&gt;</span><span>   // Windows: winsock2.h</span></span>
<span class="line"><span>static inline uint32_t be32(uint32_t x)  { return htonl(x);  }</span></span>
<span class="line"><span>static inline uint32_t from_be32(uint32_t x) { return ntohl(x); }</span></span></code></pre></div><h4 id="step-3-the-in-memory-index" tabindex="-1">Step 3. The in memory index <a class="header-anchor" href="#step-3-the-in-memory-index" aria-label="Permalink to &quot;Step 3. The in memory index&quot;">​</a></h4><p>On startup, scan the log file once and build a hash map of key -&gt; file offset of the newest record. We will implement a simple open addressing hash table for clarity.</p><p>Index entry:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    uint64_t offset;   // file position of record start</span></span>
<span class="line"><span>    uint32_t key_hash; // cached hash for quick probing</span></span>
<span class="line"><span>    uint32_t key_len;  // used to confirm match</span></span>
<span class="line"><span>} kv_slot;</span></span></code></pre></div><h4 id="step-4-hashing" tabindex="-1">Step 4. Hashing <a class="header-anchor" href="#step-4-hashing" aria-label="Permalink to &quot;Step 4. Hashing&quot;">​</a></h4><p>Use a compact 32 bit FNV-1a hash for strings.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static uint32_t fnv1a(const unsigned char *s, size_t n) {</span></span>
<span class="line"><span>    uint32_t h = 2166136261u;</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; n; i++) {</span></span>
<span class="line"><span>        h ^= s[i];</span></span>
<span class="line"><span>        h *= 16777619u;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return h;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-5-tiny-code-core-implementation" tabindex="-1">Step 5. Tiny Code: core implementation <a class="header-anchor" href="#step-5-tiny-code-core-implementation" aria-label="Permalink to &quot;Step 5. Tiny Code: core implementation&quot;">​</a></h4><p>A single file version to keep things approachable.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: kv.c</span></span>
<span class="line"><span>#define _POSIX_C_SOURCE 200809L</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdint.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;arpa/inet.h&gt;</span><span>   // Windows: include &lt;winsock2.h&gt; and link Ws2_32</span></span>
<span class="line"><span>#include &lt;errno.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    FILE *f;</span></span>
<span class="line"><span>    char *path;</span></span>
<span class="line"><span>    // simple hash table index</span></span>
<span class="line"><span>    struct slot { uint64_t off; uint32_t h, klen; } *tab;</span></span>
<span class="line"><span>    size_t cap, used;</span></span>
<span class="line"><span>} kv_db;</span></span>
<span class="line"><span>static uint32_t fnv1a(const unsigned char *s, size_t n) {</span></span>
<span class="line"><span>    uint32_t h = 2166136261u;</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; n; i++) { h ^= s[i]; h *= 16777619u; }</span></span>
<span class="line"><span>    return h;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static size_t next_pow2(size_t n) { size_t p = 1; while (p &lt; n) p &lt;&lt;= 1; return p; }</span></span>
<span class="line"><span>static int kv_index_put(kv_db *db, const unsigned char *key, uint32_t klen, uint64_t off) {</span></span>
<span class="line"><span>    if (db-&gt;used * 2 &gt;= db-&gt;cap) { // grow</span></span>
<span class="line"><span>        size_t ncap = db-&gt;cap ? db-&gt;cap * 2 : 1024;</span></span>
<span class="line"><span>        struct slot *old = db-&gt;tab;</span></span>
<span class="line"><span>        size_t oldcap = db-&gt;cap;</span></span>
<span class="line"><span>        db-&gt;tab = calloc(ncap, sizeof(*db-&gt;tab));</span></span>
<span class="line"><span>        if (!db-&gt;tab) return -1;</span></span>
<span class="line"><span>        db-&gt;cap = ncap; db-&gt;used = 0;</span></span>
<span class="line"><span>        for (size_t i = 0; i &lt; oldcap; i++) if (old[i].off) {</span></span>
<span class="line"><span>            // reinsert based on stored key hash and key length</span></span>
<span class="line"><span>            size_t m = ncap - 1, j = old[i].h &amp; m;</span></span>
<span class="line"><span>            while (db-&gt;tab[j].off) j = (j + 1) &amp; m;</span></span>
<span class="line"><span>            db-&gt;tab[j] = old[i];</span></span>
<span class="line"><span>            db-&gt;used++;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        free(old);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    uint32_t h = fnv1a(key, klen);</span></span>
<span class="line"><span>    size_t m = db-&gt;cap - 1, i = h &amp; m;</span></span>
<span class="line"><span>    while (db-&gt;tab[i].off) {</span></span>
<span class="line"><span>        if (db-&gt;tab[i].h == h &amp;&amp; db-&gt;tab[i].klen == klen) { db-&gt;tab[i].off = off; return 0; }</span></span>
<span class="line"><span>        i = (i + 1) &amp; m;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    db-&gt;tab[i].off = off; db-&gt;tab[i].h = h; db-&gt;tab[i].klen = klen; db-&gt;used++;</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static long kv_index_find_slot(kv_db *db, const unsigned char *key, uint32_t klen) {</span></span>
<span class="line"><span>    if (db-&gt;cap == 0) return -1;</span></span>
<span class="line"><span>    uint32_t h = fnv1a(key, klen);</span></span>
<span class="line"><span>    size_t m = db-&gt;cap - 1, i = h &amp; m, steps = 0;</span></span>
<span class="line"><span>    while (db-&gt;tab[i].off &amp;&amp; steps &lt;= db-&gt;cap) {</span></span>
<span class="line"><span>        if (db-&gt;tab[i].h == h &amp;&amp; db-&gt;tab[i].klen == klen) return (long)i;</span></span>
<span class="line"><span>        i = (i + 1) &amp; m; steps++;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return -1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static int kv_open(kv_db *db, const char *path) {</span></span>
<span class="line"><span>    memset(db, 0, sizeof(*db));</span></span>
<span class="line"><span>    db-&gt;path = strdup(path);</span></span>
<span class="line"><span>    db-&gt;f = fopen(path, &quot;ab+&quot;);</span></span>
<span class="line"><span>    if (!db-&gt;f) return -1;</span></span>
<span class="line"><span>    fflush(db-&gt;f);</span></span>
<span class="line"><span>    // build index by scanning from start</span></span>
<span class="line"><span>    FILE *r = fopen(path, &quot;rb&quot;);</span></span>
<span class="line"><span>    if (!r) return -1;</span></span>
<span class="line"><span>    // start with some capacity</span></span>
<span class="line"><span>    db-&gt;cap = 1024; db-&gt;tab = calloc(db-&gt;cap, sizeof(*db-&gt;tab));</span></span>
<span class="line"><span>    if (!db-&gt;tab) return -1;</span></span>
<span class="line"><span>    uint64_t off = 0;</span></span>
<span class="line"><span>    for (;;) {</span></span>
<span class="line"><span>        uint32_t klen_be, vlen_be;</span></span>
<span class="line"><span>        if (fread(&amp;klen_be, 4, 1, r) != 1) break;</span></span>
<span class="line"><span>        if (fread(&amp;vlen_be, 4, 1, r) != 1) break;</span></span>
<span class="line"><span>        uint32_t klen = ntohl(klen_be), vlen = ntohl(vlen_be);</span></span>
<span class="line"><span>        unsigned char *k = malloc(klen);</span></span>
<span class="line"><span>        if (!k) break;</span></span>
<span class="line"><span>        if (fread(k, 1, klen, r) != klen) { free(k); break; }</span></span>
<span class="line"><span>        if (fseek(r, vlen, SEEK_CUR) != 0) { free(k); break; }</span></span>
<span class="line"><span>        kv_index_put(db, k, klen, off);</span></span>
<span class="line"><span>        free(k);</span></span>
<span class="line"><span>        off += 8u + klen + vlen;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fclose(r);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static int kv_set(kv_db *db, const unsigned char *key, uint32_t klen,</span></span>
<span class="line"><span>                  const unsigned char *val, uint32_t vlen) {</span></span>
<span class="line"><span>    uint32_t klen_be = htonl(klen), vlen_be = htonl(vlen);</span></span>
<span class="line"><span>    if (fwrite(&amp;klen_be, 4, 1, db-&gt;f) != 1) return -1;</span></span>
<span class="line"><span>    if (fwrite(&amp;vlen_be, 4, 1, db-&gt;f) != 1) return -1;</span></span>
<span class="line"><span>    if (fwrite(key, 1, klen, db-&gt;f) != klen) return -1;</span></span>
<span class="line"><span>    if (fwrite(val, 1, vlen, db-&gt;f) != vlen) return -1;</span></span>
<span class="line"><span>    fflush(db-&gt;f); // durability: fsync would be stronger</span></span>
<span class="line"><span>    // compute offset of the record we just wrote</span></span>
<span class="line"><span>    long end = ftell(db-&gt;f);</span></span>
<span class="line"><span>    if (end &lt; 0) return -1;</span></span>
<span class="line"><span>    uint64_t off = (uint64_t)end - (8u + klen + vlen);</span></span>
<span class="line"><span>    return kv_index_put(db, key, klen, off);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static int kv_get(kv_db *db, const unsigned char *key, uint32_t klen,</span></span>
<span class="line"><span>                  unsigned char **out, uint32_t *outlen) {</span></span>
<span class="line"><span>    long s = kv_index_find_slot(db, key, klen);</span></span>
<span class="line"><span>    if (s &lt; 0) return -1;</span></span>
<span class="line"><span>    uint64_t off = db-&gt;tab[s].off;</span></span>
<span class="line"><span>    if (fseek(db-&gt;f, (long)off, SEEK_SET) != 0) return -1;</span></span>
<span class="line"><span>    uint32_t klen_be, vlen_be;</span></span>
<span class="line"><span>    if (fread(&amp;klen_be, 4, 1, db-&gt;f) != 1) return -1;</span></span>
<span class="line"><span>    if (fread(&amp;vlen_be, 4, 1, db-&gt;f) != 1) return -1;</span></span>
<span class="line"><span>    uint32_t kL = ntohl(klen_be), vL = ntohl(vlen_be);</span></span>
<span class="line"><span>    unsigned char *kbuf = malloc(kL);</span></span>
<span class="line"><span>    if (!kbuf) return -1;</span></span>
<span class="line"><span>    if (fread(kbuf, 1, kL, db-&gt;f) != kL) { free(kbuf); return -1; }</span></span>
<span class="line"><span>    // confirm key match to be safe</span></span>
<span class="line"><span>    if (kL != klen || memcmp(kbuf, key, klen) != 0) { free(kbuf); return -1; }</span></span>
<span class="line"><span>    free(kbuf);</span></span>
<span class="line"><span>    unsigned char *v = malloc(vL + 1);</span></span>
<span class="line"><span>    if (!v) return -1;</span></span>
<span class="line"><span>    if (fread(v, 1, vL, db-&gt;f) != vL) { free(v); return -1; }</span></span>
<span class="line"><span>    v[vL] = 0; // NUL terminate for convenience</span></span>
<span class="line"><span>    *out = v; *outlen = vL;</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static void kv_close(kv_db *db) {</span></span>
<span class="line"><span>    if (!db) return;</span></span>
<span class="line"><span>    if (db-&gt;f) fclose(db-&gt;f);</span></span>
<span class="line"><span>    free(db-&gt;tab);</span></span>
<span class="line"><span>    free(db-&gt;path);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static void usage(const char *p) {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;Usage: %s &lt;file&gt; get &lt;key&gt;\\n&quot;, p);</span></span>
<span class="line"><span>    fprintf(stderr, &quot;       %s &lt;file&gt; set &lt;key&gt; &lt;value&gt;\\n&quot;, p);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(int argc, char **argv) {</span></span>
<span class="line"><span>    if (argc &lt; 4) { usage(argv[0]); return 1; }</span></span>
<span class="line"><span>    kv_db db;</span></span>
<span class="line"><span>    if (kv_open(&amp;db, argv[1]) != 0) { perror(&quot;open&quot;); return 1; }</span></span>
<span class="line"><span>    const char *cmd = argv[2];</span></span>
<span class="line"><span>    if (strcmp(cmd, &quot;set&quot;) == 0) {</span></span>
<span class="line"><span>        if (argc &lt; 5) { usage(argv[0]); kv_close(&amp;db); return 1; }</span></span>
<span class="line"><span>        const unsigned char *k = (const unsigned char *)argv[3];</span></span>
<span class="line"><span>        const unsigned char *v = (const unsigned char *)argv[4];</span></span>
<span class="line"><span>        if (kv_set(&amp;db, k, (uint32_t)strlen((char*)k), v, (uint32_t)strlen((char*)v)) != 0)</span></span>
<span class="line"><span>            perror(&quot;set&quot;);</span></span>
<span class="line"><span>    } else if (strcmp(cmd, &quot;get&quot;) == 0) {</span></span>
<span class="line"><span>        const unsigned char *k = (const unsigned char *)argv[3];</span></span>
<span class="line"><span>        unsigned char *out = NULL; uint32_t n = 0;</span></span>
<span class="line"><span>        if (kv_get(&amp;db, k, (uint32_t)strlen((char*)k), &amp;out, &amp;n) == 0) {</span></span>
<span class="line"><span>            fwrite(out, 1, n, stdout);</span></span>
<span class="line"><span>            fputc(&#39;\\n&#39;, stdout);</span></span>
<span class="line"><span>            free(out);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            fprintf(stderr, &quot;not found\\n&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        usage(argv[0]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    kv_close(&amp;db);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Build:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 -Wall -Wextra kv.c -o kv</span></span></code></pre></div><p>Run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./kv store.log set color blue</span></span>
<span class="line"><span>./kv store.log get color</span></span>
<span class="line"><span># prints: blue</span></span></code></pre></div><h4 id="step-6-compaction" tabindex="-1">Step 6. Compaction <a class="header-anchor" href="#step-6-compaction" aria-label="Permalink to &quot;Step 6. Compaction&quot;">​</a></h4><p>Because we append forever, the log grows. Implement a simple compact command that rewrites only the latest version of each key to a new file, then swaps files.</p><p>Idea:</p><ol><li>Iterate index</li><li>Read the newest record for each key</li><li>Append it to<code>store.log.new</code></li><li>Replace the old file</li></ol><p>This keeps disk usage under control and speeds up startup scanning.</p><h4 id="step-7-crash-safety-basics" tabindex="-1">Step 7. Crash safety basics <a class="header-anchor" href="#step-7-crash-safety-basics" aria-label="Permalink to &quot;Step 7. Crash safety basics&quot;">​</a></h4><ul><li>Always<code>fflush</code> after appending a record.</li><li>For stronger durability call<code>fsync(fileno(db-&gt;f))</code> on POSIX after<code>fflush</code>.</li><li>Write whole records or none. Length headers first, then key, then value.</li><li>Consider a checksum per record to detect torn writes.</li></ul><h4 id="step-8-cli-improvements" tabindex="-1">Step 8. CLI improvements <a class="header-anchor" href="#step-8-cli-improvements" aria-label="Permalink to &quot;Step 8. CLI improvements&quot;">​</a></h4><p>Add subcommands:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kv &lt;file&gt; set &lt;k&gt; &lt;v&gt;</span></span>
<span class="line"><span>kv &lt;file&gt; get &lt;k&gt;</span></span>
<span class="line"><span>kv &lt;file&gt; compact</span></span>
<span class="line"><span>kv &lt;file&gt; stats</span></span></code></pre></div><p><code>stats</code> can print number of keys, file size, load factor, and index capacity.</p><h4 id="step-9-testing" tabindex="-1">Step 9. Testing <a class="header-anchor" href="#step-9-testing" aria-label="Permalink to &quot;Step 9. Testing&quot;">​</a></h4><p>Insert 10k keys, then get a random 100 keys and verify values.</p><p>Overwrite the same key many times and ensure<code>get</code> returns the latest one.</p><p>Kill the program during writes and ensure the log is still readable.</p><p>Run with AddressSanitizer to catch memory bugs:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>clang -std=c23 -O1 -g -fsanitize=address,undefined kv.c -o kv_asan</span></span></code></pre></div><h4 id="step-10-why-it-matters" tabindex="-1">Step 10. Why it matters <a class="header-anchor" href="#step-10-why-it-matters" aria-label="Permalink to &quot;Step 10. Why it matters&quot;">​</a></h4><p>This tiny store teaches the core database loop:</p><ul><li>Log structured storage for durability</li><li>In memory index for speed</li><li>Compaction for space and locality</li><li>Portable encoding for cross platform reads</li></ul><p>You just built the foundation that many production systems use at larger scale.</p><h4 id="try-it-yourself" tabindex="-1">Try it yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try it yourself&quot;">​</a></h4><ol><li>Add a delete tombstone record type and have<code>get</code> respect it.</li><li>Store expiration timestamps and implement a<code>purge</code> command.</li><li>Use memory mapped I O for reads to speed up lookups.</li><li>Replace the linear probing table with a chained hash or hopscotch hashing.</li><li>Add a simple checksum per record and verify on read.</li></ol><p>Next you will implement 95. Implementing a Custom Allocator where you will learn how<code>malloc</code> like systems manage the heap, and write a tiny arena allocator you can drop into small C projects.</p>`,48)])])}const f=s(t,[["render",l]]);export{h as __pageData,f as default};
