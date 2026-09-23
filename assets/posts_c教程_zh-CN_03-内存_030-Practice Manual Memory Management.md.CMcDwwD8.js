import{_ as n,o as s,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"30. 练习：手动内存管理","description":"The Little Book of C 中文版 — 30. 练习：手动内存管理","frontmatter":{"title":"30. 练习：手动内存管理","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","03-内存","中文"],"description":"The Little Book of C 中文版 — 30. 练习：手动内存管理","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":"30","sidebarWeight":"30","alternateZh":"/posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management","alternateEn":"/posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management"},"headers":[],"relativePath":"posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management.md","filePath":"posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management.md"};function t(i,a,o,c,d,r){return s(),e("div",null,[...a[0]||(a[0]=[p(`<p>[English version](/posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management)</p><h4 id="跟练交付物" tabindex="-1">跟练交付物 <a class="header-anchor" href="#跟练交付物" aria-label="Permalink to &quot;跟练交付物&quot;">​</a></h4><ul><li>已具备状态：完成第 021-029 课，能重新编译上一章示例。</li><li>工作目录：<code>~/c-course-labs/030-memory</code>。</li><li>第一条命令：macOS / Linux 运行 <code>mkdir -p ~/c-course-labs/030-memory &amp;&amp; cd ~/c-course-labs/030-memory</code>；Windows PowerShell 运行 <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\030-memory&quot;; Set-Location &quot;$HOME\\c-course-labs\\030-memory&quot;</code>。</li><li>成功证据：保留源码、可执行文件、<code>evidence.md</code>，并记录程序输出、一次释放路径说明，以及 Valgrind 或 AddressSanitizer 记录。</li><li>本章边界：本章练习所有权和释放路径；暂不要求实现通用分配器，自定义分配器会在第 95 课再做。</li><li>重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 <code>evidence.md</code> 方便复盘。</li></ul><p>现在您已经了解了内存的工作原理、堆栈与堆、分配、释放、泄漏、深拷贝与浅拷贝，是时候练习手动控制内存了。这个练习联系在一起<code>malloc</code>,<code>free</code>真实的、可运行的程序中的指针和结构管理。</p><p>您将构建一个存储和操作动态分配记录的小型系统，这是对数据库或对象系统如何管理 C 内存的小型模拟。</p><h4 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-label="Permalink to &quot;目标&quot;">​</a></h4><p>创建一个简单的“学生记录管理器”，可以：</p><ul><li>为每个学生的姓名动态分配内存。</li><li>存储和打印学生数据。</li><li>最后干净地释放所有分配的内存。</li></ul><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    char *name;</span></span>
<span class="line"><span>    int age;</span></span>
<span class="line"><span>    float gpa;</span></span>
<span class="line"><span>} Student;</span></span>
<span class="line"><span>Student *create_student(const char *name, int age, float gpa) {</span></span>
<span class="line"><span>    Student *s = malloc(sizeof(Student));</span></span>
<span class="line"><span>    if (!s) {</span></span>
<span class="line"><span>        printf(&quot;Memory allocation failed for Student.\\n&quot;);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    s-&gt;name = malloc(strlen(name) + 1);</span></span>
<span class="line"><span>    if (!s-&gt;name) {</span></span>
<span class="line"><span>        printf(&quot;Memory allocation failed for name.\\n&quot;);</span></span>
<span class="line"><span>        free(s);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    strcpy(s-&gt;name, name);</span></span>
<span class="line"><span>    s-&gt;age = age;</span></span>
<span class="line"><span>    s-&gt;gpa = gpa;</span></span>
<span class="line"><span>    return s;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void print_student(const Student *s) {</span></span>
<span class="line"><span>    printf(&quot;Name: %-10s | Age: %d | GPA: %.2f\\n&quot;, s-&gt;name, s-&gt;age, s-&gt;gpa);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void free_student(Student *s) {</span></span>
<span class="line"><span>    free(s-&gt;name);</span></span>
<span class="line"><span>    free(s);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;=== Manual Memory Management Demo ===\\n&quot;);</span></span>
<span class="line"><span>    // Create three students dynamically</span></span>
<span class="line"><span>    Student *a = create_student(&quot;Alice&quot;, 20, 3.8f);</span></span>
<span class="line"><span>    Student *b = create_student(&quot;Bob&quot;, 22, 3.4f);</span></span>
<span class="line"><span>    Student *c = create_student(&quot;Carol&quot;, 19, 3.9f);</span></span>
<span class="line"><span>    // Print their details</span></span>
<span class="line"><span>    print_student(a);</span></span>
<span class="line"><span>    print_student(b);</span></span>
<span class="line"><span>    print_student(c);</span></span>
<span class="line"><span>    // Modify dynamically allocated memory</span></span>
<span class="line"><span>    char new_name[] = &quot;Bobby&quot;;</span></span>
<span class="line"><span>    b-&gt;name = realloc(b-&gt;name, strlen(new_name) + 1);</span></span>
<span class="line"><span>    strcpy(b-&gt;name, new_name);</span></span>
<span class="line"><span>    b-&gt;gpa = 3.6f;</span></span>
<span class="line"><span>    printf(&quot;\\nAfter update:\\n&quot;);</span></span>
<span class="line"><span>    print_student(b);</span></span>
<span class="line"><span>    // Free memory</span></span>
<span class="line"><span>    free_student(a);</span></span>
<span class="line"><span>    free_student(b);</span></span>
<span class="line"><span>    free_student(c);</span></span>
<span class="line"><span>    printf(&quot;\\nAll memory released.\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc manual_memory.c -o manual_memory</span></span>
<span class="line"><span>./manual_memory</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>=== 手动内存管理演示 ===</span></span>
<span class="line"><span>姓名： 爱丽丝 |年龄：20 |平均绩点：3.80</span></span>
<span class="line"><span>姓名： 鲍勃 |年龄：22 |平均绩点：3.40</span></span>
<span class="line"><span>姓名：卡罗尔 |年龄：19 |平均绩点：3.90</span></span>
<span class="line"><span></span></span>
<span class="line"><span>更新后：</span></span>
<span class="line"><span>姓名： 鲍比 |年龄：22 |平均绩点：3.60</span></span>
<span class="line"><span></span></span>
<span class="line"><span>所有内存都释放了。</span></span></code></pre></div><h4 id="它是如何运作的" tabindex="-1">它是如何运作的 <a class="header-anchor" href="#它是如何运作的" aria-label="Permalink to &quot;它是如何运作的&quot;">​</a></h4><p>动态分配：每个<code>Student</code>和它的<code>name</code>字段是在堆上创建的<code>malloc()</code>。您可以准确控制它们何时存在以及何时销毁它们。</p><p>所有权：</p><ul><li>该程序拥有每个学生的记忆。</li><li>每个<code>create_student()</code>调用稍后必须匹配<code>free_student()</code>.</li></ul><p>内存安全：</p><ul><li>每一个<code>malloc</code>检查结果。</li><li>释放的内存在退出前正确释放。</li></ul><h4 id="扩展示例" tabindex="-1">扩展示例 <a class="header-anchor" href="#扩展示例" aria-label="Permalink to &quot;扩展示例&quot;">​</a></h4><p>尝试以下修改：</p><p>动态的学生队伍</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Student **students = malloc(3 * sizeof(Student *));</span></span>
<span class="line"><span>students[0] = create_student(&quot;Ava&quot;, 21, 3.7f);</span></span>
<span class="line"><span>students[1] = create_student(&quot;Ben&quot;, 20, 3.5f);</span></span>
<span class="line"><span>students[2] = create_student(&quot;Cleo&quot;, 23, 3.9f);</span></span></code></pre></div><p>遍历它们并打印所有详细信息，然后释放每一项。</p><p>重新分配（增长列表） 使用<code>realloc()</code>动态添加更多学生时增加阵列的容量。</p><p>深拷贝功能实现：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Student *copy_student(const Student *src);</span></span></code></pre></div><p>它通过为结构及其名称分配新内存来执行深层复制。</p><p>泄漏检测 运行您的程序<code>valgrind ./manual_memory</code>，确认所有内存都已释放干净。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>这个小例子反映了真实的 C 系统所做的事情：</p><ul><li>Allocate complex data on demand.</li><li>Manage lifetime explicitly.</li><li>正确清理。</li></ul><p>从操作系统到数据库和编译器的一切都取决于这个学科。 Once you can manage small dynamic structures like this confidently, you’re ready to build larger systems safely, from allocators to object pools to file caches.</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>添加一个新字段（<code>major</code>）并动态处理它。</li><li>添加成绩数组并计算平均值。</li><li>使用以下命令将静态列​​表转换为动态可调整大小的数组<code>realloc</code>.</li><li>故意省略<code>free()</code>调用，然后使用 Valgrind 检测泄漏。</li><li>写一个<code>destroy_all()</code>安全地释放一批学生的功能。</li></ol><p>您现在已经完成了第 3 章：使用内存。您了解数据在 C 中如何存在、移动和消失，并且您已经练习完全控制它。从这里，您将学习如何使用优雅地构建数据<code>struct</code>,<code>union</code>，以及第 4 章中的现实世界数据抽象。</p>`,37)])])}const h=n(l,[["render",t]]);export{m as __pageData,h as default};
