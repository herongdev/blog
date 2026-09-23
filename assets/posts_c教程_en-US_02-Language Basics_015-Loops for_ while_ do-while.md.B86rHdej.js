import{_ as s,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"15. Loops: for, while, do-while","description":"The Little Book of C — 15. Loops: for, while, do-while","frontmatter":{"title":"15. Loops: for, while, do-while","date":"2026-07-04","categories":"[C 教程]","tags":"[C, Little Book of C, Language Basics]","description":"The Little Book of C — 15. Loops: for, while, do-while","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":"15","sidebarWeight":"15","lang":"en-US","alternateEn":"/posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while","alternateZh":"/posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while"},"headers":[],"relativePath":"posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while.md","filePath":"posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while.md"};function o(t,a,l,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<p>[中文版本](/posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while)</p><p>Sometimes you need your program to repeat something, a calculation, a print statement, or a check, again and again. Instead of copying the same line of code many times, you use loops. Loops make your program efficient, compact, and able to handle dynamic data of any size.</p><h4 id="the-for-loop" tabindex="-1">The for Loop <a class="header-anchor" href="#the-for-loop" aria-label="Permalink to &quot;The for Loop&quot;">​</a></h4><p>A<code>for</code> loop repeats a block of code a fixed number of times.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (initialization; condition; update) {</span></span>
<span class="line"><span>    // repeated statements</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>    printf(&quot;%d &quot;, i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Explanation:</p><ul><li>Initialization runs once at the start (<code>int i = 0</code>)</li><li>Condition is checked before every loop (<code>i &lt; 10</code>)</li><li>Update runs after each iteration (<code>i++</code>)</li><li>The loop stops when the condition becomes false</li></ul><h4 id="the-while-loop" tabindex="-1">The while Loop <a class="header-anchor" href="#the-while-loop" aria-label="Permalink to &quot;The while Loop&quot;">​</a></h4><p>The<code>while</code> loop repeats while a condition remains true.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int n = 5;</span></span>
<span class="line"><span>while (n &gt; 0) {</span></span>
<span class="line"><span>    printf(&quot;n = %d\\n&quot;, n);</span></span>
<span class="line"><span>    n--;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This loop executes as long as<code>n</code> is greater than zero.</p><h4 id="the-do-while-loop" tabindex="-1">The do-while Loop <a class="header-anchor" href="#the-do-while-loop" aria-label="Permalink to &quot;The do-while Loop&quot;">​</a></h4><p>The<code>do-while</code> loop guarantees at least one execution, because the condition is checked after the body.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int i = 0;</span></span>
<span class="line"><span>do {</span></span>
<span class="line"><span>    printf(&quot;Running once! i = %d\\n&quot;, i);</span></span>
<span class="line"><span>    i++;</span></span>
<span class="line"><span>} while (i &lt; 1);</span></span></code></pre></div><p>It’s useful for input validation or repeating tasks until the user chooses to stop.</p><h4 id="breaking-and-continuing" tabindex="-1">Breaking and Continuing <a class="header-anchor" href="#breaking-and-continuing" aria-label="Permalink to &quot;Breaking and Continuing&quot;">​</a></h4><p>Sometimes you want to skip or stop partway through a loop.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (int i = 1; i &lt;= 10; i++) {</span></span>
<span class="line"><span>    if (i == 5) continue;   // skip this iteration</span></span>
<span class="line"><span>    if (i == 8) break;      // stop the loop</span></span>
<span class="line"><span>    printf(&quot;%d &quot;, i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1 2 3 4 6 7</span></span></code></pre></div><h4 id="nested-loops" tabindex="-1">Nested Loops <a class="header-anchor" href="#nested-loops" aria-label="Permalink to &quot;Nested Loops&quot;">​</a></h4><p>You can place one loop inside another to handle grids, tables, or multiple dimensions.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (int i = 1; i &lt;= 3; i++) {</span></span>
<span class="line"><span>    for (int j = 1; j &lt;= 2; j++) {</span></span>
<span class="line"><span>        printf(&quot;i=%d, j=%d\\n&quot;, i, j);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>i=1, j=1</span></span>
<span class="line"><span>i=1, j=2</span></span>
<span class="line"><span>i=2, j=1</span></span>
<span class="line"><span>i=2, j=2</span></span>
<span class="line"><span>i=3, j=1</span></span>
<span class="line"><span>i=3, j=2</span></span></code></pre></div><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><p>Here’s a complete program that demonstrates all three types of loops and control flow features:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    // for loop</span></span>
<span class="line"><span>    printf(&quot;for loop:\\n&quot;);</span></span>
<span class="line"><span>    for (int i = 1; i &lt;= 5; i++) {</span></span>
<span class="line"><span>        printf(&quot;%d &quot;, i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;\\n\\n&quot;);</span></span>
<span class="line"><span>    // while loop</span></span>
<span class="line"><span>    printf(&quot;while loop:\\n&quot;);</span></span>
<span class="line"><span>    int n = 3;</span></span>
<span class="line"><span>    while (n &gt; 0) {</span></span>
<span class="line"><span>        printf(&quot;n = %d\\n&quot;, n);</span></span>
<span class="line"><span>        n--;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    // do-while loop</span></span>
<span class="line"><span>    printf(&quot;do-while loop:\\n&quot;);</span></span>
<span class="line"><span>    int x = 0;</span></span>
<span class="line"><span>    do {</span></span>
<span class="line"><span>        printf(&quot;x = %d\\n&quot;, x);</span></span>
<span class="line"><span>        x++;</span></span>
<span class="line"><span>    } while (x &lt; 1);</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    // break and continue</span></span>
<span class="line"><span>    printf(&quot;break and continue demo:\\n&quot;);</span></span>
<span class="line"><span>    for (int i = 1; i &lt;= 10; i++) {</span></span>
<span class="line"><span>        if (i == 5) continue; // skip 5</span></span>
<span class="line"><span>        if (i == 8) break;    // stop at 8</span></span>
<span class="line"><span>        printf(&quot;%d &quot;, i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    // nested loop</span></span>
<span class="line"><span>    printf(&quot;\\nnested loops:\\n&quot;);</span></span>
<span class="line"><span>    for (int i = 1; i &lt;= 2; i++) {</span></span>
<span class="line"><span>        for (int j = 1; j &lt;= 3; j++) {</span></span>
<span class="line"><span>            printf(&quot;(%d,%d) &quot;, i, j);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        printf(&quot;\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc loops_demo.c -o loops_demo</span></span>
<span class="line"><span>./loops_demo</span></span></code></pre></div><p>You’ll see all types of loops in action.</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Loops are the engine of repetition in every C program. They make it possible to:</p><ul><li>Process arrays, files, and lists of data</li><li>Run algorithms that iterate until a condition is met</li><li>Automate repetitive tasks efficiently</li></ul><p>In C, loops are close to how the CPU itself operates, each iteration is a direct cycle of logic and computation. By mastering them, you control how your program moves, stops, and repeats, the heartbeat of every algorithm.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><p>Write a<code>for</code> loop that prints numbers 1 through 100.</p><p>Add an<code>if</code> inside it to print only even numbers.</p><p>Write a<code>while</code> loop that counts down from 10 to 1.</p><p>Create a nested loop that prints a 3×3 multiplication table.</p><p>Try an infinite loop safely:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while (1) {</span></span>
<span class="line"><span>    printf(&quot;Press Ctrl+C to stop\\n&quot;);</span></span>
<span class="line"><span>    break; // or add a condition to exit</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Once you’re comfortable with loops, you can build patterns, algorithms, and data processors, all by controlling how many times code repeats and under what conditions.</p>`,45)])])}const g=s(i,[["render",o]]);export{u as __pageData,g as default};
