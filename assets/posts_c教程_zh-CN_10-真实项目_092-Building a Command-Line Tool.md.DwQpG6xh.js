import{_ as s,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"92. 构建命令行工具","description":"The Little Book of C 中文版 — 92. 构建命令行工具","frontmatter":{"title":"92. 构建命令行工具","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","10-真实项目","中文"],"description":"The Little Book of C 中文版 — 92. 构建命令行工具","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":92,"sidebarWeight":92,"alternateZh":"/posts/c教程/zh-CN/10-真实项目/092-Building a Command-Line Tool","alternateEn":"/posts/c教程/en-US/10-Building Real Projects/092-Building a Command-Line Tool"},"headers":[],"relativePath":"posts/c教程/zh-CN/10-真实项目/092-Building a Command-Line Tool.md","filePath":"posts/c教程/zh-CN/10-真实项目/092-Building a Command-Line Tool.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/10-真实项目/092-Building a Command-Line Tool.md"};function i(t,a,o,c,d,r){return n(),e("div",null,[...a[0]||(a[0]=[p(`<p>[English version](/posts/c教程/en-US/10-Building Real Projects/092-Building a Command-Line Tool)</p><p>命令行工具是大多数 C 程序员开始构建真正软件的地方。它们快速、可移植并且能够与类 Unix 环境自然集成。在本节中，您将构建一个小型、独立的 CLI 工具，用于处理输入参数、读取文件并输出结果，与诸如<code>grep</code>,<code>cat</code>， 和<code>wc</code>.</p><h4 id="步骤-1-目标" tabindex="-1">步骤 1. 目标 <a class="header-anchor" href="#步骤-1-目标" aria-label="Permalink to &quot;步骤 1. 目标&quot;">​</a></h4><p>我们将构建一个名为 linestat 的简单命令行工具，它：</p><ul><li>计算文本文件中的行数、单词数和字符数（如迷你文件）<code>wc</code>).</li><li>从文件或标准输入获取输入。</li><li>接受像这样的标志<code>-l</code>,<code>-w</code>,<code>-c</code>.</li><li>使用干净的错误处理和模块化功能。</li></ul><h4 id="步骤-2-项目布局" tabindex="-1">步骤 2. 项目布局 <a class="header-anchor" href="#步骤-2-项目布局" aria-label="Permalink to &quot;步骤 2. 项目布局&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>linestat/</span></span>
<span class="line"><span> ├── linestat.c</span></span>
<span class="line"><span> ├── Makefile</span></span>
<span class="line"><span> └── README.md</span></span></code></pre></div><h4 id="步骤-3-核心概念" tabindex="-1">步骤 3. 核心概念 <a class="header-anchor" href="#步骤-3-核心概念" aria-label="Permalink to &quot;步骤 3. 核心概念&quot;">​</a></h4><p>命令行程序遵循一些永恒的模式：</p><ol><li>阅读论证<code>argc</code>和<code>argv</code>.</li><li>在处理之前验证输入。</li><li>安全地打开文件<code>fopen</code>或使用<code>stdin</code>.</li><li>逐行处理数据。</li><li>清晰、一致地报告结果。</li></ol><h4 id="步骤-4-小代码-linestat-c" tabindex="-1">步骤 4. 小代码：linestat.c <a class="header-anchor" href="#步骤-4-小代码-linestat-c" aria-label="Permalink to &quot;步骤 4. 小代码：linestat.c&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>static void print_usage(const char *prog) {</span></span>
<span class="line"><span>    printf(&quot;Usage: %s [-l] [-w] [-c] [file]\\n&quot;, prog);</span></span>
<span class="line"><span>    printf(&quot;Options:\\n&quot;);</span></span>
<span class="line"><span>    printf(&quot;  -l   count lines\\n&quot;);</span></span>
<span class="line"><span>    printf(&quot;  -w   count words\\n&quot;);</span></span>
<span class="line"><span>    printf(&quot;  -c   count characters\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(int argc, char *argv[]) {</span></span>
<span class="line"><span>    int count_lines = 0, count_words = 0, count_chars = 0;</span></span>
<span class="line"><span>    const char *filename = NULL;</span></span>
<span class="line"><span>    // Parse arguments</span></span>
<span class="line"><span>    for (int i = 1; i &lt; argc; i++) {</span></span>
<span class="line"><span>        if (strcmp(argv[i], &quot;-l&quot;) == 0) count_lines = 1;</span></span>
<span class="line"><span>        else if (strcmp(argv[i], &quot;-w&quot;) == 0) count_words = 1;</span></span>
<span class="line"><span>        else if (strcmp(argv[i], &quot;-c&quot;) == 0) count_chars = 1;</span></span>
<span class="line"><span>        else if (argv[i][0] != &#39;-&#39;) filename = argv[i];</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            print_usage(argv[0]);</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    FILE *fp = filename ? fopen(filename, &quot;r&quot;) : stdin;</span></span>
<span class="line"><span>    if (!fp) {</span></span>
<span class="line"><span>        perror(&quot;Error opening file&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    long lines = 0, words = 0, chars = 0;</span></span>
<span class="line"><span>    int in_word = 0;</span></span>
<span class="line"><span>    int ch;</span></span>
<span class="line"><span>    while ((ch = fgetc(fp)) != EOF) {</span></span>
<span class="line"><span>        chars++;</span></span>
<span class="line"><span>        if (ch == &#39;\\n&#39;) lines++;</span></span>
<span class="line"><span>        if (ch == &#39; &#39; || ch == &#39;\\n&#39; || ch == &#39;\\t&#39;) in_word = 0;</span></span>
<span class="line"><span>        else if (!in_word) { words++; in_word = 1; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fclose(fp);</span></span>
<span class="line"><span>    if (!count_lines &amp;&amp; !count_words &amp;&amp; !count_chars) {</span></span>
<span class="line"><span>        count_lines = count_words = count_chars = 1; // Default all</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (count_lines) printf(&quot;Lines: %ld\\n&quot;, lines);</span></span>
<span class="line"><span>    if (count_words) printf(&quot;Words: %ld\\n&quot;, words);</span></span>
<span class="line"><span>    if (count_chars) printf(&quot;Chars: %ld\\n&quot;, chars);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-5-构建并运行" tabindex="-1">步骤 5. 构建并运行 <a class="header-anchor" href="#步骤-5-构建并运行" aria-label="Permalink to &quot;步骤 5. 构建并运行&quot;">​</a></h4><p>生成文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CC = gcc</span></span>
<span class="line"><span>CFLAGS = -std=c23 -O2 -Wall -Wextra</span></span>
<span class="line"><span>linestat: linestat.c</span></span>
<span class="line"><span>    $(CC) $(CFLAGS) linestat.c -o linestat</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>    rm -f linestat</span></span></code></pre></div><p>构建它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>make</span></span></code></pre></div><p>运行它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./linestat -l -w -c example.txt</span></span></code></pre></div><p>或者从管道：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat example.txt | ./linestat -w</span></span></code></pre></div><p>输出示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Lines: 12</span></span>
<span class="line"><span>Words: 85</span></span>
<span class="line"><span>Chars: 430</span></span></code></pre></div><h4 id="第-6-步-分解代码" tabindex="-1">第 6 步：分解代码 <a class="header-anchor" href="#第-6-步-分解代码" aria-label="Permalink to &quot;第 6 步：分解代码&quot;">​</a></h4><ul><li>参数解析：循环<code>argv</code>检测标志。</li><li>输入处理：读取<code>stdin</code>当没有给出文件时。</li><li>计数逻辑：跟踪空格和字符之间的转换以计算单词数。</li><li>优雅退出：用途<code>fclose</code>和<code>perror</code>用于错误报告。</li><li>默认行为：当没有传递任何标志时，将打印所有计数。</li></ul><h4 id="第-7-步-使其更加稳健" tabindex="-1">第 7 步：使其更加稳健 <a class="header-anchor" href="#第-7-步-使其更加稳健" aria-label="Permalink to &quot;第 7 步：使其更加稳健&quot;">​</a></h4><p>您可以轻松扩展该程序：</p><p>添加<code>-q</code>用于安静模式（仅打印总计）。</p><p>添加<code>--help</code>获取扩展使用信息。</p><p>使用<code>getline()</code>用于读取整行（C POSIX）。</p><p>在一行中并排打印计数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>12  85  430  example.txt</span></span></code></pre></div><h4 id="步骤-8-跨平台注意事项" tabindex="-1">步骤 8. 跨平台注意事项 <a class="header-anchor" href="#步骤-8-跨平台注意事项" aria-label="Permalink to &quot;步骤 8. 跨平台注意事项&quot;">​</a></h4><ul><li>使用<code>#ifdef _WIN32</code>处理文件路径和换行符差异。</li><li>始终以文本模式打开文件：<code>fopen(filename, &quot;r&quot;)</code>.</li><li>使用<code>size_t</code>而不是<code>long</code>为了便携性。</li></ul><h4 id="第-9-步-为什么它很重要" tabindex="-1">第 9 步：为什么它很重要 <a class="header-anchor" href="#第-9-步-为什么它很重要" aria-label="Permalink to &quot;第 9 步：为什么它很重要&quot;">​</a></h4><p>编写 CLI 可以教授关键的系统技能：</p><ul><li>参数解析和 I/O</li><li>文件处理和错误检查</li><li>性能思维（流、缓冲）</li><li>面向未来功能的模块化设计</li></ul><p>每个用 C 语言编写的开发人员最终都会编写 CLI，这就是 Git、Curl 和 GCC 等工具的诞生。</p><h4 id="第-10-步-亲自尝试一下" tabindex="-1">第 10 步：亲自尝试一下 <a class="header-anchor" href="#第-10-步-亲自尝试一下" aria-label="Permalink to &quot;第 10 步：亲自尝试一下&quot;">​</a></h4><p>1.添加一个<code>-v</code>显示程序版本的标志。 2.支持读取多个文件。 3.添加计时（使用<code>clock()</code>来测量运行时间）。 4. 打印所有文件的总计。 5. 集成您的简单数学库来计算每行的平均单词数。</p><p>接下来，您将转向 93. 微型 HTTP 服务器（套接字和线程），在这里您的命令行技能将发展为网络编程：接受连接、处理请求以及用纯 C 语言提供内容。</p>`,41)])])}const g=s(l,[["render",i]]);export{u as __pageData,g as default};
