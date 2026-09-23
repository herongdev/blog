import{_ as n,o as s,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"40. Practice: Build a Tiny Library System","description":"The Little Book of C — 40. Practice: Build a Tiny Library System","frontmatter":{"title":"40. Practice: Build a Tiny Library System","date":"2026-07-04","categories":"[C 教程]","tags":"[C, Little Book of C, Structuring Data]","description":"The Little Book of C — 40. Practice: Build a Tiny Library System","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":"40","sidebarWeight":"40","lang":"en-US","alternateEn":"/posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System","alternateZh":"/posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System"},"headers":[],"relativePath":"posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System.md","filePath":"posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/04-Structuring Data/040-Practice Build a Tiny Library System.md"};function l(i,a,o,r,c,d){return s(),e("div",null,[...a[0]||(a[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/04-数据结构/040-Practice Build a Tiny Library System)</p><h4 id="follow-along-deliverable" tabindex="-1">Follow-Along Deliverable <a class="header-anchor" href="#follow-along-deliverable" aria-label="Permalink to &quot;Follow-Along Deliverable&quot;">​</a></h4><ul><li>Assumed state: lessons 031-039 are complete and you can rebuild the previous example.</li><li>Working directory: <code>~/c-course-labs/040-library</code>.</li><li>First command: on macOS / Linux run <code>mkdir -p ~/c-course-labs/040-library &amp;&amp; cd ~/c-course-labs/040-library</code>; on Windows PowerShell run <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\040-library&quot;; Set-Location &quot;$HOME\\c-course-labs\\040-library&quot;</code>.</li><li>Success evidence: keep the source file, executable, <code>evidence.md</code>, and record add, search, borrow, or delete output plus a structure design note.</li><li>Boundary for this lab: This lab focuses on structs, lists, and domain operations. Disk persistence returns in lessons 50 and 100.</li><li>Reset: remove the executable, temporary data, and generated output for this lab; keep source and <code>evidence.md</code> for review.</li></ul><p>You’ve now learned every building block, structs, pointers, dynamic memory, linked lists, enums, and even object-style design with function pointers. It’s time to combine them into a real mini-project: a Tiny Library System. This will be a full, runnable C program that manages books, authors, and borrowing records using everything you’ve learned so far.</p><h4 id="goal" tabindex="-1">Goal <a class="header-anchor" href="#goal" aria-label="Permalink to &quot;Goal&quot;">​</a></h4><p>Implement a minimal system that can:</p><ol><li>Store book records dynamically</li><li>Add new books</li><li>Search books by title</li><li>Borrow and return books</li><li>Clean up all memory correctly</li></ol><p>We’ll use:</p><ul><li><code>struct</code> for data models</li><li><code>enum</code> for status tracking</li><li>linked lists for storage</li><li><code>typedef</code> and function pointers for clarity</li></ul><h4 id="data-structures" tabindex="-1">Data Structures <a class="header-anchor" href="#data-structures" aria-label="Permalink to &quot;Data Structures&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>} Library;</span></span></code></pre></div><p>Each book is one node in a linked list. The library owns the head pointer.</p><h4 id="core-functions" tabindex="-1">Core Functions <a class="header-anchor" href="#core-functions" aria-label="Permalink to &quot;Core Functions&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Book* create_book(const char *title, const char *author, int year) {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h4 id="tiny-code-full-program" tabindex="-1">Tiny Code, Full Program <a class="header-anchor" href="#tiny-code-full-program" aria-label="Permalink to &quot;Tiny Code, Full Program&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc library_system.c -o library_system</span></span>
<span class="line"><span>./library_system</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>--- Library Catalog ---</span></span>
<span class="line"><span>Algorithms in C      | Sedgewick       | 1998 | Available</span></span>
<span class="line"><span>Clean Code           | Robert C. Martin | 2008 | Available</span></span>
<span class="line"><span>The C Programming Language | Kernighan &amp; Ritchie | 1988 | Available</span></span>
<span class="line"><span>------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>You borrowed: Clean Code</span></span>
<span class="line"><span>Book already borrowed: Clean Code</span></span>
<span class="line"><span>You returned: Clean Code</span></span>
<span class="line"><span>You borrowed: Algorithms in C</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--- Library Catalog ---</span></span>
<span class="line"><span>Algorithms in C      | Sedgewick       | 1998 | Borrowed</span></span>
<span class="line"><span>Clean Code           | Robert C. Martin | 2008 | Available</span></span>
<span class="line"><span>The C Programming Language | Kernighan &amp; Ritchie | 1988 | Available</span></span>
<span class="line"><span>------------------------</span></span></code></pre></div><h4 id="what-you-just-practiced" tabindex="-1">What You Just Practiced <a class="header-anchor" href="#what-you-just-practiced" aria-label="Permalink to &quot;What You Just Practiced&quot;">​</a></h4><p>You’ve combined everything from this chapter:</p><table tabindex="0"><thead><tr><th>Concept</th><th>How You Used It</th></tr></thead><tbody><tr><td>Structs</td><td>For<code>Book</code> and<code>Library</code> models</td></tr><tr><td>Enums</td><td>For<code>BookStatus</code></td></tr><tr><td>Dynamic memory</td><td><code>malloc</code>,<code>free</code>,<code>strdup</code></td></tr><tr><td>Linked lists</td><td>Dynamic collection of books</td></tr><tr><td>Pointers</td><td>Passing references between functions</td></tr><tr><td>Encapsulation</td><td>Each function hides internal details</td></tr></tbody></table><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>This “tiny library” is a microcosm of systems programming: you’re managing memory, defining abstractions, and building a dynamic system with clear data ownership. From here, you can scale to databases, caches, or in-memory key-value stores, all built on the same principles.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Add<code>id</code> and<code>genre</code> fields to<code>Book</code>.</li><li>Implement<code>remove_book(title)</code> to delete a node safely.</li><li>Add a command interface (read from stdin) for interactive use.</li><li>Save and load the library to a file using<code>fwrite</code> and<code>fread</code>.</li><li>Write a function to count how many books are borrowed vs available.</li></ol><p>You’ve completed Chapter 4: Structuring Data, the heart of understanding how C organizes the world. Next, you’ll move from in-memory structures to input, output, and files, learning how to interact with the outside world through the standard I/O library in Chapter 5.</p>`,28)])])}const h=n(p,[["render",l]]);export{b as __pageData,h as default};
