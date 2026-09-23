import{_ as a,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"50. 实践：构建日志读取器和写入器","description":"The Little Book of C 中文版 — 50. 实践：构建日志读取器和写入器","frontmatter":{"title":"50. 实践：构建日志读取器和写入器","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","05-输入输出与文件","中文"],"description":"The Little Book of C 中文版 — 50. 实践：构建日志读取器和写入器","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":"50","sidebarWeight":"50","alternateZh":"/posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer","alternateEn":"/posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer"},"headers":[],"relativePath":"posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer.md","filePath":"posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer.md"};function t(i,s,o,c,r,d){return n(),e("div",null,[...s[0]||(s[0]=[p(`<p>[English version](/posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer)</p><h4 id="跟练交付物" tabindex="-1">跟练交付物 <a class="header-anchor" href="#跟练交付物" aria-label="Permalink to &quot;跟练交付物&quot;">​</a></h4><ul><li>已具备状态：完成第 041-049 课，能重新编译上一章示例。</li><li>工作目录：<code>~/c-course-labs/050-log-tool</code>。</li><li>第一条命令：macOS / Linux 运行 <code>mkdir -p ~/c-course-labs/050-log-tool &amp;&amp; cd ~/c-course-labs/050-log-tool</code>；Windows PowerShell 运行 <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\050-log-tool&quot;; Set-Location &quot;$HOME\\c-course-labs\\050-log-tool&quot;</code>。</li><li>成功证据：保留源码、可执行文件、<code>evidence.md</code>，并记录输入日志、输出文件、一次文件不存在或权限失败的错误记录。</li><li>本章边界：本章关注文本文件、错误处理和命令行参数；暂不要求数据库、索引或网络同步。</li><li>重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 <code>evidence.md</code> 方便复盘。</li></ul><p>您已经探索了文本和二进制 I/O、缓冲、错误处理和配置。现在是时候将所有内容整合到一个现实世界的实践项目中，即 C 语言的日志读取器和写入器。</p><p>该系统允许您将结构化日志写入文件，然后将其读回，这是服务器、守护程序和调试实用程序等工具的基础。</p><h4 id="项目概况" tabindex="-1">项目概况 <a class="header-anchor" href="#项目概况" aria-label="Permalink to &quot;项目概况&quot;">​</a></h4><p>您将构建一个包含两个主要部分的最小日志系统：</p><p>记录员（作家）：</p><ul><li>将日志消息附加到带有时间戳和级别（INFO、WARN、ERROR）的文件。</li><li>处理文件打开、写入和安全关闭。</li></ul><p>读者：</p><ul><li>逐行读取日志条目。</li><li>按日志级别或关键字过滤。</li></ul><p>该项目教授结构化文件 I/O、格式化输出、解析和简单文本搜索，全部采用干净的 C 语言。</p><h4 id="步骤-1-定义日志格式" tabindex="-1">步骤 1. 定义日志格式 <a class="header-anchor" href="#步骤-1-定义日志格式" aria-label="Permalink to &quot;步骤 1. 定义日志格式&quot;">​</a></h4><p>日志行将如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[2025-10-15 21:00:32] [INFO] Server started</span></span>
<span class="line"><span>[2025-10-15 21:01:05] [WARN] High CPU usage</span></span>
<span class="line"><span>[2025-10-15 21:02:10] [ERROR] Connection failed</span></span></code></pre></div><p>每个条目包括：</p><ul><li>时间戳</li><li>级别（信息/警告/错误）</li><li>留言</li></ul><h4 id="步骤-2-实现记录器" tabindex="-1">步骤 2. 实现记录器 <a class="header-anchor" href="#步骤-2-实现记录器" aria-label="Permalink to &quot;步骤 2. 实现记录器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;time.h&gt;</span></span>
<span class="line"><span>#include &lt;stdarg.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef enum {</span></span>
<span class="line"><span>    INFO,</span></span>
<span class="line"><span>    WARN,</span></span>
<span class="line"><span>    ERROR</span></span>
<span class="line"><span>} LogLevel;</span></span>
<span class="line"><span>const char* level_to_string(LogLevel level) {</span></span>
<span class="line"><span>    switch (level) {</span></span>
<span class="line"><span>        case INFO: return &quot;INFO&quot;;</span></span>
<span class="line"><span>        case WARN: return &quot;WARN&quot;;</span></span>
<span class="line"><span>        case ERROR: return &quot;ERROR&quot;;</span></span>
<span class="line"><span>        default: return &quot;UNKNOWN&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void write_log(FILE *fp, LogLevel level, const char *fmt, ...) {</span></span>
<span class="line"><span>    if (!fp) return;</span></span>
<span class="line"><span>    // Timestamp</span></span>
<span class="line"><span>    time_t t = time(NULL);</span></span>
<span class="line"><span>    struct tm *tm_info = localtime(&amp;t);</span></span>
<span class="line"><span>    char timebuf[32];</span></span>
<span class="line"><span>    strftime(timebuf, sizeof(timebuf), &quot;%Y-%m-%d %H:%M:%S&quot;, tm_info);</span></span>
<span class="line"><span>    // Format message</span></span>
<span class="line"><span>    va_list args;</span></span>
<span class="line"><span>    va_start(args, fmt);</span></span>
<span class="line"><span>    fprintf(fp, &quot;[%s] [%s] &quot;, timebuf, level_to_string(level));</span></span>
<span class="line"><span>    vfprintf(fp, fmt, args);</span></span>
<span class="line"><span>    fprintf(fp, &quot;\\n&quot;);</span></span>
<span class="line"><span>    fflush(fp); // flush immediately for safety</span></span>
<span class="line"><span>    va_end(args);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-3-示例-writer-程序" tabindex="-1">步骤 3. 示例 Writer 程序 <a class="header-anchor" href="#步骤-3-示例-writer-程序" aria-label="Permalink to &quot;步骤 3. 示例 Writer 程序&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    FILE *log = fopen(&quot;system.log&quot;, &quot;a&quot;);</span></span>
<span class="line"><span>    if (!log) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open log file&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    write_log(log, INFO, &quot;System started&quot;);</span></span>
<span class="line"><span>    write_log(log, WARN, &quot;Low disk space on /dev/sda1&quot;);</span></span>
<span class="line"><span>    write_log(log, ERROR, &quot;Failed to connect to database&quot;);</span></span>
<span class="line"><span>    write_log(log, INFO, &quot;Shutdown complete&quot;);</span></span>
<span class="line"><span>    fclose(log);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>运行它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[2025-10-15 21:00:32] [INFO] System started</span></span>
<span class="line"><span>[2025-10-15 21:00:35] [WARN] Low disk space on /dev/sda1</span></span>
<span class="line"><span>[2025-10-15 21:00:38] [ERROR] Failed to connect to database</span></span>
<span class="line"><span>[2025-10-15 21:01:00] [INFO] Shutdown complete</span></span></code></pre></div><h4 id="步骤-4-实施-reader" tabindex="-1">步骤 4. 实施 Reader <a class="header-anchor" href="#步骤-4-实施-reader" aria-label="Permalink to &quot;步骤 4. 实施 Reader&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>void read_logs(const char *filename, const char *filter) {</span></span>
<span class="line"><span>    FILE *fp = fopen(filename, &quot;r&quot;);</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Cannot open log file&quot;);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    char line[256];</span></span>
<span class="line"><span>    while (fgets(line, sizeof(line), fp)) {</span></span>
<span class="line"><span>        if (filter == NULL || strstr(line, filter))</span></span>
<span class="line"><span>            printf(&quot;%s&quot;, line);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>用法示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;All logs:\\n&quot;);</span></span>
<span class="line"><span>    read_logs(&quot;system.log&quot;, NULL);</span></span>
<span class="line"><span>    printf(&quot;\\nOnly errors:\\n&quot;);</span></span>
<span class="line"><span>    read_logs(&quot;system.log&quot;, &quot;ERROR&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>所有日志：</span></span>
<span class="line"><span>[2025-10-15 21:00:32] [INFO] 系统启动</span></span>
<span class="line"><span>[2025-10-15 21:00:35] [警告] /dev/sda1 磁盘空间不足</span></span>
<span class="line"><span>[2025-10-15 21:00:38] [错误] 无法连接到数据库</span></span>
<span class="line"><span>[2025-10-15 21:01:00] [INFO] 关机完成</span></span>
<span class="line"><span></span></span>
<span class="line"><span>仅错误：</span></span>
<span class="line"><span>[2025-10-15 21:00:38] [错误] 无法连接到数据库</span></span></code></pre></div><h4 id="步骤-5-添加命令行界面" tabindex="-1">步骤 5. 添加命令行界面 <a class="header-anchor" href="#步骤-5-添加命令行界面" aria-label="Permalink to &quot;步骤 5. 添加命令行界面&quot;">​</a></h4><p>使用结合这两个功能<code>argc</code>和<code>argv</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(int argc, char *argv[]) {</span></span>
<span class="line"><span>    if (argc &lt; 2) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Usage: %s [write|read] [message/filter]\\n&quot;, argv[0]);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (strcmp(argv[1], &quot;write&quot;) == 0) {</span></span>
<span class="line"><span>        FILE *log = fopen(&quot;system.log&quot;, &quot;a&quot;);</span></span>
<span class="line"><span>        if (!log) {</span></span>
<span class="line"><span>            perror(&quot;open&quot;);</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        write_log(log, INFO, &quot;%s&quot;, argc &gt; 2 ? argv[2] : &quot;Generic log entry&quot;);</span></span>
<span class="line"><span>        fclose(log);</span></span>
<span class="line"><span>    } else if (strcmp(argv[1], &quot;read&quot;) == 0) {</span></span>
<span class="line"><span>        const char *filter = argc &gt; 2 ? argv[2] : NULL;</span></span>
<span class="line"><span>        read_logs(&quot;system.log&quot;, filter);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Invalid command. Use write or read.\\n&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>用法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./logger write &quot;Hello world&quot;</span></span>
<span class="line"><span>./logger read</span></span>
<span class="line"><span>./logger read ERROR</span></span></code></pre></div><h4 id="步骤-6-优雅地处理错误" tabindex="-1">步骤 6. 优雅地处理错误 <a class="header-anchor" href="#步骤-6-优雅地处理错误" aria-label="Permalink to &quot;步骤 6. 优雅地处理错误&quot;">​</a></h4><ul><li>始终检查返回值<code>fopen</code>,<code>fgets</code>， 和<code>fprintf</code>.</li><li>使用<code>perror()</code>用于系统级诊断。</li><li>经常刷新或正确关闭以确保崩溃后日志仍然存在。</li></ul><h4 id="步骤-7-可选增强功能" tabindex="-1">步骤 7. 可选增强功能 <a class="header-anchor" href="#步骤-7-可选增强功能" aria-label="Permalink to &quot;步骤 7. 可选增强功能&quot;">​</a></h4><ul><li>添加日志轮换（在 N 行后重命名或截断）。</li><li>添加日志级别（仅写入高于阈值的日志）。</li><li>实施<code>save_config()</code>从配置文件定义日志文件路径和详细程度。</li><li>添加 UTC 时间戳或毫秒时间戳以确保精度。</li><li>以二进制格式写入日志以提高速度，然后再解析。</li></ul><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>日志记录是一项核心系统功能。该项目强化了：</p><ul><li>结构化文件I/O</li><li>错误处理（<code>errno</code>,<code>perror</code>)</li><li>字符串解析和过滤</li><li>命令行工具设计</li></ul><p>每个基于 C 的系统，从嵌入式设备到 Linux 守护进程，都依赖于某种形式的日志记录。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加一个<code>LogLevel</code>阈值（忽略低于 WARN 的日志）。 2. 实施<code>rotate_logs()</code>重命名<code>system.log</code>到<code>system.log.1</code>当超过100行时。 3. 添加 UTC 时间戳而不是本地时间。 4. 使用<code>argv</code>让用户指定自定义日志文件名。 5. 将日志存储到文件和<code>stderr</code>同时地。</p><p>第 5 章：输入、输出和文件就完成了，这是您旅程中的一个里程碑。您现在可以安全、清晰地处理文本、二进制、流和持久数据。接下来，您将进入第 6 章：编译和构建过程，其中源代码通过预处理、编译、链接和自动化转换为可执行二进制文件。</p>`,45)])])}const h=a(l,[["render",t]]);export{g as __pageData,h as default};
