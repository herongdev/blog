import{_ as a,o as n,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const r=JSON.parse('{"title":"64. 管道和重定向","description":"The Little Book of C 中文版 — 64. 管道和重定向","frontmatter":{"title":"64. 管道和重定向","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 64. 管道和重定向","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":64,"sidebarWeight":64,"alternateZh":"/posts/c教程/zh-CN/07-贴近系统/064-Pipes and Redirection","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/064-Pipes and Redirection"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/064-Pipes and Redirection.md","filePath":"posts/c教程/zh-CN/07-贴近系统/064-Pipes and Redirection.md","lastUpdated":1790163617000}'),i={name:"posts/c教程/zh-CN/07-贴近系统/064-Pipes and Redirection.md"};function l(t,s,c,o,d,h){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/064-Pipes and Redirection)</p><p>现在您可以使用文件描述符进行读写，您可以连接两个进程，使一个进程的输出成为另一个进程的输入，就像<code>ls | grep c</code>在一个壳里。</p><p>这种魔力是通过管道发生的，管道是 Unix 最简单、最优雅的进程间通信 (IPC) 机制之一。</p><h4 id="步骤-1-什么是管道" tabindex="-1">步骤 1. 什么是管道？ <a class="header-anchor" href="#步骤-1-什么是管道" aria-label="Permalink to &quot;步骤 1. 什么是管道？&quot;">​</a></h4><p>管道是两个文件描述符之间的单向数据通道，一个用于读取，一个用于写入。</p><p>在外壳中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ls | grep main</span></span></code></pre></div><p>相当于：</p><ul><li>过程A（<code>ls</code>) 写入管道。</li><li>过程B（<code>grep</code>) 从管道中读取。</li></ul><p>在 C 中，您可以使用以下命令执行相同的操作<code>pipe()</code>和<code>fork()</code>.</p><h4 id="步骤-2-创建管道" tabindex="-1">步骤 2. 创建管道 <a class="header-anchor" href="#步骤-2-创建管道" aria-label="Permalink to &quot;步骤 2. 创建管道&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fds[2];</span></span>
<span class="line"><span>    if (pipe(fds) == -1) {</span></span>
<span class="line"><span>        perror(&quot;pipe failed&quot;);</span></span>
<span class="line"><span>        return 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Read end: %d, Write end: %d\\n&quot;, fds[0], fds[1]);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc pipe_demo.c -o pipe_demo</span></span>
<span class="line"><span>./pipe_demo</span></span></code></pre></div><p>输出示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Read end: 3, Write end: 4</span></span></code></pre></div><p>您现在有两个连接的文件描述符：</p><p>-<code>fds[0]</code>: 读完 -<code>fds[1]</code>: 写结束</p><p>无论你写什么<code>fds[1]</code>可以从中读取<code>fds[0]</code>.</p><h4 id="步骤-3-通过管道写入和读取" tabindex="-1">步骤 3. 通过管道写入和读取 <a class="header-anchor" href="#步骤-3-通过管道写入和读取" aria-label="Permalink to &quot;步骤 3. 通过管道写入和读取&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fds[2];</span></span>
<span class="line"><span>    pipe(fds);</span></span>
<span class="line"><span>    const char msg[] = &quot;hello through pipe&quot;;</span></span>
<span class="line"><span>    write(fds[1], msg, strlen(msg));</span></span>
<span class="line"><span>    char buf[64];</span></span>
<span class="line"><span>    ssize_t n = read(fds[0], buf, sizeof(buf) - 1);</span></span>
<span class="line"><span>    buf[n] = &#39;\\0&#39;;</span></span>
<span class="line"><span>    printf(&quot;Received: %s\\n&quot;, buf);</span></span>
<span class="line"><span>    close(fds[0]);</span></span>
<span class="line"><span>    close(fds[1]);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Received: hello through pipe</span></span></code></pre></div><p>您刚刚通过内存在两个文件描述符之间进行通信，没有文件，没有网络。</p><h4 id="步骤-4-父级和子级之间的管道" tabindex="-1">步骤 4. 父级和子级之间的管道 <a class="header-anchor" href="#步骤-4-父级和子级之间的管道" aria-label="Permalink to &quot;步骤 4. 父级和子级之间的管道&quot;">​</a></h4><p>这就是它的强大之处：管道可以连接进程。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fds[2];</span></span>
<span class="line"><span>    pipe(fds);</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        // Child</span></span>
<span class="line"><span>        close(fds[1]); // close write end</span></span>
<span class="line"><span>        char buf[64];</span></span>
<span class="line"><span>        ssize_t n = read(fds[0], buf, sizeof(buf) - 1);</span></span>
<span class="line"><span>        buf[n] = &#39;\\0&#39;;</span></span>
<span class="line"><span>        printf(&quot;Child got: %s\\n&quot;, buf);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        // Parent</span></span>
<span class="line"><span>        close(fds[0]); // close read end</span></span>
<span class="line"><span>        const char msg[] = &quot;Hi from parent!&quot;;</span></span>
<span class="line"><span>        write(fds[1], msg, strlen(msg));</span></span>
<span class="line"><span>        close(fds[1]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Child got: Hi from parent!</span></span></code></pre></div><p>父进程写入，子进程读取，两个进程之间的干净数据通道。</p><h4 id="步骤-5-将-stdin-stdout-重定向到管道" tabindex="-1">步骤 5. 将 STDIN/STDOUT 重定向到管道 <a class="header-anchor" href="#步骤-5-将-stdin-stdout-重定向到管道" aria-label="Permalink to &quot;步骤 5. 将 STDIN/STDOUT 重定向到管道&quot;">​</a></h4><p>您可以使用<code>dup2()</code>将管道直接连接到标准输入/输出。</p><p>示例：将父级的写入端连接到子级的标准输入。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fds[2];</span></span>
<span class="line"><span>    pipe(fds);</span></span>
<span class="line"><span>    pid_t pid = fork();</span></span>
<span class="line"><span>    if (pid == 0) {</span></span>
<span class="line"><span>        dup2(fds[0], STDIN_FILENO);</span></span>
<span class="line"><span>        close(fds[1]);</span></span>
<span class="line"><span>        execlp(&quot;wc&quot;, &quot;wc&quot;, &quot;-w&quot;, NULL);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        close(fds[0]);</span></span>
<span class="line"><span>        write(fds[1], &quot;Hello from parent\\nThis is a pipe test\\n&quot;, 39);</span></span>
<span class="line"><span>        close(fds[1]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>6</span></span></code></pre></div><p>发生的情况如下：</p><ul><li>父级将数据写入管道。</li><li>孩子的标准输入连接到该管道。 -<code>wc -w</code>计算收到的字数。</li></ul><p>这正是 shell 实现管道的方式，例如<code>echo &quot;hi&quot; | wc -w</code>.</p><h4 id="步骤-6-链接多个命令" tabindex="-1">步骤 6. 链接多个命令 <a class="header-anchor" href="#步骤-6-链接多个命令" aria-label="Permalink to &quot;步骤 6. 链接多个命令&quot;">​</a></h4><p>您可以通过创建多个管道并将它们串联起来来链接多个命令。</p><p>概念示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat file.txt | grep &quot;error&quot; | wc -l</span></span></code></pre></div><p>每个进程都从前一个管道读取数据并写入下一个管道，这是 shell 的基本设计。</p><p>您可以通过以下方式在 C 中实现相同的概念：</p><ol><li>在每个进程对之间创建管道。</li><li>为每个命令创建一个新进程。</li><li>通过重定向其 stdin/stdout<code>dup2()</code>.</li></ol><h4 id="步骤-7-命名管道-fifo" tabindex="-1">步骤 7. 命名管道 (FIFO) <a class="header-anchor" href="#步骤-7-命名管道-fifo" aria-label="Permalink to &quot;步骤 7. 命名管道 (FIFO)&quot;">​</a></h4><p>管道通常仅存在于相关进程之间。要在不相关的程序之间共享数据，可以使用命名管道 (FIFO)。</p><p>创建一个：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkfifo mypipe</span></span></code></pre></div><p>然后在一个终端中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat &gt; mypipe</span></span></code></pre></div><p>在另一篇文章中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat &lt; mypipe</span></span></code></pre></div><p>数据像文件一样流经命名管道。</p><p>在C中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/stat.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    mkfifo(&quot;mypipe&quot;, 0666);</span></span>
<span class="line"><span>    int fd = open(&quot;mypipe&quot;, O_WRONLY);</span></span>
<span class="line"><span>    write(fd, &quot;Hello FIFO\\n&quot;, 11);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-8-错误处理和-eof" tabindex="-1">步骤 8. 错误处理和 EOF <a class="header-anchor" href="#步骤-8-错误处理和-eof" aria-label="Permalink to &quot;步骤 8. 错误处理和 EOF&quot;">​</a></h4><p>如果管道的所有写入端都关闭，<code>read()</code>回报<code>0</code>，表示EOF。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int fds[2];</span></span>
<span class="line"><span>pipe(fds);</span></span>
<span class="line"><span>close(fds[1]); // no writers</span></span>
<span class="line"><span>char buf[10];</span></span>
<span class="line"><span>ssize_t n = read(fds[0], buf, 10); // n == 0 =&gt; EOF</span></span></code></pre></div><p>如果你尝试在所有读者都离开后写作，你会得到<code>SIGPIPE</code>.</p><h4 id="小代码-最小的-shell-管道" tabindex="-1">小代码：最小的 Shell 管道 <a class="header-anchor" href="#小代码-最小的-shell-管道" aria-label="Permalink to &quot;小代码：最小的 Shell 管道&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    int fds[2];</span></span>
<span class="line"><span>    pipe(fds);</span></span>
<span class="line"><span>    if (fork() == 0) {</span></span>
<span class="line"><span>        dup2(fds[1], STDOUT_FILENO);</span></span>
<span class="line"><span>        close(fds[0]);</span></span>
<span class="line"><span>        execlp(&quot;ls&quot;, &quot;ls&quot;, NULL);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (fork() == 0) {</span></span>
<span class="line"><span>        dup2(fds[0], STDIN_FILENO);</span></span>
<span class="line"><span>        close(fds[1]);</span></span>
<span class="line"><span>        execlp(&quot;wc&quot;, &quot;wc&quot;, &quot;-l&quot;, NULL);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    close(fds[0]);</span></span>
<span class="line"><span>    close(fds[1]);</span></span>
<span class="line"><span>    wait(NULL);</span></span>
<span class="line"><span>    wait(NULL);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>跑步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc pipe_chain.c -o pipe_chain</span></span>
<span class="line"><span>./pipe_chain</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(number of files in directory)</span></span></code></pre></div><p>你刚刚重新创建了<code>ls | wc -l</code>在C.</p><h4 id="步骤-9-结合重定向和文件" tabindex="-1">步骤 9. 结合重定向和文件 <a class="header-anchor" href="#步骤-9-结合重定向和文件" aria-label="Permalink to &quot;步骤 9. 结合重定向和文件&quot;">​</a></h4><p>您可以以相同的方式将 stdout 或 stderr 重定向到文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int fd = open(&quot;output.txt&quot;, O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>dup2(fd, STDOUT_FILENO);</span></span>
<span class="line"><span>close(fd);</span></span>
<span class="line"><span>execlp(&quot;ls&quot;, &quot;ls&quot;, NULL);</span></span></code></pre></div><p>现在的输出为<code>ls</code>去<code>output.txt</code>.</p><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p>管道和重定向是 Unix 哲学的核心：</p><ul><li>程序把一件事做好。</li><li>通过文本流进行通信。</li><li>通过链接简单的工具来组成复杂的工作流程。</li></ul><p>了解如何实现管道使您能够：</p><ul><li>构建你自己的外壳</li><li>动态连接进程</li><li>安全地实现进程间通信</li></ul><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><ol><li>重新创建<code>ls | grep c</code>使用两个<code>fork()</code>电话和一根管道。</li><li>构建<code>cat file | wc -l</code>.</li><li>实现一个“tee”程序，将输出复制到标准输出和文件。</li><li>创建一个命名管道并从一个进程向其写入，从另一个进程读取。</li><li>扩展外壳以支持任意长度的管道。</li></ol><p>接下来，您将探索如何使用信号和信号处理程序相互处理信号和中断，这是处理中断、超时和优雅终止的关键概念。</p>`,80)])])}const g=a(i,[["render",l]]);export{r as __pageData,g as default};
