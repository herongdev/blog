import{_ as s,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"40. 实践：构建小型图书馆系统","description":"The Little Book of C 中文版 — 40. 实践：构建小型图书馆系统","frontmatter":{"title":"40. 实践：构建小型图书馆系统","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","04-数据结构","中文"],"description":"The Little Book of C 中文版 — 40. 实践：构建小型图书馆系统","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":"40","sidebarWeight":"40","alternateZh":"/posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System","alternateEn":"/posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System"},"headers":[],"relativePath":"posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System.md","filePath":"posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System.md"};function l(i,a,o,c,r,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<p>[English version](/posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System)</p><h4 id="跟练交付物" tabindex="-1">跟练交付物 <a class="header-anchor" href="#跟练交付物" aria-label="Permalink to &quot;跟练交付物&quot;">​</a></h4><ul><li>已具备状态：完成第 031-039 课，能重新编译上一章示例。</li><li>工作目录：<code>~/c-course-labs/040-library</code>。</li><li>第一条命令：macOS / Linux 运行 <code>mkdir -p ~/c-course-labs/040-library &amp;&amp; cd ~/c-course-labs/040-library</code>；Windows PowerShell 运行 <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\040-library&quot;; Set-Location &quot;$HOME\\c-course-labs\\040-library&quot;</code>。</li><li>成功证据：保留源码、可执行文件、<code>evidence.md</code>，并记录新增、查询、借阅或删除操作的终端输出，以及结构设计说明。</li><li>本章边界：本章关注结构体、链表和业务操作；暂不要求把数据持久化到磁盘，文件存储会在第 50 课和第 100 课继续练。</li><li>重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 <code>evidence.md</code> 方便复盘。</li></ul><p>现在，您已经学习了每个构建块、结构、指针、动态内存、链表、枚举，甚至带有函数指针的对象样式设计。是时候将它们组合成一个真正的迷你项目：小型图书馆系统。这将是一个完整的、可运行的 C 程序，可以使用您迄今为止学到的所有内容来管理书籍、作者和借阅记录。</p><h4 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-label="Permalink to &quot;目标&quot;">​</a></h4><p>实施一个最小系统，可以：</p><p>1.动态存储图书记录 2.添加新书 3.按书名搜索书籍 4.借还书 5.正确清理所有内存</p><p>我们将使用：</p><p>-<code>struct</code>对于数据模型 -<code>enum</code>用于状态跟踪</p><ul><li>用于存储的链表 -<code>typedef</code>和函数指针以便清晰起见</li></ul><h4 id="数据结构" tabindex="-1">数据结构 <a class="header-anchor" href="#数据结构" aria-label="Permalink to &quot;数据结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef enum {</span></span>
<span class="line"><span>    AVAILABLE,</span></span>
<span class="line"><span>    BORROWED</span></span>
<span class="line"><span>} BookStatus;</span></span>
<span class="line"><span>typedef struct Book {</span></span>
<span class="line"><span>    char *title;</span></span>
<span class="line"><span>    char *author;</span></span>
<span class="line"><span>    int year;</span></span>
<span class="line"><span>    BookStatus status;</span></span>
<span class="line"><span>    struct Book *next;</span></span>
<span class="line"><span>} Book;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    Book *head;</span></span>
<span class="line"><span>} Library;</span></span></code></pre></div><p>每本书都是链表中的一个节点。库拥有头指针。</p><h4 id="核心功能" tabindex="-1">核心功能 <a class="header-anchor" href="#核心功能" aria-label="Permalink to &quot;核心功能&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Book* create_book(const char *title, const char *author, int year) {</span></span>
<span class="line"><span>    Book *b = malloc(sizeof(Book));</span></span>
<span class="line"><span>    b-&gt;title = strdup(title);</span></span>
<span class="line"><span>    b-&gt;author = strdup(author);</span></span>
<span class="line"><span>    b-&gt;year = year;</span></span>
<span class="line"><span>    b-&gt;status = AVAILABLE;</span></span>
<span class="line"><span>    b-&gt;next = NULL;</span></span>
<span class="line"><span>    return b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void add_book(Library *lib, Book *b) {</span></span>
<span class="line"><span>    b-&gt;next = lib-&gt;head;</span></span>
<span class="line"><span>    lib-&gt;head = b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>Book* find_book(Library *lib, const char *title) {</span></span>
<span class="line"><span>    for (Book *cur = lib-&gt;head; cur != NULL; cur = cur-&gt;next)</span></span>
<span class="line"><span>        if (strcmp(cur-&gt;title, title) == 0)</span></span>
<span class="line"><span>            return cur;</span></span>
<span class="line"><span>    return NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void borrow_book(Library *lib, const char *title) {</span></span>
<span class="line"><span>    Book *b = find_book(lib, title);</span></span>
<span class="line"><span>    if (!b) {</span></span>
<span class="line"><span>        printf(&quot;Book not found: %s\\n&quot;, title);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (b-&gt;status == BORROWED)</span></span>
<span class="line"><span>        printf(&quot;Book already borrowed: %s\\n&quot;, b-&gt;title);</span></span>
<span class="line"><span>    else {</span></span>
<span class="line"><span>        b-&gt;status = BORROWED;</span></span>
<span class="line"><span>        printf(&quot;You borrowed: %s\\n&quot;, b-&gt;title);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void return_book(Library *lib, const char *title) {</span></span>
<span class="line"><span>    Book *b = find_book(lib, title);</span></span>
<span class="line"><span>    if (!b) {</span></span>
<span class="line"><span>        printf(&quot;Book not found: %s\\n&quot;, title);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (b-&gt;status == AVAILABLE)</span></span>
<span class="line"><span>        printf(&quot;Book already returned: %s\\n&quot;, b-&gt;title);</span></span>
<span class="line"><span>    else {</span></span>
<span class="line"><span>        b-&gt;status = AVAILABLE;</span></span>
<span class="line"><span>        printf(&quot;You returned: %s\\n&quot;, b-&gt;title);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void list_books(const Library *lib) {</span></span>
<span class="line"><span>    printf(&quot;\\n--- Library Catalog ---\\n&quot;);</span></span>
<span class="line"><span>    for (const Book *b = lib-&gt;head; b != NULL; b = b-&gt;next)</span></span>
<span class="line"><span>        printf(&quot;%-20s | %-15s | %d | %s\\n&quot;,</span></span>
<span class="line"><span>               b-&gt;title, b-&gt;author, b-&gt;year,</span></span>
<span class="line"><span>               b-&gt;status == AVAILABLE ? &quot;Available&quot; : &quot;Borrowed&quot;);</span></span>
<span class="line"><span>    printf(&quot;------------------------\\n\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void free_library(Library *lib) {</span></span>
<span class="line"><span>    Book *cur = lib-&gt;head;</span></span>
<span class="line"><span>    while (cur) {</span></span>
<span class="line"><span>        Book *next = cur-&gt;next;</span></span>
<span class="line"><span>        free(cur-&gt;title);</span></span>
<span class="line"><span>        free(cur-&gt;author);</span></span>
<span class="line"><span>        free(cur);</span></span>
<span class="line"><span>        cur = next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    lib-&gt;head = NULL;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="小代码-完整程序" tabindex="-1">小代码，完整程序 <a class="header-anchor" href="#小代码-完整程序" aria-label="Permalink to &quot;小代码，完整程序&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    Library lib = {NULL};</span></span>
<span class="line"><span>    add_book(&amp;lib, create_book(&quot;The C Programming Language&quot;, &quot;Kernighan &amp; Ritchie&quot;, 1988));</span></span>
<span class="line"><span>    add_book(&amp;lib, create_book(&quot;Clean Code&quot;, &quot;Robert C. Martin&quot;, 2008));</span></span>
<span class="line"><span>    add_book(&amp;lib, create_book(&quot;Algorithms in C&quot;, &quot;Sedgewick&quot;, 1998));</span></span>
<span class="line"><span>    list_books(&amp;lib);</span></span>
<span class="line"><span>    borrow_book(&amp;lib, &quot;Clean Code&quot;);</span></span>
<span class="line"><span>    borrow_book(&amp;lib, &quot;Clean Code&quot;);  // test duplicate borrow</span></span>
<span class="line"><span>    return_book(&amp;lib, &quot;Clean Code&quot;);</span></span>
<span class="line"><span>    borrow_book(&amp;lib, &quot;Algorithms in C&quot;);</span></span>
<span class="line"><span>    list_books(&amp;lib);</span></span>
<span class="line"><span>    free_library(&amp;lib);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc library_system.c -o library_system</span></span>
<span class="line"><span>./library_system</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>--- 图书馆目录 ---</span></span>
<span class="line"><span>C 语言的算法 |塞奇威克 | 1998 |可用的</span></span>
<span class="line"><span>干净的代码 |罗伯特·C·马丁 | 罗伯特·C·马丁2008 |可用的</span></span>
<span class="line"><span>C 编程语言 |克尼根和里奇 | 1988 |可用的</span></span>
<span class="line"><span>------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>您借用了：干净的代码</span></span>
<span class="line"><span>已借书：《干净的代码》</span></span>
<span class="line"><span>您返回了：干净的代码</span></span>
<span class="line"><span>您借用了：C 语言算法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--- 图书馆目录 ---</span></span>
<span class="line"><span>C 语言的算法 |塞奇威克 | 1998 |借来的</span></span>
<span class="line"><span>干净的代码 |罗伯特·C·马丁 | 罗伯特·C·马丁2008 |可用的</span></span>
<span class="line"><span>C 编程语言 |克尼根和里奇 | 1988 |可用的</span></span>
<span class="line"><span>------------------------</span></span></code></pre></div><h4 id="你刚刚练习了什么" tabindex="-1">你刚刚练习了什么 <a class="header-anchor" href="#你刚刚练习了什么" aria-label="Permalink to &quot;你刚刚练习了什么&quot;">​</a></h4><p>您已经合并了本章中的所有内容：</p><table tabindex="0"><thead><tr><th>概念</th><th>您如何使用它</th></tr></thead><tbody><tr><td>结构</td><td>为了<code>Book</code>和<code>Library</code>型号</td></tr><tr><td>枚举</td><td>为了<code>BookStatus</code></td></tr><tr><td>动态内存</td><td><code>malloc</code>,<code>free</code>,<code>strdup</code></td></tr><tr><td>链接列表</td><td>动态藏书</td></tr><tr><td>指针</td><td>在函数之间传递引用</td></tr><tr><td>封装</td><td>每个功能都隐藏了内部细节</td></tr></tbody></table><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>这个“微型库”是系统编程的缩影：您正在管理内存、定义抽象并构建具有明确数据所有权的动态系统。从这里，您可以扩展到数据库、缓存或内存中键值存储，所有这些都基于相同的原理构建。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加<code>id</code>和<code>genre</code>字段到<code>Book</code>. 2. 实施<code>remove_book(title)</code>安全删除节点。 3.添加命令接口（从stdin读取）以供交互使用。 4. 使用以下命令保存库并将其加载到文件中<code>fwrite</code>和<code>fread</code>. 5. 编写一个函数来计算已借书和可用书的数量。</p><p>您已经完成了第 4 章：构建数据，这是理解 C 如何组织世界的核心。接下来，您将从内存结构转向输入、输出和文件，学习如何通过第 5 章中的标准 I/O 库与外界交互。</p>`,29)])])}const h=s(t,[["render",l]]);export{b as __pageData,h as default};
