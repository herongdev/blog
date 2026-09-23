import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"75. 记录系统","description":"The Little Book of C 中文版 — 75. 记录系统","frontmatter":{"title":"75. 记录系统","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","08-调试测试与 profiling","中文"],"description":"The Little Book of C 中文版 — 75. 记录系统","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":75,"sidebarWeight":75,"alternateZh":"/posts/c教程/zh-CN/08-调试测试与 profiling/075-Logging Systems","alternateEn":"/posts/c教程/en-US/08-Debugging Testing Profiling/075-Logging Systems"},"headers":[],"relativePath":"posts/c教程/zh-CN/08-调试测试与 profiling/075-Logging Systems.md","filePath":"posts/c教程/zh-CN/08-调试测试与 profiling/075-Logging Systems.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/08-调试测试与 profiling/075-Logging Systems.md"};function i(l,s,o,c,d,u){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/075-Logging Systems)</p><p>随着程序的增长， printf 调试很快就会变得混乱。您需要一种方法来查看程序内部、它在做什么、出了什么问题以及原因，而不会让您的终端充斥着随机消息。</p><p>这就是日志系统的用武之地。良好的日志系统可以帮助您跟踪执行、记录错误并了解程序随时间的变化情况。</p><h4 id="步骤-1-什么是日志记录" tabindex="-1">步骤 1. 什么是日志记录？ <a class="header-anchor" href="#步骤-1-什么是日志记录" aria-label="Permalink to &quot;步骤 1. 什么是日志记录？&quot;">​</a></h4><p>日志记录就像为您的程序写日记。您无需将所有内容打印到屏幕上，而是记录带有级别（信息、警告、错误）和时间戳的结构化消息。</p><p>它对于以下方面至关重要：</p><ul><li>调试复杂的流程。</li><li>审核事件和错误。</li><li>监控长期运行的服务。</li><li>诊断崩溃和性能问题。</li></ul><h4 id="步骤-2-最简单的记录器-带上下文的-printf" tabindex="-1">步骤 2. 最简单的记录器，带上下文的 printf <a class="header-anchor" href="#步骤-2-最简单的记录器-带上下文的-printf" aria-label="Permalink to &quot;步骤 2. 最简单的记录器，带上下文的 printf&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;[INFO] Starting program\\n&quot;);</span></span>
<span class="line"><span>    printf(&quot;[WARN] Low memory\\n&quot;);</span></span>
<span class="line"><span>    printf(&quot;[ERROR] Failed to open file\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这可行，但没有时间戳、文件名或严重性控制。</p><h4 id="步骤-3-添加日志级别和宏" tabindex="-1">步骤 3. 添加日志级别和宏 <a class="header-anchor" href="#步骤-3-添加日志级别和宏" aria-label="Permalink to &quot;步骤 3. 添加日志级别和宏&quot;">​</a></h4><p>我们可以使用宏使其结构化并可重用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#define LOG(level, msg, ...) do { \\</span></span>
<span class="line"><span>    time_t t = time(NULL); \\</span></span>
<span class="line"><span>    struct tm *tm_info = localtime(&amp;t); \\</span></span>
<span class="line"><span>    char buf[20]; \\</span></span>
<span class="line"><span>    strftime(buf, 20, &quot;%Y-%m-%d %H:%M:%S&quot;, tm_info); \\</span></span>
<span class="line"><span>    fprintf(stderr, &quot;[%s] [%s] &quot; msg &quot;\\n&quot;, buf, level, ##__VA_ARGS__); \\</span></span>
<span class="line"><span>} while (0)</span></span>
<span class="line"><span>#define LOG_INFO(msg, ...)  LOG(&quot;INFO&quot;, msg, ##__VA_ARGS__)</span></span>
<span class="line"><span>#define LOG_WARN(msg, ...)  LOG(&quot;WARN&quot;, msg, ##__VA_ARGS__)</span></span>
<span class="line"><span>#define LOG_ERROR(msg, ...) LOG(&quot;ERROR&quot;, msg, ##__VA_ARGS__)</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    LOG_INFO(&quot;Program started&quot;);</span></span>
<span class="line"><span>    LOG_WARN(&quot;Memory usage at %d%%&quot;, 80);</span></span>
<span class="line"><span>    LOG_ERROR(&quot;File %s not found&quot;, &quot;data.txt&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[2025-10-16 23:41:09] [INFO] Program started</span></span>
<span class="line"><span>[2025-10-16 23:41:09] [WARN] Memory usage at 80%</span></span>
<span class="line"><span>[2025-10-16 23:41:09] [ERROR] File data.txt not found</span></span></code></pre></div><p>现在您的日志具有一致的结构和有用的上下文。</p><h4 id="步骤-4-控制日志详细程度" tabindex="-1">步骤 4. 控制日志详细程度 <a class="header-anchor" href="#步骤-4-控制日志详细程度" aria-label="Permalink to &quot;步骤 4. 控制日志详细程度&quot;">​</a></h4><p>添加全局日志级别：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum { LOG_LEVEL_INFO, LOG_LEVEL_WARN, LOG_LEVEL_ERROR };</span></span>
<span class="line"><span>int CURRENT_LOG_LEVEL = LOG_LEVEL_INFO;</span></span>
<span class="line"><span>#define SHOULD_LOG(level) ((level) &gt;= CURRENT_LOG_LEVEL)</span></span>
<span class="line"><span>#define LOGX(level, tag, msg, ...) do { \\</span></span>
<span class="line"><span>    if (SHOULD_LOG(level)) { \\</span></span>
<span class="line"><span>        time_t t = time(NULL); \\</span></span>
<span class="line"><span>        struct tm *tm_info = localtime(&amp;t); \\</span></span>
<span class="line"><span>        char buf[20]; \\</span></span>
<span class="line"><span>        strftime(buf, 20, &quot;%H:%M:%S&quot;, tm_info); \\</span></span>
<span class="line"><span>        fprintf(stderr, &quot;[%s] [%s] &quot; msg &quot;\\n&quot;, buf, tag, ##__VA_ARGS__); \\</span></span>
<span class="line"><span>    } \\</span></span>
<span class="line"><span>} while (0)</span></span></code></pre></div><p>现在：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>LOGX(LOG_LEVEL_INFO, &quot;INFO&quot;, &quot;Running&quot;);</span></span>
<span class="line"><span>LOGX(LOG_LEVEL_WARN, &quot;WARN&quot;, &quot;Low disk space&quot;);</span></span>
<span class="line"><span>LOGX(LOG_LEVEL_ERROR, &quot;ERROR&quot;, &quot;Crash at line %d&quot;, __LINE__);</span></span></code></pre></div><p>动态更改详细程度：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CURRENT_LOG_LEVEL = LOG_LEVEL_WARN;</span></span></code></pre></div><p>现在，INFO 消息将被跳过。</p><h4 id="步骤-5-记录到文件" tabindex="-1">步骤 5. 记录到文件 <a class="header-anchor" href="#步骤-5-记录到文件" aria-label="Permalink to &quot;步骤 5. 记录到文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>void log_to_file(const char *filename, const char *msg) {</span></span>
<span class="line"><span>    FILE *f = fopen(filename, &quot;a&quot;);</span></span>
<span class="line"><span>    if (!f) return;</span></span>
<span class="line"><span>    time_t t = time(NULL);</span></span>
<span class="line"><span>    fprintf(f, &quot;%s: %s\\n&quot;, ctime(&amp;t), msg);</span></span>
<span class="line"><span>    fclose(f);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    log_to_file(&quot;log.txt&quot;, &quot;Program started&quot;);</span></span>
<span class="line"><span>    log_to_file(&quot;log.txt&quot;, &quot;Action complete&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>日志文件将包含：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Thu Oct 16 23:41:09 2025: Program started</span></span>
<span class="line"><span>Thu Oct 16 23:41:10 2025: Action complete</span></span></code></pre></div><h4 id="步骤-6-包含文件和行信息" tabindex="-1">步骤 6. 包含文件和行信息 <a class="header-anchor" href="#步骤-6-包含文件和行信息" aria-label="Permalink to &quot;步骤 6. 包含文件和行信息&quot;">​</a></h4><p>您可以使用自动包含源信息<code>__FILE__</code>和<code>__LINE__</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define LOG_DEBUG(msg, ...) \\</span></span>
<span class="line"><span>    fprintf(stderr, &quot;[DEBUG] %s:%d &quot; msg &quot;\\n&quot;, __FILE__, __LINE__, ##__VA_ARGS__)</span></span></code></pre></div><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>LOG_DEBUG(&quot;x = %d&quot;, x);</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[DEBUG] main.c:42 x = 10</span></span></code></pre></div><h4 id="步骤-7-轮换或限制日志" tabindex="-1">步骤 7.轮换或限制日志 <a class="header-anchor" href="#步骤-7-轮换或限制日志" aria-label="Permalink to &quot;步骤 7.轮换或限制日志&quot;">​</a></h4><p>对于长时间运行的程序，您不希望日志永远增长。你可以：</p><ul><li>截断或重命名旧文件。</li><li>只保留N个条目。</li><li>写每日日志（<code>log_2025-10-16.txt</code>).</li></ul><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>char filename[64];</span></span>
<span class="line"><span>time_t now = time(NULL);</span></span>
<span class="line"><span>strftime(filename, sizeof(filename), &quot;log_%Y-%m-%d.txt&quot;, localtime(&amp;now));</span></span>
<span class="line"><span>log_to_file(filename, &quot;Daily entry&quot;);</span></span></code></pre></div><h4 id="步骤-8-添加颜色-可选" tabindex="-1">步骤 8. 添加颜色（可选） <a class="header-anchor" href="#步骤-8-添加颜色-可选" aria-label="Permalink to &quot;步骤 8. 添加颜色（可选）&quot;">​</a></h4><p>使用 ANSI 颜色代码使控制台日志更易于阅读：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define RED   &quot;\\x1b[31m&quot;</span></span>
<span class="line"><span>#define YEL   &quot;\\x1b[33m&quot;</span></span>
<span class="line"><span>#define GRN   &quot;\\x1b[32m&quot;</span></span>
<span class="line"><span>#define RST   &quot;\\x1b[0m&quot;</span></span>
<span class="line"><span>#define LOGC(level, color, msg, ...) \\</span></span>
<span class="line"><span>    fprintf(stderr, color &quot;[%s] &quot; msg RST &quot;\\n&quot;, level, ##__VA_ARGS__)</span></span></code></pre></div><p>例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>LOGC(&quot;INFO&quot;, GRN, &quot;Server started&quot;);</span></span>
<span class="line"><span>LOGC(&quot;WARN&quot;, YEL, &quot;High CPU usage&quot;);</span></span>
<span class="line"><span>LOGC(&quot;ERROR&quot;, RED, &quot;Out of memory&quot;);</span></span></code></pre></div><h4 id="步骤-9-结合日志记录和断言" tabindex="-1">步骤 9. 结合日志记录和断言 <a class="header-anchor" href="#步骤-9-结合日志记录和断言" aria-label="Permalink to &quot;步骤 9. 结合日志记录和断言&quot;">​</a></h4><p>您可以将断言与日志结合起来以提高安全性：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;assert.h&gt;</span></span>
<span class="line"><span>#define SAFE_LOG(cond, msg, ...) \\</span></span>
<span class="line"><span>    if (!(cond)) { \\</span></span>
<span class="line"><span>        LOG_ERROR(msg, ##__VA_ARGS__); \\</span></span>
<span class="line"><span>        assert(cond); \\</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>如果出现故障，它会记录并触发断言。</p><h4 id="步骤-10-小代码-最小记录器" tabindex="-1">步骤 10. 小代码：最小记录器 <a class="header-anchor" href="#步骤-10-小代码-最小记录器" aria-label="Permalink to &quot;步骤 10. 小代码：最小记录器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#define LOG(fmt, ...) do { \\</span></span>
<span class="line"><span>    time_t now = time(NULL); \\</span></span>
<span class="line"><span>    char buf[20]; \\</span></span>
<span class="line"><span>    strftime(buf, sizeof(buf), &quot;%H:%M:%S&quot;, localtime(&amp;now)); \\</span></span>
<span class="line"><span>    fprintf(stderr, &quot;[%s] &quot; fmt &quot;\\n&quot;, buf, ##__VA_ARGS__); \\</span></span>
<span class="line"><span>} while (0)</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    LOG(&quot;Starting program&quot;);</span></span>
<span class="line"><span>    LOG(&quot;Loading config&quot;);</span></span>
<span class="line"><span>    LOG(&quot;Finished setup&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[23:42:00] Starting program</span></span>
<span class="line"><span>[23:42:01] Loading config</span></span>
<span class="line"><span>[23:42:02] Finished setup</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>日志记录使不可见的进程变得可见。它可以帮助您：</p><ul><li>跟踪执行流程。</li><li>调试生产代码。</li><li>审核错误和警告。</li><li>随着时间的推移了解系统性能。</li></ul><p>在真实的系统中，服务器、编译器、数据库、日志是出现问题时的生命线。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加<code>LOG_INFO</code>,<code>LOG_WARN</code>， 和<code>LOG_ERROR</code>宏到您的 C 项目之一。 2. 向两者写入日志<code>stderr</code>和一个文件。 3. 自动添加时间戳和行号。 4. 为每个级别添加颜色。 5. 实施轮换文件日志系统，仅保留今天的文件处于活动状态。</p><p>接下来，您将了解如何使用 gprof 进行分析、如何衡量程序将时间花在哪里以及如何使其更快。</p>`,60)])])}const g=a(t,[["render",i]]);export{h as __pageData,g as default};
