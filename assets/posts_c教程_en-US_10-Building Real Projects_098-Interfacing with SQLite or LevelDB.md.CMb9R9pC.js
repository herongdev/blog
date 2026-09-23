import{_ as n,o as e,c as a,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"98. Interfacing with SQLite or LevelDB","description":"The Little Book of C — 98. Interfacing with SQLite or LevelDB","frontmatter":{"title":"98. Interfacing with SQLite or LevelDB","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Building Real Projects"],"description":"The Little Book of C — 98. Interfacing with SQLite or LevelDB","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":98,"sidebarWeight":98,"lang":"en-US","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB","alternateZh":"/posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB"},"headers":[],"relativePath":"posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB.md","filePath":"posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB.md"};function p(l,s,o,r,c,d){return e(),a("div",null,[...s[0]||(s[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB)</p><p>Time to connect your C programs to real data. In this section you will talk to two popular embeddable databases:</p><ul><li>SQLite: relational, SQL queries, ACID transactions in a single file</li><li>LevelDB: key value store, ordered by key, fast reads and writes</li></ul><p>You will write tiny programs that insert and query data with both engines.</p><h4 id="step-1-when-to-choose-which" tabindex="-1">Step 1. When to choose which <a class="header-anchor" href="#step-1-when-to-choose-which" aria-label="Permalink to &quot;Step 1. When to choose which&quot;">​</a></h4><ul><li>Choose SQLite when you want tables, indexes, SQL, and transactions</li><li>Choose LevelDB when you want a simple sorted key value store, no SQL, and you control schema in your app</li></ul><p>Both are embeddable and require no separate server process.</p><h4 id="step-2-install-headers-and-libs" tabindex="-1">Step 2. Install headers and libs <a class="header-anchor" href="#step-2-install-headers-and-libs" aria-label="Permalink to &quot;Step 2. Install headers and libs&quot;">​</a></h4><p>On Linux or macOS with Homebrew or apt:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># SQLite</span></span>
<span class="line"><span>sudo apt install libsqlite3-dev        # Debian based</span></span>
<span class="line"><span># or</span></span>
<span class="line"><span>brew install sqlite                    # macOS</span></span>
<span class="line"><span># LevelDB</span></span>
<span class="line"><span>sudo apt install libleveldb-dev        # Debian based</span></span>
<span class="line"><span># or</span></span>
<span class="line"><span>brew install leveldb                   # macOS</span></span></code></pre></div><p>Windows users can grab prebuilt binaries or build from source and link the .lib files.</p><h4 id="step-3-tiny-code-for-sqlite-create-insert-query" tabindex="-1">Step 3. Tiny Code for SQLite: create, insert, query <a class="header-anchor" href="#step-3-tiny-code-for-sqlite-create-insert-query" aria-label="Permalink to &quot;Step 3. Tiny Code for SQLite: create, insert, query&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: sqlite_demo.c</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;sqlite3.h&gt;</span></span>
<span class="line"><span>static int print_row(void *unused, int argc, char **argv, char **col) {</span></span>
<span class="line"><span>    for (int i = 0; i &lt; argc; i++)</span></span>
<span class="line"><span>        printf(&quot;%s = %s\\n&quot;, col[i], argv[i] ? argv[i] : &quot;NULL&quot;);</span></span>
<span class="line"><span>    puts(&quot;---&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    sqlite3 *db = NULL;</span></span>
<span class="line"><span>    if (sqlite3_open(&quot;people.db&quot;, &amp;db) != SQLITE_OK) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;open: %s\\n&quot;, sqlite3_errmsg(db));</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    const char *ddl =</span></span>
<span class="line"><span>        &quot;CREATE TABLE IF NOT EXISTS people (&quot;</span></span>
<span class="line"><span>        &quot; id INTEGER PRIMARY KEY AUTOINCREMENT,&quot;</span></span>
<span class="line"><span>        &quot; name TEXT NOT NULL,&quot;</span></span>
<span class="line"><span>        &quot; age INTEGER NOT NULL&quot;</span></span>
<span class="line"><span>        &quot;);&quot;;</span></span>
<span class="line"><span>    if (sqlite3_exec(db, ddl, NULL, NULL, NULL) != SQLITE_OK) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;ddl: %s\\n&quot;, sqlite3_errmsg(db));</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // Use prepared statements for safety and speed</span></span>
<span class="line"><span>    const char *ins = &quot;INSERT INTO people(name, age) VALUES(?, ?);&quot;;</span></span>
<span class="line"><span>    sqlite3_stmt *stmt = NULL;</span></span>
<span class="line"><span>    if (sqlite3_prepare_v2(db, ins, -1, &amp;stmt, NULL) != SQLITE_OK) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;prepare: %s\\n&quot;, sqlite3_errmsg(db));</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    struct { const char *name; int age; } rows[] = {</span></span>
<span class="line"><span>        {&quot;Ada&quot;, 36}, {&quot;Linus&quot;, 55}, {&quot;Grace&quot;, 61}</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    for (int i = 0; i &lt; 3; i++) {</span></span>
<span class="line"><span>        sqlite3_reset(stmt);</span></span>
<span class="line"><span>        sqlite3_clear_bindings(stmt);</span></span>
<span class="line"><span>        sqlite3_bind_text(stmt, 1, rows[i].name, -1, SQLITE_TRANSIENT);</span></span>
<span class="line"><span>        sqlite3_bind_int(stmt,  2, rows[i].age);</span></span>
<span class="line"><span>        if (sqlite3_step(stmt) != SQLITE_DONE) {</span></span>
<span class="line"><span>            fprintf(stderr, &quot;insert: %s\\n&quot;, sqlite3_errmsg(db));</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    sqlite3_finalize(stmt);</span></span>
<span class="line"><span>    const char *q = &quot;SELECT id, name, age FROM people WHERE age &gt;= ? ORDER BY age DESC;&quot;;</span></span>
<span class="line"><span>    if (sqlite3_prepare_v2(db, q, -1, &amp;stmt, NULL) != SQLITE_OK) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;prepare q: %s\\n&quot;, sqlite3_errmsg(db));</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    sqlite3_bind_int(stmt, 1, 40);</span></span>
<span class="line"><span>    while (sqlite3_step(stmt) == SQLITE_ROW) {</span></span>
<span class="line"><span>        int id = sqlite3_column_int(stmt, 0);</span></span>
<span class="line"><span>        const unsigned char *name = sqlite3_column_text(stmt, 1);</span></span>
<span class="line"><span>        int age = sqlite3_column_int(stmt, 2);</span></span>
<span class="line"><span>        printf(&quot;id=%d name=%s age=%d\\n&quot;, id, name, age);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    sqlite3_finalize(stmt);</span></span>
<span class="line"><span>    sqlite3_close(db);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Build and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 sqlite_demo.c -lsqlite3 -o sqlite_demo</span></span>
<span class="line"><span>./sqlite_demo</span></span></code></pre></div><p>You should see rows printed for people with age 40 or higher.</p><h4 id="step-4-sqlite-best-practices-in-c" tabindex="-1">Step 4. SQLite best practices in C <a class="header-anchor" href="#step-4-sqlite-best-practices-in-c" aria-label="Permalink to &quot;Step 4. SQLite best practices in C&quot;">​</a></h4><ul><li>Always use prepared statements with<code>?</code> placeholders</li><li>Always call<code>sqlite3_finalize</code> on statements</li><li>Wrap batches in<code>BEGIN</code> and<code>COMMIT</code> for speed</li><li>Check every return code and print<code>sqlite3_errmsg(db)</code> on error</li><li>Use<code>sqlite3_last_insert_rowid</code> to fetch new primary keys</li></ul><h4 id="step-5-tiny-code-for-leveldb-open-put-get-iterate" tabindex="-1">Step 5. Tiny Code for LevelDB: open, put, get, iterate <a class="header-anchor" href="#step-5-tiny-code-for-leveldb-open-put-get-iterate" aria-label="Permalink to &quot;Step 5. Tiny Code for LevelDB: open, put, get, iterate&quot;">​</a></h4><p>LevelDB has a C API that mirrors the C++ API.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: leveldb_demo.c</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;leveldb/c.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char *err = NULL;</span></span>
<span class="line"><span>    leveldb_options_t *opts = leveldb_options_create();</span></span>
<span class="line"><span>    leveldb_options_set_create_if_missing(opts, 1);</span></span>
<span class="line"><span>    leveldb_t *db = leveldb_open(opts, &quot;kvdb&quot;, &amp;err);</span></span>
<span class="line"><span>    if (err) { fprintf(stderr, &quot;open: %s\\n&quot;, err); leveldb_free(err); return 1; }</span></span>
<span class="line"><span>    leveldb_writeoptions_t *wopt = leveldb_writeoptions_create();</span></span>
<span class="line"><span>    leveldb_readoptions_t  *ropt = leveldb_readoptions_create();</span></span>
<span class="line"><span>    // Put some keys</span></span>
<span class="line"><span>    leveldb_put(db, wopt, &quot;name&quot;, 4, &quot;Ada&quot;, 3, &amp;err);</span></span>
<span class="line"><span>    if (err) { fprintf(stderr, &quot;put: %s\\n&quot;, err); leveldb_free(err); err = NULL; }</span></span>
<span class="line"><span>    leveldb_put(db, wopt, &quot;lang&quot;, 4, &quot;C&quot;, 1, &amp;err);</span></span>
<span class="line"><span>    leveldb_put(db, wopt, &quot;year&quot;, 4, &quot;1972&quot;, 4, &amp;err);</span></span>
<span class="line"><span>    // Get a value</span></span>
<span class="line"><span>    size_t vlen = 0;</span></span>
<span class="line"><span>    char *val = leveldb_get(db, ropt, &quot;name&quot;, 4, &amp;vlen, &amp;err);</span></span>
<span class="line"><span>    if (err) { fprintf(stderr, &quot;get: %s\\n&quot;, err); leveldb_free(err); err = NULL; }</span></span>
<span class="line"><span>    if (val) { printf(&quot;name=%.*s\\n&quot;, (int)vlen, val); leveldb_free(val); }</span></span>
<span class="line"><span>    // Iterate in key order</span></span>
<span class="line"><span>    leveldb_iterator_t *it = leveldb_create_iterator(db, ropt);</span></span>
<span class="line"><span>    leveldb_iter_seek_to_first(it);</span></span>
<span class="line"><span>    while (leveldb_iter_valid(it)) {</span></span>
<span class="line"><span>        size_t klen, vlen2;</span></span>
<span class="line"><span>        const char *k = leveldb_iter_key(it, &amp;klen);</span></span>
<span class="line"><span>        const char *v = leveldb_iter_value(it, &amp;vlen2);</span></span>
<span class="line"><span>        printf(&quot;%.*s=%.*s\\n&quot;, (int)klen, k, (int)vlen2, v);</span></span>
<span class="line"><span>        leveldb_iter_next(it);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if ((err = (char*)leveldb_iter_get_error(it)) &amp;&amp; *err) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;iter: %s\\n&quot;, err);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    leveldb_iter_destroy(it);</span></span>
<span class="line"><span>    // Clean up</span></span>
<span class="line"><span>    leveldb_readoptions_destroy(ropt);</span></span>
<span class="line"><span>    leveldb_writeoptions_destroy(wopt);</span></span>
<span class="line"><span>    leveldb_close(db);</span></span>
<span class="line"><span>    leveldb_options_destroy(opts);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Build and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 leveldb_demo.c -lleveldb -o leveldb_demo</span></span>
<span class="line"><span>./leveldb_demo</span></span></code></pre></div><p>You should see key value pairs in sorted key order.</p><h4 id="step-6-transactions-and-durability" tabindex="-1">Step 6. Transactions and durability <a class="header-anchor" href="#step-6-transactions-and-durability" aria-label="Permalink to &quot;Step 6. Transactions and durability&quot;">​</a></h4><p>SQLite has full transactions</p><ul><li>Use<code>BEGIN IMMEDIATE;</code> then your inserts then<code>COMMIT;</code></li><li>For crash safety use the default rollback journal or WAL mode</li></ul><p>LevelDB has atomic writes per key and write batches</p><ul><li>Use<code>leveldb_writebatch_t</code> to group puts and deletes atomically</li><li>Sync to disk with<code>leveldb_writeoptions_set_sync(wopt, 1)</code></li></ul><h4 id="step-7-parameter-binding-and-type-safety-with-sqlite" tabindex="-1">Step 7. Parameter binding and type safety with SQLite <a class="header-anchor" href="#step-7-parameter-binding-and-type-safety-with-sqlite" aria-label="Permalink to &quot;Step 7. Parameter binding and type safety with SQLite&quot;">​</a></h4><p>Use the correct bind and column functions:</p><ul><li><code>sqlite3_bind_int</code>,<code>sqlite3_bind_int64</code>,<code>sqlite3_bind_double</code>,<code>sqlite3_bind_text</code></li><li><code>sqlite3_column_int</code>,<code>sqlite3_column_int64</code>,<code>sqlite3_column_double</code>,<code>sqlite3_column_text</code></li></ul><p>Never build SQL by string concatenation with user input. Bindings prevent SQL injection and handle escaping for you.</p><h4 id="step-8-working-with-binary-data" tabindex="-1">Step 8. Working with binary data <a class="header-anchor" href="#step-8-working-with-binary-data" aria-label="Permalink to &quot;Step 8. Working with binary data&quot;">​</a></h4><ul><li>SQLite: use<code>sqlite3_bind_blob</code> and<code>sqlite3_column_blob</code> with a separate length</li><li>LevelDB: keys and values are raw byte spans<code>(ptr, length)</code>, so binary is natural</li></ul><p>You can store serialized structs, protobufs, or JSON. Remember to define your own versioning for compatibility.</p><h4 id="step-9-schema-and-indexing-ideas" tabindex="-1">Step 9. Schema and indexing ideas <a class="header-anchor" href="#step-9-schema-and-indexing-ideas" aria-label="Permalink to &quot;Step 9. Schema and indexing ideas&quot;">​</a></h4><p>SQLite</p><ul><li>Normalize into tables with primary keys and foreign keys</li><li>Create indexes for frequent lookups</li><li>Use<code>PRAGMA foreign_keys = ON;</code> to enforce constraints</li></ul><p>LevelDB</p><ul><li>Design composite keys to encode access patterns</li><li>Example:<code>user: </code> for user row,<code>user_email: </code> points to<code></code></li><li>Range scans are easy: store keys like<code>post:: </code> and iterate by prefix</li></ul><h4 id="step-10-why-this-matters" tabindex="-1">Step 10. Why this matters <a class="header-anchor" href="#step-10-why-this-matters" aria-label="Permalink to &quot;Step 10. Why this matters&quot;">​</a></h4><p>Embedding a database takes your C program from toy to tool. You now know how to:</p><ul><li>Execute SQL queries and prepared statements with SQLite</li><li>Use a sorted key value engine with LevelDB</li><li>Choose the right storage model for each problem</li><li>Handle durability, binary data, and iteration from C</li></ul><h4 id="try-it-yourself" tabindex="-1">Try it yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try it yourself&quot;">​</a></h4><ol><li>Extend the SQLite demo with a<code>BEGIN</code> and<code>COMMIT</code> around a loop of 10000 inserts and measure time.</li><li>Add an index on<code>age</code> and compare query performance.</li><li>In the LevelDB demo add a write batch that inserts 1000 sequential keys.</li><li>Store binary blobs in both systems and read them back.</li><li>Build a tiny CLI that routes<code>sql ...</code> lines to SQLite and<code>kv ...</code> lines to LevelDB.</li></ol><p>Next up is 99. Packaging, Versioning, and Documentation where you will learn how to ship your code like a pro with Makefiles, pkg config, semantic versioning, and clean README docs.</p>`,47)])])}const b=n(i,[["render",p]]);export{h as __pageData,b as default};
