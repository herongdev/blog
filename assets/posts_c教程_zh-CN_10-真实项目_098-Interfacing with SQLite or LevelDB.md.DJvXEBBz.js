import{_ as n,o as a,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const _=JSON.parse('{"title":"98. 与 SQLite 或 LevelDB 接口","description":"The Little Book of C 中文版 — 98. 与 SQLite 或 LevelDB 接口","frontmatter":{"title":"98. 与 SQLite 或 LevelDB 接口","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 98. 与 SQLite 或 LevelDB 接口","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":98,"sidebarWeight":98,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB.md","filePath":"posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB.md"};function t(i,s,o,c,r,d){return a(),e("div",null,[...s[0]||(s[0]=[p(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB)</p><p>是时候将 C 程序连接到实际数据了。在本节中，您将讨论两种流行的嵌入式数据库：</p><ul><li>SQLite：单个文件中的关系、SQL 查询、ACID 事务</li><li>LevelDB：键值存储，按键排序，快速读写</li></ul><p>您将编写使用两个引擎插入和查询数据的小程序。</p><h4 id="步骤-1-何时选择" tabindex="-1">步骤 1. 何时选择 <a class="header-anchor" href="#步骤-1-何时选择" aria-label="Permalink to &quot;步骤 1. 何时选择&quot;">​</a></h4><ul><li>当您需要表、索引、SQL 和事务时选择 SQLite</li><li>当您想要一个简单的排序键值存储，没有 SQL，并且您可以控制应用程序中的架构时，请选择 LevelDB</li></ul><p>两者都是可嵌入的并且不需要单独的服务器进程。</p><h4 id="步骤-2-安装标头和库" tabindex="-1">步骤 2. 安装标头和库 <a class="header-anchor" href="#步骤-2-安装标头和库" aria-label="Permalink to &quot;步骤 2. 安装标头和库&quot;">​</a></h4><p>在使用 Homebrew 或 apt 的 Linux 或 macOS 上：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># SQLite</span></span>
<span class="line"><span>sudo apt install libsqlite3-dev        # Debian based</span></span>
<span class="line"><span># or</span></span>
<span class="line"><span>brew install sqlite                    # macOS</span></span>
<span class="line"><span># LevelDB</span></span>
<span class="line"><span>sudo apt install libleveldb-dev        # Debian based</span></span>
<span class="line"><span># or</span></span>
<span class="line"><span>brew install leveldb                   # macOS</span></span></code></pre></div><p>Windows 用户可以获取预构建的二进制文件或从源代码构建并链接 .lib 文件。</p><h4 id="步骤-3-sqlite-的小代码-创建、插入、查询" tabindex="-1">步骤 3. SQLite 的小代码：创建、插入、查询 <a class="header-anchor" href="#步骤-3-sqlite-的小代码-创建、插入、查询" aria-label="Permalink to &quot;步骤 3. SQLite 的小代码：创建、插入、查询&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: sqlite_demo.c</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>构建并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 sqlite_demo.c -lsqlite3 -o sqlite_demo</span></span>
<span class="line"><span>./sqlite_demo</span></span></code></pre></div><p>您应该会看到为 40 岁或以上的人打印的行。</p><h4 id="步骤-4-c-语言中的-sqlite-最佳实践" tabindex="-1">步骤 4. C 语言中的 SQLite 最佳实践 <a class="header-anchor" href="#步骤-4-c-语言中的-sqlite-最佳实践" aria-label="Permalink to &quot;步骤 4. C 语言中的 SQLite 最佳实践&quot;">​</a></h4><ul><li>始终使用准备好的语句<code>?</code>占位符</li><li>随时打电话<code>sqlite3_finalize</code>关于声明</li><li>包裹批次<code>BEGIN</code>和<code>COMMIT</code>为了速度</li><li>检查每个返回码并打印<code>sqlite3_errmsg(db)</code>出错时</li><li>使用<code>sqlite3_last_insert_rowid</code>获取新的主键</li></ul><h4 id="步骤-5-leveldb-的小代码-打开、放置、获取、迭代" tabindex="-1">步骤 5. LevelDB 的小代码：打开、放置、获取、迭代 <a class="header-anchor" href="#步骤-5-leveldb-的小代码-打开、放置、获取、迭代" aria-label="Permalink to &quot;步骤 5. LevelDB 的小代码：打开、放置、获取、迭代&quot;">​</a></h4><p>LevelDB 有一个反映 C++ API 的 C API。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// file: leveldb_demo.c</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>构建并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc -std=c23 -O2 leveldb_demo.c -lleveldb -o leveldb_demo</span></span>
<span class="line"><span>./leveldb_demo</span></span></code></pre></div><p>您应该会看到按排序键顺序排列的键值对。</p><h4 id="步骤-6-交易和持久性" tabindex="-1">步骤 6. 交易和持久性 <a class="header-anchor" href="#步骤-6-交易和持久性" aria-label="Permalink to &quot;步骤 6. 交易和持久性&quot;">​</a></h4><p>SQLite有完整的事务</p><ul><li>使用<code>BEGIN IMMEDIATE;</code>然后你的插入<code>COMMIT;</code></li><li>为了确保崩溃安全，请使用默认的回滚日志或 WAL 模式</li></ul><p>LevelDB 具有每个键的原子写入和批量写入</p><ul><li>使用<code>leveldb_writebatch_t</code>以原子方式对放置和删除进行分组</li><li>同步到磁盘<code>leveldb_writeoptions_set_sync(wopt, 1)</code></li></ul><h4 id="步骤-7-sqlite-的参数绑定和类型安全" tabindex="-1">步骤 7. SQLite 的参数绑定和类型安全 <a class="header-anchor" href="#步骤-7-sqlite-的参数绑定和类型安全" aria-label="Permalink to &quot;步骤 7. SQLite 的参数绑定和类型安全&quot;">​</a></h4><p>使用正确的绑定和列函数：</p><p>-<code>sqlite3_bind_int</code>,<code>sqlite3_bind_int64</code>,<code>sqlite3_bind_double</code>,<code>sqlite3_bind_text</code> -<code>sqlite3_column_int</code>,<code>sqlite3_column_int64</code>,<code>sqlite3_column_double</code>,<code>sqlite3_column_text</code></p><p>切勿通过字符串连接与用户输入来构建 SQL。绑定可以防止 SQL 注入并为您处理转义。</p><h4 id="步骤-8-使用二进制数据" tabindex="-1">步骤 8. 使用二进制数据 <a class="header-anchor" href="#步骤-8-使用二进制数据" aria-label="Permalink to &quot;步骤 8. 使用二进制数据&quot;">​</a></h4><ul><li>SQLite：使用<code>sqlite3_bind_blob</code>和<code>sqlite3_column_blob</code>有单独的长度</li><li>LevelDB：键和值是原始字节跨度<code>(ptr, length)</code>，所以二进制是自然的</li></ul><p>您可以存储序列化结构、protobuf 或 JSON。请记住定义您自己的版本以实现兼容性。</p><h4 id="步骤-9-架构和索引想法" tabindex="-1">步骤 9. 架构和索引想法 <a class="header-anchor" href="#步骤-9-架构和索引想法" aria-label="Permalink to &quot;步骤 9. 架构和索引想法&quot;">​</a></h4><p>SQLite</p><ul><li>规范化为具有主键和外键的表</li><li>为频繁查找创建索引</li><li>使用<code>PRAGMA foreign_keys = ON;</code>强制执行约束</li></ul><p>水平数据库</p><ul><li>设计复合键来编码访问模式</li><li>例子：<code>user: </code>对于用户行，<code>user_email: </code>指向<code></code></li><li>范围扫描很简单：存储密钥，例如<code>post:: </code>并按前缀迭代</li></ul><h4 id="第-10-步-为什么这很重要" tabindex="-1">第 10 步：为什么这很重要 <a class="header-anchor" href="#第-10-步-为什么这很重要" aria-label="Permalink to &quot;第 10 步：为什么这很重要&quot;">​</a></h4><p>嵌入数据库使您的 C 程序从玩具变成了工具。您现在知道如何：</p><ul><li>使用 SQLite 执行 SQL 查询和准备好的语句</li><li>将排序键值引擎与 LevelDB 结合使用</li><li>为每个问题选择正确的存储模型</li><li>处理持久性、二进制数据和 C 迭代</li></ul><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>使用以下命令扩展 SQLite 演示<code>BEGIN</code>和<code>COMMIT</code>大约 10000 次插入的循环并测量时间。 2.添加索引<code>age</code>并比较查询性能。</li><li>在 LevelDB 演示中添加一个插入 1000 个顺序键的写入批处理。</li><li>在两个系统中存储二进制 blob 并将其读回。</li><li>构建一个用于路由的小型 CLI<code>sql ...</code>到 SQLite 的行和<code>kv ...</code>到 LevelDB 的线路。</li></ol><p>接下来是 99. 打包、版本控制和文档，您将学习如何像专业人士一样使用 Makefile、pkg 配置、语义版本控制和干净的 README 文档来发布代码。</p>`,47)])])}const b=n(l,[["render",t]]);export{_ as __pageData,b as default};
