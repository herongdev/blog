import{_ as a,o as n,c as e,a5 as t}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"74. Unit Testing in C","description":"The Little Book of C — 74. Unit Testing in C","frontmatter":{"title":"74. Unit Testing in C","date":"2026-07-04","categories":["C 教程"],"tags":["C","Little Book of C","Debugging Testing Profiling"],"description":"The Little Book of C — 74. Unit Testing in C","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":74,"sidebarWeight":74,"lang":"en-US","alternateEn":"/posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C","alternateZh":"/posts/c教程/zh-CN/08-调试测试与 profiling/074-Unit Testing in C"},"headers":[],"relativePath":"posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C.md","filePath":"posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C.md","lastUpdated":1790163617000}'),p={name:"posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C.md"};function i(l,s,o,c,d,r){return n(),e("div",null,[...s[0]||(s[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/08-调试测试与 profiling/074-Unit Testing in C)</p><p>Testing isn’t just something you do at the end, it’s how you build confidence in every line of code. Unit testing means checking small, isolated pieces (functions, modules) automatically, so you can change your code without fear.</p><p>C doesn’t come with a built-in testing framework, but it’s easy to build lightweight ones, and several excellent libraries exist if you want more power.</p><p>Let’s walk through how to design and run unit tests in plain C.</p><h4 id="step-1-what-is-unit-testing" tabindex="-1">Step 1. What Is Unit Testing? <a class="header-anchor" href="#step-1-what-is-unit-testing" aria-label="Permalink to &quot;Step 1. What Is Unit Testing?&quot;">​</a></h4><p>A unit test verifies a single behavior:</p><p>Given an input, does this function produce the correct output?</p><p>For example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b) { return a + b; }</span></span>
<span class="line"><span>void test_add(void) {</span></span>
<span class="line"><span>    if (add(2, 3) != 5) printf(&quot;test_add failed!\\n&quot;);</span></span>
<span class="line"><span>    else printf(&quot;test_add passed!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Run this test:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    test_add();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test_add passed!</span></span></code></pre></div><p>Simple, but powerful.</p><h4 id="step-2-organizing-tests" tabindex="-1">Step 2. Organizing Tests <a class="header-anchor" href="#step-2-organizing-tests" aria-label="Permalink to &quot;Step 2. Organizing Tests&quot;">​</a></h4><p>Keep tests separate from production code. A typical layout:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/</span></span>
<span class="line"><span>  math.c</span></span>
<span class="line"><span>  math.h</span></span>
<span class="line"><span>tests/</span></span>
<span class="line"><span>  test_math.c</span></span>
<span class="line"><span>Makefile</span></span></code></pre></div><p>Your Makefile might build both:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>all:</span></span>
<span class="line"><span>    gcc -g -Wall -I../src ../src/math.c test_math.c -o test_math</span></span></code></pre></div><h4 id="step-3-writing-reusable-test-helpers" tabindex="-1">Step 3. Writing Reusable Test Helpers <a class="header-anchor" href="#step-3-writing-reusable-test-helpers" aria-label="Permalink to &quot;Step 3. Writing Reusable Test Helpers&quot;">​</a></h4><p>Define macros to simplify your checks.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#define ASSERT_EQ_INT(expected, actual) \\</span></span>
<span class="line"><span>    if ((expected) != (actual)) \\</span></span>
<span class="line"><span>        printf(&quot;FAIL: %s:%d: expected %d, got %d\\n&quot;, __FILE__, __LINE__, (expected), (actual)); \\</span></span>
<span class="line"><span>    else \\</span></span>
<span class="line"><span>        printf(&quot;PASS: %s:%d\\n&quot;, __FILE__, __LINE__);</span></span></code></pre></div><p>Now:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int add(int a, int b) { return a + b; }</span></span>
<span class="line"><span>void test_add(void) {</span></span>
<span class="line"><span>    ASSERT_EQ_INT(5, add(2, 3));</span></span>
<span class="line"><span>    ASSERT_EQ_INT(0, add(-1, 1));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) { test_add(); }</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>PASS: test_math.c:10</span></span>
<span class="line"><span>PASS: test_math.c:11</span></span></code></pre></div><h4 id="step-4-testing-multiple-functions" tabindex="-1">Step 4. Testing Multiple Functions <a class="header-anchor" href="#step-4-testing-multiple-functions" aria-label="Permalink to &quot;Step 4. Testing Multiple Functions&quot;">​</a></h4><p>Add more test functions and call them in sequence:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void test_subtract(void) { ASSERT_EQ_INT(1, 3 - 2); }</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    test_add();</span></span>
<span class="line"><span>    test_subtract();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Now your program automatically verifies both functions.</p><h4 id="step-5-handling-floating-point-comparisons" tabindex="-1">Step 5. Handling Floating-Point Comparisons <a class="header-anchor" href="#step-5-handling-floating-point-comparisons" aria-label="Permalink to &quot;Step 5. Handling Floating-Point Comparisons&quot;">​</a></h4><p>Floating-point values rarely match exactly, use a tolerance.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;math.h&gt;</span></span>
<span class="line"><span>#define ASSERT_EQ_FLOAT(expected, actual, eps) \\</span></span>
<span class="line"><span>    if (fabs((expected) - (actual)) &gt; (eps)) \\</span></span>
<span class="line"><span>        printf(&quot;FAIL: expected %.3f, got %.3f\\n&quot;, (expected), (actual)); \\</span></span>
<span class="line"><span>    else \\</span></span>
<span class="line"><span>        printf(&quot;PASS\\n&quot;);</span></span></code></pre></div><h4 id="step-6-using-return-codes-to-mark-failures" tabindex="-1">Step 6. Using Return Codes to Mark Failures <a class="header-anchor" href="#step-6-using-return-codes-to-mark-failures" aria-label="Permalink to &quot;Step 6. Using Return Codes to Mark Failures&quot;">​</a></h4><p>Instead of just printing results, you can make the test binary return<code>EXIT_FAILURE</code> if any test fails.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int fails = 0;</span></span>
<span class="line"><span>#define TEST(cond) \\</span></span>
<span class="line"><span>    do { if (!(cond)) { \\</span></span>
<span class="line"><span>        printf(&quot;FAIL: %s:%d: %s\\n&quot;, __FILE__, __LINE__, #cond); \\</span></span>
<span class="line"><span>        fails++; \\</span></span>
<span class="line"><span>    } else { \\</span></span>
<span class="line"><span>        printf(&quot;PASS: %s:%d\\n&quot;, __FILE__, __LINE__); \\</span></span>
<span class="line"><span>    } } while (0)</span></span></code></pre></div><p>At the end:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return fails ? EXIT_FAILURE : EXIT_SUCCESS;</span></span></code></pre></div><p>Now your CI or shell can detect test results via<code>$?</code>.</p><h4 id="step-7-minimal-testing-framework-tinytest" tabindex="-1">Step 7. Minimal Testing Framework: TinyTest <a class="header-anchor" href="#step-7-minimal-testing-framework-tinytest" aria-label="Permalink to &quot;Step 7. Minimal Testing Framework: TinyTest&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Running test_addition... OK</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Tests run: 1, failed: 0</span></span></code></pre></div><h4 id="step-8-using-real-testing-libraries" tabindex="-1">Step 8. Using Real Testing Libraries <a class="header-anchor" href="#step-8-using-real-testing-libraries" aria-label="Permalink to &quot;Step 8. Using Real Testing Libraries&quot;">​</a></h4><p>When your project grows, you can use frameworks like:</p><ul><li>Check (POSIX-compliant)</li><li>Unity (embedded-friendly)</li><li>CMocka</li><li>Criterion</li></ul><p>Example with Check:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt install check</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;check.h&gt;</span></span>
<span class="line"><span>START_TEST(test_add)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ck_assert_int_eq(2 + 3, 5);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>END_TEST</span></span></code></pre></div><p>Then compile with:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc test.c -lcheck -o test</span></span></code></pre></div><h4 id="step-9-automating-tests-with-makefile" tabindex="-1">Step 9. Automating Tests with Makefile <a class="header-anchor" href="#step-9-automating-tests-with-makefile" aria-label="Permalink to &quot;Step 9. Automating Tests with Makefile&quot;">​</a></h4><p>Add a test target:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test:</span></span>
<span class="line"><span>    gcc -Wall -g src/*.c tests/*.c -o tests/run_tests</span></span>
<span class="line"><span>    ./tests/run_tests</span></span></code></pre></div><p>Now you can just run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make test</span></span></code></pre></div><p>and see your full suite’s results.</p><h4 id="step-10-tiny-code-testing-a-linked-list" tabindex="-1">Step 10. Tiny Code: Testing a Linked List <a class="header-anchor" href="#step-10-tiny-code-testing-a-linked-list" aria-label="Permalink to &quot;Step 10. Tiny Code: Testing a Linked List&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test_push passed</span></span>
<span class="line"><span>All tests passed.</span></span></code></pre></div><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Unit testing turns code into verifiable logic:</p><ul><li>Prevents regressions.</li><li>Encourages small, clean functions.</li><li>Makes debugging faster.</li><li>Builds confidence before refactoring.</li></ul><p>When you trust your tests, you can rewrite your code fearlessly.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Write a test suite for your dynamic array implementation.</li><li>Add<code>ASSERT_EQ_FLOAT</code> and<code>ASSERT_EQ_STR</code> macros.</li><li>Automate tests using<code>make test</code>.</li><li>Add a<code>fails</code> counter and colorize your results.</li><li>Use a testing library like Criterion or Unity and compare styles.</li></ol><p>Next, you’ll learn how to add logging systems to your C programs, to record what’s happening under the hood in a controlled, readable way.</p>`,68)])])}const g=a(p,[["render",i]]);export{h as __pageData,g as default};
