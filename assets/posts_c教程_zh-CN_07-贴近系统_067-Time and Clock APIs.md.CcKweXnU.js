import{_ as a,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const r=JSON.parse('{"title":"67. 时间和时钟 API","description":"The Little Book of C 中文版 — 67. 时间和时钟 API","frontmatter":{"title":"67. 时间和时钟 API","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 67. 时间和时钟 API","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":67,"sidebarWeight":67,"alternateZh":"/posts/c教程/zh-CN/07-贴近系统/067-Time and Clock APIs","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/067-Time and Clock APIs"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/067-Time and Clock APIs.md","filePath":"posts/c教程/zh-CN/07-贴近系统/067-Time and Clock APIs.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/07-贴近系统/067-Time and Clock APIs.md"};function i(l,s,c,o,d,h){return n(),e("div",null,[...s[0]||(s[0]=[p(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/067-Time and Clock APIs)</p><p>时间是人类理解的最简单的事物之一，也是计算机正确处理的最棘手的事物之一。在 C 中，时间以自 Unix 纪元（1970 年 1 月 1 日）以来的秒数表示，您可以在各个级别上使用它：挂钟时间、进程时间和高精度计时器。</p><p>让我们探讨如何在 C 中获取、格式化和测量时间。</p><h4 id="步骤-1-基础知识-time" tabindex="-1">步骤 1. 基础知识：time() <a class="header-anchor" href="#步骤-1-基础知识-time" aria-label="Permalink to &quot;步骤 1. 基础知识：time()&quot;">​</a></h4><p>获取当前时间的最简单方法是使用<code>time()</code>功能。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    time_t now = time(NULL);</span></span>
<span class="line"><span>    printf(&quot;Seconds since epoch: %ld\\n&quot;, now);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Seconds since epoch: 1739709201</span></span></code></pre></div><p>这是自 1970-01-01 00:00:00 UTC 以来的秒数。</p><h4 id="步骤-2-转换为人类可读格式" tabindex="-1">步骤 2. 转换为人类可读格式 <a class="header-anchor" href="#步骤-2-转换为人类可读格式" aria-label="Permalink to &quot;步骤 2. 转换为人类可读格式&quot;">​</a></h4><p>你可以转换<code>time_t</code>使用日历日期<code>localtime()</code>或者<code>gmtime()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    time_t now = time(NULL);</span></span>
<span class="line"><span>    struct tm *t = localtime(&amp;now);</span></span>
<span class="line"><span>    printf(&quot;Local time: %02d-%02d-%04d %02d:%02d:%02d\\n&quot;,</span></span>
<span class="line"><span>           t-&gt;tm_mday, t-&gt;tm_mon + 1, t-&gt;tm_year + 1900,</span></span>
<span class="line"><span>           t-&gt;tm_hour, t-&gt;tm_min, t-&gt;tm_sec);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Local time: 16-10-2025 09:32:10</span></span></code></pre></div><h4 id="步骤-3-使用-strftime-设置日期格式" tabindex="-1">步骤 3. 使用 strftime() 设置日期格式 <a class="header-anchor" href="#步骤-3-使用-strftime-设置日期格式" aria-label="Permalink to &quot;步骤 3. 使用 strftime() 设置日期格式&quot;">​</a></h4><p><code>strftime()</code>让您安全地将时间格式化为字符串。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char buf[100];</span></span>
<span class="line"><span>    time_t now = time(NULL);</span></span>
<span class="line"><span>    struct tm *t = localtime(&amp;now);</span></span>
<span class="line"><span>    strftime(buf, sizeof(buf), &quot;%Y-%m-%d %H:%M:%S&quot;, t);</span></span>
<span class="line"><span>    printf(&quot;Formatted: %s\\n&quot;, buf);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Formatted: 2025-10-16 09:32:10</span></span></code></pre></div><h4 id="步骤-4-测量经过的时间" tabindex="-1">步骤 4. 测量经过的时间 <a class="header-anchor" href="#步骤-4-测量经过的时间" aria-label="Permalink to &quot;步骤 4. 测量经过的时间&quot;">​</a></h4><p>要测量某件事需要多长时间，请使用<code>clock()</code>从<code>&lt;time.h&gt;</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    clock_t start = clock();</span></span>
<span class="line"><span>    for (volatile long i = 0; i &lt; 100000000; i++);</span></span>
<span class="line"><span>    clock_t end = clock();</span></span>
<span class="line"><span>    double seconds = (double)(end - start) / CLOCKS_PER_SEC;</span></span>
<span class="line"><span>    printf(&quot;Elapsed time: %.3f seconds\\n&quot;, seconds);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Elapsed time: 0.520 seconds</span></span></code></pre></div><p><code>clock()</code>测量 CPU 时间，而不是实际运行时间，因此不包括等待 I/O 或睡眠所花费的时间。</p><h4 id="步骤-5-使用clock-gettime-进行高分辨率计时" tabindex="-1">步骤 5. 使用clock_gettime() 进行高分辨率计时 <a class="header-anchor" href="#步骤-5-使用clock-gettime-进行高分辨率计时" aria-label="Permalink to &quot;步骤 5. 使用clock_gettime() 进行高分辨率计时&quot;">​</a></h4><p>为了精确测量，请使用<code>clock_gettime()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct timespec start, end;</span></span>
<span class="line"><span>    clock_gettime(CLOCK_MONOTONIC, &amp;start);</span></span>
<span class="line"><span>    for (volatile long i = 0; i &lt; 100000000; i++);</span></span>
<span class="line"><span>    clock_gettime(CLOCK_MONOTONIC, &amp;end);</span></span>
<span class="line"><span>    double elapsed = (end.tv_sec - start.tv_sec)</span></span>
<span class="line"><span>                   + (end.tv_nsec - start.tv_nsec) / 1e9;</span></span>
<span class="line"><span>    printf(&quot;Elapsed: %.6f seconds\\n&quot;, elapsed);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Elapsed: 0.515421 seconds</span></span></code></pre></div><p>这测量实际经过的时间，不受系统时钟变化的影响。</p><h4 id="步骤-6-睡眠一段时间" tabindex="-1">步骤 6. 睡眠一段时间 <a class="header-anchor" href="#步骤-6-睡眠一段时间" aria-label="Permalink to &quot;步骤 6. 睡眠一段时间&quot;">​</a></h4><p>您可以使用以下命令暂停您的程序<code>sleep()</code>或者<code>nanosleep()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;Sleeping for 2 seconds...\\n&quot;);</span></span>
<span class="line"><span>    sleep(2);</span></span>
<span class="line"><span>    printf(&quot;Awake!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对于亚秒级精度：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct timespec ts = {0, 500000000}; // 0.5 seconds</span></span>
<span class="line"><span>    nanosleep(&amp;ts, NULL);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-7-获取-utc-和本地时区" tabindex="-1">步骤 7. 获取 UTC 和本地时区 <a class="header-anchor" href="#步骤-7-获取-utc-和本地时区" aria-label="Permalink to &quot;步骤 7. 获取 UTC 和本地时区&quot;">​</a></h4><p><code>gmtime()</code>给你 UTC，同时<code>localtime()</code>转换为您系统的时区。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>time_t now = time(NULL);</span></span>
<span class="line"><span>printf(&quot;UTC:   %s&quot;, asctime(gmtime(&amp;now)));</span></span>
<span class="line"><span>printf(&quot;Local: %s&quot;, asctime(localtime(&amp;now)));</span></span></code></pre></div><p>您可以通过以下方式更改时区行为<code>TZ</code>环境变量和<code>tzset()</code>.</p><h4 id="步骤-8-处理时间和资源使用" tabindex="-1">步骤 8. 处理时间和资源使用 <a class="header-anchor" href="#步骤-8-处理时间和资源使用" aria-label="Permalink to &quot;步骤 8. 处理时间和资源使用&quot;">​</a></h4><p>您可以检查您的程序使用了多少CPU时间<code>getrusage()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;sys/resource.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct rusage usage;</span></span>
<span class="line"><span>    getrusage(RUSAGE_SELF, &amp;usage);</span></span>
<span class="line"><span>    printf(&quot;User CPU time: %ld.%06lds\\n&quot;,</span></span>
<span class="line"><span>           usage.ru_utime.tv_sec, usage.ru_utime.tv_usec);</span></span>
<span class="line"><span>    printf(&quot;System CPU time: %ld.%06lds\\n&quot;,</span></span>
<span class="line"><span>           usage.ru_stime.tv_sec, usage.ru_stime.tv_usec);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这就是分析器测量 CPU 消耗的方式。</p><h4 id="步骤-9-时差" tabindex="-1">步骤 9. 时差 <a class="header-anchor" href="#步骤-9-时差" aria-label="Permalink to &quot;步骤 9. 时差&quot;">​</a></h4><p>你可以减去两个<code>time_t</code>价值观使用<code>difftime()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    time_t start = time(NULL);</span></span>
<span class="line"><span>    sleep(2);</span></span>
<span class="line"><span>    time_t end = time(NULL);</span></span>
<span class="line"><span>    printf(&quot;Elapsed: %.0f seconds\\n&quot;, difftime(end, start));</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Elapsed: 2 seconds</span></span></code></pre></div><h4 id="步骤-10-小代码-倒计时器" tabindex="-1">步骤 10. 小代码：倒计时器 <a class="header-anchor" href="#步骤-10-小代码-倒计时器" aria-label="Permalink to &quot;步骤 10. 小代码：倒计时器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    for (int i = 5; i &gt; 0; i--) {</span></span>
<span class="line"><span>        printf(&quot;%d...\\n&quot;, i);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Time&#39;s up!\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>5...</span></span>
<span class="line"><span>4...</span></span>
<span class="line"><span>3...</span></span>
<span class="line"><span>2...</span></span>
<span class="line"><span>1...</span></span>
<span class="line"><span>Time&#39;s up!</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>时间函数在以下方面至关重要：</p><ul><li>日志记录和时间戳</li><li>基准测试和分析</li><li>安排活动</li><li>衡量算法的性能</li><li>同步分布式系统</li></ul><p>每个系统程序最终都需要准确、可靠的时间测量，而 C 语言为您提供了所有低级工具来高效地完成此任务。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>以 ISO 8601 格式打印当前日期。</li><li>测量读取一个大文件需要多长时间。</li><li>构建一个秒表来测量经过的时间<code>clock_gettime()</code>.</li><li>创建一个在终端上更新的倒计时器。 5.同时显示UTC和本地时间，格式很好。</li></ol><p>接下来，您将学习如何访问和修改环境变量，这是 Unix 程序如何与其运行时环境通信的另一个关键部分。</p>`,60)])])}const g=a(t,[["render",i]]);export{r as __pageData,g as default};
