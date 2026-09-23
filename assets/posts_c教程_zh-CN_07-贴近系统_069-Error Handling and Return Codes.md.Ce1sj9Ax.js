import{_ as a,o as n,c as e,a5 as p}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"69. 错误处理和返回代码","description":"The Little Book of C 中文版 — 69. 错误处理和返回代码","frontmatter":{"title":"69. 错误处理和返回代码","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 69. 错误处理和返回代码","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":69,"sidebarWeight":69,"alternateZh":"/posts/c教程/zh-CN/07-贴近系统/069-Error Handling and Return Codes","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/069-Error Handling and Return Codes"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/069-Error Handling and Return Codes.md","filePath":"posts/c教程/zh-CN/07-贴近系统/069-Error Handling and Return Codes.md","lastUpdated":1790163617000}'),t={name:"posts/c教程/zh-CN/07-贴近系统/069-Error Handling and Return Codes.md"};function i(l,s,o,c,d,r){return n(),e("div",null,[...s[0]||(s[0]=[p(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/069-Error Handling and Return Codes)</p><p>每个 C 程序，从最小的脚本到 Linux 内核本身，都依赖于错误代码和返回值来传达成功或失败。与高级语言不同，C 没有例外，只有清晰、明确的状态代码和<code>errno</code>.</p><p>掌握这些模式将使您的程序健壮、可预测且专业。</p><h4 id="步骤-1-退出代码和-main" tabindex="-1">步骤 1. 退出代码和 main() <a class="header-anchor" href="#步骤-1-退出代码和-main" aria-label="Permalink to &quot;步骤 1. 退出代码和 main()&quot;">​</a></h4><p>每个进程都会向操作系统返回一个整数退出代码。按照惯例：</p><p>-<code>0</code>→ 成功</p><ul><li>非零 → 失败或特定错误</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;Everything OK!\\n&quot;);</span></span>
<span class="line"><span>    return 0; // exit success</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在你的 shell 中检查它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./program</span></span>
<span class="line"><span>echo $?</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Everything OK!</span></span>
<span class="line"><span>0</span></span></code></pre></div><p>如果返回非零值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return 1;</span></span></code></pre></div><p>然后<code>$?</code>将<code>1</code>，意味着失败。</p><h4 id="步骤-2-使用-exit-success-和-exit-failure" tabindex="-1">步骤 2. 使用 EXIT_SUCCESS 和 EXIT_FAILURE <a class="header-anchor" href="#步骤-2-使用-exit-success-和-exit-failure" aria-label="Permalink to &quot;步骤 2. 使用 EXIT_SUCCESS 和 EXIT_FAILURE&quot;">​</a></h4><p>使用标准宏代替硬编码数字<code>&lt;stdlib.h&gt;</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;Failed to open file.\\n&quot;);</span></span>
<span class="line"><span>    return EXIT_FAILURE;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这些提高了可移植性和可读性。</p><h4 id="步骤-3-全局错误号" tabindex="-1">步骤 3. 全局错误号 <a class="header-anchor" href="#步骤-3-全局错误号" aria-label="Permalink to &quot;步骤 3. 全局错误号&quot;">​</a></h4><p>当库或系统调用失败时，它通常会设置一个名为的全局变量<code>errno</code>。它声明于<code>&lt;errno.h&gt;</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;errno.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;nonexistent.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    if (fd == -1) {</span></span>
<span class="line"><span>        printf(&quot;Error opening file: %s\\n&quot;, strerror(errno));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Error opening file: No such file or directory</span></span></code></pre></div><p><code>errno</code>存储一个整数代码，但是<code>strerror()</code>将其转换为可读的消息。</p><h4 id="步骤-4-常见-errno-值" tabindex="-1">步骤 4. 常见 errno 值 <a class="header-anchor" href="#步骤-4-常见-errno-值" aria-label="Permalink to &quot;步骤 4. 常见 errno 值&quot;">​</a></h4><table tabindex="0"><thead><tr><th>代码</th><th>宏</th><th>意义</th></tr></thead><tbody><tr><td>2</td><td><code>ENOENT</code></td><td>没有这样的文件或目录</td></tr><tr><td>13</td><td><code>EACCES</code></td><td>权限被拒绝</td></tr><tr><td>12</td><td><code>ENOMEM</code></td><td>内存不足</td></tr><tr><td>22</td><td><code>EINVAL</code></td><td>无效参数</td></tr><tr><td>9</td><td><code>EBADF</code></td><td>错误的文件描述符</td></tr><tr><td>11</td><td><code>EAGAIN</code></td><td>资源暂时不可用</td></tr></tbody></table><p>您可以直接检查它们：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (errno == EACCES) { ... }</span></span></code></pre></div><h4 id="步骤-5-perror-函数" tabindex="-1">步骤 5. perror() 函数 <a class="header-anchor" href="#步骤-5-perror-函数" aria-label="Permalink to &quot;步骤 5. perror() 函数&quot;">​</a></h4><p>打印错误消息的更简单方法是<code>perror()</code>，它会自动使用当前<code>errno</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fd = open(&quot;nothing.txt&quot;, O_RDONLY);</span></span>
<span class="line"><span>    if (fd == -1) {</span></span>
<span class="line"><span>        perror(&quot;open&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>open: No such file or directory</span></span></code></pre></div><h4 id="步骤-6-返回有意义的代码" tabindex="-1">步骤 6. 返回有意义的代码 <a class="header-anchor" href="#步骤-6-返回有意义的代码" aria-label="Permalink to &quot;步骤 6. 返回有意义的代码&quot;">​</a></h4><p>好的 C 程序将内部错误转换为有意义的退出代码。</p><p>示例：文件复制程序</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>int main(int argc, char *argv[]) {</span></span>
<span class="line"><span>    if (argc != 3) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Usage: %s src dest\\n&quot;, argv[0]);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    FILE *src = fopen(argv[1], &quot;r&quot;);</span></span>
<span class="line"><span>    if (!src) {</span></span>
<span class="line"><span>        perror(&quot;fopen src&quot;);</span></span>
<span class="line"><span>        return 2;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    FILE *dst = fopen(argv[2], &quot;w&quot;);</span></span>
<span class="line"><span>    if (!dst) {</span></span>
<span class="line"><span>        perror(&quot;fopen dst&quot;);</span></span>
<span class="line"><span>        fclose(src);</span></span>
<span class="line"><span>        return 3;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    fclose(src);</span></span>
<span class="line"><span>    fclose(dst);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在，每个退出代码代表一种特定类型的故障。</p><h4 id="步骤-7-重置并检查-errno" tabindex="-1">步骤 7. 重置并检查 errno <a class="header-anchor" href="#步骤-7-重置并检查-errno" aria-label="Permalink to &quot;步骤 7. 重置并检查 errno&quot;">​</a></h4><p>一些系统调用设置<code>errno</code>只有当他们失败时。因此，如果您打算稍后检查它，请务必在使用前重置它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;errno.h&gt;</span></span>
<span class="line"><span>errno = 0;</span></span>
<span class="line"><span>if (some_syscall() == -1) {</span></span>
<span class="line"><span>    perror(&quot;syscall failed&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-8-自定义错误处理助手" tabindex="-1">步骤 8. 自定义错误处理助手 <a class="header-anchor" href="#步骤-8-自定义错误处理助手" aria-label="Permalink to &quot;步骤 8. 自定义错误处理助手&quot;">​</a></h4><p>您可以创建自己的函数来简化错误处理。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>void die(const char *msg) {</span></span>
<span class="line"><span>    perror(msg);</span></span>
<span class="line"><span>    exit(EXIT_FAILURE);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    FILE *f = fopen(&quot;no.txt&quot;, &quot;r&quot;);</span></span>
<span class="line"><span>    if (!f) die(&quot;fopen&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fopen: No such file or directory</span></span></code></pre></div><p>这种模式出现在整个 Unix 实用程序中。</p><h4 id="步骤-9-处理部分故障" tabindex="-1">步骤 9. 处理部分故障 <a class="header-anchor" href="#步骤-9-处理部分故障" aria-label="Permalink to &quot;步骤 9. 处理部分故障&quot;">​</a></h4><p>并非所有错误都应该中止您的程序。有时您应该记录、重试或忽略。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FILE *f = fopen(&quot;optional.conf&quot;, &quot;r&quot;);</span></span>
<span class="line"><span>if (!f) {</span></span>
<span class="line"><span>    fprintf(stderr, &quot;Warning: config file missing, using defaults.\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这种优雅的降级是很好的设计。</p><h4 id="步骤-10-小代码-安全文件阅读器" tabindex="-1">步骤 10. 小代码：安全文件阅读器 <a class="header-anchor" href="#步骤-10-小代码-安全文件阅读器" aria-label="Permalink to &quot;步骤 10. 小代码：安全文件阅读器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;errno.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    FILE *f = fopen(&quot;data.txt&quot;, &quot;r&quot;);</span></span>
<span class="line"><span>    if (!f) {</span></span>
<span class="line"><span>        fprintf(stderr, &quot;Error: %s\\n&quot;, strerror(errno));</span></span>
<span class="line"><span>        return EXIT_FAILURE;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    char buf[64];</span></span>
<span class="line"><span>    while (fgets(buf, sizeof(buf), f))</span></span>
<span class="line"><span>        printf(&quot;%s&quot;, buf);</span></span>
<span class="line"><span>    fclose(f);</span></span>
<span class="line"><span>    return EXIT_SUCCESS;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出（如果缺少文件）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Error: No such file or directory</span></span></code></pre></div><h4 id="为什么它很重要" tabindex="-1">为什么它很重要 <a class="header-anchor" href="#为什么它很重要" aria-label="Permalink to &quot;为什么它很重要&quot;">​</a></h4><p>错误处理将玩具程序与真实软件分开：</p><ul><li>每个系统调用都可能失败，请做好准备。</li><li>始终检查返回值。</li><li>始终报告失败的原因。</li></ul><p>按照惯例：</p><ul><li>返回<code>0</code>关于成功。</li><li>对于可恢复或致命错误返回非零值。</li><li>打印消息至<code>stderr</code>， 不是<code>stdout</code>.</li></ul><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>打开一个不存在的文件并打印完整的文件<code>errno</code>价值。</li><li>构建一个小型实用程序，为特定问题返回特定代码。</li><li>使用<code>perror()</code>与<code>strerror()</code>并比较他们的输出。</li><li>添加一个<code>die()</code>帮助你之前的练习。</li><li>编写一个安全包装器，在以下情况下重试系统调用：<code>errno == EAGAIN</code>.</li></ol><p>接下来，您将在练习 70：用 C 语言构建 Mini Shell 中将所有这些内容放在一起，其中您将处理进程、管道和信号以创建您自己的工作 Unix shell 原型。</p>`,64)])])}const g=a(t,[["render",i]]);export{u as __pageData,g as default};
