import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const r=JSON.parse('{"title":"74. C 语言的单元测试","description":"The Little Book of C 中文版 — 74. C 语言的单元测试","frontmatter":{"title":"74. C 语言的单元测试","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","08-调试测试与 profiling","中文"],"description":"The Little Book of C 中文版 — 74. C 语言的单元测试","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":74,"sidebarWeight":74,"alternateZh":"/posts/c教程/zh-CN/08-调试测试与 profiling/074-Unit Testing in C","alternateEn":"/posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C"},"headers":[],"relativePath":"posts/c教程/zh-CN/08-调试测试与 profiling/074-Unit Testing in C.md","filePath":"posts/c教程/zh-CN/08-调试测试与 profiling/074-Unit Testing in C.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/08-调试测试与 profiling/074-Unit Testing in C.md"};function i(l,s,c,d,o,h){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C)</p><p>测试不仅仅是你最后要做的事情，它是你对每一行代码建立信心的方式。单元测试意味着自动检查小的、孤立的部分（函数、模块），这样您就可以毫无恐惧地更改代码。</p><p>C 没有内置的测试框架，但构建轻量级框架很容易，如果您想要更强大的功能，可以使用几个优秀的库。</p><p>让我们逐步了解如何用纯 C 语言设计和运行单元测试。</p><h4 id="步骤-1-什么是单元测试" tabindex="-1">步骤 1. 什么是单元测试？ <a class="header-anchor" href="#步骤-1-什么是单元测试" aria-label="Permalink to &quot;步骤 1. 什么是单元测试？&quot;">​</a></h4><p>单元测试验证单个行为：</p><p>给定输入，该函数是否会产生正确的输出？</p><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b) { return a + b; }</span></span>
<span class="line"><span>void test_add(void) {</span></span>
<span class="line"><span>    if (add(2, 3) != 5) printf(&quot;test_add failed!\\n&quot;);</span></span>
<span class="line"><span>    else printf(&quot;test_add passed!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>运行这个测试：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    test_add();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test_add passed!</span></span></code></pre></div><p>简单，但功能强大。</p><h4 id="步骤-2-组织测试" tabindex="-1">步骤 2. 组织测试 <a class="header-anchor" href="#步骤-2-组织测试" aria-label="Permalink to &quot;步骤 2. 组织测试&quot;">​</a></h4><p>将测试与生产代码分开。典型的布局：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/</span></span>
<span class="line"><span>  math.c</span></span>
<span class="line"><span>  math.h</span></span>
<span class="line"><span>tests/</span></span>
<span class="line"><span>  test_math.c</span></span>
<span class="line"><span>Makefile</span></span></code></pre></div><p>您的 Makefile 可能会同时构建：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>all:</span></span>
<span class="line"><span>    gcc -g -Wall -I../src ../src/math.c test_math.c -o test_math</span></span></code></pre></div><h4 id="步骤-3-编写可重用的测试助手" tabindex="-1">步骤 3. 编写可重用的测试助手 <a class="header-anchor" href="#步骤-3-编写可重用的测试助手" aria-label="Permalink to &quot;步骤 3. 编写可重用的测试助手&quot;">​</a></h4><p>定义宏以简化您的检查。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#define ASSERT_EQ_INT(expected, actual) \\</span></span>
<span class="line"><span>    if ((expected) != (actual)) \\</span></span>
<span class="line"><span>        printf(&quot;FAIL: %s:%d: expected %d, got %d\\n&quot;, __FILE__, __LINE__, (expected), (actual)); \\</span></span>
<span class="line"><span>    else \\</span></span>
<span class="line"><span>        printf(&quot;PASS: %s:%d\\n&quot;, __FILE__, __LINE__);</span></span></code></pre></div><p>现在：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b) { return a + b; }</span></span>
<span class="line"><span>void test_add(void) {</span></span>
<span class="line"><span>    ASSERT_EQ_INT(5, add(2, 3));</span></span>
<span class="line"><span>    ASSERT_EQ_INT(0, add(-1, 1));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) { test_add(); }</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>PASS: test_math.c:10</span></span>
<span class="line"><span>PASS: test_math.c:11</span></span></code></pre></div><h4 id="步骤-4-测试多个功能" tabindex="-1">步骤 4. 测试多个功能 <a class="header-anchor" href="#步骤-4-测试多个功能" aria-label="Permalink to &quot;步骤 4. 测试多个功能&quot;">​</a></h4><p>添加更多测试函数并按顺序调用它们：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void test_subtract(void) { ASSERT_EQ_INT(1, 3 - 2); }</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    test_add();</span></span>
<span class="line"><span>    test_subtract();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在您的程序会自动验证这两个函数。</p><h4 id="步骤-5-处理浮点比较" tabindex="-1">步骤 5. 处理浮点比较 <a class="header-anchor" href="#步骤-5-处理浮点比较" aria-label="Permalink to &quot;步骤 5. 处理浮点比较&quot;">​</a></h4><p>浮点值很少完全匹配，请使用容差。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;math.h&gt;</span></span>
<span class="line"><span>#define ASSERT_EQ_FLOAT(expected, actual, eps) \\</span></span>
<span class="line"><span>    if (fabs((expected) - (actual)) &gt; (eps)) \\</span></span>
<span class="line"><span>        printf(&quot;FAIL: expected %.3f, got %.3f\\n&quot;, (expected), (actual)); \\</span></span>
<span class="line"><span>    else \\</span></span>
<span class="line"><span>        printf(&quot;PASS\\n&quot;);</span></span></code></pre></div><h4 id="步骤-6-使用返回代码来标记失败" tabindex="-1">步骤 6. 使用返回代码来标记失败 <a class="header-anchor" href="#步骤-6-使用返回代码来标记失败" aria-label="Permalink to &quot;步骤 6. 使用返回代码来标记失败&quot;">​</a></h4><p>您可以使测试二进制返回，而不是仅仅打印结果<code>EXIT_FAILURE</code>如果任何测试失败。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int fails = 0;</span></span>
<span class="line"><span>#define TEST(cond) \\</span></span>
<span class="line"><span>    do { if (!(cond)) { \\</span></span>
<span class="line"><span>        printf(&quot;FAIL: %s:%d: %s\\n&quot;, __FILE__, __LINE__, #cond); \\</span></span>
<span class="line"><span>        fails++; \\</span></span>
<span class="line"><span>    } else { \\</span></span>
<span class="line"><span>        printf(&quot;PASS: %s:%d\\n&quot;, __FILE__, __LINE__); \\</span></span>
<span class="line"><span>    } } while (0)</span></span></code></pre></div><p>在最后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return fails ? EXIT_FAILURE : EXIT_SUCCESS;</span></span></code></pre></div><p>现在您的 CI 或 shell 可以通过以下方式检测测试结果<code>$?</code>.</p><h4 id="步骤-7-最小测试框架-tinytest" tabindex="-1">步骤 7. 最小测试框架：TinyTest <a class="header-anchor" href="#步骤-7-最小测试框架-tinytest" aria-label="Permalink to &quot;步骤 7. 最小测试框架：TinyTest&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>int tests_run = 0, tests_failed = 0;</span></span>
<span class="line"><span>#define TEST(name) void name(void)</span></span>
<span class="line"><span>#define RUN(test) do { \\</span></span>
<span class="line"><span>    printf(&quot;Running %s... &quot;, #test); \\</span></span>
<span class="line"><span>    test(); \\</span></span>
<span class="line"><span>    tests_run++; \\</span></span>
<span class="line"><span>    printf(&quot;OK\\n&quot;); \\</span></span>
<span class="line"><span>} while(0)</span></span>
<span class="line"><span>#define ASSERT_TRUE(cond) if (!(cond)) { \\</span></span>
<span class="line"><span>    printf(&quot;\\n  Assertion failed: %s\\n&quot;, #cond); \\</span></span>
<span class="line"><span>    tests_failed++; \\</span></span>
<span class="line"><span>    return; \\</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>TEST(test_addition) {</span></span>
<span class="line"><span>    int sum = 2 + 3;</span></span>
<span class="line"><span>    ASSERT_TRUE(sum == 5);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    RUN(test_addition);</span></span>
<span class="line"><span>    printf(&quot;\\nTests run: %d, failed: %d\\n&quot;, tests_run, tests_failed);</span></span>
<span class="line"><span>    return tests_failed ? EXIT_FAILURE : EXIT_SUCCESS;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>运行 test_addition...好的</span></span>
<span class="line"><span></span></span>
<span class="line"><span>测试运行：1，失败：0</span></span></code></pre></div><h4 id="步骤-8-使用真实测试库" tabindex="-1">步骤 8. 使用真实测试库 <a class="header-anchor" href="#步骤-8-使用真实测试库" aria-label="Permalink to &quot;步骤 8. 使用真实测试库&quot;">​</a></h4><p>当您的项目不断增长时，您可以使用以下框架：</p><ul><li>检查（符合 POSIX）</li><li>Unity（嵌入式友好）</li><li>CMocka</li><li>标准</li></ul><p>带支票的示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt install check</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;check.h&gt;</span></span>
<span class="line"><span>START_TEST(test_add)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ck_assert_int_eq(2 + 3, 5);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>END_TEST</span></span></code></pre></div><p>然后编译：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc test.c -lcheck -o test</span></span></code></pre></div><h4 id="步骤-9-使用-makefile-自动测试" tabindex="-1">步骤 9. 使用 Makefile 自动测试 <a class="header-anchor" href="#步骤-9-使用-makefile-自动测试" aria-label="Permalink to &quot;步骤 9. 使用 Makefile 自动测试&quot;">​</a></h4><p>添加测试目标：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test:</span></span>
<span class="line"><span>    gcc -Wall -g src/*.c tests/*.c -o tests/run_tests</span></span>
<span class="line"><span>    ./tests/run_tests</span></span></code></pre></div><p>现在你可以运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make test</span></span></code></pre></div><p>并查看全套套件的结果。</p><h4 id="步骤-10-小代码-测试链表" tabindex="-1">步骤 10. 小代码：测试链表 <a class="header-anchor" href="#步骤-10-小代码-测试链表" aria-label="Permalink to &quot;步骤 10. 小代码：测试链表&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;assert.h&gt;</span></span>
<span class="line"><span>typedef struct Node {</span></span>
<span class="line"><span>    int value;</span></span>
<span class="line"><span>    struct Node *next;</span></span>
<span class="line"><span>} Node;</span></span>
<span class="line"><span>Node *push(Node *head, int val) {</span></span>
<span class="line"><span>    Node *n = malloc(sizeof(Node));</span></span>
<span class="line"><span>    n-&gt;value = val;</span></span>
<span class="line"><span>    n-&gt;next = head;</span></span>
<span class="line"><span>    return n;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void test_push(void) {</span></span>
<span class="line"><span>    Node *head = NULL;</span></span>
<span class="line"><span>    head = push(head, 10);</span></span>
<span class="line"><span>    head = push(head, 20);</span></span>
<span class="line"><span>    assert(head-&gt;value == 20);</span></span>
<span class="line"><span>    assert(head-&gt;next-&gt;value == 10);</span></span>
<span class="line"><span>    printf(&quot;test_push passed\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    test_push();</span></span>
<span class="line"><span>    printf(&quot;All tests passed.\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test_push passed</span></span>
<span class="line"><span>All tests passed.</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>单元测试将代码转化为可验证的逻辑：</p><ul><li>防止回归。</li><li>鼓励小型、干净的功能。</li><li>使调试速度更快。</li><li>在重构之前建立信心。</li></ul><p>当您信任自己的测试时，您就可以无所畏惧地重写代码。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>为动态数组实现编写一个测试套件。</li><li>添加<code>ASSERT_EQ_FLOAT</code>和<code>ASSERT_EQ_STR</code>宏。</li><li>使用自动化测试<code>make test</code>.</li><li>添加一个<code>fails</code>计数器并为您的结果着色。</li><li>使用 Criterion 或 Unity 等测试库并比较样式。</li></ol><p>接下来，您将学习如何将日志记录系统添加到 C 程序中，以受控、可读的方式记录幕后发生的情况。</p>`,68)])])}const g=a(t,[["render",i]]);export{r as __pageData,g as default};
