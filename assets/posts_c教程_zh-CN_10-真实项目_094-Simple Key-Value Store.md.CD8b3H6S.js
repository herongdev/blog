import{_ as s,o as a,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"94. 简单的键值存储","description":"The Little Book of C 中文版 — 94. 简单的键值存储","frontmatter":{"title":"94. 简单的键值存储","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 94. 简单的键值存储","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":94,"sidebarWeight":94,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store.md","filePath":"posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store.md"};function t(i,n,c,o,d,r){return a(),p("div",null,[...n[0]||(n[0]=[e(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store)</p><p>在您自己构建数据库之前，数据库看起来很可怕。在本节中，您将编写一个小型仅附加键值存储，它将数据保存到磁盘，在启动时加载内存索引，并支持<code>get</code>和<code>set</code>通过简单的 CLI。</p><p>您将学习文件、序列化、索引和碰撞安全基础知识。</p><h4 id="步骤1-设计文件格式" tabindex="-1">步骤1.设计文件格式 <a class="header-anchor" href="#步骤1-设计文件格式" aria-label="Permalink to &quot;步骤1.设计文件格式&quot;">​</a></h4><p>保持简单和二元化。每条记录仅附加：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[ u32 key_len ][ u32 val_len ][ key bytes ][ value bytes ]</span></span></code></pre></div><ul><li>所有整数都以大端存储，因此文件是可移植的。</li><li>没有就地更新。再次设置相同的键会附加一条新记录。</li></ul><h4 id="步骤-2-字节序助手" tabindex="-1">步骤 2. 字节序助手 <a class="header-anchor" href="#步骤-2-字节序助手" aria-label="Permalink to &quot;步骤 2. 字节序助手&quot;">​</a></h4><p>我们将使用<code>htonl</code>和<code>ntohl</code>编码和解码 32 位长度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;arpa/inet.h&gt;</span><span>   // Windows: winsock2.h</span></span>
<span class="line"><span>static inline uint32_t be32(uint32_t x)  { return htonl(x);  }</span></span>
<span class="line"><span>static inline uint32_t from_be32(uint32_t x) { return ntohl(x); }</span></span></code></pre></div><h4 id="步骤-3-内存索引" tabindex="-1">步骤 3. 内存索引 <a class="header-anchor" href="#步骤-3-内存索引" aria-label="Permalink to &quot;步骤 3. 内存索引&quot;">​</a></h4><p>启动时，扫描一次日志文件并构建最新记录的 key -&gt; 文件偏移量的哈希映射。为了清楚起见，我们将实现一个简单的开放寻址哈希表。</p><p>索引条目：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    uint64_t offset;   // file position of record start</span></span>
<span class="line"><span>    uint32_t key_hash; // cached hash for quick probing</span></span>
<span class="line"><span>    uint32_t key_len;  // used to confirm match</span></span>
<span class="line"><span>} kv_slot;</span></span></code></pre></div><h4 id="步骤-4-散列" tabindex="-1">步骤 4. 散列 <a class="header-anchor" href="#步骤-4-散列" aria-label="Permalink to &quot;步骤 4. 散列&quot;">​</a></h4><p>对字符串使用紧凑的 32 位 FNV-1a 哈希。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>static uint32_t fnv1a(const unsigned char *s, size_t n) {</span></span>
<span class="line"><span>    uint32_t h = 2166136261u;</span></span>
<span class="line"><span>    for (size_t i = 0; i &lt; n; i++) {</span></span>
<span class="line"><span>        h ^= s[i];</span></span>
<span class="line"><span>        h *= 16777619u;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return h;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-5-tiny-code-核心实现" tabindex="-1">步骤 5. Tiny Code：核心实现 <a class="header-anchor" href="#步骤-5-tiny-code-核心实现" aria-label="Permalink to &quot;步骤 5. Tiny Code：核心实现&quot;">​</a></h4><p>单一文件版本让事情变得平易近人。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: kv.c</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>建造：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 -Wall -Wextra kv.c -o kv</span></span></code></pre></div><p>跑步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./kv store.log set color blue</span></span>
<span class="line"><span>./kv store.log get color</span></span>
<span class="line"><span># prints: blue</span></span></code></pre></div><h4 id="步骤-6-压实" tabindex="-1">步骤 6. 压实 <a class="header-anchor" href="#步骤-6-压实" aria-label="Permalink to &quot;步骤 6. 压实&quot;">​</a></h4><p>因为我们永远追加，所以日志会增长。实现一个简单的紧凑命令，仅将每个密钥的最新版本重写到新文件，然后交换文件。</p><p>主意：</p><ol><li>迭代索引 2.读取每个key的最新记录</li><li>将其附加到<code>store.log.new</code> 4.替换旧文件</li></ol><p>这可以控制磁盘使用并加快启动扫描速度。</p><h4 id="步骤-7-碰撞安全基础知识" tabindex="-1">步骤 7. 碰撞安全基础知识 <a class="header-anchor" href="#步骤-7-碰撞安全基础知识" aria-label="Permalink to &quot;步骤 7. 碰撞安全基础知识&quot;">​</a></h4><ul><li>总是<code>fflush</code>添加一条记录后。</li><li>更强的耐用性<code>fsync(fileno(db-&gt;f))</code>在 POSIX 之后<code>fflush</code>.</li><li>写入整个记录或不写入。首先是长度标头，然后是键，然后是值。</li><li>考虑每个记录的校验和来检测撕裂的写入。</li></ul><h4 id="步骤-8-cli-改进" tabindex="-1">步骤 8.CLI 改进 <a class="header-anchor" href="#步骤-8-cli-改进" aria-label="Permalink to &quot;步骤 8.CLI 改进&quot;">​</a></h4><p>添加子命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kv &lt;file&gt; set &lt;k&gt; &lt;v&gt;</span></span>
<span class="line"><span>kv &lt;file&gt; get &lt;k&gt;</span></span>
<span class="line"><span>kv &lt;file&gt; compact</span></span>
<span class="line"><span>kv &lt;file&gt; stats</span></span></code></pre></div><p><code>stats</code>可以打印键数、文件大小、负载因子和索引容量。</p><h4 id="步骤-9-测试" tabindex="-1">步骤 9. 测试 <a class="header-anchor" href="#步骤-9-测试" aria-label="Permalink to &quot;步骤 9. 测试&quot;">​</a></h4><p>插入 10k 个密钥，然后随机获取 100 个密钥并验证值。</p><p>多次覆盖同一个密钥并确保<code>get</code>返回最新的一个。</p><p>在写入期间终止程序并确保日志仍然可读。</p><p>使用 AddressSanitizer 运行以捕获内存错误：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>clang -std=c23 -O1 -g -fsanitize=address,undefined kv.c -o kv_asan</span></span></code></pre></div><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p>这个小商店教授核心数据库循环：</p><ul><li>日志结构化存储以实现持久性</li><li>内存索引以提高速度</li><li>空间和局部性的压缩</li><li>用于跨平台读取的便携式编码</li></ul><p>您刚刚构建了许多生产系统大规模使用的基础。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加删除墓碑记录类型并有<code>get</code>尊重它。 2. 存储过期时间戳并实现<code>purge</code>命令。 3. 使用内存映射I O 进行读取，以加快查找速度。 4. 将线性探测表替换为链式哈希或跳房子哈希。 5. 为每条记录添加一个简单的校验和并在读取时进行验证。</p><p>接下来您将实现 95. 实现自定义分配器，您将在其中了解如何<code>malloc</code>就像系统管理堆一样，编写一个可以放入小型 C 项目的小型竞技场分配器。</p>`,48)])])}const b=s(l,[["render",t]]);export{h as __pageData,b as default};
