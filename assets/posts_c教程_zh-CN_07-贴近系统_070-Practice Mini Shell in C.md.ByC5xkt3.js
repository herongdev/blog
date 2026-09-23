import{_ as n,o as a,c as p,a5 as e}from"./chunks/framework.DJo0M80U.js";const u=JSON.parse('{"title":"70. 练习：C 语言的迷你 Shell","description":"The Little Book of C 中文版 — 70. 练习：C 语言的迷你 Shell","frontmatter":{"title":"70. 练习：C 语言的迷你 Shell","date":"2026-07-04","lang":"zh-CN","categories":["C 教程"],"tags":["C","Little Book of C","07-贴近系统","中文"],"description":"The Little Book of C 中文版 — 70. 练习：C 语言的迷你 Shell","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","translator":"机器辅助翻译（Google Translate）","section":"70","sidebarWeight":"70","alternateZh":"/posts/c教程/zh-CN/07-贴近系统/070-Practice Mini Shell in C","alternateEn":"/posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C"},"headers":[],"relativePath":"posts/c教程/zh-CN/07-贴近系统/070-Practice Mini Shell in C.md","filePath":"posts/c教程/zh-CN/07-贴近系统/070-Practice Mini Shell in C.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/zh-CN/07-贴近系统/070-Practice Mini Shell in C.md"};function i(t,s,c,o,d,r){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>[English version](/posts/c教程/en-US/07-Working Close to the System/070-Practice Mini Shell in C)</p><h4 id="跟练交付物" tabindex="-1">跟练交付物 <a class="header-anchor" href="#跟练交付物" aria-label="Permalink to &quot;跟练交付物&quot;">​</a></h4><ul><li>已具备状态：完成第 061-069 课，能重新编译上一章示例。</li><li>工作目录：<code>~/c-course-labs/070-mini-shell</code>。</li><li>第一条命令：macOS / Linux 运行 <code>mkdir -p ~/c-course-labs/070-mini-shell &amp;&amp; cd ~/c-course-labs/070-mini-shell</code>；Windows PowerShell 运行 <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\070-mini-shell&quot;; Set-Location &quot;$HOME\\c-course-labs\\070-mini-shell&quot;</code>。</li><li>成功证据：保留源码、可执行文件、<code>evidence.md</code>，并记录<code>pwd</code> / <code>echo</code> / 一条管道或重定向命令的运行记录。</li><li>本章边界：本章做一个可观察的 Shell 原型；暂不要求 job control、完整脚本语言或生产级安全沙箱。</li><li>重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 <code>evidence.md</code> 方便复盘。</li></ul><p>是时候将您迄今为止学到的所有内容（系统调用、进程创建、管道、重定向和信号处理）整合到一个有凝聚力的项目中了。</p><p>在本节中，您将构建一个最小的交互式 shell，就像<code>bash</code>或者<code>zsh</code>，但精简到必需品。它将运行命令、处理输入/输出重定向，甚至支持管道。</p><h4 id="第-1-步-您将构建什么" tabindex="-1">第 1 步：您将构建什么 <a class="header-anchor" href="#第-1-步-您将构建什么" aria-label="Permalink to &quot;第 1 步：您将构建什么&quot;">​</a></h4><p>您的迷你外壳将：</p><ol><li>显示如下提示<code>$</code></li><li>读取用户输入（例如，<code>ls -l</code>,<code>cat file.txt</code>)</li><li>将其解析为命令和参数</li><li>使用创建一个新进程<code>fork()</code></li><li>使用请求的命令替换过程映像<code>execvp()</code> 6.等待孩子说完</li></ol><p>可选扩展：</p><ul><li>优雅地处理信号 (Ctrl+C)</li><li>将输出重定向到文件（<code>&gt;</code>重定向）</li><li>使用管道链接命令（<code>|</code>)</li></ul><h4 id="步骤-2-核心循环骨架" tabindex="-1">步骤 2. 核心循环骨架 <a class="header-anchor" href="#步骤-2-核心循环骨架" aria-label="Permalink to &quot;步骤 2. 核心循环骨架&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>#define MAX 1024</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    char input[MAX];</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;$ &quot;);</span></span>
<span class="line"><span>        fflush(stdout);</span></span>
<span class="line"><span>        if (!fgets(input, sizeof(input), stdin))</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        // Remove newline</span></span>
<span class="line"><span>        input[strcspn(input, &quot;\\n&quot;)] = 0;</span></span>
<span class="line"><span>        // Exit command</span></span>
<span class="line"><span>        if (strcmp(input, &quot;exit&quot;) == 0)</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        // Tokenize input</span></span>
<span class="line"><span>        char *args[64];</span></span>
<span class="line"><span>        int i = 0;</span></span>
<span class="line"><span>        char *token = strtok(input, &quot; &quot;);</span></span>
<span class="line"><span>        while (token) {</span></span>
<span class="line"><span>            args[i++] = token;</span></span>
<span class="line"><span>            token = strtok(NULL, &quot; &quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        args[i] = NULL;</span></span>
<span class="line"><span>        // Fork and execute</span></span>
<span class="line"><span>        pid_t pid = fork();</span></span>
<span class="line"><span>        if (pid == 0) {</span></span>
<span class="line"><span>            execvp(args[0], args);</span></span>
<span class="line"><span>            perror(&quot;execvp&quot;);</span></span>
<span class="line"><span>            exit(1);</span></span>
<span class="line"><span>        } else if (pid &gt; 0) {</span></span>
<span class="line"><span>            wait(NULL);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            perror(&quot;fork&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Goodbye!\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编译并运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc mini_shell.c -o mini_shell</span></span>
<span class="line"><span>./mini_shell</span></span></code></pre></div><p>尝试命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ ls</span></span>
<span class="line"><span>$ pwd</span></span>
<span class="line"><span>$ echo hello world</span></span>
<span class="line"><span>$ exit</span></span></code></pre></div><h4 id="步骤-3-优雅地处理错误" tabindex="-1">步骤 3. 优雅地处理错误 <a class="header-anchor" href="#步骤-3-优雅地处理错误" aria-label="Permalink to &quot;步骤 3. 优雅地处理错误&quot;">​</a></h4><p>如果输入错误的命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ xyz</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>execvp: No such file or directory</span></span></code></pre></div><p>发生这种情况是因为程序处理<code>execvp()</code>正确失败<code>perror()</code>，正如您在第 69 节中学到的那样。</p><h4 id="步骤-4-添加信号处理" tabindex="-1">步骤 4. 添加信号处理 <a class="header-anchor" href="#步骤-4-添加信号处理" aria-label="Permalink to &quot;步骤 4. 添加信号处理&quot;">​</a></h4><p>让我们让 Ctrl+C 停止正在运行的命令，但不终止 shell 本身。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>void sigint_handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\nType &#39;exit&#39; to quit.\\n$ &quot;);</span></span>
<span class="line"><span>    fflush(stdout);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, sigint_handler);</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在，shell 在等待输入时会忽略 Ctrl+C，而不是终止。</p><h4 id="步骤-5-支持输出重定向" tabindex="-1">步骤 5. 支持输出重定向 <a class="header-anchor" href="#步骤-5-支持输出重定向" aria-label="Permalink to &quot;步骤 5. 支持输出重定向&quot;">​</a></h4><p>我们将添加<code>&gt;</code>重定向如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ echo Hello &gt; out.txt</span></span></code></pre></div><p>在之前添加此内容<code>execvp()</code>把孩子叫进来：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>for (int j = 0; args[j]; j++) {</span></span>
<span class="line"><span>    if (strcmp(args[j], &quot;&gt;&quot;) == 0) {</span></span>
<span class="line"><span>        args[j] = NULL;</span></span>
<span class="line"><span>        int fd = open(args[j + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>        dup2(fd, STDOUT_FILENO);</span></span>
<span class="line"><span>        close(fd);</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>现在<code>stdout</code>命令的内容将转到文件而不是屏幕。</p><h4 id="步骤-6-支持输入重定向" tabindex="-1">步骤 6. 支持输入重定向 <a class="header-anchor" href="#步骤-6-支持输入重定向" aria-label="Permalink to &quot;步骤 6. 支持输入重定向&quot;">​</a></h4><p>同样，对于<code>&lt;</code>重定向：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ cat &lt; in.txt</span></span></code></pre></div><p>添加：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (strcmp(args[j], &quot;&lt;&quot;) == 0) {</span></span>
<span class="line"><span>    args[j] = NULL;</span></span>
<span class="line"><span>    int fd = open(args[j + 1], O_RDONLY);</span></span>
<span class="line"><span>    dup2(fd, STDIN_FILENO);</span></span>
<span class="line"><span>    close(fd);</span></span>
<span class="line"><span>    break;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="步骤-7-添加管道支撑" tabindex="-1">步骤 7. 添加管道支撑 <a class="header-anchor" href="#步骤-7-添加管道支撑" aria-label="Permalink to &quot;步骤 7. 添加管道支撑&quot;">​</a></h4><p>处理如下命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ ls | wc -l</span></span></code></pre></div><p>我们创建两个通过管道连接的进程。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int pipefd[2];</span></span>
<span class="line"><span>pipe(pipefd);</span></span>
<span class="line"><span>pid_t p1 = fork();</span></span>
<span class="line"><span>if (p1 == 0) {</span></span>
<span class="line"><span>    dup2(pipefd[1], STDOUT_FILENO);</span></span>
<span class="line"><span>    close(pipefd[0]);</span></span>
<span class="line"><span>    execlp(&quot;ls&quot;, &quot;ls&quot;, NULL);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>pid_t p2 = fork();</span></span>
<span class="line"><span>if (p2 == 0) {</span></span>
<span class="line"><span>    dup2(pipefd[0], STDIN_FILENO);</span></span>
<span class="line"><span>    close(pipefd[1]);</span></span>
<span class="line"><span>    execlp(&quot;wc&quot;, &quot;wc&quot;, &quot;-l&quot;, NULL);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>close(pipefd[0]);</span></span>
<span class="line"><span>close(pipefd[1]);</span></span>
<span class="line"><span>wait(NULL);</span></span>
<span class="line"><span>wait(NULL);</span></span></code></pre></div><p>这与您在第 64 节中看到的模式相同，<code>ls | wc -l</code>.</p><h4 id="步骤-8-组合所有功能" tabindex="-1">步骤 8. 组合所有功能 <a class="header-anchor" href="#步骤-8-组合所有功能" aria-label="Permalink to &quot;步骤 8. 组合所有功能&quot;">​</a></h4><p>现在你的外壳：</p><ul><li>解析用户输入</li><li>产生子进程</li><li>处理 I/O 重定向</li><li>支持Ctrl+C中断</li><li>运行简单的管道</li></ul><p>只需大约 150 行代码，您就拥有了一个可用的 Unix shell 原型。</p><h4 id="步骤-9-小代码-完整的迷你-shell" tabindex="-1">步骤 9. 小代码：完整的迷你 Shell <a class="header-anchor" href="#步骤-9-小代码-完整的迷你-shell" aria-label="Permalink to &quot;步骤 9. 小代码：完整的迷你 Shell&quot;">​</a></h4><p>这是干净、最小的版本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &lt;unistd.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/wait.h&gt;</span></span>
<span class="line"><span>#include &lt;fcntl.h&gt;</span></span>
<span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>void sigint_handler(int sig) {</span></span>
<span class="line"><span>    printf(&quot;\\n$ &quot;);</span></span>
<span class="line"><span>    fflush(stdout);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    signal(SIGINT, sigint_handler);</span></span>
<span class="line"><span>    char input[1024];</span></span>
<span class="line"><span>    while (1) {</span></span>
<span class="line"><span>        printf(&quot;$ &quot;);</span></span>
<span class="line"><span>        fflush(stdout);</span></span>
<span class="line"><span>        if (!fgets(input, sizeof(input), stdin)) break;</span></span>
<span class="line"><span>        input[strcspn(input, &quot;\\n&quot;)] = 0;</span></span>
<span class="line"><span>        if (strcmp(input, &quot;exit&quot;) == 0) break;</span></span>
<span class="line"><span>        char *args[64];</span></span>
<span class="line"><span>        int i = 0;</span></span>
<span class="line"><span>        char *token = strtok(input, &quot; &quot;);</span></span>
<span class="line"><span>        while (token) {</span></span>
<span class="line"><span>            args[i++] = token;</span></span>
<span class="line"><span>            token = strtok(NULL, &quot; &quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        args[i] = NULL;</span></span>
<span class="line"><span>        pid_t pid = fork();</span></span>
<span class="line"><span>        if (pid == 0) {</span></span>
<span class="line"><span>            for (int j = 0; args[j]; j++) {</span></span>
<span class="line"><span>                if (strcmp(args[j], &quot;&gt;&quot;) == 0) {</span></span>
<span class="line"><span>                    int fd = open(args[j + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);</span></span>
<span class="line"><span>                    dup2(fd, STDOUT_FILENO);</span></span>
<span class="line"><span>                    close(fd);</span></span>
<span class="line"><span>                    args[j] = NULL;</span></span>
<span class="line"><span>                } else if (strcmp(args[j], &quot;&lt;&quot;) == 0) {</span></span>
<span class="line"><span>                    int fd = open(args[j + 1], O_RDONLY);</span></span>
<span class="line"><span>                    dup2(fd, STDIN_FILENO);</span></span>
<span class="line"><span>                    close(fd);</span></span>
<span class="line"><span>                    args[j] = NULL;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            execvp(args[0], args);</span></span>
<span class="line"><span>            perror(&quot;execvp&quot;);</span></span>
<span class="line"><span>            exit(1);</span></span>
<span class="line"><span>        } else if (pid &gt; 0) {</span></span>
<span class="line"><span>            wait(NULL);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    printf(&quot;Exiting shell.\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>尝试一下，这是一个真正的交互式 shell。</p><h4 id="第-10-步-为什么它很重要" tabindex="-1">第 10 步：为什么它很重要 <a class="header-anchor" href="#第-10-步-为什么它很重要" aria-label="Permalink to &quot;第 10 步：为什么它很重要&quot;">​</a></h4><p>本练习结合了您在第 7 章中学到的所有内容：</p><ul><li>系统调用（<code>fork</code>,<code>exec</code>,<code>wait</code>,<code>pipe</code>,<code>dup2</code>)</li><li>信号（<code>SIGINT</code>)</li><li>文件描述符和重定向</li><li>错误处理<code>errno</code></li><li>环境继承</li></ul><p>您刚刚构建了一个为每个 Unix shell 提供支持的核心的简化版本，从<code>bash</code>到<code>zsh</code>到<code>fish</code>.</p><h4 id="自己尝试一下" tabindex="-1">自己尝试一下 <a class="header-anchor" href="#自己尝试一下" aria-label="Permalink to &quot;自己尝试一下&quot;">​</a></h4><p>1.添加对管道的支持（<code>|</code>）通过链接多个命令。 2. 实现后台进程<code>&amp;</code>. 3.添加<code>cd</code>和<code>pwd</code>作为内置命令。 4. 在每个命令后显示退出代码。 5. 处理多个空格和带引号的参数。</p><p>接下来，我们将进入第 8 章：调试、测试和分析，从 gdb 开始，它是您理解和修复 C 程序最强大的盟友。</p>`,58)])])}const g=n(l,[["render",i]]);export{u as __pageData,g as default};
