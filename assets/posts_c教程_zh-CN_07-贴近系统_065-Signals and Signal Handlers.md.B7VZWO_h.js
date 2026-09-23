import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const r=JSON.parse('{"title":"65. 信号和信号处理程序","description":"The Little Book of C 中文版 — 65. 信号和信号处理程序","frontmatter":{"title":"65. 信号和信号处理程序","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 65. 信号和信号处理程序","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":65,"sidebarWeight":65,"alternateZh":"/posts/c教程/zh-CN/07-贴近系统/065-Signals and Signal Handlers","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/065-Signals and Signal Handlers.md","filePath":"posts/c教程/zh-CN/07-贴近系统/065-Signals and Signal Handlers.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/07-贴近系统/065-Signals and Signal Handlers.md"};function l(t,s,d,c,o,h){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/065-Signals and Signal Handlers)</p><p>当您按下 Ctrl+C 并且程序停止时，这不是魔法，而是一个信号。信号是操作系统如何告诉您的进程发生了一些重要的事情。</p><p>它们是来自内核或其他进程的异步轻量级消息。您的 C 程序可以捕获、忽略或处理它们，从而使您可以完全控制关闭、中断和错误。</p><h4 id="步骤-1-什么是信号" tabindex="-1">步骤 1. 什么是信号？ <a class="header-anchor" href="#步骤-1-什么是信号" aria-label="Permalink to &quot;步骤 1. 什么是信号？&quot;">​</a></h4><p>信号是发送到进程以通知其事件的整数代码。</p><table tabindex="0"><thead><tr><th>信号</th><th>意义</th><th>默认操作</th></tr></thead><tbody><tr><td><code>SIGINT</code></td><td>中断 (Ctrl+C)</td><td>终止</td></tr><tr><td><code>SIGTERM</code></td><td>终止请求</td><td>终止</td></tr><tr><td><code>SIGKILL</code></td><td>强行击杀（抓不到）</td><td>立即终止</td></tr><tr><td><code>SIGSEGV</code></td><td>无效的内存访问</td><td>核心转储</td></tr><tr><td><code>SIGCHLD</code></td><td>子进程退出</td><td>忽略或处理</td></tr><tr><td><code>SIGALRM</code></td><td>计时器到期</td><td>终止</td></tr><tr><td><code>SIGUSR1</code>,<code>SIGUSR2</code></td><td>用户定义</td><td>终止（除非处理）</td></tr></tbody></table><p>您可以列出所有信号：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kill -l</span></span></code></pre></div><p>输出示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1) SIGHUP  2) SIGINT  3) SIGQUIT  9) SIGKILL  15) SIGTERM  ...</span></span></code></pre></div><h4 id="步骤-2-发送信号" tabindex="-1">步骤 2. 发送信号 <a class="header-anchor" href="#步骤-2-发送信号" aria-label="Permalink to &quot;步骤 2. 发送信号&quot;">​</a></h4><p>任何进程都可以使用以下命令向另一个进程发送信号<code>kill()</code>系统调用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = getpid();</span></span>
<span class="line"><span>    printf(&quot;My PID: %d\\n&quot;, pid);</span></span>
<span class="line"><span>    pause();  // wait for signal</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在一个终端中运行此命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./signal_wait</span></span></code></pre></div><p>然后在另一个：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kill -SIGUSR1 &lt;pid&gt;</span></span></code></pre></div><p>该程序将从中唤醒<code>pause()</code>并终止（SIGUSR1 的默认行为）。</p><h4 id="步骤-3-安装信号处理程序" tabindex="-1">步骤 3. 安装信号处理程序 <a class="header-anchor" href="#步骤-3-安装信号处理程序" aria-label="Permalink to &quot;步骤 3. 安装信号处理程序&quot;">​</a></h4><p>您可以通过安装处理程序函数来覆盖默认操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>void handle_sigint(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\nCaught signal %d (SIGINT). Exiting gracefully.\\n&quot;, sig);</span></span>
<span class="line"><span>    _exit(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, handle_sigint);</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;Running... Press Ctrl+C to stop.\\n&quot;);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc sigint_demo.c -o sigint_demo</span></span>
<span class="line"><span>./sigint_demo</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Running... Press Ctrl+C to stop.</span></span>
<span class="line"><span>Running... Press Ctrl+C to stop.</span></span>
<span class="line"><span>^C</span></span>
<span class="line"><span>Caught signal 2 (SIGINT). Exiting gracefully.</span></span></code></pre></div><h4 id="步骤-4-使用-sigaction-现代-api" tabindex="-1">步骤 4. 使用 sigaction()（现代 API） <a class="header-anchor" href="#步骤-4-使用-sigaction-现代-api" aria-label="Permalink to &quot;步骤 4. 使用 sigaction()（现代 API）&quot;">​</a></h4><p><code>signal()</code>简单但跨系统不一致。推荐的现代界面是<code>sigaction()</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>void handler(int sig) {</span></span>
<span class="line"><span>    write(STDOUT_FILENO, &quot;Caught signal\\n&quot;, 14);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    struct sigaction sa = {0};</span></span>
<span class="line"><span>    sa.sa_handler = handler;</span></span>
<span class="line"><span>    sigaction(SIGUSR1, &amp;sa, NULL);</span></span>
<span class="line"><span>    printf(&quot;PID: %d\\n&quot;, getpid());</span></span>
<span class="line"><span>    while (1) pause();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>发送信号：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kill -SIGUSR1 &lt;pid&gt;</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Caught signal</span></span></code></pre></div><p>不像<code>signal()</code>，这个版本是可靠且可重入安全的（您只能调用异步安全函数，例如<code>write()</code>内部处理程序）。</p><h4 id="步骤-5-忽略并重置信号" tabindex="-1">步骤 5. 忽略并重置信号 <a class="header-anchor" href="#步骤-5-忽略并重置信号" aria-label="Permalink to &quot;步骤 5. 忽略并重置信号&quot;">​</a></h4><p>您可以忽略信号：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>signal(SIGINT, SIG_IGN);</span></span></code></pre></div><p>或者重置为默认行为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>signal(SIGINT, SIG_DFL);</span></span></code></pre></div><p>如果您不希望 Ctrl+C 中断代码的某些部分，这会很有用。</p><h4 id="步骤-6-向其他进程发送信号" tabindex="-1">步骤 6. 向其他进程发送信号 <a class="header-anchor" href="#步骤-6-向其他进程发送信号" aria-label="Permalink to &quot;步骤 6. 向其他进程发送信号&quot;">​</a></h4><p>示例：父母向其孩子发出信号。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>void child_handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;Child got signal %d\\n&quot;, sig);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        signal(SIGUSR1, child_handler);</span></span>
<span class="line"><span>        while (1) pause();</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>        printf(&quot;Parent sending SIGUSR1\\n&quot;);</span></span>
<span class="line"><span>        kill(pid, SIGUSR1);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>        kill(pid, SIGTERM);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parent sending SIGUSR1</span></span>
<span class="line"><span>Child got signal 10</span></span></code></pre></div><h4 id="步骤-7-阻塞和解除阻塞信号" tabindex="-1">步骤 7. 阻塞和解除阻塞信号 <a class="header-anchor" href="#步骤-7-阻塞和解除阻塞信号" aria-label="Permalink to &quot;步骤 7. 阻塞和解除阻塞信号&quot;">​</a></h4><p>有时您想延迟信号处理。您可以使用<code>sigprocmask()</code>暂时阻止信号。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    sigset_t set;</span></span>
<span class="line"><span>    sigemptyset(&amp;set);</span></span>
<span class="line"><span>    sigaddset(&amp;set, SIGINT);</span></span>
<span class="line"><span>    sigprocmask(SIG_BLOCK, &amp;set, NULL);</span></span>
<span class="line"><span>    printf(&quot;SIGINT blocked for 5 seconds...\\n&quot;);</span></span>
<span class="line"><span>    sleep(5);</span></span>
<span class="line"><span>    printf(&quot;Unblocking now.\\n&quot;);</span></span>
<span class="line"><span>    sigprocmask(SIG_UNBLOCK, &amp;set, NULL);</span></span>
<span class="line"><span>    while (1) pause();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在块期间按 Ctrl+C，没有任何反应。一旦解除阻塞，它就会正常终止。</p><h4 id="步骤-8-带有alarm-和sigalrm的定时器" tabindex="-1">步骤 8.带有alarm()和SIGALRM的定时器 <a class="header-anchor" href="#步骤-8-带有alarm-和sigalrm的定时器" aria-label="Permalink to &quot;步骤 8.带有alarm()和SIGALRM的定时器&quot;">​</a></h4><p>您可以设置一个计时器，在延迟后发送信号。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>void handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;Timer expired!\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGALRM, handler);</span></span>
<span class="line"><span>    alarm(3);  // after 3 seconds, send SIGALRM</span></span>
<span class="line"><span>    printf(&quot;Waiting...\\n&quot;);</span></span>
<span class="line"><span>    pause();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Waiting...</span></span>
<span class="line"><span>Timer expired!</span></span></code></pre></div><h4 id="步骤-9-退出时清理" tabindex="-1">步骤 9. 退出时清理 <a class="header-anchor" href="#步骤-9-退出时清理" aria-label="Permalink to &quot;步骤 9. 退出时清理&quot;">​</a></h4><p>信号可让您实现优雅的清理（例如，关闭文件、删除临时文件）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>void cleanup(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\nCleaning up before exit...\\n&quot;);</span></span>
<span class="line"><span>    unlink(&quot;tempfile.tmp&quot;);</span></span>
<span class="line"><span>    _exit(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, cleanup);</span></span>
<span class="line"><span>    open(&quot;tempfile.tmp&quot;, O_CREAT | O_WRONLY, 0644);</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;Running... (Ctrl+C to exit)\\n&quot;);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在按 Ctrl+C 可以安全地删除临时文件。</p><h4 id="小代码-优雅关闭服务器" tabindex="-1">小代码：优雅关闭服务器 <a class="header-anchor" href="#小代码-优雅关闭服务器" aria-label="Permalink to &quot;小代码：优雅关闭服务器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>volatile sig_atomic_t running = 1;</span></span>
<span class="line"><span>void stop(int sig) {</span></span>
<span class="line"><span>    running = 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, stop);</span></span>
<span class="line"><span>    printf(&quot;Server running. Press Ctrl+C to stop.\\n&quot;);</span></span>
<span class="line"><span>    while (running) {</span></span>
<span class="line"><span>        printf(&quot;Handling request...\\n&quot;);</span></span>
<span class="line"><span>        sleep(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Server shutting down cleanly.\\n&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p>信号对于以下方面至关重要：</p><ul><li>优雅终止（Ctrl+C）</li><li>超时和警报</li><li>子进程监控（<code>SIGCHLD</code>)</li><li>错误处理（分段错误）</li><li>守护进程和服务器控制</li></ul><p>每个现实世界的 Unix 程序，从编辑器到 Web 服务器，都依赖于正确的信号处理来保证稳定性。</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>编写一个程序，忽略 SIGINT 5 秒钟，然后恢复默认行为。</li><li>捕获 SIGTERM 并打印“Termination requests”。</li><li>让父进程每秒向其子进程发送 SIGUSR1。</li><li>使用<code>alarm()</code>实现用户输入超时。</li><li>在 shell 中添加一个信号处理程序，以便在退出前清理子进程。</li></ol><p>接下来，您将学习程序如何直接共享和映射内存，使用<code>mmap()</code>，一个为数据库、共享内存和文件支持的数据结构提供支持的系统调用。</p>`,66)])])}const u=a(i,[["render",l]]);export{r as __pageData,u as default};
