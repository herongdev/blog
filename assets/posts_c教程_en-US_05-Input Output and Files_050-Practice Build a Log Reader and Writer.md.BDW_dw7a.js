import{_ as s,o as n,c as e,a5 as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"50. Practice: Build a Log Reader and Writer","description":"The Little Book of C — 50. Practice: Build a Log Reader and Writer","frontmatter":{"title":"50. Practice: Build a Log Reader and Writer","date":"2026-07-04","categories":"[C 教程]","tags":"[C, Little Book of C, Input Output and Files]","description":"The Little Book of C — 50. Practice: Build a Log Reader and Writer","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":"50","sidebarWeight":"50","lang":"en-US","alternateEn":"/posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer","alternateZh":"/posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer"},"headers":[],"relativePath":"posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer.md","filePath":"posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer.md"};function p(i,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[l(`<p>[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer)</p><h4 id="follow-along-deliverable" tabindex="-1">Follow-Along Deliverable <a class="header-anchor" href="#follow-along-deliverable" aria-label="Permalink to &quot;Follow-Along Deliverable&quot;">​</a></h4><ul><li>Assumed state: lessons 041-049 are complete and you can rebuild the previous example.</li><li>Working directory: <code>~/c-course-labs/050-log-tool</code>.</li><li>First command: on macOS / Linux run <code>mkdir -p ~/c-course-labs/050-log-tool &amp;&amp; cd ~/c-course-labs/050-log-tool</code>; on Windows PowerShell run <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\050-log-tool&quot;; Set-Location &quot;$HOME\\c-course-labs\\050-log-tool&quot;</code>.</li><li>Success evidence: keep the source file, executable, <code>evidence.md</code>, and record input log, output file, and one missing-file or permission failure record.</li><li>Boundary for this lab: This lab focuses on text files, error handling, and command-line arguments. Databases, indexes, and network sync are out of scope.</li><li>Reset: remove the executable, temporary data, and generated output for this lab; keep source and <code>evidence.md</code> for review.</li></ul><p>You’ve explored text and binary I/O, buffering, error handling, and configuration. Now it’s time to bring everything together in one real-world practice project, a Log Reader and Writer in C.</p><p>This system will let you write structured logs to a file and later read them back, a foundation for tools like servers, daemons, and debugging utilities.</p><h4 id="project-overview" tabindex="-1">Project Overview <a class="header-anchor" href="#project-overview" aria-label="Permalink to &quot;Project Overview&quot;">​</a></h4><p>You’ll build a minimal logging system with two main parts:</p><p>Logger (Writer):</p><ul><li>Appends log messages to a file with timestamps and levels (INFO, WARN, ERROR).</li><li>Handles file opening, writing, and safe closure.</li></ul><p>Reader:</p><ul><li>Reads log entries line by line.</li><li>Filters by log level or keyword.</li></ul><p>This project teaches structured file I/O, formatted output, parsing, and simple text search, all in clean C.</p><h4 id="step-1-define-the-log-format" tabindex="-1">Step 1. Define the Log Format <a class="header-anchor" href="#step-1-define-the-log-format" aria-label="Permalink to &quot;Step 1. Define the Log Format&quot;">​</a></h4><p>A log line will look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[2025-10-15 21:00:32] [INFO] Server started</span></span>
<span class="line"><span>[2025-10-15 21:01:05] [WARN] High CPU usage</span></span>
<span class="line"><span>[2025-10-15 21:02:10] [ERROR] Connection failed</span></span></code></pre></div><p>Each entry includes:</p><ul><li>Timestamp</li><li>Level (INFO/WARN/ERROR)</li><li>Message</li></ul><h4 id="step-2-implement-the-logger" tabindex="-1">Step 2. Implement the Logger <a class="header-anchor" href="#step-2-implement-the-logger" aria-label="Permalink to &quot;Step 2. Implement the Logger&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h4 id="step-3-example-writer-program" tabindex="-1">Step 3. Example Writer Program <a class="header-anchor" href="#step-3-example-writer-program" aria-label="Permalink to &quot;Step 3. Example Writer Program&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Run it:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[2025-10-15 21:00:32] [INFO] System started</span></span>
<span class="line"><span>[2025-10-15 21:00:35] [WARN] Low disk space on /dev/sda1</span></span>
<span class="line"><span>[2025-10-15 21:00:38] [ERROR] Failed to connect to database</span></span>
<span class="line"><span>[2025-10-15 21:01:00] [INFO] Shutdown complete</span></span></code></pre></div><h4 id="step-4-implement-the-reader" tabindex="-1">Step 4. Implement the Reader <a class="header-anchor" href="#step-4-implement-the-reader" aria-label="Permalink to &quot;Step 4. Implement the Reader&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Example usage:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;All logs:\\n&quot;);</span></span>
<span class="line"><span>    read_logs(&quot;system.log&quot;, NULL);</span></span>
<span class="line"><span>    printf(&quot;\\nOnly errors:\\n&quot;);</span></span>
<span class="line"><span>    read_logs(&quot;system.log&quot;, &quot;ERROR&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>All logs:</span></span>
<span class="line"><span>[2025-10-15 21:00:32] [INFO] System started</span></span>
<span class="line"><span>[2025-10-15 21:00:35] [WARN] Low disk space on /dev/sda1</span></span>
<span class="line"><span>[2025-10-15 21:00:38] [ERROR] Failed to connect to database</span></span>
<span class="line"><span>[2025-10-15 21:01:00] [INFO] Shutdown complete</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Only errors:</span></span>
<span class="line"><span>[2025-10-15 21:00:38] [ERROR] Failed to connect to database</span></span></code></pre></div><h4 id="step-5-add-command-line-interface" tabindex="-1">Step 5. Add Command-Line Interface <a class="header-anchor" href="#step-5-add-command-line-interface" aria-label="Permalink to &quot;Step 5. Add Command-Line Interface&quot;">​</a></h4><p>Combine both features using<code>argc</code> and<code>argv</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int main(int argc, char *argv[]) {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>Usage:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./logger write &quot;Hello world&quot;</span></span>
<span class="line"><span>./logger read</span></span>
<span class="line"><span>./logger read ERROR</span></span></code></pre></div><h4 id="step-6-handling-errors-gracefully" tabindex="-1">Step 6. Handling Errors Gracefully <a class="header-anchor" href="#step-6-handling-errors-gracefully" aria-label="Permalink to &quot;Step 6. Handling Errors Gracefully&quot;">​</a></h4><ul><li>Always check return values from<code>fopen</code>,<code>fgets</code>, and<code>fprintf</code>.</li><li>Use<code>perror()</code> for system-level diagnostics.</li><li>Flush frequently or close properly to ensure logs persist after crashes.</li></ul><h4 id="step-7-optional-enhancements" tabindex="-1">Step 7. Optional Enhancements <a class="header-anchor" href="#step-7-optional-enhancements" aria-label="Permalink to &quot;Step 7. Optional Enhancements&quot;">​</a></h4><ul><li>Add log rotation (rename or truncate after N lines).</li><li>Add log levels (only write logs above a threshold).</li><li>Implement<code>save_config()</code> to define a log file path and verbosity from a config file.</li><li>Add timestamps in UTC or with milliseconds for precision.</li><li>Write logs in binary format for higher speed, then parse later.</li></ul><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>Logging is a core system capability. This project reinforces:</p><ul><li>Structured file I/O</li><li>Error handling (<code>errno</code>,<code>perror</code>)</li><li>String parsing and filtering</li><li>Command-line tool design</li></ul><p>Every C-based system, from embedded devices to Linux daemons, relies on some form of logging.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Add a<code>LogLevel</code> threshold (ignore logs below WARN).</li><li>Implement a<code>rotate_logs()</code> that renames<code>system.log</code> to<code>system.log.1</code> when it exceeds 100 lines.</li><li>Add timestamps in UTC instead of localtime.</li><li>Use<code>argv</code> to let users specify a custom log file name.</li><li>Store logs both to file and to<code>stderr</code> simultaneously.</li></ol><p>This completes Chapter 5: Input, Output, and Files, a milestone in your journey. You can now handle text, binary, streams, and persistent data with safety and clarity. Next, you’ll step into Chapter 6: Compilation and the Build Process, where source code transforms into executable binaries through preprocessing, compilation, linking, and automation.</p>`,45)])])}const h=s(t,[["render",p]]);export{g as __pageData,h as default};
