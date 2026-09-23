import{_ as n,o as a,c as p,a5 as i}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"15. 循环：for、while、do-while","description":"The Little Book of C 中文版 — 15. 循环：for、while、do-while","frontmatter":{"title":"15. 循环：for、while、do-while","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","02-语言基础","中文"],"description":"The Little Book of C 中文版 — 15. 循环：for、while、do-while","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":"15","sidebarWeight":"15","alternateZh":"/posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while","alternateEn":"/posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while"},"headers":[],"relativePath":"posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while.md","filePath":"posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while.md","lastUpdated":1790163617000}'),e={name:"posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while.md"};function l(t,s,o,c,d,h){return a(),p("div",null,[...s[0]||(s[0]=[i(`<p>[English version](/posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while)</p><p>有时，您需要程序一次又一次地重复某些操作、计算、打印语句或检查。您不必多次复制同一行代码，而是使用循环。循环使您的程序高效、紧凑，并且能够处理任何大小的动态数据。</p><h4 id="for-循环" tabindex="-1">for 循环 <a class="header-anchor" href="#for-循环" aria-label="Permalink to &quot;for 循环&quot;">​</a></h4><p>一个<code>for</code>循环重复一段代码固定次数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (initialization; condition; update) {</span></span>
<span class="line"><span>    // repeated statements</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (int i = 0; i &lt; 10; i++) {</span></span>
<span class="line"><span>    printf(&quot;%d &quot;, i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>解释：</p><ul><li>初始化在开始时运行一次（<code>int i = 0</code>)</li><li>在每个循环之前检查条件（<code>i &lt; 10</code>)</li><li>每次迭代后运行更新（<code>i++</code>)</li><li>当条件变为假时循环停止</li></ul><h4 id="while-循环" tabindex="-1">while 循环 <a class="header-anchor" href="#while-循环" aria-label="Permalink to &quot;while 循环&quot;">​</a></h4><p>这<code>while</code>当条件保持为真时循环会重复。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int n = 5;</span></span>
<span class="line"><span>while (n &gt; 0) {</span></span>
<span class="line"><span>    printf(&quot;n = %d\\n&quot;, n);</span></span>
<span class="line"><span>    n--;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>该循环执行只要<code>n</code>大于零。</p><h4 id="do-while-循环" tabindex="-1">do-while 循环 <a class="header-anchor" href="#do-while-循环" aria-label="Permalink to &quot;do-while 循环&quot;">​</a></h4><p>这<code>do-while</code>循环保证至少执行一次，因为条件是在主体之后检查的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int i = 0;</span></span>
<span class="line"><span>do {</span></span>
<span class="line"><span>    printf(&quot;Running once! i = %d\\n&quot;, i);</span></span>
<span class="line"><span>    i++;</span></span>
<span class="line"><span>} while (i &lt; 1);</span></span></code></pre></div><p>它对于输入验证或重复任务直到用户选择停止非常有用。</p><h4 id="中断与继续" tabindex="-1">中断与继续 <a class="header-anchor" href="#中断与继续" aria-label="Permalink to &quot;中断与继续&quot;">​</a></h4><p>有时您想在循环中跳过或停止。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (int i = 1; i &lt;= 10; i++) {</span></span>
<span class="line"><span>    if (i == 5) continue;   // skip this iteration</span></span>
<span class="line"><span>    if (i == 8) break;      // stop the loop</span></span>
<span class="line"><span>    printf(&quot;%d &quot;, i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1 2 3 4 6 7</span></span></code></pre></div><h4 id="嵌套循环" tabindex="-1">嵌套循环 <a class="header-anchor" href="#嵌套循环" aria-label="Permalink to &quot;嵌套循环&quot;">​</a></h4><p>您可以将一个循环放入另一个循环中以处理网格、表格或多个维度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (int i = 1; i &lt;= 3; i++) {</span></span>
<span class="line"><span>    for (int j = 1; j &lt;= 2; j++) {</span></span>
<span class="line"><span>        printf(&quot;i=%d, j=%d\\n&quot;, i, j);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>i=1, j=1</span></span>
<span class="line"><span>i=1, j=2</span></span>
<span class="line"><span>i=2, j=1</span></span>
<span class="line"><span>i=2, j=2</span></span>
<span class="line"><span>i=3, j=1</span></span>
<span class="line"><span>i=3, j=2</span></span></code></pre></div><h4 id="小代码" tabindex="-1">小代码 <a class="header-anchor" href="#小代码" aria-label="Permalink to &quot;小代码&quot;">​</a></h4><p>这是一个完整的程序，演示了所有三种类型的循环和控制流功能：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc loops_demo.c -o loops_demo</span></span>
<span class="line"><span>./loops_demo</span></span></code></pre></div><p>您将看到所有类型的循环正在运行。</p><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>循环是每个 C 程序中重复的引擎。它们使以下成为可能：</p><ul><li>处理数组、文件和数据列表</li><li>运行迭代直到满足条件的算法</li><li>有效地自动化重复性任务</li></ul><p>在C语言中，循环与CPU本身的运行方式很接近，每次迭代都是逻辑和计算的直接循环。通过掌握它们，您可以控制程序如何移动、停止和重复，这是每个算法的心跳。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>写一个<code>for</code>打印数字 1 到 100 的循环。</p><p>添加一个<code>if</code>在里面只打印偶数。</p><p>写一个<code>while</code>从 10 倒数到 1 的循环。</p><p>创建一个打印 3×3 乘法表的嵌套循环。</p><p>安全地尝试无限循环：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while (1) {</span></span>
<span class="line"><span>    printf(&quot;Press Ctrl+C to stop\\n&quot;);</span></span>
<span class="line"><span>    break; // or add a condition to exit</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>一旦您熟悉了循环，您就可以通过控制代码重复次数和条件来构建模式、算法和数据处理器。</p>`,45)])])}const g=n(e,[["render",l]]);export{u as __pageData,g as default};
